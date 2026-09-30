import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { VerificationReport, CommunityReport } from '../types/pharmacy';
import { playBeep } from '../utils/audio';

interface ReportCounterfeitModalProps {
  initialReport?: VerificationReport | null;
  onClose: () => void;
  onSubmitSuccess: (newReport: CommunityReport) => void;
}

export const ReportCounterfeitModal: React.FC<ReportCounterfeitModalProps> = ({
  initialReport,
  onClose,
  onSubmitSuccess
}) => {
  const [medicineName, setMedicineName] = useState<string>(
    initialReport?.detectedMedicine?.name || 'Sertraline 50 mg'
  );
  const [batchNumber, setBatchNumber] = useState<string>(
    initialReport?.extractedData?.batchNumber || 'FL8921X'
  );
  const [pharmacyName, setPharmacyName] = useState<string>('City Wellness Pharmacy');
  const [location, setLocation] = useState<string>('Sector 4, Main Market');
  const [notes, setNotes] = useState<string>(
    initialReport?.overallVerdict ||
      'Suspicious packaging observed: blurry text, unreadable batch embossing, and lack of genuine security seal shift.'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playBeep('scan');

    try {
      const payload = {
        medicineName,
        batchNumber,
        pharmacyName,
        location,
        notes,
        riskRating: initialReport ? initialReport.confidenceMetrics.overallConfidence : 90
      };

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        playBeep('success');
        setTimeout(() => {
          onSubmitSuccess(data.data);
          onClose();
        }, 1000);
      }
    } catch (err) {
      console.error('Report error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Report Suspect Medicine Batch</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Incident Report Logged</h3>
            <p className="text-xs text-slate-600">
              The batch and vendor details have been added to the community vigilance registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-800 font-semibold mb-1">Medicine Name & Strength:</label>
              <input
                type="text"
                required
                value={medicineName}
                onChange={e => setMedicineName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-800 font-semibold mb-1">Batch Code on Strip:</label>
                <input
                  type="text"
                  required
                  value={batchNumber}
                  onChange={e => setBatchNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono uppercase"
                />
              </div>
              <div>
                <label className="block text-slate-800 font-semibold mb-1">Pharmacy / Vendor Name:</label>
                <input
                  type="text"
                  required
                  value={pharmacyName}
                  onChange={e => setPharmacyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-800 font-semibold mb-1">Location / City:</label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-800 font-semibold mb-1">Observed Defects & Notes:</label>
              <textarea
                rows={3}
                required
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-xl flex items-center gap-2 disabled:opacity-50 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Incident'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
