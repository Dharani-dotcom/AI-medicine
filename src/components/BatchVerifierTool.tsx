import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, AlertCircle, RefreshCw, ShieldCheck, AlertTriangle } from 'lucide-react';
import { MedicineSpec, CounterfeitAlert } from '../types/pharmacy';
import { playBeep } from '../utils/audio';

interface BatchVerifierToolProps {
  medicines: MedicineSpec[];
  alerts: CounterfeitAlert[];
}

export const BatchVerifierTool: React.FC<BatchVerifierToolProps> = ({ medicines, alerts }) => {
  const [batchInput, setBatchInput] = useState<string>('FL8921');
  const [selectedMedId, setSelectedMedId] = useState<string>('sertraline-50');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<{
    batchNumber: string;
    isValidAlgorithm: boolean;
    isFlaggedInAlert?: boolean;
    isKnownCounterfeit?: boolean;
    matchingAlerts: CounterfeitAlert[];
    details: string;
  } | null>(null);

  const selectedMed = medicines.find(m => m.id === selectedMedId || m.medicineId === selectedMedId);

  const handleVerify = async () => {
    if (!batchInput.trim()) return;
    setIsVerifying(true);
    playBeep('scan');

    try {
      const res = await fetch('/api/verify-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchNumber: batchInput.trim(),
          medicineId: selectedMedId || undefined
        })
      });

      const data = await res.json();
      if (data.success) {
        setVerificationResult(data);
        if (data.isFlaggedInAlert || data.isKnownCounterfeit) {
          playBeep('alert');
        } else if (data.isValidAlgorithm) {
          playBeep('success');
        }
      }
    } catch (err) {
      console.error('Batch verify error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900">
            Pharmaceutical Batch & Lot Code Verifier
          </h2>
          <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Recall Database Cross-Check
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Type or scan a batch number stamped on the medicine blister foil or box flap to verify syntax structure and regulatory seizure notices.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              Select Medicine Monograph:
            </label>
            <select
              value={selectedMedId}
              onChange={e => {
                setSelectedMedId(e.target.value);
                const match = medicines.find(m => m.id === e.target.value);
                if (match) {
                  setBatchInput(match.batchRules.exampleBatch);
                }
              }}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              {medicines.map(m => (
                <option key={m.id} value={m.id}>
                  {m.medicineName} ({m.manufacturer})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
              Enter Stamped Batch / Lot Code:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={batchInput}
                onChange={e => setBatchInput(e.target.value.toUpperCase())}
                placeholder="e.g. FL8921, SUN29841B"
                className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-teal-600 font-bold"
              />
              <button
                onClick={handleVerify}
                disabled={isVerifying || !batchInput.trim()}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs disabled:opacity-50 transition-transform active:scale-95"
              >
                {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Verify</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Med Rule Preview */}
        {selectedMed && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Expected Syntax Regex: <strong className="text-slate-900">{selectedMed.batchRules.formatRegex}</strong></span>
              <span>Shelf Life: <strong className="text-slate-900">{selectedMed.batchRules.shelfLifeMonths} Months</strong></span>
            </div>
            <p className="text-[11px] text-slate-600">
              Authorized Example: <strong className="text-teal-800">{selectedMed.batchRules.exampleBatch}</strong> • GTIN: <strong className="text-slate-800">{selectedMed.batchRules.gtinCode}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Verification Result Card */}
      {verificationResult && (
        <div
          className={`border-2 rounded-2xl p-5 shadow-xs space-y-3 ${
            verificationResult.isFlaggedInAlert || verificationResult.isKnownCounterfeit
              ? 'bg-amber-50/90 border-amber-300 text-amber-950'
              : verificationResult.isValidAlgorithm
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-slate-50 border-slate-300 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            {verificationResult.isFlaggedInAlert || verificationResult.isKnownCounterfeit ? (
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            ) : verificationResult.isValidAlgorithm ? (
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-slate-500 shrink-0" />
            )}
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
                verificationResult.isFlaggedInAlert || verificationResult.isKnownCounterfeit
                  ? 'bg-amber-200 text-amber-950 border border-amber-400'
                  : 'bg-emerald-200 text-emerald-950 border border-emerald-400'
              }`}>
                {verificationResult.isFlaggedInAlert || verificationResult.isKnownCounterfeit
                  ? 'SUSPICIOUS / FLAG IN RECALL BULLETIN'
                  : 'BATCH SYNTAX VERIFIED'}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">
                Batch Code: {verificationResult.batchNumber}
              </h3>
            </div>
          </div>

          <p className="text-xs leading-relaxed pt-2 border-t border-slate-200/70 font-medium">
            {verificationResult.details}
          </p>

          {verificationResult.matchingAlerts?.length > 0 && (
            <div className="mt-3 p-3.5 bg-white rounded-xl border border-amber-300 space-y-1.5 text-xs text-amber-950 shadow-xs">
              <span className="font-bold text-amber-900 uppercase text-[10px]">Active Seizure / Recall Notice:</span>
              {verificationResult.matchingAlerts.map(alert => (
                <div key={alert.id} className="pt-1">
                  <p className="font-bold text-slate-900">{alert.title} ({alert.source})</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{alert.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
