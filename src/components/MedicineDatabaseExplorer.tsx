import React, { useState } from 'react';
import { Search, Plus, Camera, Sparkles } from 'lucide-react';
import { MedicineSpec } from '../types/pharmacy';

interface MedicineDatabaseExplorerProps {
  medicines: MedicineSpec[];
  onSelectForScan: (medId: string) => void;
  onOpenAddModal: () => void;
  onOpenHologramSim: (medId: string) => void;
}

export const MedicineDatabaseExplorer: React.FC<MedicineDatabaseExplorerProps> = ({
  medicines,
  onSelectForScan,
  onOpenAddModal,
  onOpenHologramSim
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeMedicine, setActiveMedicine] = useState<MedicineSpec | null>(medicines[0] || null);

  const categories = ['ALL', 'Psychiatric', 'Antibiotic', 'Cardiovascular', 'Endocrine', 'Analgesic'];

  const filteredMedicines = medicines.filter(m => {
    const matchesSearch =
      (m.medicineName || m.brandName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.pill.imprintFront.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Medicine Verification Directory
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Verified authentic specifications for psychiatric and critical pharmaceuticals.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Medicine</span>
        </button>
      </div>

      {/* Search & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by brand name (Lithosun, Sertraline), API, manufacturer, imprint code..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 text-slate-900 text-xs rounded pl-9 pr-3 py-2.5 focus:outline-none focus:border-teal-600 shadow-xs"
          />
        </div>

        <div className="md:col-span-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-2 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-50 text-teal-900 border border-teal-300 font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Split Directory Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Medication List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredMedicines.map(med => {
            const isSelected = activeMedicine?.id === med.id;
            return (
              <div
                key={med.id}
                onClick={() => setActiveMedicine(med)}
                className={`p-3.5 rounded border cursor-pointer text-left transition-colors shadow-xs ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-600'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{med.medicineName || med.brandName}</h4>
                    <p className="text-xs text-teal-800 font-semibold font-mono mt-0.5">{med.genericName} • {med.strength}</p>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {med.category}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                  <span>Mfr: {med.manufacturer.split(' ')[0]}</span>
                  <span>Imprint: <strong className="text-slate-800">{med.pill.imprintFront}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Monograph (7 cols) */}
        <div className="lg:col-span-7">
          {activeMedicine ? (
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{activeMedicine.medicineName || activeMedicine.brandName}</h3>
                  <p className="text-xs text-teal-800 font-semibold font-mono mt-0.5">
                    {activeMedicine.genericName} ({activeMedicine.strength}) — {activeMedicine.manufacturer}
                  </p>
                  <p className="text-xs text-slate-600 mt-2">{activeMedicine.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectForScan(activeMedicine.id)}
                    className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Scan with Camera</span>
                  </button>
                  <button
                    onClick={() => onOpenHologramSim(activeMedicine.id)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-xs"
                    title="View Seal Guide"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                </div>
              </div>

              {/* Physical Pill Specs */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                  Pill Physical Indicators:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Shape:</span>
                    <span className="text-slate-800 font-medium">{activeMedicine.pill.shape}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Color:</span>
                    <span className="text-slate-800 font-medium">{activeMedicine.pill.color}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Imprint (Front):</span>
                    <span className="text-teal-800 font-mono font-semibold">{activeMedicine.pill.imprintFront}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Imprint (Back):</span>
                    <span className="text-teal-800 font-mono font-semibold">{activeMedicine.pill.imprintBack}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Coating:</span>
                    <span className="text-slate-800">{activeMedicine.pill.coating}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Scoring:</span>
                    <span className="text-slate-800">{activeMedicine.pill.scoring}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Dimensions:</span>
                    <span className="text-slate-800">{activeMedicine.pill.diameterMm}mm × {activeMedicine.pill.thicknessMm}mm</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Weight:</span>
                    <span className="text-slate-800">{activeMedicine.pill.weightMg} mg</span>
                  </div>
                </div>
              </div>

              {/* Packaging & Security Details */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                  Packaging & Security Markers:
                </h4>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-1.5 text-slate-700">
                  <div><strong>Blister Type:</strong> {activeMedicine.packaging.blisterType} ({activeMedicine.packaging.blisterFoilPattern})</div>
                  <div><strong>Security Seal:</strong> {activeMedicine.packaging.securitySealType} - {activeMedicine.packaging.securitySealDescription}</div>
                  <div><strong>Batch Code Pattern:</strong> <span className="font-mono text-slate-900 bg-white px-1 py-0.5 rounded border border-slate-200">{activeMedicine.batchRules.exampleBatch}</span></div>
                </div>
              </div>

              {/* Known Counterfeit Vulnerabilities */}
              <div className="bg-rose-50/60 p-3 rounded border border-rose-200 text-xs space-y-1.5">
                <span className="font-bold text-rose-900 uppercase tracking-wide block">
                  Known Counterfeit Forgery Flaws:
                </span>
                <p className="text-rose-800"><strong>Health Danger:</strong> {activeMedicine.knownCounterfeits.healthHazards}</p>
                <ul className="text-rose-800 list-disc list-inside space-y-0.5">
                  {activeMedicine.knownCounterfeits.commonFakeFlaws.map((flaw, idx) => (
                    <li key={idx}>{flaw}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500 text-xs">
              Select a medicine from the list to view specifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
