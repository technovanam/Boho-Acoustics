import { AlertTriangle, Gauge, Mic, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type MeterStats = {
  current: number;
  min: number;
  avg: number;
  max: number;
};

const ALERT_DB = 85;
const NEAR_THRESHOLD_DB = 83;
const ALERT_HOLD_MS = 10000;
const POPUP_COOLDOWN_MS = 5 * 60 * 1000;
const POPUP_SESSION_KEY = "boho-db-popup-last-shown";

const toDb = (rms: number) => {
  const safeRms = Math.max(rms, 1e-8);
  const dbfs = 20 * Math.log10(safeRms);

  // Offset from dBFS to a human-friendly ambient dB range.
  return Math.max(0, Math.min(120, dbfs + 100));
};

const FloatingDbMeter = () => {
  const [open, setOpen] = useState(false);
  const [requestingMic, setRequestingMic] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [noisePopupOpen, setNoisePopupOpen] = useState(false);
  const [stats, setStats] = useState<MeterStats>({
    current: 0,
    min: 0,
    avg: 0,
    max: 0,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const nearThresholdStartRef = useRef<number | null>(null);
  const sumRef = useRef(0);
  const countRef = useRef(0);
  const minRef = useRef(Infinity);
  const maxRef = useRef(0);
  const lastUiUpdateRef = useRef(0);
  const popupLockedRef = useRef(false);

  const shouldShowPopup = () => {
    const lastShown = Number(window.sessionStorage.getItem(POPUP_SESSION_KEY) || "0");
    const now = Date.now();
    return now - lastShown > POPUP_COOLDOWN_MS;
  };

  const markPopupShown = () => {
    window.sessionStorage.setItem(POPUP_SESSION_KEY, String(Date.now()));
  };

  const stopMonitoring = () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    if (mediaStreamRef.current) {
      for (const track of mediaStreamRef.current.getTracks()) {
        track.stop();
      }
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    nearThresholdStartRef.current = null;
    popupLockedRef.current = false;
    setIsRunning(false);
  };

  const startMonitoring = async () => {
    setErrorMessage(null);
    setRequestingMic(true);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Microphone access is not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error("Web Audio API is not supported in this browser.");
      }

      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.85;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      for (const track of stream.getAudioTracks()) {
        track.onended = () => {
          setErrorMessage("Microphone stream stopped. Please start monitoring again.");
          stopMonitoring();
        };
      }

      mediaStreamRef.current = stream;
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      sumRef.current = 0;
      countRef.current = 0;
      minRef.current = Infinity;
      maxRef.current = 0;
      nearThresholdStartRef.current = null;
      popupLockedRef.current = false;
      setStats({ current: 0, min: 0, avg: 0, max: 0 });

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);

      const tick = (time: number) => {
        const activeAnalyser = analyserRef.current;
        if (!activeAnalyser) {
          return;
        }

        activeAnalyser.getFloatTimeDomainData(dataArray);

        let sumSquares = 0;
        for (let i = 0; i < dataArray.length; i += 1) {
          const sample = dataArray[i];
          sumSquares += sample * sample;
        }

        const rms = Math.sqrt(sumSquares / dataArray.length);
        const currentDb = toDb(rms);

        sumRef.current += currentDb;
        countRef.current += 1;
        minRef.current = Math.min(minRef.current, currentDb);
        maxRef.current = Math.max(maxRef.current, currentDb);

        if (currentDb >= NEAR_THRESHOLD_DB) {
          if (nearThresholdStartRef.current === null) {
            nearThresholdStartRef.current = performance.now();
          }
          if (performance.now() - nearThresholdStartRef.current >= ALERT_HOLD_MS && !popupLockedRef.current) {
            popupLockedRef.current = true;
            if (shouldShowPopup()) {
              setNoisePopupOpen(true);
              markPopupShown();
            }
          }
        } else {
          nearThresholdStartRef.current = null;
          popupLockedRef.current = false;
        }

        // Throttle React updates to reduce render load and battery use.
        if (time - lastUiUpdateRef.current >= 180) {
          lastUiUpdateRef.current = time;
          setStats({
            current: currentDb,
            min: Number.isFinite(minRef.current) ? minRef.current : currentDb,
            avg: sumRef.current / countRef.current,
            max: maxRef.current,
          });
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      setIsRunning(true);
      rafIdRef.current = requestAnimationFrame(tick);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to access microphone.";
      setErrorMessage(message);
      stopMonitoring();
    } finally {
      setRequestingMic(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    stopMonitoring();
    setNoisePopupOpen(false);
  };

  const dismissNoisePopup = () => {
    setNoisePopupOpen(false);
  };

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return;
      }

      if (noisePopupOpen) {
        dismissNoisePopup();
        return;
      }

      if (open) {
        handleClose();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        nearThresholdStartRef.current = null;
        popupLockedRef.current = false;
      }
    };

    window.addEventListener("keydown", onEscape);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("keydown", onEscape);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopMonitoring();
    };
  }, [noisePopupOpen, open]);

  const levelPercent = Math.min((stats.current / ALERT_DB) * 100, 100);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open dB meter"
        className="fixed bottom-20 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 hover:border-primary/50 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-24 sm:right-6 sm:h-14 sm:w-14"
      >
        <Gauge className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-5 text-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">Live Acoustic Check</p>
                <h3 className="mt-1 text-xl font-semibold">dB Meter</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dB meter"
                className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-4">
              <div className="mb-3 flex items-end justify-between">
                <p className="text-sm text-zinc-400">Current level</p>
                <p className="text-3xl font-bold leading-none">{stats.current.toFixed(1)} <span className="text-base font-medium text-zinc-400">dB</span></p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-[width] duration-150"
                  style={{ width: `${levelPercent}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
                <div className="rounded-lg bg-zinc-900/80 p-2">
                  <p className="text-zinc-500">Min</p>
                  <p className="mt-1 font-semibold">{stats.min.toFixed(1)} dB</p>
                </div>
                <div className="rounded-lg bg-zinc-900/80 p-2">
                  <p className="text-zinc-500">Avg</p>
                  <p className="mt-1 font-semibold">{stats.avg.toFixed(1)} dB</p>
                </div>
                <div className="rounded-lg bg-zinc-900/80 p-2">
                  <p className="text-zinc-500">Max</p>
                  <p className="mt-1 font-semibold">{stats.max.toFixed(1)} dB</p>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-100">
                {errorMessage}
              </div>
            )}

            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5"
              >
                Close
              </button>
              <button
                type="button"
                onClick={startMonitoring}
                disabled={requestingMic || isRunning}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Mic className="mr-2 h-4 w-4" />
                {requestingMic ? "Requesting mic..." : isRunning ? "Monitoring" : "Start Monitoring"}
              </button>
            </div>
          </div>
        </div>
      )}

      {noisePopupOpen && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-rose-400/30 bg-zinc-950 p-5 text-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">Noise Warning</p>
                  <h4 className="mt-1 text-lg font-semibold">High noise levels detected</h4>
                </div>
              </div>
              <button
                type="button"
                onClick={dismissNoisePopup}
                aria-label="Close warning popup"
                className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm leading-relaxed text-zinc-200">
              High noise levels detected. Your space may need acoustic treatment.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Monitoring is still active in the background. Current: {stats.current.toFixed(1)} dB, Max: {stats.max.toFixed(1)} dB.
            </p>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={dismissNoisePopup}
                className="inline-flex items-center justify-center rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5"
              >
                Dismiss
              </button>
              <Link
                to="/consultation"
                onClick={dismissNoisePopup}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingDbMeter;
