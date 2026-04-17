import React from 'react';
import { Trade } from '../types';
import { cn } from '../lib/utils';
import { ArrowUpRight, ArrowDownRight, Clock, ExternalLink } from 'lucide-react';

interface TradeTableProps {
  trades: Trade[];
}

export const TradeTable: React.FC<TradeTableProps> = ({ trades }) => {
  return (
    <div className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 overflow-hidden">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">Recent Trade Activity</h3>
          <p className="text-sm text-gray-400 font-medium">Detailed log of bot and manual executions</p>
        </div>
        <button className="text-xs font-black text-[#FF00FF] hover:text-[#8A2BE2] transition-all flex items-center gap-2 uppercase tracking-widest">
          Export Data <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Asset Pair</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Type</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Entry/Exit</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Profit/Loss</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-white/[0.04] transition-colors group">
                <td className="px-8 py-5">
                  <div className="font-black text-white text-lg">{trade.pair}</div>
                </td>
                <td className="px-8 py-5">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                    trade.type === 'BUY' ? "text-[#00FF9C] bg-[#00FF9C]/10 border border-[#00FF9C]/20" : "text-rose-500 bg-rose-500/10 border border-rose-500/20"
                  )}>
                    {trade.type === 'BUY' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {trade.type}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="text-sm font-mono font-bold text-gray-300">
                    {trade.entry.toFixed(4)} <span className="text-gray-600 mx-2 text-xs">\u27A1</span> {trade.exit?.toFixed(4) || '---'}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className={cn(
                    "font-black font-mono text-lg",
                    trade.profit >= 0 ? "text-[#00FF9C]" : "text-rose-500"
                  )}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USD
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    trade.status === 'OPEN' ? "text-[#FF00FF] animate-pulse" : "text-gray-600"
                  )}>
                    {trade.status}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                    <Clock className="h-4 w-4" />
                    {new Date(trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};