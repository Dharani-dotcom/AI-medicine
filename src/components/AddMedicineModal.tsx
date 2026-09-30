import React, { useState } from 'react';
import { X, Plus, Shield } from 'lucide-react';
import { MedicineSpec } from '../types/pharmacy';
import { playBeep } from '../utils/audio';

interface AddMedicineModalProps {
  onClose: () => void;
  onAddSuccess: (newMed: MedicineSpec) => void;
}

export const AddMedicineModal: React.FC<AddMedicineModalProps> = ({ onClose, onAddSuccess }) => {
  const [brandName, setBrandName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [category, setCategory] = useState<'Psychiatric' | 'Antibiotic' | 'Cardiovascular' | 'Endocrine' | 'Analgesic' | 'General'>('Psychiatric');
  const [strength, setStrength] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [country, setCountry] = useState('India / Global');
  const [riskCategory, setRiskCategory] = useState<'High' | 'Critical' | 'Moderate'>('High');
  const [description, setDescription] = useState('');

  // Pill Specs
  const [pillShape, setPillShape] = useState<'Round' | 'Oval' | 'Capsule' | 'Biconvex' | 'Hexagonal' | 'Oblong' | 'Liquid'>('Round');
  const [pillColor, setPillColor] = useState('White');
  const [imprintFront, setImprintFront] = useState('');
  const [imprintBack, setImprintBack] = useState('');
  const [coating, setCoating] = useState<'Film-coated' | 'Uncoated' | 'Sugar-coated' | 'Sustained-Release Matrix' | 'Capsule Shell'>('Film-coated');
  const [scoring, setScoring] = useState<'Single Score' | 'Cross Score' | 'Unscored' | 'Double Sided'>('Single Score');
  const [diameterMm, setDiameterMm] = useState<number>(10);
  const [thicknessMm, setThicknessMm] = useState<number>(4);
  const [weightMg, setWeightMg] = useState<number>(350);

  // Packaging & Security
  const [blisterType, setBlisterType] = useState<'Alu-Alu' | 'PVC-Alu' | 'PVDC' | 'HDPE Bottle' | 'Prefilled Pen'>('Alu-Alu');
  const [securitySealType, setSecuritySealType] = useState<'Hologram Sticker' | 'Color-Shift Ink' | 'Tamper-Evident Perforation' | '2D DataMatrix Laser Etch'>('Color-Shift Ink');
  const [securitySealDescription, setSecuritySealDescription] = useState('Optical variable color-shift from gold to emerald green.');
  const [exampleBatch, setExampleBatch] = useState('SUN10294A');
  const [batchRegex, setBatchRegex] = useState('^[A-Z]{3}[0-9]{5}[A-Z]?$');
  const [commonFakeFlaws, setCommonFakeFlaws] = useState('Blurry manufacturer logo, missing debossed imprint code.');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playBeep('scan');

    const newMed: Partial<MedicineSpec> = {
      medicineId: brandName.toLowerCase().replace(/\s+/g, '-'),
      medicineName: brandName,
      brandName,
      genericName,
      category,
      strength,
      dosageForm: 'Film-Coated Tablet',
      manufacturer,
      country,
      riskCategory,
      description: description || `Verified pharmaceutical monograph for ${brandName}.`,
      packaging: {
        boxColor: 'White clinical carton with branded security seals',
        blisterType,
        blisterFoilPattern: 'High-barrier micro-knurled aluminum backing',
        fontFamilySpecs: 'Clean pharmaceutical sans-serif typography',
        microtextLocation: 'Border margin along blister perforation',
        securitySealType,
        securitySealDescription
      },
      pill: {
        shape: pillShape,
        color: pillColor,
        coating,
        scoring,
        imprintFront: imprintFront || 'N/A',
        imprintBack: imprintBack || 'N/A',
        diameterMm: Number(diameterMm),
        thicknessMm: Number(thicknessMm),
        weightMg: Number(weightMg)
      },
      batchRules: {
        formatRegex: batchRegex,
        exampleBatch: exampleBatch,
        shelfLifeMonths: 36,
        has2DDataMatrix: true,
        gtinCode: '0890' + Math.floor(1000000000 + Math.random() * 9000000000)
      },
      knownCounterfeits: {
        commonFakeFlaws: commonFakeFlaws.split(',').map(s => s.trim()),
        adulterantsFound: ['Starch binder with sub-potent API', 'Talcum filler'],
        healthHazards: `Therapeutic failure or toxic response due to adulterated ${genericName}.`
      },
      referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      genuineBlisterImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
      genuinePillImage: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80'
    };

    try {
      const res = await fetch('/api/medicines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMed)
      });

      const data = await res.json();
      if (data.success) {
        playBeep('success');
        onAddSuccess(data.data);
        onClose();
      }
    } catch (err) {
      console.error('Failed to add medicine:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl my-6">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Shield className="w-4 h-4 text-teal-700" />
            <span>Add Medicine to Directory</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-800 font-medium mb-1">Brand Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Lithosun SR 400, Zoloft 50"
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2 focus:outline-none focus:border-teal-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-800 font-medium mb-1">Generic API Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Lithium Carbonate, Sertraline HCl"
                value={genericName}
                onChange={e => setGenericName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-800 font-medium mb-1">Category:</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2"
              >
                <option value="Psychiatric">Psychiatric</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Endocrine">Endocrine</option>
                <option value="Analgesic">Analgesic</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-800 font-medium mb-1">Strength:</label>
              <input
                type="text"
                required
                placeholder="e.g. 400 mg, 50 mg"
                value={strength}
                onChange={e => setStrength(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2"
              />
            </div>

            <div>
              <label className="block text-slate-800 font-medium mb-1">Risk Rating:</label>
              <select
                value={riskCategory}
                onChange={e => setRiskCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-800 font-medium mb-1">Manufacturer:</label>
              <input
                type="text"
                required
                placeholder="e.g. Sun Pharma, Pfizer"
                value={manufacturer}
                onChange={e => setManufacturer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-slate-800 font-medium mb-1">Country / Region:</label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded p-2"
              />
            </div>
          </div>

          {/* Pill Attributes */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Pill Physical Indicators:</span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-slate-600 block mb-1">Shape:</label>
                <select
                  value={pillShape}
                  onChange={e => setPillShape(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded p-1.5"
                >
                  <option value="Round">Round</option>
                  <option value="Oval">Oval</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Biconvex">Biconvex</option>
                </select>
              </div>
              <div>
                <label className="text-slate-600 block mb-1">Color:</label>
                <input
                  type="text"
                  value={pillColor}
                  onChange={e => setPillColor(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded p-1.5"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">Coating:</label>
                <select
                  value={coating}
                  onChange={e => setCoating(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded p-1.5"
                >
                  <option value="Film-coated">Film-coated</option>
                  <option value="Sustained-Release Matrix">Sustained-Release</option>
                  <option value="Uncoated">Uncoated</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 block mb-1">Imprint (Front):</label>
                <input
                  type="text"
                  placeholder="e.g. LITHO 400"
                  value={imprintFront}
                  onChange={e => setImprintFront(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded p-1.5 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">Imprint (Back):</label>
                <input
                  type="text"
                  placeholder="e.g. Logo"
                  value={imprintBack}
                  onChange={e => setImprintBack(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded p-1.5 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 bg-teal-700 hover:bg-teal-600 text-white font-semibold rounded flex items-center gap-1.5 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving...' : 'Add Medicine'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
