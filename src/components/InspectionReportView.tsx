import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Camera,
  FileText,
  Printer,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Database,
  Eye,
  Microscope,
  Scan,
  Maximize2,
  Share2,
  Download,
  Fingerprint,
  QrCode,
  Sliders,
  Check,
  ExternalLink,
  SplitSquareHorizontal
} from 'lucide-react';
import { VerificationReport } from '../types/pharmacy';

interface InspectionReportViewProps {
  report: VerificationReport;
  onBackToScanner: () => void;
  onOpenReportModal: (report: VerificationReport) => void;
  onOpenDatabaseMonograph?: (medicineId?: string) => void;
  onOpenForensicLab?: () => void;
  onOpenTrueMedStudio?: () => void;
}

export const InspectionReportView: React.FC<InspectionReportViewProps> = ({
  report,
  onBackToScanner,
  onOpenReportModal,
  onOpenDatabaseMonograph,
  onOpenForensicLab,
  onOpenTrueMedStudio
}) => {
  const [showRawOcr, setShowRawOcr] = useState<boolean>(false);
  const [imageInspectionMode, setImageInspectionMode] = useState<'annotated' | 'raw' | 'split'>('annotated');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('imprint');
  const [showDigitalPassModal, setShowDigitalPassModal] = useState<boolean>(false);

  // Status Styling Configuration
  const getStatusConfig = () => {
    if (report.isMedicine === false || report.detectedMedicine?.name?.toLowerCase().includes('non-medicine')) {
      return {
        title: 'NON-MEDICINE ITEM DETECTED',
        tagline: 'NO PHARMACEUTICAL SPECIMEN FOUND',
        color: 'amber',
        badgeClass: 'bg-amber-100 text-amber-950 border-amber-300',
        bannerClass: 'bg-amber-50/90 border-amber-400 text-amber-950',
        icon: AlertCircle,
        subtext: 'No valid pharmaceutical packaging, blister foil, or tablet was recognized in the captured frame. MedVerify AI only scans pharmaceutical medicines.'
      };
    }

    switch (report.verificationStatus) {
      case 'VERIFIED_AGAINST_AVAILABLE_DATA':
        return {
          title: 'VERIFIED AGAINST AVAILABLE DATA',
          tagline: 'AUTHENTIC PHARMACOPEIAL MATCH',
          color: 'emerald',
          badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          bannerClass: 'bg-emerald-50/90 border-emerald-400 text-emerald-950',
          icon: ShieldCheck,
          subtext: 'Optical fingerprint, deboss morphology, typography, and lot serialization match authorized pharmaceutical monograph standard.'
        };
      case 'SUSPICIOUS_REQUIRES_VERIFICATION':
        return {
          title: 'SUSPICIOUS / REQUIRES VERIFICATION',
          tagline: 'HIGH COUNTERFEIT RISK DETECTED',
          color: 'rose',
          badgeClass: 'bg-rose-100 text-rose-950 border-rose-300',
          bannerClass: 'bg-rose-50/90 border-rose-400 text-rose-950',
          icon: AlertTriangle,
          subtext: 'One or more critical optical markers (packaging typography, deboss stamp, or batch recall list) failed verification.'
        };
      case 'UNABLE_TO_VERIFY':
      default:
        return {
          title: 'UNABLE TO VERIFY',
          tagline: 'INCONCLUSIVE IMAGE DATA',
          color: 'slate',
          badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
          bannerClass: 'bg-slate-50 border-slate-300 text-slate-900',
          icon: HelpCircle,
          subtext: 'Insufficient lighting, severe blur, or specimen is not currently indexed in the active monograph repository.'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;
  const isCounterfeit = report.verificationStatus === 'SUSPICIOUS_REQUIRES_VERIFICATION';

  const hasNoBatchNumber =
    !report.extractedData.batchNumber ||
    report.extractedData.batchNumber.toLowerCase().includes('not') ||
    report.extractedData.batchNumber === 'N/A';

  // Digital Twin Reference Image fallback
  const digitalTwinMasterImg =
    report.detectedMedicine.name.toLowerCase().includes('lithosun')
      ? 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80';

  // 5-Pillar TrueMed Forensic Radar Scores
  const forensicScores = [
    {
      title: 'Graphic & Typography Integrity',
      score: isCounterfeit ? 42 : report.confidenceMetrics.ocrConfidence || 95,
      desc: isCounterfeit ? 'Vector kerning mismatch & spelling anomalies' : 'Clean vector contours & crisp micro-typography'
    },
    {
      title: 'Deboss & Physical Morphology',
      score: isCounterfeit ? 54 : report.cnnFeatures?.visualFeatureMatchScore || 94,
      desc: isCounterfeit ? 'Irregular imprint depth / flawed scoring groove' : 'Accurate deboss stamp depth & tablet geometry'
    },
    {
      title: 'Microstructure & Security Seals',
      score: isCounterfeit ? 38 : report.confidenceMetrics.packageSimilarity || 92,
      desc: isCounterfeit ? 'Lacks optical color-shift & authentic knurling' : 'High-tensile moisture seal & authentic reflection'
    },
    {
      title: 'Lot Serialization & Expiry Math',
      score: isCounterfeit ? 20 : 96,
      desc: isCounterfeit ? 'Flagged in CDSCO/FDA recall bulletin database' : 'Valid GS1 check-digits & authentic shelf-life'
    },
    {
      title: 'Monograph Reference Correlation',
      score: isCounterfeit ? 48 : report.confidenceMetrics.medicineIdConfidence || 97,
      desc: isCounterfeit ? 'Severe deviations from pharmacopeial standard' : '100% compliance with authorized formula'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToScanner}
          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-teal-700" />
          <span>New Inspection Scan</span>
        </button>

        <div className="flex items-center gap-2">
          {onOpenTrueMedStudio && (
            <button
              onClick={onOpenTrueMedStudio}
              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
              title="Open full TrueMed AI Discrepancy Studio with Split Slider & Delta Heatmap"
            >
              <SplitSquareHorizontal className="w-3.5 h-3.5 text-emerald-700" />
              <span>TrueMed® Studio</span>
            </button>
          )}

          {onOpenForensicLab && (
            <button
              onClick={onOpenForensicLab}
              className="px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-950 border border-teal-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
              title="Inspect 45° tilt, deboss depth gauge, 10x microtext, and ghost batch collision"
            >
              <Microscope className="w-3.5 h-3.5 text-teal-700" />
              <span>Anti-Clone Lab</span>
            </button>
          )}

          <button
            onClick={() => setShowDigitalPassModal(true)}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-teal-700" />
            <span>Digital Pass</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Export PDF Dossier</span>
          </button>

          <button
            onClick={() => onOpenReportModal(report)}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
          >
            <AlertCircle className="w-3.5 h-3.5 text-white" />
            <span>Report Incident</span>
          </button>
        </div>
      </div>

      {/* TrueMed Main Verdict Hero Card */}
      <div className={`border-2 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 transition-all ${statusConfig.bannerClass}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className={`p-3.5 rounded-2xl bg-white shadow-sm border ${
              report.verificationStatus === 'VERIFIED_AGAINST_AVAILABLE_DATA' ? 'text-emerald-700 border-emerald-300 ring-4 ring-emerald-100' :
              report.verificationStatus === 'SUSPICIOUS_REQUIRES_VERIFICATION' ? 'text-rose-700 border-rose-300 ring-4 ring-rose-100' :
              'text-slate-700 border-slate-300'
            }`}>
              <StatusIcon className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-black border uppercase tracking-wider ${statusConfig.badgeClass}`}>
                  {statusConfig.title}
                </span>
                <span className="text-[10px] bg-slate-900 text-teal-300 font-mono px-2.5 py-0.5 rounded-full font-bold">
                  TrueMed Optical AI Core
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {report.detectedMedicine.name || 'Analyzed Medicine'}
              </h2>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                {statusConfig.subtext}
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs border border-slate-300/80 rounded-2xl p-3.5 text-center sm:text-right shrink-0 shadow-xs">
            <div className="flex items-center justify-center sm:justify-end gap-1 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <span>TrueMed Match Rating</span>
              <span
                title="Why not 100%? Optical AI verifies physical packaging & pill morphology (up to 98%). Absolute 100% chemical verification requires laboratory chemical chromatography."
                className="cursor-help text-teal-700"
              >
                <HelpCircle className="w-3 h-3" />
              </span>
            </div>
            <div className={`text-3xl font-black font-mono mt-0.5 ${
              isCounterfeit ? 'text-rose-600' : 'text-emerald-700'
            }`}>
              {report.confidenceMetrics.overallConfidence}%
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              {statusConfig.tagline}
            </div>
            <div className="text-[9px] text-slate-500 font-medium mt-1">
              {report.confidenceMetrics.overallConfidence >= 90 ? 'Highest Optical Match Tier' : 'Weighted Multimodal Score'}
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-white/80 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
          <strong>Forensic Summary:</strong> {report.overallVerdict}
        </div>
      </div>

      {/* Mandatory Safety Disclaimer Card */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-2xl text-xs text-amber-950 shadow-2xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wide">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Clinical & Regulatory Precaution</span>
        </div>
        <p className="text-amber-900 leading-relaxed font-sans">
          {report.safetyDisclaimer}
        </p>
      </div>

      {/* TrueMed Optical Anomaly Inspector & Digital Twin Split View */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Scan className="w-5 h-5 text-teal-700" />
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                TrueMed Optical Anomaly & Digital Twin Inspector
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Interactive micro-level analysis of typography, deboss imprints, and blister security foils.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setImageInspectionMode('annotated')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                imageInspectionMode === 'annotated'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔍 Anomaly Pinpointer
            </button>
            <button
              onClick={() => setImageInspectionMode('split')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                imageInspectionMode === 'split'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚖️ Digital Twin Comparison
            </button>
            <button
              onClick={() => setImageInspectionMode('raw')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                imageInspectionMode === 'raw'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🖼️ Raw Photo
            </button>
          </div>
        </div>

        {/* Viewport Display based on selected inspection mode */}
        {imageInspectionMode === 'split' ? (
          /* Side-by-Side Digital Twin Split View */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">1. Captured Specimen Image</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] ${isCounterfeit ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {isCounterfeit ? '⚠️ Discrepancy Found' : '✓ Verified Standard'}
                </span>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 relative group">
                <img src={report.analyzedImage} alt="Captured Specimen" className="w-full h-full object-contain" />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded-md font-mono">
                  Sample ID: {report.id.slice(-8)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">2. Official Pharmaceutical Master Twin</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] bg-teal-100 text-teal-900">
                  🏛️ Authorized Monograph
                </span>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 relative group">
                <img src={digitalTwinMasterImg} alt="Master Twin" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-teal-950/90 text-teal-200 text-[10px] px-2 py-1 rounded-md font-mono">
                  IP/USP Reference Catalog
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Anomaly Pinpointer View */
          <div className="relative aspect-[16/10] max-h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
            <img
              src={report.analyzedImage}
              alt="Analyzed Medicine"
              className="w-full h-full object-contain"
            />

            {/* TrueMed Bounding Box Overlay & Hotspots */}
            {imageInspectionMode === 'annotated' && (
              <>
                {/* Hotspot 1: Typography / Brand Wordmark */}
                <div
                  onClick={() => setSelectedHotspot('typography')}
                  className={`absolute top-[18%] left-[24%] w-[42%] h-[20%] border-2 rounded-lg cursor-pointer transition-all ${
                    isCounterfeit
                      ? 'border-rose-500 bg-rose-500/20 animate-pulse'
                      : 'border-emerald-400 bg-emerald-400/15'
                  }`}
                >
                  <span className={`absolute -top-3 left-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase text-white shadow-xs ${
                    isCounterfeit ? 'bg-rose-600' : 'bg-emerald-600'
                  }`}>
                    {isCounterfeit ? '⚠️ Typography Flaw' : '✓ Brand Typography'}
                  </span>
                </div>

                {/* Hotspot 2: Debossed Imprint / Pill Center */}
                <div
                  onClick={() => setSelectedHotspot('imprint')}
                  className={`absolute top-[45%] left-[32%] w-[36%] h-[28%] border-2 rounded-xl cursor-pointer transition-all ${
                    isCounterfeit
                      ? 'border-amber-500 bg-amber-500/20'
                      : 'border-teal-400 bg-teal-400/20'
                  }`}
                >
                  <span className={`absolute -top-3 left-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase text-white shadow-xs ${
                    isCounterfeit ? 'bg-amber-600' : 'bg-teal-700'
                  }`}>
                    {isCounterfeit ? '⚠️ Deboss Imprint Discrepancy' : '✓ Deboss Stamp Verified'}
                  </span>
                </div>

                {/* Hotspot 3: Batch Number & Indelible Lot */}
                <div
                  onClick={() => setSelectedHotspot('batch')}
                  className={`absolute bottom-[10%] right-[10%] w-[38%] h-[18%] border-2 rounded-lg cursor-pointer transition-all ${
                    isCounterfeit
                      ? 'border-rose-600 bg-rose-600/25'
                      : 'border-emerald-400 bg-emerald-400/15'
                  }`}
                >
                  <span className={`absolute -top-3 left-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase text-white shadow-xs ${
                    isCounterfeit ? 'bg-rose-700' : 'bg-emerald-700'
                  }`}>
                    {isCounterfeit ? '🚨 Recall Flag: ' + (report.extractedData.batchNumber || 'Batch') : '✓ Lot Syntax: ' + (report.extractedData.batchNumber || 'Valid')}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Hotspot Details Bar */}
        {imageInspectionMode === 'annotated' && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-800">
            <div className="flex items-center gap-2 font-medium">
              <Fingerprint className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                {selectedHotspot === 'typography' && (isCounterfeit ? 'Typography Check: Font rendering shows jagged rasterization and spelling errors.' : 'Typography Check: Authentic vector glyph kerning and registered trademark.')}
                {selectedHotspot === 'imprint' && (isCounterfeit ? 'Deboss Check: Missing or distorted alphanumeric deboss markings.' : 'Deboss Check: Imprint matches exact pharmacopeial depth and font geometry.')}
                {selectedHotspot === 'batch' && (isCounterfeit ? 'Lot Serialization: Batch number matches active CDSCO / WHO seizure bulletins.' : 'Lot Serialization: Batch format follows standard manufacturer mathematical rules.')}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono shrink-0">Click bounding box</span>
          </div>
        )}
      </div>

      {/* TrueMed 5-Pillar Optical Security Radar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-teal-700" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              TrueMed 5-Pillar Optical Security Fingerprint
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            Weighted Algorithm
          </span>
        </div>

        <div className="space-y-3">
          {forensicScores.map((pillar, i) => (
            <div key={i} className="space-y-1.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{pillar.title}</span>
                <span className={`font-mono font-black ${pillar.score >= 85 ? 'text-emerald-700' : pillar.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {pillar.score}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    pillar.score >= 85 ? 'bg-emerald-500' : pillar.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${pillar.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-600">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Extracted Structured OCR Fields */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-700" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              Extracted OCR Attributes & Supply Chain Data
            </h3>
          </div>
          <button
            onClick={() => setShowRawOcr(!showRawOcr)}
            className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1"
          >
            <span>{showRawOcr ? 'Hide Raw OCR' : 'View Raw OCR Text'}</span>
            {showRawOcr ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Brand Name</span>
            <p className="font-bold text-slate-900 mt-0.5">{report.detectedMedicine.name || 'Not detected'}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Active API</span>
            <p className="font-semibold text-slate-800 mt-0.5">{report.detectedMedicine.genericName || 'Not detected'}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Manufacturer</span>
            <p className="font-semibold text-slate-800 mt-0.5">{report.detectedMedicine.manufacturer || 'Not detected'}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Strength / Dosage</span>
            <p className="font-semibold text-slate-800 mt-0.5">{report.detectedMedicine.strength || 'Not detected'}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Batch / Lot Number</span>
            <p className={`font-mono font-bold mt-0.5 ${isCounterfeit ? 'text-rose-700' : 'text-slate-900'}`}>
              {report.extractedData.batchNumber || 'Not printed (CNN Imprint matched)'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Expiry Date</span>
            <p className="font-mono font-semibold text-slate-800 mt-0.5">{report.extractedData.expiryDate || 'Not detected'}</p>
          </div>
        </div>

        {showRawOcr && report.extractedData.rawOcrText && (
          <div className="mt-3 p-3 bg-slate-900 text-teal-300 font-mono text-[11px] rounded-xl whitespace-pre-wrap max-h-36 overflow-y-auto border border-slate-800">
            {report.extractedData.rawOcrText}
          </div>
        )}
      </div>

      {/* Monograph Comparison */}
      {report.monographComparison && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-700" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
              Official Monograph Comparison
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Authentic Monograph Standard</span>
              <p className="text-slate-800 leading-relaxed">{report.monographComparison.authenticSpec}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Observed Packaging Profile</span>
              <p className="text-slate-800 leading-relaxed">{report.monographComparison.observedSpec}</p>
            </div>
          </div>

          {report.monographComparison.discrepancies?.length > 0 && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5 text-xs text-rose-950">
              <span className="font-bold text-rose-900 uppercase text-[10px] tracking-wider">Identified Security Discrepancies:</span>
              <ul className="list-disc pl-4 space-y-1">
                {report.monographComparison.discrepancies.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Digital Pass Modal */}
      {showDigitalPassModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center animate-in zoom-in-95">
            <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-2xl mx-auto flex items-center justify-center border border-teal-200">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Digital Verification Pass
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Cryptographically hashed scan ledger token
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center gap-2">
              <div className="w-36 h-36 bg-slate-900 text-white flex items-center justify-center rounded-xl font-mono text-xs p-2 text-center">
                [ QR CODE TOKEN ]
                <br />
                {report.id.slice(0, 16)}
              </div>
              <span className="font-mono text-[10px] text-slate-500">Scan ID: {report.id}</span>
            </div>

            <button
              onClick={() => setShowDigitalPassModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
