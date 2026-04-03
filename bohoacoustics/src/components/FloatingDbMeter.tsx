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
        className="fixed bottom-20 right-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-105 hover:border-primary/50 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-24 sm:right-6 sm:h-14 sm:w-14"
      >
        <Gauge className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/90 p-4 backdrop-blur-[20px] transition-all duration-500 sm:items-center sm:p-6 sm:bg-black/60">
          <div className="w-full max-w-md border border-white/10 bg-zinc-950 p-0 text-white shadow-[0_0_50px_rgba(0,0,0,1)] animate-in fade-in-0 sm:zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-2">Live Acoustic Check</p>
                <h3 className="font-display text-4xl font-bold tracking-tighter">dB Meter</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dB meter"
                className="flex h-11 w-11 items-center justify-center rounded-full p-0 text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Main Meter Area */}
            <div className="p-8 space-y-12">
              <div className="relative">
                <div className="flex items-baseline justify-between mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Current Pressure</p>
                  <p className="font-display text-6xl font-bold tracking-tighter text-white">
                    {stats.current.toFixed(1)} <span className="text-xl text-primary font-body tracking-normal ml-2">dB</span>
                  </p>
                </div>
                
                {/* Scientific Scale Bar */}
                <div className="relative h-4 w-full bg-white/5 overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-[width] duration-200 ease-out"
                    style={{ width: `${levelPercent}%` }}
                  />
                  {/* Decorative Scale Ticks */}
                  <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-[1px] h-full bg-black/40" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                   <span className="text-[9px] font-bold text-white/40 tracking-tighter">0 DB</span>
                   <span className="text-[9px] font-bold text-white/40 tracking-tighter">85 DB</span>
                </div>
              </div>

              {/* Stats Grid — Architectural Layout */}
              <div className="grid grid-cols-3 border border-white/10">
                <div className="p-4 border-r border-white/10 text-center">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase mb-2">Min</p>
                  <p className="font-display text-xl font-bold text-white">{stats.min.toFixed(1)}</p>
                </div>
                <div className="p-4 border-r border-white/10 text-center bg-white/[0.02]">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase mb-2">Avg</p>
                  <p className="font-display text-xl font-bold text-primary">{stats.avg.toFixed(1)}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase mb-2">Max</p>
                  <p className="font-display text-xl font-bold text-white">{stats.max.toFixed(1)}</p>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="mx-8 mb-8 border-l border-primary/50 bg-primary/5 p-4 text-[11px] font-bold tracking-widest text-primary uppercase">
                {errorMessage}
              </div>
            )}

            {/* Footer Actions */}
            <div className="grid grid-cols-2">
              <button
                type="button"
                onClick={handleClose}
                className="border-t border-r border-white/10 py-6 min-h-12 text-xs font-bold tracking-widest text-white/60 uppercase hover:bg-white/5 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-inset"
              >
                Close
              </button>
              <button
                type="button"
                onClick={startMonitoring}
                disabled={requestingMic || isRunning}
                className="border-t border-white/10 py-6 min-h-12 text-xs font-bold tracking-widest text-primary-foreground bg-primary uppercase hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-inset"
              >
                {isRunning ? <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> : <Mic className="h-4 w-4" />}
                {requestingMic ? "Requesting..." : isRunning ? "Monitoring" : "Initiate Meter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {noisePopupOpen && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4 backdrop-blur-[30px] animate-in fade-in duration-500">
          <div className="w-full max-w-lg border border-primary/30 bg-zinc-950 p-0 text-white shadow-[0_0_100px_rgba(218,157,64,0.15)]">
            <div className="p-10">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 border border-primary/30 flex items-center justify-center text-primary">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Acoustic Criticality</p>
                    <h4 className="font-display text-3xl font-bold tracking-tighter">Excessive Noise Detected</h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={dismissNoisePopup}
                  aria-label="Close noise alert"
                  className="flex h-11 w-11 items-center justify-center rounded-full p-0 text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-white/60 font-light leading-relaxed">
                  Real-time diagnostics indicate sound pressure levels frequently exceeding <span className="text-primary font-bold">85dB</span>. Continued exposure or use of this facility without treatment may result in significant acoustic fatigue and performance loss.
                </p>
                <div className="p-6 border border-white/5 bg-white/[0.02]">
                  <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">Peak Analysis</p>
                  <p className="text-xl font-display font-bold">CURRENT: {stats.current.toFixed(1)} DB / MAX: {stats.max.toFixed(1)} DB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <button
                type="button"
                onClick={dismissNoisePopup}
                className="border-t border-r border-white/10 py-6 min-h-12 text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase hover:bg-white/5 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-inset"
              >
                Dismiss Assessment
              </button>
              <Link
                to="/consultation"
                onClick={dismissNoisePopup}
                className="border-t border-white/10 py-6 min-h-12 text-[10px] font-bold tracking-[0.2em] text-primary-foreground bg-primary uppercase hover:opacity-90 transition-all text-center flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-inset"
              >
                Book Diagnostic View
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingDbMeter;
