import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Cpu,
  Layers,
  Database,
  Lock,
  PhoneCall,
  Mail,
  Building2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const AboutDisclaimerView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
          <span>System Specifications & Clinical Disclaimer</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          About MedVerify AI
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          MedVerify AI is a multi-task computer vision and pharmaceutical monograph verification system engineered to detect packaging defects, typography anomalies, and recalled batch codes.
        </p>
      </div>

      {/* Mandatory Safety Notice Card */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 text-amber-950 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm uppercase tracking-wide">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Important Safety Disclaimer</span>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          “This AI system provides an automated preliminary verification based on the image and available reference data. It cannot guarantee that a medicine is genuine or counterfeit. If a medicine appears suspicious, do not use it until authenticity has been confirmed by a pharmacist, manufacturer, regulator, or authorized verification service.”
        </p>
      </div>

      {/* Architecture Flow Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-700" />
          <span>System Architecture & Verification Pipeline</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-teal-700 uppercase font-mono">Stage 1</span>
            <h4 className="font-bold text-slate-900">Image Capture & Preprocessing</h4>
            <p className="text-[11px] text-slate-600">Canvas normalization, autofocus framing, and quality assurance.</p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-teal-700 uppercase font-mono">Stage 2</span>
            <h4 className="font-bold text-slate-900">OCR & Barcode Decoding</h4>
            <p className="text-[11px] text-slate-600">Deep extraction of brand names, batch codes, and 2D DataMatrix.</p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-teal-700 uppercase font-mono">Stage 3</span>
            <h4 className="font-bold text-slate-900">Database Monograph Matching</h4>
            <p className="text-[11px] text-slate-600">Cross-referencing against verified pharmaceutical catalog specs.</p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-teal-700 uppercase font-mono">Stage 4</span>
            <h4 className="font-bold text-slate-900">Explainable Verification Dossier</h4>
            <p className="text-[11px] text-slate-600">Status calculation with separate AI task confidence indicators.</p>
          </div>
        </div>
      </div>

      {/* Official Regulatory Emergency Contacts */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-700" />
          <span>Official Regulatory & Vigilance Contacts</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900">CDSCO (Drug Controller General of India)</div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-700" />
                <span>Toll-Free Helpline: 1800-11-4477</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-700" />
                <span>Email: dci@nic.in / vigilance@cdsco.gov.in</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900">US FDA MedWatch Reporting</div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-700" />
                <span>Helpline: 1-800-FDA-1088</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-700" />
                <span>Website: fda.gov/medwatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
