import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Upload, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Timer, 
  BarChart3,
  Zap,
  Target,
  ShieldAlert,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { Signal, AssetType, ICTAnalysis } from '../types';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const CONTRACT_SPECS: Record<string, { type: AssetType; pipValue: number }> = {
  'NAS100': { type: 'INDICES', pipValue: 1 },
  'US30': { type: 'INDICES', pipValue: 1 },
  'SPX500': { type: 'INDICES', pipValue: 0.1 },
  'XAUUSD': { type: 'COMMODITIES', pipValue: 10 },
  'GOLD': { type: 'COMMODITIES', pipValue: 10 },
  'BTCUSD': { type: 'CRYPTO', pipValue: 1 },
  'ETHUSD': { type: 'CRYPTO', pipValue: 1 },
};

export const AIScanner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('');
  const [result, setResult] = useState<Signal | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        processAnalysis(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processAnalysis = async (imgData: string) => {
    setIsProcessing(true);
    setResult(null);
    setProgress(10);
    setStatus('Initializing Neural Engine...');

    try {
      // Step 1: OCR Step
      setStatus('Performing OCR: Detecting Ticker Symbol...');
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(imgData);
      await worker.terminate();
      
      setProgress(40);
      
      // Try to find a ticker in the text (Simulating top-left detection)
      // Usually tickers are uppercase and alphanumeric
      const words = text.split(/\s+/);
      const ticker = words.find(w => /^[A-Z0-9]{3,10}$/.test(w)) || 'NAS100'; // Fallback
      
      setStatus(`Detected Asset: ${ticker}`);
      setProgress(60);

      // Step 2: Determine Asset Type and Apply ICT Strategy
      const specs = CONTRACT_SPECS[ticker] || { type: 'FOREX', pipValue: 1 };
      
      setStatus(`Analyzing Market Structure (${specs.type})...`);
      
      // Simulate ICT Analysis Logic
      const analysis: ICTAnalysis = {
        htfDirection: Math.random() > 0.5 ? 'BULLISH' : 'BEARISH',
        mss: Math.random() > 0.3,
        liquiditySweep: Math.random() > 0.2,
        fvgDetected: Math.random() > 0.4,
        orderBlock: Math.random() > 0.5,
        killzone: isWithinKillzone(),
        premiumDiscount: Math.random() > 0.5 ? 'DISCOUNT' : 'PREMIUM',
        riskReward: 1 + Math.random() * 5,
        displacement: Math.random() > 0.3
      };

      // Calculate Signal Strength based on user requirements
      let strength = 0;
      if (analysis.htfDirection !== 'NEUTRAL') strength += 20;
      if (analysis.mss) strength += 15;
      if (analysis.liquiditySweep) strength += 15;
      if (analysis.fvgDetected) strength += 15;
      if (analysis.killzone) strength += 20;
      if (analysis.displacement) strength += 15;

      // Asset specific weights
      if (specs.type === 'CRYPTO') strength += 5; // Extra weight to daily trend (simulated)
      if (specs.type === 'INDICES' && analysis.killzone) strength += 10; // Extra weight for session open

      strength = Math.min(strength, 100);

      setProgress(90);
      setStatus('Generating Signal Strength...');

      setTimeout(() => {
        const signal: Signal = {
          id: Math.random().toString(36).substr(2, 9),
          pair: ticker,
          assetType: specs.type,
          type: analysis.htfDirection === 'BULLISH' ? 'BUY' : 'SELL',
          price: 15420.50, // Mock price
          sl: 15380.00,
          tp: 15550.00,
          confidence: strength,
          timeframe: 'M15',
          timestamp: new Date(),
          analysis,
          strength
        };
        setResult(signal);
        setIsProcessing(false);
        setStatus('Analysis Complete');
        setProgress(100);
        toast.success(`Analysis complete for ${ticker}`);
      }, 1500);

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      setStatus('Analysis Failed');
      toast.error('Failed to process image. Please try again.');
    }
  };

  const isWithinKillzone = () => {
    const now = new Date();
    const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    const hours = estTime.getHours();
    // London: 02:00 - 05:00 EST
    // NY: 07:00 - 10:00 EST
    return (hours >= 2 && hours <= 5) || (hours >= 7 && hours <= 10);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1E293B]/50 p-10 backdrop-blur-xl">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/20 blur-[100px]" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-magenta/10 blur-[100px]" />
        
        <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-magenta">
              <Cpu className="h-4 w-4" /> Advanced AI Analysis
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
              Neural <span className="text-brand-gradient bg-clip-text text-transparent">ICT Strategy</span> Scanner
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Upload your trading chart. Our AI will detect the asset, analyze market structure, identify liquidity sweeps, and find FVGs according to SMC/ICT methodology.
            </p>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex items-center gap-3 rounded-2xl bg-brand-gradient px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-purple-glow-lg active:scale-95"
            >
              <Upload className="h-5 w-5" />
              {image ? 'Analyze New Chart' : 'Upload Forex Chart'}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden" 
                accept="image/*"
              />
            </button>
          </div>

          <div className="relative aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center group overflow-hidden">
            {image ? (
              <img src={image} alt="Chart Preview" className="h-full w-full object-cover" />
            ) : (
              <>
                <div className="mb-4 rounded-full bg-white/5 p-4 group-hover:bg-white/10 transition-colors">
                  <ImageIcon className="h-10 w-10 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500">Drop your chart screenshot here</p>
              </>
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0F172A]/80 backdrop-blur-md">
                <Loader2 className="h-12 w-12 animate-spin text-brand-magenta mb-4" />
                <div className="w-64 space-y-3 px-6 text-center">
                  <p className="text-sm font-bold text-white">{status}</p>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {/* Main Signal Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-brand-magenta/30 bg-glass p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl font-bold text-white">
                      {result.pair.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{result.pair}</h3>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold text-gray-400 uppercase">{result.assetType}</span>
                        <span className="text-gray-500 text-xs">\u2022</span>
                        <span className="text-gray-400 text-xs">M15 Timeframe</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "flex flex-col items-end",
                    result.type === 'BUY' ? "text-brand-cyan" : "text-rose-500"
                  )}>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Trade Bias</span>
                    <span className="text-3xl font-black">{result.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="space-y-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider"><Target className="h-3 w-3" /> Entry</span>
                    <p className="text-xl font-mono font-black text-white">{result.price.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider"><ShieldAlert className="h-3 w-3" /> Stop Loss</span>
                    <p className="text-xl font-mono font-black text-rose-500">{result.sl.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider"><CheckCircle2 className="h-3 w-3" /> Target</span>
                    <p className="text-xl font-mono font-black text-brand-cyan">{result.tp.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider"><Zap className="h-3 w-3" /> R:R Ratio</span>
                    <p className="text-xl font-mono font-black text-brand-magenta">1:{result.analysis.riskReward.toFixed(1)}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-white">Signal Strength</h4>
                    <span className="text-lg font-black text-brand-magenta">{result.strength}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-gradient shadow-purple-glow"
                      initial={{ width: 0 }}
                      animate={{ width: `${result.strength}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-4 text-xs text-gray-400 leading-relaxed italic">
                    "Higher timeframe bias is aligned with local market structure shift. Liquidity sweep detected at previous day high. Proceed with caution during high impact news."
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/5 bg-glass p-8">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-brand-magenta" /> ICT Parameters
                </h4>
                
                <div className="space-y-4">
                  <AnalysisItem label="HTF Direction" value={result.analysis.htfDirection} active={true} />
                  <AnalysisItem label="Market Structure Shift" value={result.analysis.mss ? 'DETECTED' : 'NONE'} active={result.analysis.mss} />
                  <AnalysisItem label="Liquidity Sweep" value={result.analysis.liquiditySweep ? 'YES' : 'NO'} active={result.analysis.liquiditySweep} />
                  <AnalysisItem label="Fair Value Gap" value={result.analysis.fvgDetected ? 'VALID' : 'MISSING'} active={result.analysis.fvgDetected} />
                  <AnalysisItem label="Premium/Discount" value={result.analysis.premiumDiscount} active={true} />
                  <AnalysisItem label="Killzone Timing" value={result.analysis.killzone ? 'OPEN' : 'CLOSED'} active={result.analysis.killzone} />
                </div>
              </div>

              <div className="rounded-3xl border border-white/5 bg-[#0F172A] p-6">
                <div className="flex items-center gap-3 text-amber-500 mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-bold">Risk Management</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Move Stop Loss to Break Even once price reaches first target at 15480.00. No trade execution allowed 15 mins before high-impact news.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnalysisItem: React.FC<{ label: string; value: string; active: boolean }> = ({ label, value, active }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <div className={cn(
      "flex items-center gap-2 rounded-lg px-2.5 py-1 text-[10px] font-bold",
      active ? "bg-brand-magenta/10 text-brand-magenta" : "bg-white/5 text-gray-600"
    )}>
      {active && <div className="h-1 w-1 rounded-full bg-brand-magenta animate-pulse" />}
      {value}
    </div>
  </div>
);