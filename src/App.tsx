import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AIScanner } from './components/AIScanner';
import { RobotControls } from './components/RobotControls';
import { Toaster } from './components/ui/sonner';
import { Search, Bell, Settings as SettingsIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 antialiased selection:bg-brand-magenta/30 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <main className="lg:pl-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/5 bg-[#0F172A]/80 px-6 backdrop-blur-xl lg:px-10">
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-4 py-2 w-96">
              <Search className="h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search pairs or ticker specs..." 
                className="bg-transparent border-none text-sm focus:ring-0 p-0 w-full placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-magenta ring-2 ring-[#0F172A]" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <SettingsIcon className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white group-hover:text-brand-magenta transition-colors">Premium User</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Neural Access</p>
              </div>
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/2b6f6d79-b8fd-44be-b284-079daa21acf9/user-avatar-24026382-1776446353663.webp" 
                alt="Profile" 
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-brand-magenta/50 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
          {activeTab === 'scanner' && <AIScanner />}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">Scanner Configurations</h1>
                <p className="text-gray-400">Adjust AI sensitivity and strategy parameters.</p>
              </div>
              <RobotControls />
            </div>
          )}
        </div>
      </main>
      <Toaster position="bottom-right" theme="dark" closeButton />
    </div>
  );
}

export default App;