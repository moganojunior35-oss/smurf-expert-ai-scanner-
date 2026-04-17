import React from 'react';
import { 
  Cpu, 
  Settings, 
  Wallet,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { NavItem } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems: NavItem[] = [
  { id: 'scanner', title: 'Neural Scanner', icon: Cpu },
  { id: 'settings', title: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <>
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 border-r border-white/5 bg-[#0F172A] transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-purple-glow">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase italic">Neural<span className="text-brand-magenta">X</span></span>
          </div>
        </div>

        <nav className="mt-10 space-y-2 px-4">
          <div className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            Core Interface
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300",
                activeTab === item.id 
                  ? "bg-brand-purple/10 text-brand-magenta shadow-[inset_0_0_0_1px_rgba(255,0,255,0.2)]" 
                  : "text-gray-500 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5", activeTab === item.id ? "text-brand-magenta" : "text-gray-500")} />
              {item.title}
              {activeTab === item.id && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-magenta shadow-purple-glow" />
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <div className="mb-6 px-4">
            <div className="flex items-center gap-2 text-brand-cyan mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-wider">System Secured</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/5">
              <div className="h-full w-2/3 bg-brand-cyan rounded-full" />
            </div>
          </div>

          <div className="rounded-2xl bg-brand-gradient p-5 shadow-purple-glow-lg transition-transform hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2 opacity-80">
              <div className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">Net Equity</span>
            </div>
            <p className="text-2xl font-black text-white">$12,540<span className="text-sm opacity-60">.50</span></p>
          </div>
        </div>
      </aside>
    </>
  );
};