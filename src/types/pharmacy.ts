export type VerificationStatus =
  | 'VERIFIED_AGAINST_AVAILABLE_DATA'
  | 'SUSPICIOUS_REQUIRES_VERIFICATION'
  | 'UNABLE_TO_VERIFY';

export type CheckStatus = 'PASS' | 'FAIL' | 'WARN' | 'NOT_APPLICABLE';

export interface MedicineSpec {
  id: string;
  medicineId: string;
  medicineName: string;
  brandName?: string;
  genericName: string;
  category: 'Psychiatric' | 'Antibiotic' | 'Cardiovascular' | 'Endocrine' | 'Analgesic' | 'Gastrointestinal' | 'Respiratory' | 'Antiallergic' | 'General' | string;
  therapeuticCategory?: string;
  prescriptionRequired?: boolean;
  identificationKeywords?: string[];
  strength: string;
  dosageForm: string;
  manufacturer: string;
  country: string;
  riskCategory: 'High' | 'Critical' | 'Moderate';
  description: string;
  
  // Packaging authentic markers
  packaging: {
    boxColor: string;
    blisterType: 'Alu-Alu' | 'PVC-Alu' | 'PVDC' | 'HDPE Bottle' | 'Prefilled Pen';
    blisterFoilPattern: string;
    fontFamilySpecs: string;
    microtextLocation: string;
    securitySealType: 'Hologram Sticker' | 'Color-Shift Ink' | 'Tamper-Evident Perforation' | '2D DataMatrix Laser Etch';
    securitySealDescription: string;
  };

  // Pill Physical Specs
  pill: {
    shape: 'Round' | 'Oval' | 'Capsule' | 'Biconvex' | 'Hexagonal' | 'Oblong' | 'Liquid';
    color: string;
    coating: 'Film-coated' | 'Uncoated' | 'Sugar-coated' | 'Sustained-Release Matrix' | 'Capsule Shell';
    scoring: 'Single Score' | 'Cross Score' | 'Unscored' | 'Double Sided';
    imprintFront: string;
    imprintBack: string;
    diameterMm: number;
    thicknessMm: number;
    weightMg: number;
  };

  // Batch & Barcode Rules
  batchRules: {
    formatRegex: string;
    exampleBatch: string;
    shelfLifeMonths: number;
    has2DDataMatrix: boolean;
    gtinCode: string;
  };

  // Common Counterfeit Vulnerabilities & Known Fakes
  knownCounterfeits: {
    commonFakeFlaws: string[];
    adulterantsFound: string[];
    healthHazards: string;
    lastAlertDate?: string;
  };

  regulatoryInfo: string;
  warningInfo: string;
  referenceImage: string;
  genuineBlisterImage: string;
  genuinePillImage: string;
}

export interface ExplainableCheck {
  name: string;
  key: string;
  status: 'MATCHED' | 'DISCREPANCY' | 'UNVERIFIED';
  confidence: number;
  observed: string;
  expected: string;
  notes?: string;
}

export interface VerificationReport {
  id: string;
  timestamp: string;
  analyzedImage: string;
  detectedMedicine: {
    name: string;
    genericName: string;
    strength: string;
    dosageForm?: string;
    manufacturer: string;
  };
  isMedicine?: boolean;
  nonMedicineDetected?: string;
  verificationStatus: VerificationStatus;
  overallVerdict: string;
  
  // AI Confidence metrics breakdown
  confidenceMetrics: {
    ocrConfidence: number;
    packageSimilarity: number;
    medicineIdConfidence: number;
    imageQualityScore: number;
    overallConfidence: number;
  };

  // Explainable AI Checks
  explainableChecks: {
    medicineNameMatch: ExplainableCheck;
    manufacturerMatch: ExplainableCheck;
    strengthMatch: ExplainableCheck;
    packagingTextMatch: ExplainableCheck;
    barcodeMatch: ExplainableCheck;
    batchValidation: ExplainableCheck;
    expiryDateValidity: ExplainableCheck;
    imageQuality: ExplainableCheck;
  };

  // Raw OCR and extracted structured info
  extractedData: {
    batchNumber?: string;
    mfgDate?: string;
    expiryDate?: string;
    mrpPrice?: string;
    scannedBarcode?: string;
    imprintText?: string;
    rawOcrText?: string;
  };

  // CNN Visual Feature Extraction for Pill Physicals & Packaging (when batch is absent or visible)
  cnnFeatures?: {
    detectedPillShape?: string;
    detectedPillColor?: string;
    detectedImprint?: string;
    detectedScoring?: string;
    detectedCoating?: string;
    blisterPattern?: string;
    visualFeatureMatchScore?: number;
    visualExtractionNotes?: string;
  };

  visionModelUsed?: string;

  // Monograph Comparison
  monographComparison: {
    authenticSpec: string;
    observedSpec: string;
    discrepancies: string[];
  };

  recommendedActions: string[];
  safetyDisclaimer: string;
}

export interface CounterfeitAlert {
  id: string;
  title: string;
  medicineName: string;
  manufacturer: string;
  alertLevel: 'RED_ALERT' | 'WARNING' | 'RECALL';
  source: 'CDSCO' | 'FDA MedWatch' | 'WHO Surveillance' | 'Manufacturer Notice';
  agency?: string;
  date: string;
  affectedBatches: string[];
  region: string;
  description: string;
  identifyingFeatures: string[];
}

export interface CommunityReport {
  id: string;
  medicineName: string;
  batchNumber: string;
  location: string;
  pharmacyName: string;
  reportedDate: string;
  status: 'Investigating' | 'Confirmed Counterfeit' | 'Resolved';
  notes: string;
  riskRating: number;
}
