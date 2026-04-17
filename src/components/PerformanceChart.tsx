import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: '08:00', value: 12100 },
  { name: '10:00', value: 12250 },
  { name: '12:00', value: 12180 },
  { name: '14:00', value: 12400 },
  { name: '16:00', value: 12320 },
  { name: '18:00', value: 12540 },
  { name: '20:00', value: 12480 },
  { name: '22:00', value: 12540 },
];

export const PerformanceChart: React.FC = () => {
  return (
    <div className="h-[400px] w-full rounded-2xl border border-white/5 bg-glass p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Account Growth</h3>
          <p className="text-sm text-gray-400">Live performance tracking over 24h</p>
        </div>
        <div className="flex gap-2">
          {['1D', '1W', '1M', 'ALL'].map((range) => (
            <button
              key={range}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                range === '1D' ? 'bg-brand-gradient text-white shadow-purple-glow' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FF00FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            hide
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1E293B', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', 
              fontSize: '12px', 
              color: '#fff' 
            }}
            itemStyle={{ color: '#FF00FF' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#FF00FF" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};