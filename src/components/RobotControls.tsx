import React, { useState } from 'react';
import { Settings, Shield, Play, Pause, AlertCircle } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { toast } from 'sonner';

export const RobotControls: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [risk, setRisk] = useState([2]);

  const toggleRobot = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast.success('Neural Robot Engaged', {
        description: 'Auto-trading is now active based on AI Scanner signals.',
        className: 'bg-white/[0.03] backdrop-blur-md border-[#00FF9C]/30 text-white'
      });
    } else {
      toast.info('Neural Robot Disengaged', {
        description: 'Automated trading has been paused.',
        className: 'bg-white/[0.03] backdrop-blur-md border-[#FF00FF]/30 text-white'
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8A2BE2]/10 border border-[#8A2BE2]/20 shadow-[0_0_15px_rgba(138,43,226,0.3)]">
              <Settings className="h-6 w-6 text-[#FF00FF]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Bot Management</h3>
              <p className="text-sm text-gray-400 font-medium">Master controls for automation</p>
            </div>
          </div>
          <button 
            onClick={toggleRobot}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${
              isActive 
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                : 'bg-[linear-gradient(135deg,#8A2BE2,#FF00FF)] text-white shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:shadow-[0_0_30px_rgba(138,43,226,0.7)] hover:scale-105'
            }`}
          >
            {isActive ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
            {isActive ? 'Stop Robot' : 'Start Robot'}
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#FF00FF]/20 transition-colors">
            <div className="space-y-1">
              <p className="text-sm font-black text-white uppercase tracking-wider">AI Mode</p>
              <p className="text-xs text-gray-500 font-medium">Enable advanced neural pattern matching</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#FF00FF]/20 transition-colors">
            <div className="space-y-1">
              <p className="text-sm font-black text-white uppercase tracking-wider">Trailing Stop</p>
              <p className="text-xs text-gray-500 font-medium">Auto-adjust stop loss to lock in profits</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#FF00FF]/20 transition-colors">
            <div className="space-y-1">
              <p className="text-sm font-black text-white uppercase tracking-wider">News Filter</p>
              <p className="text-xs text-gray-500 font-medium">Avoid trading during high-impact news</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 p-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8A2BE2]/10 border border-[#8A2BE2]/20 shadow-[0_0_15px_rgba(138,43,226,0.3)]">
            <Shield className="h-6 w-6 text-[#FF00FF]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Risk Management</h3>
            <p className="text-sm text-gray-400 font-medium">Configure safety parameters</p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-gray-300 uppercase tracking-widest">Lot Size Multiplier</span>
              <span className="text-lg font-mono text-[#FF00FF] font-black">x{(risk[0] * 0.5).toFixed(1)}</span>
            </div>
            <Slider 
              value={risk} 
              onValueChange={setRisk} 
              max={10} 
              step={1} 
              className="py-4"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-black uppercase tracking-widest">
              <span>Conservative</span>
              <span>Moderate</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#8A2BE2]/10 border border-[#8A2BE2]/20 flex gap-4">
            <AlertCircle className="h-6 w-6 text-[#FF00FF] shrink-0" />
            <p className="text-xs text-[#FF00FF] font-bold leading-relaxed">
              Based on your current balance of <span className="text-white font-black">$12,540.50</span>, a moderate risk setting of x1.0 will allocate approximately $250 per trade with a 2% max drawdown.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Max Daily Loss</span>
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-white font-black">$</span>
                <input 
                  type="text" 
                  defaultValue="500.00" 
                  className="bg-transparent border-none text-white font-mono font-black focus:ring-0 p-0 w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Daily Goal</span>
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="text-white font-black">$</span>
                <input 
                  type="text" 
                  defaultValue="1200.00" 
                  className="bg-transparent border-none text-white font-mono font-black focus:ring-0 p-0 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};