import React from 'react';
import { Trash2, Camera, ShieldCheck, AlertTriangle, HelpCircle, Calendar, ArrowRight } from 'lucide-react';
import { VerificationStatus } from '../types/pharmacy';

export interface ScannedHistoryItem {
  id: string;
  timestamp: string;
  medicineName: string;
  genericName: string;
  detectedManufacturer?: string;
  strength?: string;
  batchNumber: string;
  verificationStatus: VerificationStatus;
  confidenceScores?: {
    overallConfidence: number;
    ocrConfidence?: number;
    packageSimilarity?: number;
  };
  imageThumbnail: string;
  overallSummary: string;
}

interface ScannedHistoryViewProps {
  history: ScannedHistoryItem[];
  onSelectReport: (item: ScannedHistoryItem) => void;
  onClearHistory: () => void;
  onOpenScanner: () => void;
}

export const ScannedHistoryView: React.FC<ScannedHistoryViewProps> = ({
  history,
  onSelectReport,
  onClearHistory,
  onOpenScanner
}) => {
  return (
    <div className="space-y-5 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Scanned Medicine Ledger
            </h2>
            <span className="px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold rounded-full">
              {history.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Historical logs of all smartphone captures, OCR readings, and database verification dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Ledger</span>
            </button>
          )}

          <button
            onClick={onOpenScanner}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Medicine</span>
          </button>
        </div>
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <Camera className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Scans Recorded Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Point your smartphone camera at any medicine packaging or blister strip (e.g., Sertraline, Lithosun) to generate an explainable verification report.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenScanner}
              className="px-5 py-2.5 bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Open Camera Scanner
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map(item => {
            const isVerified = item.verificationStatus === 'VERIFIED_AGAINST_AVAILABLE_DATA';
            const isSuspicious = item.verificationStatus === 'SUSPICIOUS_REQUIRES_VERIFICATION';

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isVerified
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : isSuspicious
                          ? 'bg-amber-100 text-amber-950 border-amber-300'
                          : 'bg-slate-100 text-slate-800 border-slate-300'
                      }`}
                    >
                      {isVerified ? 'VERIFIED' : isSuspicious ? 'SUSPICIOUS' : 'UNVERIFIED'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden mb-3 flex items-center justify-center border border-slate-200">
                    <img
                      src={item.imageThumbnail}
                      alt={item.medicineName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {item.medicineName}
                  </h4>
                  <p className="text-xs text-teal-800 font-semibold font-mono">
                    {item.genericName}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.overallSummary}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                  <span>Batch: <strong className="text-slate-900">{item.batchNumber}</strong></span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.confidenceScores?.overallConfidence || 90}% Match
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
