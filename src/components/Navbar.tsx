import React from 'react';
import {
  ShieldCheck,
  Camera,
  History,
  BookOpen,
  Search,
  BellRing,
  Info,
  Download,
  CheckCircle2,
  Database,
  Radio,
  Microscope,
  SplitSquareHorizontal,
  Bot,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export type AppTab = 'home' | 'scanner' | 'history' | 'database' | 'batch' | 'alerts' | 'about' | 'forensic' | 'truemed' | 'chat';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  alertCount: number;
  historyCount: number;
  onOpenInstallModal: () => void;
  isInstalled: boolean;
  isDbConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  alertCount,
  historyCount,
  onOpenInstallModal,
  isInstalled,
  isDbConnected = true
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Subtitle */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-800 to-teal-600 flex items-center justify-center text-white shadow-sm ring-2 ring-teal-100 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg font-sans">
                  MedVerify <span className="text-teal-700">AI</span>
                </span>
                <span className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
                AI-Powered Medicine Verification
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-teal-700 text-white shadow-2xs font-bold'
                  : 'text-slate-700 hover:bg-teal-50 hover:text-teal-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Medicine</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-xs font-black ring-1 ring-teal-400'
                  : 'text-teal-900 bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200/70 font-bold'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
              <span>AI Chatbot</span>
              <span className="text-[9px] bg-teal-950/80 text-teal-200 px-1.5 py-0.2 rounded-full font-bold">
                Assistant
              </span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Database (20)</span>
            </button>

            <button
              onClick={() => setActiveTab('truemed')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'truemed'
                  ? 'bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <SplitSquareHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span>TrueMed® Studio</span>
              <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                AI
              </span>
            </button>

            <button
              onClick={() => setActiveTab('forensic')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'forensic'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Microscope className="w-3.5 h-3.5 text-teal-700" />
              <span>Anti-Clone Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Batch Verifier</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 relative cursor-pointer ${
                activeTab === 'alerts'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>Alerts</span>
              {alertCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-rose-100 text-rose-700 rounded-full text-[10px] font-bold">
                  {alertCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 relative cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-teal-100 text-teal-800 rounded-full text-[10px] font-bold">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action: Real-Time DB status & Download PWA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className="lg:hidden p-2 bg-teal-700 text-white rounded-xl shadow-xs flex items-center gap-1 text-xs font-bold"
            >
              <Bot className="w-4 h-4" />
              <span>AI Chat</span>
            </button>

            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] font-semibold text-emerald-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Database className="w-3 h-3 text-emerald-600" />
              <span>Firestore Active</span>
            </div>

            {!isInstalled ? (
              <button
                onClick={onOpenInstallModal}
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download App</span>
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Installed</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-semibold ${
            activeTab === 'home' ? 'text-teal-800 font-bold' : 'text-slate-500'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-bold ${
            activeTab === 'scanner'
              ? 'text-teal-800'
              : 'text-slate-700'
          }`}
        >
          <div className="p-1 bg-teal-700 text-white rounded-full -mt-3 shadow-md">
            <Camera className="w-4 h-4" />
          </div>
          <span>Scan</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-semibold ${
            activeTab === 'chat' ? 'text-teal-800 font-bold' : 'text-slate-500'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-semibold ${
            activeTab === 'database' ? 'text-teal-800 font-bold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Database</span>
        </button>

        <button
          onClick={() => setActiveTab('truemed')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-semibold ${
            activeTab === 'truemed' ? 'text-teal-800 font-bold' : 'text-slate-500'
          }`}
        >
          <SplitSquareHorizontal className="w-4 h-4" />
          <span>TrueMed</span>
        </button>
      </div>
    </header>
  );
};
