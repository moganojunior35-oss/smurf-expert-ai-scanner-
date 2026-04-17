import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, Percent } from 'lucide-react';
import { AccountStats } from '../types';
import { motion } from 'framer-motion';

interface StatsGridProps {
  stats: AccountStats;
}

const colorMap = {
  amber: 'bg-amber-500/10 text-amber-500',
  blue: 'bg-blue-500/10 text-blue-500',
  green: 'bg-[#00FF9C]/10 text-[#00FF9C]',
  purple: 'bg-[#8A2BE2]/10 text-[#FF00FF]',
};

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Current Balance',
      value: `$${stats.balance.toLocaleString()}`,
      change: '+2.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'amber' as const
    },
    {
      title: 'Active Equity',
      value: `$${stats.equity.toLocaleString()}`,
      change: '+4.1%',
      isPositive: true,
      icon: Activity,
      color: 'blue' as const
    },
    {
      title: "Today's Profit",
      value: `$${stats.todayProfit.toLocaleString()}`,
      change: '+$142.40',
      isPositive: true,
      icon: ArrowUpRight,
      color: 'green' as const
    },
    {
      title: 'Total Returns',
      value: `$${stats.totalProfit.toLocaleString()}`,
      change: '25.4%',
      isPositive: true,
      icon: Percent,
      color: 'purple' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 group hover:border-[#FF00FF]/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${colorMap[card.color]}`}>
              <card.icon className="h-6 w-6" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${card.isPositive ? 'text-[#00FF9C]' : 'text-rose-500'}`}>
              {card.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {card.change}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-400">{card.title}</p>
            <h3 className="text-2xl font-black text-white mt-1">{card.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};