import React from 'react';
import {
  Camera,
  ShieldCheck,
  Search,
  BookOpen,
  History,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  FileText,
  Database,
  RefreshCw,
  ExternalLink,
  SplitSquareHorizontal,
  Microscope,
  Cpu,
  Radio,
  ScanLine,
  Activity,
  Fingerprint,
  Flame,
  ArrowUpRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { MedicineSpec, CounterfeitAlert } from '../types/pharmacy';

interface HomeScreenProps {
  onStartScan: () => void;
  onOpenDatabase: () => void;
  onOpenBatchVerifier: () => void;
  onOpenAlerts: () => void;
  onOpenHistory: () => void;
  onOpenAbout: () => void;
  onOpenTrueMedStudio?: () => void;
  onOpenForensicLab?: () => void;
  onOpenChat?: () => void;
  onSyncFirestore?: () => void;
  isSeedingDb?: boolean;
  medicines: MedicineSpec[];
  alerts: CounterfeitAlert[];
  historyCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartScan,
  onOpenDatabase,
  onOpenBatchVerifier,
  onOpenAlerts,
  onOpenHistory,
  onOpenAbout,
  onOpenTrueMedStudio,
  onOpenForensicLab,
  onOpenChat,
  onSyncFirestore,
  isSeedingDb,
  medicines,
  alerts,
  historyCount
}) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* High-Tech Medical Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-teal-800/40">
        {/* Subtle Geometric Glow Effects */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-900/80 border border-teal-600/60 px-3.5 py-1.5 rounded-full text-xs font-bold text-teal-200 shadow-inner backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono tracking-wide">CDSCO / US FDA Monograph Engine</span>
              <span className="text-teal-400/60">•</span>
              <span className="text-emerald-300 font-extrabold">{medicines.length} Indexed Drugs</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans">
              Precision AI Counterfeit <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-100">
                Medicine Verification
              </span>
            </h1>

            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-xl">
              Instant physical packaging verification, TrueMed® vector discrepancy loupe, 45° optical variable ink simulation, and ghost batch duplication detection on your smartphone.
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartScan}
                className="px-6 py-3.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-teal-950/60 flex items-center gap-2.5 transition-all transform active:scale-95 hover:shadow-teal-400/25 cursor-pointer"
              >
                <Camera className="w-5 h-5 text-slate-950" />
                <span>Launch Camera Scanner</span>
                <ArrowRight className="w-4 h-4 text-slate-950 ml-1" />
              </button>

              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="px-4 py-3.5 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/50 text-white text-xs font-bold rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-200 animate-pulse" />
                  <span>Ask AI Pharmacist</span>
                </button>
              )}

              {onOpenTrueMedStudio && (
                <button
                  onClick={onOpenTrueMedStudio}
                  className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-teal-500/50 text-teal-200 text-xs font-bold rounded-2xl backdrop-blur-md transition-all flex items-center gap-2 shadow-lg cursor-pointer hover:border-teal-400"
                >
                  <SplitSquareHorizontal className="w-4 h-4 text-teal-400" />
                  <span>TrueMed® Studio</span>
                </button>
              )}

              {onOpenForensicLab && (
                <button
                  onClick={onOpenForensicLab}
                  className="px-4 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold rounded-2xl backdrop-blur-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Microscope className="w-4 h-4 text-teal-300" />
                  <span>Anti-Clone Lab</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Live Telemetry Card */}
          <div className="bg-slate-900/90 border border-teal-700/50 rounded-2xl p-5 backdrop-blur-xl shrink-0 w-full lg:w-72 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                Live Telemetry
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                Online
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Database Models:</span>
                <span className="text-white font-bold">{medicines.length} Standard SKUs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Active Recall Alerts:</span>
                <span className="text-rose-400 font-bold">{alerts.length} Flagged Batches</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Verified Field Scans:</span>
                <span className="text-teal-300 font-bold">{historyCount} Records</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">TrueMed Engine:</span>
                <span className="text-emerald-400 font-bold">Active (0.05pt Δ)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={onOpenBatchVerifier}
                className="w-full py-2 bg-teal-950 hover:bg-teal-900 border border-teal-800/80 text-teal-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Verify Batch Number</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-Step Process Flow Strip */}
        <div className="relative z-10 mt-8 pt-6 border-t border-teal-800/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-slate-900/60 border border-teal-800/40 rounded-2xl p-3.5 text-left flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-500/30">
              01
            </div>
            <div>
              <div className="text-xs font-bold text-white">Capture Packaging Scan</div>
              <div className="text-[11px] text-teal-200/70 mt-0.5">Box, blister foil, imprint or batch code</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-teal-800/40 rounded-2xl p-3.5 text-left flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-500/30">
              02
            </div>
            <div>
              <div className="text-xs font-bold text-white">AI Discrepancy & OCR</div>
              <div className="text-[11px] text-teal-200/70 mt-0.5">Sub-0.05pt vector typography & deboss depth</div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-teal-800/40 rounded-2xl p-3.5 text-left flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-500/30">
              03
            </div>
            <div>
              <div className="text-xs font-bold text-white">Explainable Authenticity Dossier</div>
              <div className="text-[11px] text-teal-200/70 mt-0.5">Instant recall matching & digital security pass</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Database Status Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900">
                Real-Time Firestore Database Synchronized
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Live collections: <strong>{medicines.length} verified monographs</strong> (Sertraline, Lithosun, Paracetamol, etc.) • <strong>{alerts.length} recall bulletins</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onSyncFirestore && (
            <button
              onClick={onSyncFirestore}
              disabled={isSeedingDb}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSeedingDb ? 'animate-spin' : ''}`} />
              <span>{isSeedingDb ? 'Syncing...' : 'Resync Database'}</span>
            </button>
          )}

          <button
            onClick={onOpenDatabase}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explore All {medicines.length}</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>

      {/* 4 Core Intelligence Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Module 1: TrueMed Discrepancy Studio */}
        <div
          onClick={onOpenTrueMedStudio || onStartScan}
          className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 hover:border-teal-400 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 group-hover:bg-teal-400 group-hover:text-slate-950 transition-all flex items-center justify-center">
              <SplitSquareHorizontal className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-white group-hover:text-teal-300 transition-colors">
                TrueMed® Studio
              </h3>
              <span className="text-[10px] font-mono uppercase bg-teal-500/30 text-teal-300 px-2 py-0.5 rounded-full font-bold">
                AI Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive split-slider & thermal delta heatmap comparing original master vector artwork against scanned physical specimens.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:text-teal-300">
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Module 2: Anti-Clone Forensic Lab */}
        <div
          onClick={onOpenForensicLab || onStartScan}
          className="bg-white border border-slate-200 hover:border-teal-500 p-6 rounded-3xl shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 group-hover:bg-emerald-700 group-hover:text-white transition-all flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                Anti-Clone Lab
              </h3>
              <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                45° Tilt
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              3D deboss punch depth gauge, 10x microscopic font loupe, OVI color-shift tilt simulator, and cloud duplicate radar.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Enter Forensic Lab</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Module 3: 20-Drug Monograph Explorer */}
        <div
          onClick={onOpenDatabase}
          className="bg-white border border-slate-200 hover:border-blue-500 p-6 rounded-3xl shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200 group-hover:bg-blue-700 group-hover:text-white transition-all flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-800 transition-colors">
                Monograph Library
              </h3>
              <span className="text-[10px] font-mono uppercase bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full font-bold">
                {medicines.length} SKUs
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full pharmaceutical monographs with genuine blister foil patterns, deboss punch codes, and batch numbering regex standards.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>Browse Monographs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Module 4: Regulatory Recall Feed */}
        <div
          onClick={onOpenAlerts}
          className="bg-white border border-slate-200 hover:border-rose-500 p-6 rounded-3xl shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 group-hover:bg-rose-700 group-hover:text-white transition-all flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-rose-800 transition-colors">
                Seizure Feed
              </h3>
              <span className="text-[10px] font-mono uppercase bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                {alerts.length} Alerts
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Live seizure bulletins from CDSCO, US FDA MedWatch, and WHO global counterfeit tracking notifications.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
            <span>View Recall Alerts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Pre-Loaded Specimen Fast Jump */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-teal-400" />
              <span>Quick Forensic Specimen Test Bench</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any sample specimen to simulate instant optical analysis against verified monographs.
            </p>
          </div>
          <button
            onClick={onStartScan}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl self-start sm:self-auto transition-colors cursor-pointer"
          >
            Custom Camera Scan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {medicines.slice(0, 3).map((med) => (
            <div
              key={med.id}
              onClick={onOpenDatabase}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500 transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded border border-teal-700">
                  {med.medicineId || med.id}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {med.strength}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                {med.medicineName}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                {med.genericName}
              </p>
              <div className="pt-2 text-[11px] text-teal-400 flex items-center justify-between font-mono">
                <span>Imprint: {med.pill.imprintFront}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
