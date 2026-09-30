import React, { useState, useRef } from 'react';
import { CheckCircle2, XCircle, Sliders } from 'lucide-react';
import { MedicineSpec } from '../types/pharmacy';

interface HologramTiltSimulatorProps {
  medicines: MedicineSpec[];
  initialMedicineId?: string;
}

export const HologramTiltSimulator: React.FC<HologramTiltSimulatorProps> = ({
  medicines,
  initialMedicineId
}) => {
  const [selectedMedId, setSelectedMedId] = useState<string>(
    initialMedicineId || 'lithosun-sr-400'
  );
  const [tiltX, setTiltX] = useState<number>(0);
  const [tiltY, setTiltY] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentMed = medicines.find(m => m.id === selectedMedId) || medicines[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTiltX(Math.round(normX * 30));
    setTiltY(Math.round(normY * -30));
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  const angle = Math.abs(tiltX) + Math.abs(tiltY);
  const hue = (45 + angle * 3) % 360;

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Security Seal & Hologram Tilt Guide
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Learn how authentic color-shifting ink and 3D security seals respond to lighting angles.
          </p>
        </div>

        <div>
          <select
            value={selectedMedId}
            onChange={e => setSelectedMedId(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded px-3 py-1.5 focus:outline-none focus:border-teal-600 font-medium"
          >
            {medicines.map(m => (
              <option key={m.id} value={m.id}>
                {m.medicineName || m.brandName} ({m.packaging.securitySealType})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Genuine Seal Box */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              Genuine Seal (Optical Variable Shift)
            </span>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 rounded font-semibold">
              Authentic
            </span>
          </div>

          <p className="text-xs text-slate-600">
            {currentMed.packaging.securitySealDescription}
          </p>

          {/* Interactive Tilt Area */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="aspect-square max-h-64 bg-slate-900 rounded border border-slate-300 flex items-center justify-center relative cursor-pointer"
          >
            <span className="absolute top-2 left-2 text-[10px] text-slate-300 font-mono bg-slate-800/80 px-1.5 py-0.5 rounded">
              Move cursor over circle to tilt
            </span>

            <div
              style={{
                transform: `perspective(600px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
                background: `linear-gradient(${135 + tiltX}deg, hsl(${hue}, 80%, 45%), hsl(${(hue + 80) % 360}, 85%, 60%))`
              }}
              className="w-36 h-36 rounded-full border-2 border-slate-200/50 flex flex-col items-center justify-center p-3 text-center shadow-lg transition-transform duration-75"
            >
              <span className="text-xs font-bold text-white uppercase drop-shadow font-mono">
                {currentMed.manufacturer.split(' ')[0]}
              </span>
              <span className="text-[10px] text-white/95 font-mono">
                SECURE SEAL
              </span>
            </div>
          </div>

          <div className="bg-emerald-50/60 p-2.5 rounded border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>Authentic Behavior:</strong> The emblem shifts color smoothly from gold to green/cyan when tilted under lighting, with crisp microtext.
            </span>
          </div>
        </div>

        {/* Counterfeit Static Box */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
              Counterfeit Flat Print (Common Fake)
            </span>
            <span className="text-[10px] font-mono bg-rose-100 text-rose-800 border border-rose-300 px-1.5 py-0.2 rounded font-semibold">
              Counterfeit
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Fakes frequently use regular ink toner or flat metallic foil that lacks optical depth.
          </p>

          <div className="aspect-square max-h-64 bg-slate-900 rounded border border-slate-300 flex items-center justify-center relative">
            <span className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono bg-slate-800/80 px-1.5 py-0.5 rounded">
              Static Flat Print (No Shift)
            </span>

            <div className="w-36 h-36 rounded-full bg-amber-800/60 border border-slate-600 flex flex-col items-center justify-center p-3 text-center">
              <span className="text-xs font-bold text-slate-200 uppercase font-mono">
                {currentMed.manufacturer.split(' ')[0]}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                (Flat Brown)
              </span>
            </div>
          </div>

          <div className="bg-rose-50/60 p-2.5 rounded border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
            <XCircle className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
            <span>
              <strong>Counterfeit Flaw:</strong> Sticker stays the same dull brown/silver color regardless of light angle. Text edges are blurred.
            </span>
          </div>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-teal-700" />
          Manual Tilt Sliders:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-slate-600 mb-1">
              <span>Horizontal Angle:</span>
              <span className="font-mono text-slate-900 font-semibold">{tiltX}°</span>
            </div>
            <input
              type="range"
              min="-35"
              max="35"
              value={tiltX}
              onChange={e => setTiltX(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded cursor-pointer accent-teal-700"
            />
          </div>
          <div>
            <div className="flex justify-between text-slate-600 mb-1">
              <span>Vertical Angle:</span>
              <span className="font-mono text-slate-900 font-semibold">{tiltY}°</span>
            </div>
            <input
              type="range"
              min="-35"
              max="35"
              value={tiltY}
              onChange={e => setTiltY(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded cursor-pointer accent-teal-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
