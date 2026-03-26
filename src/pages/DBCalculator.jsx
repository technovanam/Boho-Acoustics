import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Info, Volume2, FastForward as Distance, Zap, MapPin, AlertTriangle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const DBCalculator = () => {
  const [activeTab, setActiveTab] = useState('addition'); // 'addition' | 'distance' | 'diagnosis'

  // Addition Tool State
  const [sources, setSources] = useState(['60', '65']);
  const [totalDB, setTotalDB] = useState(0);

  // Distance Tool State
  const [splAtDistance, setSplAtDistance] = useState({
    initialSPL: '90',
    initialDist: '1',
    targetDist: '10',
    result: 0
  });

  // Smart Diagnosis State
  const [diagnosis, setDiagnosis] = useState({
    environment: 'HOME',
    measuredSPL: '40',
    threshold: 40,
    isWarning: false,
    isMeterActive: false,
    stats: { min: null, max: 0, avg: 0, peak: 0, count: 0, sum: 0 },
    history: Array(50).fill(0),
    highNoiseTime: 0
  });

  const thresholds = {
    'HOME': 40,
    'OFFICE': 50,
    'RECORDING STUDIO': 25,
    'HOME THEATER': 30,
    'AUDITORIUM': 35
  };

  // Calculate dB Addition
  useEffect(() => {
    if (activeTab === 'addition') {
      const sum = sources.reduce((acc, val) => {
        const num = parseFloat(val) || 0;
        return acc + Math.pow(10, num / 10);
      }, 0);
      setTotalDB(sum > 0 ? (10 * Math.log10(sum)).toFixed(1) : 0);
    }
  }, [sources, activeTab]);

  // Calculate Distance Loss
  useEffect(() => {
    if (activeTab === 'distance') {
      const L1 = parseFloat(splAtDistance.initialSPL) || 0;
      const d1 = parseFloat(splAtDistance.initialDist) || 1;
      const d2 = parseFloat(splAtDistance.targetDist) || 1;
      const L2 = L1 - 20 * Math.log10(d2 / d1);
      setSplAtDistance(prev => ({ ...prev, result: L2.toFixed(1) }));
    }
  }, [splAtDistance.initialSPL, splAtDistance.initialDist, splAtDistance.targetDist, activeTab]);

  // Sustained Noise Logic (10 Second Timer)
  useEffect(() => {
    let timer = null;
    if (diagnosis.isMeterActive) {
      timer = setInterval(() => {
        const currentDb = parseFloat(diagnosis.measuredSPL);
        const limit = thresholds[diagnosis.environment];
        
        if (currentDb > limit) {
          setDiagnosis(prev => {
            const newTime = prev.highNoiseTime + 1;
            if (newTime >= 10) {
              return { ...prev, isWarning: true, isMeterActive: false, highNoiseTime: 0 };
            }
            return { ...prev, highNoiseTime: newTime };
          });
        } else {
          setDiagnosis(prev => ({ ...prev, highNoiseTime: 0 }));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [diagnosis.isMeterActive, diagnosis.measuredSPL, diagnosis.environment]);

  // Real-Time Decibel Meter Logic
  useEffect(() => {
    let audioContext = null;
    let analyser = null;
    let microphone = null;
    let scriptProcessor = null;
    let stream = null;

    if (activeTab === 'diagnosis' && diagnosis.isMeterActive) {
      const startMeter = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;

          microphone.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(audioContext.destination);

          scriptProcessor.onaudioprocess = () => {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            let values = 0;
            for (let i = 0; i < array.length; i++) values += array[i];
            const average = values / array.length;
            const db = Math.round((average / 2.5) + 30); 
            
            setDiagnosis(prev => {
              const newMax = Math.max(prev.stats.max, db);
              const newMin = db > 10 ? (prev.stats.min === null ? db : Math.min(prev.stats.min, db)) : prev.stats.min;
              const newPeak = Math.max(prev.stats.peak, db);
              const newSum = prev.stats.sum + db;
              const newCount = prev.stats.count + 1;
              const newAvg = Math.round(newSum / newCount);
              const newHistory = [...prev.history.slice(1), db];

              return { 
                ...prev, 
                measuredSPL: db.toString(),
                history: newHistory,
                stats: {
                  ...prev.stats,
                  max: newMax,
                  min: newMin,
                  peak: newPeak,
                  avg: newAvg,
                  sum: newSum,
                  count: newCount
                }
              };
            });
          };
        } catch (err) {
          console.error('Mic access denied', err);
          setDiagnosis(prev => ({ ...prev, isMeterActive: false }));
        }
      };

      startMeter();
    }

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      if (audioContext) audioContext.close();
    };
  }, [activeTab, diagnosis.isMeterActive]);

  const toggleMeter = () => {
    setDiagnosis(prev => ({ ...prev, isMeterActive: !prev.isMeterActive }));
  };

  const addSource = () => setSources([...sources, '70']);
  const removeSource = (index) => setSources(sources.filter((_, i) => i !== index));
  const updateSource = (index, val) => {
    const newSources = [...sources];
    newSources[index] = val;
    setSources(newSources);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden font-body">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full border-l border-white/10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white/10 h-full"></div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-none mb-4"
          >
            <Calculator className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">Acoustic Engineering Suite</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
            Precision <span className="text-white/20">Tools</span>
          </h1>
          <p className="text-white/40 uppercase tracking-[0.5em] text-[10px] font-black">
            Calculate, Diagnose, and Optimize Your Space
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center border-b border-white/10 max-w-4xl mx-auto">
          {[
            { id: 'addition', label: 'Sound Summation', icon: Volume2 },
            { id: 'distance', label: 'Distance Attenuation', icon: Distance },
            { id: 'diagnosis', label: 'Smart Diagnosis', icon: Zap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-6 text-[10px] uppercase tracking-widest font-black border-t-2 transition-all ${activeTab === tab.id ? 'border-amber-500 bg-white/5 text-white' : 'border-transparent text-white/30 hover:text-white/60'}`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-amber-500' : 'text-white/20'}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* content */}
        <div className={`grid grid-cols-1 ${activeTab === 'diagnosis' ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-12 bg-white/5 border border-white/10 p-10 md:p-16 relative`}>
          <div className={`${activeTab === 'diagnosis' ? '' : 'space-y-10'}`}>
            <AnimatePresence mode="wait">
              {activeTab === 'addition' && (
                <motion.div
                  key="addition"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold uppercase tracking-tight">Combine Noise Sources</h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
                      Enter the decibel levels of individual sound sources to calculate the combined SPL.
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                    {sources.map((val, idx) => (
                      <div key={idx} className="flex space-x-4">
                        <div className="flex-grow group">
                          <label className="text-[9px] uppercase tracking-widest text-white/20 group-focus-within:text-amber-500 transition-colors">Source {idx + 1} (dB)</label>
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => updateSource(idx, e.target.value)}
                            className="w-full bg-black border-b border-white/10 py-3 text-2xl font-black tracking-tighter focus:border-amber-500 focus:outline-none placeholder:text-white/5"
                          />
                        </div>
                        <button
                          onClick={() => removeSource(idx)}
                          className="self-end p-3 hover:text-red-500 transition-colors opacity-40 hover:opacity-100"
                          disabled={sources.length <= 1}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addSource}
                    className="w-full py-4 border border-white/10 flex items-center justify-center space-x-2 text-[10px] uppercase font-black hover:bg-white/5 transition-all text-white/60 hover:text-white"
                  >
                    <span>Add Another Source</span>
                  </button>
                </motion.div>
              )}

              {activeTab === 'distance' && (
                <motion.div
                  key="distance"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold uppercase tracking-tight">Inverse Square Law</h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
                      Calculate how much sound intensity drops over a specific distance.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="group">
                      <label className="text-[9px] uppercase tracking-widest text-white/20 block mb-2">Initial SPL (dB)</label>
                      <input
                        type="number"
                        value={splAtDistance.initialSPL}
                        onChange={(e) => setSplAtDistance({ ...splAtDistance, initialSPL: e.target.value })}
                        className="w-full bg-black border-b border-white/10 py-3 text-4xl font-black tracking-tighter focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="group">
                        <label className="text-[9px] uppercase tracking-widest text-white/20 block mb-2">Ref. Distance (m)</label>
                        <input
                          type="number"
                          value={splAtDistance.initialDist}
                          onChange={(e) => setSplAtDistance({ ...splAtDistance, initialDist: e.target.value })}
                          className="w-full bg-black border-b border-white/10 py-3 text-2xl font-black tracking-tighter focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="group">
                        <label className="text-[9px] uppercase tracking-widest text-white/20 block mb-2">Target Distance (m)</label>
                        <input
                          type="number"
                          value={splAtDistance.targetDist}
                          onChange={(e) => setSplAtDistance({ ...splAtDistance, targetDist: e.target.value })}
                          className="w-full bg-black border-b border-white/10 py-3 text-2xl font-black tracking-tighter focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'diagnosis' && (
                <motion.div
                  key="diagnosis"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Meter Unit with Graph */}
                    <div className="lg:col-span-2 bg-black border border-white/10 p-12 lg:p-16 relative overflow-hidden flex flex-col items-center">
                       {/* CRT Effect Overlays */}
                       <div className="absolute inset-0 pointer-events-none z-20">
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                       </div>

                       <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden z-30">
                          <motion.div 
                            initial={{ x: '-100%' }}
                            animate={diagnosis.isMeterActive ? { x: '100%' } : { x: '-100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="w-1/3 h-full bg-amber-500 shadow-[0_0_20px_#f59e0b]"
                          />
                       </div>

                       <div className="relative z-10 flex flex-col items-center w-full">
                          <span className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-500/60 mb-6 animate-pulse">
                            {diagnosis.isMeterActive ? `Monitoring: ${10 - diagnosis.highNoiseTime}s until detection` : 'Acoustic Lab Active'}
                          </span>
                          
                          <div className="relative mb-12">
                             <input 
                               type="number"
                               value={diagnosis.measuredSPL}
                               onChange={(e) => setDiagnosis({ ...diagnosis, measuredSPL: e.target.value })}
                               disabled={diagnosis.isMeterActive}
                               className={`w-64 md:w-96 text-center bg-transparent border-none text-[140px] md:text-[200px] font-black tracking-tighter leading-none transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:outline-none focus:text-amber-500 ${diagnosis.isWarning ? 'text-red-500' : 'text-white'}`}
                             />
                             <div className="text-xl font-black uppercase tracking-[0.5em] text-white/10 text-center -mt-6">Decibels</div>
                          </div>

                          {/* Graph Area */}
                          <div className="w-full h-48 relative border-t border-b border-white/5 bg-white/2 mb-12 flex items-end overflow-hidden">
                             <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                                <defs>
                                   <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor={diagnosis.isWarning ? '#ef4444' : '#f59e0b'} stopOpacity="0.4" />
                                      <stop offset="100%" stopColor={diagnosis.isWarning ? '#ef4444' : '#f59e0b'} stopOpacity="0" />
                                   </linearGradient>
                                </defs>
                                <path 
                                   d={`M 0 100 ${diagnosis.history.map((db, i) => `L ${(i / (diagnosis.history.length - 1)) * 500} ${100 - (db / 110) * 100}`).join(' ')} L 500 100 Z`}
                                   fill="url(#grad)"
                                />
                                <path 
                                   d={diagnosis.history.map((db, i) => `${i === 0 ? 'M' : 'L'} ${(i / (diagnosis.history.length - 1)) * 500} ${100 - (db / 110) * 100}`).join(' ')}
                                   fill="none"
                                   stroke={diagnosis.isWarning ? '#ef4444' : '#f59e0b'}
                                   strokeWidth="2"
                                />
                                <line 
                                   x1="0" y1={100 - (thresholds[diagnosis.environment] / 110) * 100} 
                                   x2="500" y2={100 - (thresholds[diagnosis.environment] / 110) * 100} 
                                   stroke="white" 
                                   strokeWidth="0.5" 
                                   strokeDasharray="4"
                                   opacity="0.3"
                                />
                             </svg>
                             <div className="absolute top-2 right-4 text-[8px] font-black uppercase tracking-widest text-white/20">
                                Limit: {thresholds[diagnosis.environment]} dB
                             </div>
                          </div>

                          {/* Preset Selector */}
                          <div className="flex gap-2 w-full overflow-x-auto no-scrollbar pb-2">
                             {Object.keys(thresholds).map(env => (
                               <button
                                 key={env}
                                 onClick={() => setDiagnosis({ ...diagnosis, environment: env, threshold: thresholds[env] })}
                                 className={`flex-1 py-4 text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${diagnosis.environment === env ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'}`}
                               >
                                 {env}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="relative z-10 mt-12 w-full grid grid-cols-4 divide-x divide-white/10 overflow-hidden border border-white/10">
                          {[
                            { label: 'MIN', val: diagnosis.stats.min || '--' },
                            { label: 'AVG', val: diagnosis.stats.avg || '--' },
                            { label: 'MAX', val: diagnosis.stats.max || '--' },
                            { label: 'PEAK', val: diagnosis.stats.peak || '--' }
                          ].map(stat => (
                            <div key={stat.label} className="py-6 flex flex-col items-center hover:bg-white/5 transition-colors group">
                               <span className="text-[8px] font-black text-white/20 group-hover:text-amber-500 transition-colors uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                               <span className="text-xl font-black text-white tabular-nums">{stat.val}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Dashboard Sidebar */}
                    <div className="space-y-6 h-full flex flex-col">
                       <div className={`flex-grow p-10 border transition-all duration-700 relative overflow-hidden ${diagnosis.isWarning ? 'bg-red-950/20 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
                          <div className="relative z-10 flex flex-col h-full">
                             <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                   <div className={`w-1.5 h-1.5 rounded-full ${diagnosis.isMeterActive ? 'bg-amber-500 animate-pulse' : 'bg-white/20'}`} />
                                   <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Status Report</span>
                                </div>
                                {diagnosis.isWarning && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                             </div>

                             <div className="mb-10">
                                <h4 className={`text-4xl font-black tracking-tighter uppercase mb-4 leading-none ${diagnosis.isWarning ? 'text-red-500' : 'text-white'}`}>
                                   {diagnosis.isWarning ? 'CRITICAL ALERT' : 'ACOUSTIC STABILITY'}
                                </h4>
                                <p className="text-[11px] text-white/40 uppercase tracking-widest leading-relaxed">
                                   {diagnosis.isWarning 
                                     ? `Noise levels have been consistently above ${diagnosis.threshold}dB for over 10 seconds. High health risk detected.`
                                     : `Levels are currently within safety parameters for ${diagnosis.environment}. No acoustic intervention needed.`}
                                </p>
                             </div>

                             {diagnosis.highNoiseTime > 0 && (
                                <div className="p-4 bg-white/5 border border-amber-500/20 mb-6">
                                   <div className="flex justify-between items-center mb-2">
                                      <span className="text-[8px] uppercase font-black tracking-widest text-amber-500">Continuous High Noise</span>
                                      <span className="text-[10px] font-black text-white">{diagnosis.highNoiseTime} / 10s</span>
                                   </div>
                                   <div className="w-full h-1 bg-white/10">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(diagnosis.highNoiseTime / 10) * 100}%` }}
                                        className="h-full bg-amber-500"
                                      />
                                   </div>
                                </div>
                             )}

                             <div className="mt-auto">
                                {diagnosis.isWarning && (
                                   <motion.button 
                                     whileHover={{ scale: 1.02 }}
                                     whileTap={{ scale: 0.98 }}
                                     className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_15px_40px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-3"
                                   >
                                      <MessageSquare className="w-4 h-4" />
                                      Book Urgent Consultation
                                   </motion.button>
                                )}
                             </div>
                          </div>
                       </div>

                       <button 
                          onClick={toggleMeter}
                          className={`py-8 border font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all ${diagnosis.isMeterActive ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-white hover:bg-white/5'}`}
                       >
                          <Volume2 className={`w-5 h-5 ${diagnosis.isMeterActive ? 'animate-bounce' : ''}`} />
                          {diagnosis.isMeterActive ? 'Terminate Analysis' : 'Launch Real-time Mic'}
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {activeTab !== 'diagnosis' && (
             <div className="border-l border-white/10 pl-0 lg:pl-12 flex flex-col justify-center items-center text-center space-y-8 py-10 lg:py-0 border-t lg:border-t-0 mt-8 lg:mt-0">
             <div className={`w-full p-12 bg-black border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)] relative overflow-hidden group transition-colors duration-500`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 flex">
                   <Zap className="w-12 h-12 text-amber-500" />
                </div>
                
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40 mb-6 block">
                  Calculated Output
                </span>
                
                <motion.div
                  key={activeTab === 'addition' ? totalDB : splAtDistance.result}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none text-amber-500">
                    {activeTab === 'addition' ? totalDB : splAtDistance.result}
                  </span>
                  <span className="text-2xl font-black tracking-[0.3em] uppercase text-white -mt-4">Decibels</span>
                </motion.div>

                <div className="mt-12 flex items-center justify-center space-x-2 text-[9px] font-black uppercase tracking-widest text-white/20">
                   <Info className="w-3 h-3" />
                   <span>Based on Logarithmic Computation</span>
                </div>
             </div>

             <div className="max-w-xs space-y-4 w-full">
                <div className="space-y-4">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                      Need a full acoustic audit and a guaranteed performance plan?
                   </p>
                   <Link to="/consultation" className="px-8 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all w-full flex items-center justify-center group block">
                      <span>Book Full Consultation</span>
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform inline-block" />
                   </Link>
                </div>
             </div>
          </div>
          )}
        </div>

        {/* Reference Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: '30 dB', desc: 'Whispering, Quiet Library' },
             { label: '60 dB', desc: 'Normal Conversation' },
             { label: '90 dB', desc: 'Loud Machinery, Shouting' },
             { label: '110 dB', desc: 'Screaming, Live Concert' },
             { label: '130 dB', desc: 'Threshold of Pain, Jet Takeoff' },
             { label: '140 dB', desc: 'Instant Drum Damage' }
           ].map((ref, idx) => (
             <div key={idx} className="p-6 border border-white/5 bg-white/5 flex items-center justify-between group hover:border-white/20 transition-all">
                <span className="text-lg font-black tracking-tighter uppercase group-hover:text-amber-500">{ref.label}</span>
                <span className="text-[9px] uppercase tracking-widest font-black text-white/30">{ref.desc}</span>
             </div>
           ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
    </div>
  );
};

export default DBCalculator;
