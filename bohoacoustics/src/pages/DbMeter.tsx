import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const DbMeter = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentDb, setCurrentDb] = useState(0);
  const [peakDb, setPeakDb] = useState(0);
  const [averageDb, setAverageDb] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);

      setIsListening(true);
      updateDbLevel();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to use the dB meter");
    }
  };

  const stopListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsListening(false);
  };

  const updateDbLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const db = Math.round(20 * Math.log10(average / 128));
    const normalizedDb = Math.max(0, Math.min(120, db + 60));

    setCurrentDb(normalizedDb);
    setPeakDb(prev => Math.max(prev, normalizedDb));
    
    setHistory(prev => {
      const newHistory = [...prev, normalizedDb].slice(-50);
      const avg = newHistory.reduce((sum, val) => sum + val, 0) / newHistory.length;
      setAverageDb(Math.round(avg));
      return newHistory;
    });

    animationRef.current = requestAnimationFrame(updateDbLevel);
  };

  const getDbLevelColor = (db: number) => {
    if (db < 30) return "text-green-500";
    if (db < 60) return "text-yellow-500";
    if (db < 85) return "text-orange-500";
    return "text-red-500";
  };

  const getDbLevelDescription = (db: number) => {
    if (db < 30) return "Very Quiet";
    if (db < 60) return "Moderate";
    if (db < 85) return "Loud";
    return "Very Loud";
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <Link to="/">
            <Button variant="ghost" className="text-white hover:text-primary">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Sound Level Meter</h1>
          <div className="w-32"></div>
        </motion.div>

        {/* Main Meter Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            {/* dB Display */}
            <div className="text-center mb-8">
              <div className={`text-8xl font-bold mb-2 ${getDbLevelColor(currentDb)}`}>
                {currentDb}
              </div>
              <div className="text-2xl text-gray-400">dB</div>
              <div className="text-lg text-gray-500 mt-2">{getDbLevelDescription(currentDb)}</div>
            </div>

            {/* Visual Meter */}
            <div className="mb-8">
              <div className="h-8 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentDb / 120) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0 dB</span>
                <span>30 dB</span>
                <span>60 dB</span>
                <span>85 dB</span>
                <span>120 dB</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Peak Level</div>
                <div className={`text-2xl font-bold ${getDbLevelColor(peakDb)}`}>
                  {peakDb} dB
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Average Level</div>
                <div className={`text-2xl font-bold ${getDbLevelColor(averageDb)}`}>
                  {averageDb} dB
                </div>
              </div>
            </div>

            {/* Control Button */}
            <div className="flex justify-center">
              <Button
                onClick={isListening ? stopListening : startListening}
                size="lg"
                className={`${
                  isListening
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-primary hover:bg-primary/90"
                } text-white px-8 py-4`}
              >
                {isListening ? (
                  <>
                    <MicOff className="mr-2 w-5 h-5" />
                    Stop Measuring
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 w-5 h-5" />
                    Start Measuring
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gray-900 rounded-2xl p-8 border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Volume2 className="mr-3 w-6 h-6 text-primary" />
              Sound Level Reference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex justify-between">
                <span>0-30 dB:</span>
                <span className="text-green-500">Very Quiet (Whisper)</span>
              </div>
              <div className="flex justify-between">
                <span>30-60 dB:</span>
                <span className="text-yellow-500">Moderate (Conversation)</span>
              </div>
              <div className="flex justify-between">
                <span>60-85 dB:</span>
                <span className="text-orange-500">Loud (Traffic)</span>
              </div>
              <div className="flex justify-between">
                <span>85+ dB:</span>
                <span className="text-red-500">Very Loud (Harmful)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DbMeter;
