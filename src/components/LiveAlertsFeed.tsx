import React, { useState } from 'react';
import { AlertCircle, PlusCircle, Search } from 'lucide-react';
import { CounterfeitAlert, CommunityReport } from '../types/pharmacy';

interface LiveAlertsFeedProps {
  alerts: CounterfeitAlert[];
  communityReports: CommunityReport[];
  onOpenReportModal: () => void;
}

export const LiveAlertsFeed: React.FC<LiveAlertsFeedProps> = ({
  alerts,
  communityReports,
  onOpenReportModal
}) => {
  const [activeTab, setActiveTab] = useState<'regulatory' | 'community'>('regulatory');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAlerts = alerts.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.affectedBatches.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredReports = communityReports.filter(r =>
    r.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Counterfeit Medicine Alerts & Recall Bulletins
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Official alerts from CDSCO, US FDA MedWatch, WHO, and user-reported incidents.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-3.5 py-1.5 bg-rose-700 hover:bg-rose-600 text-white rounded text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Report Suspicious Batch</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-white p-1 rounded border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('regulatory')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'regulatory' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Regulatory Seizures & Recalls ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'community' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reported Incident Log ({communityReports.length})
          </button>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search alerts, batch, drug..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded pl-8 pr-3 py-2 focus:outline-none focus:border-teal-600 shadow-xs"
          />
        </div>
      </div>

      {/* List */}
      {activeTab === 'regulatory' && (
        <div className="space-y-3">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className="bg-white border border-slate-200 rounded-lg p-4 space-y-2.5 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      alert.alertLevel === 'RED_ALERT'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {alert.alertLevel.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-teal-800 font-semibold font-mono">Source: {alert.source}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">{alert.date}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
              <p className="text-xs text-slate-700 leading-relaxed">{alert.description}</p>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">Recalled Batches:</span>
                {alert.affectedBatches.map((b, i) => (
                  <span key={i} className="font-mono text-[11px] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-rose-800 font-semibold">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-3">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900">{report.medicineName}</h4>
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-800 px-1.5 py-0.2 rounded border border-slate-200">
                    Batch: {report.batchNumber}
                  </span>
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-800 border border-rose-300 px-1.5 py-0.2 rounded font-semibold">
                  {report.status}
                </span>
              </div>

              <p className="text-xs text-slate-700">"{report.notes}"</p>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>{report.pharmacyName} ({report.location})</span>
                <span>Reported: {report.reportedDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
