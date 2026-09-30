import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  QrCode,
  Tag,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MedicineSpec } from '../types/pharmacy';

interface MedicineDatabaseViewProps {
  medicines: MedicineSpec[];
  onSelectMedicineForInspection?: (medicine: MedicineSpec) => void;
}

export const MedicineDatabaseView: React.FC<MedicineDatabaseViewProps> = ({
  medicines,
  onSelectMedicineForInspection
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMed, setSelectedMed] = useState<MedicineSpec | null>(medicines[0] || null);

  const categories = ['All', ...Array.from(new Set(medicines.map(m => m.category).filter(Boolean)))];

  const filteredMedicines = medicines.filter(med => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      med.medicineName.toLowerCase().includes(q) ||
      med.genericName.toLowerCase().includes(q) ||
      med.manufacturer.toLowerCase().includes(q) ||
      med.strength.toLowerCase().includes(q) ||
      med.medicineId?.toLowerCase().includes(q) ||
      med.id.toLowerCase().includes(q) ||
      med.therapeuticCategory?.toLowerCase().includes(q) ||
      med.identificationKeywords?.some(k => k.toLowerCase().includes(q));

    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              Verified Medicine Monograph Database
            </h1>
            <span className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {medicines.length} Standard Records
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Reference database used by MedVerify AI to cross-reference pill physicals, packaging fonts, holograms, and lot formatting.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Sertraline, Lithosun, Pfizer..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Split View: List on Left, Detailed Monograph on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Medicine Catalog List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredMedicines.map(med => {
            const isSelected = selectedMed?.id === med.id;
            return (
              <div
                key={med.id}
                onClick={() => setSelectedMed(med)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-teal-50/80 border-teal-500 shadow-sm ring-1 ring-teal-400'
                    : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-teal-800 text-white shadow-2xs">
                      {med.medicineId || med.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {med.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-800 font-bold bg-teal-100/60 px-1.5 py-0.2 rounded">
                    {med.strength}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {med.medicineName}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                  {med.genericName}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[200px]">{med.manufacturer}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Complete Verified Monograph Spec Sheet */}
        <div className="lg:col-span-7">
          {selectedMed ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 sticky top-20">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-900 border border-teal-300 text-[10px] font-bold rounded-full uppercase">
                      Official Monograph
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: {selectedMed.medicineId}</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                    {selectedMed.medicineName}
                  </h2>
                  <p className="text-xs font-semibold text-slate-600">
                    {selectedMed.genericName} • {selectedMed.strength} • {selectedMed.dosageForm}
                  </p>
                </div>
              </div>

              {/* Monograph Description */}
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {selectedMed.description}
              </p>

              {/* Pill & Physical Formulation Specifications */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>Physical Tablet & Formulation Markers</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Pill Shape & Color</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedMed.pill.color} {selectedMed.pill.shape}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Front Deboss Imprint</span>
                    <p className="font-mono font-bold text-teal-800 mt-0.5">"{selectedMed.pill.imprintFront}"</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Back Imprint / Score</span>
                    <p className="font-mono font-semibold text-slate-800 mt-0.5">"{selectedMed.pill.imprintBack}"</p>
                  </div>
                </div>
              </div>

              {/* Packaging & Security Features */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <span>Packaging & Anti-Tamper Hologram Specs</span>
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-slate-800">
                  <p><strong>Blister Material:</strong> {selectedMed.packaging.blisterType} ({selectedMed.packaging.blisterFoilPattern})</p>
                  <p><strong>Security Seal:</strong> {selectedMed.packaging.securitySealType} — {selectedMed.packaging.securitySealDescription}</p>
                  <p><strong>Carton Typography:</strong> {selectedMed.packaging.fontFamilySpecs}</p>
                </div>
              </div>

              {/* Batch Rules & Barcode */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-teal-700" />
                  <span>Batch Syntax & GTIN-14 Barcode</span>
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Example Lot Code</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedMed.batchRules.exampleBatch}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">GTIN-14 Barcode</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedMed.batchRules.gtinCode}</p>
                  </div>
                </div>
              </div>

              {/* Known Counterfeit Vulnerabilities */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase text-[11px]">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Known Counterfeit Flaws to Inspect:</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-amber-900">
                  {selectedMed.knownCounterfeits.commonFakeFlaws.map((flaw, idx) => (
                    <li key={idx}>{flaw}</li>
                  ))}
                </ul>
              </div>

              {/* Regulatory Notice */}
              <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                <strong>Regulatory Classification:</strong> {selectedMed.regulatoryInfo} • {selectedMed.warningInfo}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-xs">Select any medicine from the library on the left to view full monograph standards.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
