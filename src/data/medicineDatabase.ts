import { MedicineSpec, CounterfeitAlert, CommunityReport } from '../types/pharmacy';

export const INITIAL_MEDICINES: MedicineSpec[] = [
  {
    id: 'MED001',
    medicineId: 'MED001',
    medicineName: 'Sertraline',
    brandName: 'Zoloft / Daxid / Sertima',
    genericName: 'Sertraline Hydrochloride',
    category: 'Psychiatric',
    therapeuticCategory: 'Antidepressant',
    prescriptionRequired: true,
    identificationKeywords: ['Sertraline', 'Sertraline Hydrochloride', '50 mg', 'MED001'],
    strength: '50 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer Inc. / Viatris Inc. / Sun Pharma',
    country: 'United States / India / Global',
    riskCategory: 'High',
    description: 'Selective Serotonin Reuptake Inhibitor (SSRI) prescribed for major depressive disorder (MDD), obsessive-compulsive disorder (OCD), and panic disorder. Authentic tablets feature a light-blue capsule/oval shape debossed with "ZLT 50" on one face and "Pfizer" or scored line on the reverse.',
    packaging: {
      boxColor: 'High-grade 300 GSM virgin board carton, white background with deep Pfizer navy blue horizontal bar and sharp embossed tactile Braille',
      blisterType: 'PVC-Alu',
      blisterFoilPattern: 'Clear thermoformed PVC blister cavity sealed to 20-micron hard-tempered push-through aluminum foil backing with crisp deep-blue flexographic typography',
      fontFamilySpecs: 'Universal Neo-Grotesque Sans Bold for Brand Name; thermal-ink dot-matrix for Lot number and Expiry',
      microtextLocation: 'Microprinted "PFIZER HEALTH AUTHENTIC" repeating 0.4pt hairline along blister margin edge',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Factory heat-sealed end-flaps with fiber-tear tamper-evident release lacquer on both carton lids'
    },
    pill: {
      shape: 'Capsule',
      color: 'Light Blue',
      coating: 'Film-coated',
      scoring: 'Single Score',
      imprintFront: 'ZLT 50',
      imprintBack: 'Pfizer',
      diameterMm: 10.5,
      thicknessMm: 4.2,
      weightMg: 165
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{4}[A-Z0-9]?$',
      exampleBatch: 'FL8921',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '00300694210688'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Mottled or dark navy blue tablet color instead of uniform light blue',
        'Missing debossed "ZLT 50" imprint or shallow irregular laser engraving',
        'Spelling typo on packaging: "Sertralne", "Sertaline", or "Incorparated"',
        'Chalky crumbling tablet that leaves white residue on fingers',
        'Missing 2D DataMatrix GS1 code on secondary outer carton'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Cornstarch binder (0% Active API)', 'Substituted Diazepam / Sedatives'],
      healthHazards: 'Sudden SSRI discontinuation syndrome, acute depressive relapse, panic crises, or unexpected sedation from unauthorized adulterants.',
      lastAlertDate: '2026-02-18'
    },
    regulatoryInfo: 'US FDA NDA #019839 / CDSCO Schedule H1 Prescription Drug',
    warningInfo: 'Prescription Only. Do not discontinue abruptly. Protect from moisture and excessive heat (15°C - 30°C).',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    genuineBlisterImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    genuinePillImage: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED002',
    medicineId: 'MED002',
    medicineName: 'Lithosun',
    brandName: 'Lithosun SR / Eskalith',
    genericName: 'Lithium Carbonate',
    category: 'Psychiatric',
    therapeuticCategory: 'Mood stabilizer',
    prescriptionRequired: true,
    identificationKeywords: ['Lithosun', 'Lithium Carbonate', '300 mg', '400 mg', 'MED002'],
    strength: '300 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sun Pharmaceutical Industries Ltd.',
    country: 'India / Global',
    riskCategory: 'Critical',
    description: 'Essential mood stabilizer and psychotropic medication for Bipolar I Disorder and acute manic episodes. Critical narrow therapeutic index drug (0.6 - 1.2 mEq/L serum window).',
    packaging: {
      boxColor: 'Glossy white medical board carton with deep cadmium orange brand panel, dual-tone navy blue Sun Pharma radiant sunburst icon',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Heavy gauge 45-micron cold-form Alu-Alu with distinct diamond waffle knurling and high-gloss crimson lettering',
      fontFamilySpecs: 'Helvetica Neue Bold Condensed; Lot/Mfg encoded with continuous thermal inkjet font (TIJ)',
      microtextLocation: 'Microscopic 0.35pt "SUN PHARMA AUTHENTIC SECURE" repeating perimeter line surrounding blister pockets',
      securitySealType: 'Color-Shift Ink',
      securitySealDescription: '45-degree angle Optical Variable Ink (OVI) Sun Pharma emblem transitioning from metallic Gold to vibrant Emerald Green'
    },
    pill: {
      shape: 'Round',
      color: 'Pure White',
      coating: 'Film-coated',
      scoring: 'Unscored',
      imprintFront: 'LITHO 300',
      imprintBack: 'SUN',
      diameterMm: 11.2,
      thicknessMm: 5.1,
      weightMg: 420
    },
    batchRules: {
      formatRegex: '^JK[0-9]{4,5}$',
      exampleBatch: 'JK4829',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901117002341'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Static shiny gold printed emblem that fails to color-shift to emerald green at 45-degree tilt',
        'Weak chalky tablet with crumbly edges and faint/missing "LITHO 300" imprint',
        'Smooth paper-thin blister foil that tears easily without resistance',
        'Batch number printed with smudgy desktop dot-matrix instead of crisp high-speed industrial TIJ'
      ],
      adulterantsFound: ['Talcum powder / Gypsum filler', 'Crushed Paracetamol adulterant', 'Heavy metal residues (Lead, Arsenic)'],
      healthHazards: 'Sub-therapeutic dosing leads to acute manic breakdown, psychosis, or fatal toxicity if contaminated with unauthorized compounds.',
      lastAlertDate: '2026-03-04'
    },
    regulatoryInfo: 'CDSCO Schedule H / WHO Model List of Essential Medicines',
    warningInfo: 'High-Alert Medication. Serum lithium levels must be monitored periodically. Store below 25°C.',
    referenceImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    genuineBlisterImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    genuinePillImage: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED003',
    medicineId: 'MED003',
    medicineName: 'Paracetamol',
    brandName: 'Dolo 650 / Calpol / Crocin / Tylenol',
    genericName: 'Paracetamol',
    category: 'Analgesic',
    therapeuticCategory: 'Analgesic / Antipyretic',
    prescriptionRequired: false,
    identificationKeywords: ['Paracetamol', '500 mg', '650 mg', 'Acetaminophen', 'MED003'],
    strength: '500 mg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK / Micro Labs / Abbott / Generic Pharma',
    country: 'Global / India',
    riskCategory: 'Moderate',
    description: 'First-line analgesic and antipyretic medication used globally for relief of fever, mild-to-moderate pain, headaches, and musculoskeletal discomfort.',
    packaging: {
      boxColor: 'Bright white carton with standard blue/red banner and prominent generic monograph text',
      blisterType: 'PVC-Alu',
      blisterFoilPattern: 'Push-through aluminum foil backing with crisp deep-blue offset printing and tamper-evident blister seals',
      fontFamilySpecs: 'Universal Sans Bold with high-contrast active substance labeling',
      microtextLocation: 'Hairline security microtext along the blister margin edge',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Perforated blister tear strips with uniform spacing and foil punch resistance'
    },
    pill: {
      shape: 'Capsule',
      color: 'White',
      coating: 'Uncoated',
      scoring: 'Single Score',
      imprintFront: 'PCM 500',
      imprintBack: 'Plain / Scored',
      diameterMm: 12.0,
      thicknessMm: 4.8,
      weightMg: 560
    },
    batchRules: {
      formatRegex: '^[A-Z0-9]{6,8}$',
      exampleBatch: 'DL89021',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901234500012'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Chalky tablet that crumbles into powder instantly upon thumb pressure',
        'Smudged batch numbering or missing manufacturer license details',
        'Blister foil that peels open easily without tearing'
      ],
      adulterantsFound: ['Flour / Starch filler', 'Industrial chalk', '0% Active API'],
      healthHazards: 'Lack of antipyretic efficacy leading to uncontrolled fever and infection escalation in pediatric and adult patients.',
      lastAlertDate: '2026-01-15'
    },
    regulatoryInfo: 'OTC / Pharmacopoeia Monograph (IP / BP / USP)',
    warningInfo: 'Do not exceed maximum daily dosage of 4000 mg. Avoid concomitant alcohol consumption.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED004',
    medicineId: 'MED004',
    medicineName: 'Amoxicillin',
    brandName: 'Amoxil / Mox / Novamox',
    genericName: 'Amoxicillin',
    category: 'Antibiotic',
    therapeuticCategory: 'Antibiotic',
    prescriptionRequired: true,
    identificationKeywords: ['Amoxicillin', '500 mg', 'Amoxicillin Trihydrate', 'MED004'],
    strength: '500 mg',
    dosageForm: 'Capsule',
    manufacturer: 'GSK / Cipla / Sandoz',
    country: 'United Kingdom / India / Global',
    riskCategory: 'High',
    description: 'Broad-spectrum beta-lactam penicillin antibiotic prescribed for respiratory tract infections, otitis media, streptococcal pharyngitis, and skin infections.',
    packaging: {
      boxColor: 'White and maroon carton with prominent red warning box and regulatory Schedule H Rx branding',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Heavy Alu-Alu cold form foil with moisture protection barrier',
      fontFamilySpecs: 'Clear corporate sans-serif typography with high legibility',
      microtextLocation: 'Microtext printed along the blister perimeter margins',
      securitySealType: 'Color-Shift Ink',
      securitySealDescription: 'Manufacturer hologram seal on the carton opening tabs'
    },
    pill: {
      shape: 'Capsule',
      color: 'Maroon / Yellow (Dual-tone)',
      coating: 'Capsule Shell',
      scoring: 'Unscored',
      imprintFront: 'AMOX 500',
      imprintBack: 'CIPLA / GSK',
      diameterMm: 19.4,
      thicknessMm: 6.8,
      weightMg: 610
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{5}$',
      exampleBatch: 'AX59201',
      shelfLifeMonths: 24,
      has2DDataMatrix: true,
      gtinCode: '08901086001923'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Uneven gelatin capsule shells with loose powder leakage',
        'Faint or misspelled brand imprint on capsule body',
        'Missing moisture seal on blister foil'
      ],
      adulterantsFound: ['Cornstarch', 'Talcum powder', 'Sub-potent degraded penicillin'],
      healthHazards: 'Treatment failure in bacterial infections, risk of sepsis, and proliferation of antimicrobial-resistant pathogens.',
      lastAlertDate: '2026-02-10'
    },
    regulatoryInfo: 'CDSCO Schedule H1 / FDA Prescription Legend',
    warningInfo: 'Contraindicated in penicillin-allergic patients. Complete the full prescribed antibiotic course.',
    referenceImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED005',
    medicineId: 'MED005',
    medicineName: 'Azithromycin',
    brandName: 'Zithromax / Azithral / Azee',
    genericName: 'Azithromycin',
    category: 'Antibiotic',
    therapeuticCategory: 'Antibiotic',
    prescriptionRequired: true,
    identificationKeywords: ['Azithromycin', '500 mg', 'Azithral', 'Azee', 'MED005'],
    strength: '500 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer / Alembic / Cipla',
    country: 'India / Global',
    riskCategory: 'High',
    description: 'Macrolide antibiotic active against diverse Gram-positive and atypical microorganisms, commonly used for community-acquired pneumonia, sinusitis, and enteric infections.',
    packaging: {
      boxColor: 'White carton with distinctive blue/orange band and high-definition laser batch stamp',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: '3-tablet or 6-tablet blister strip in reinforced Alu-Alu barrier packaging',
      fontFamilySpecs: 'Universal Sans Bold with high contrast Schedule H1 red stripe',
      microtextLocation: 'Microprinted brand authentication text along the foil tear line',
      securitySealType: 'Hologram Sticker',
      securitySealDescription: 'Holographic security strip on carton opening flap'
    },
    pill: {
      shape: 'Oval',
      color: 'White to Off-White',
      coating: 'Film-coated',
      scoring: 'Single Score',
      imprintFront: 'AZ 500',
      imprintBack: 'Plain',
      diameterMm: 16.5,
      thicknessMm: 5.8,
      weightMg: 680
    },
    batchRules: {
      formatRegex: '^[A-Z]{3}[0-9]{4}$',
      exampleBatch: 'AZT9012',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901120005432'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Incorrect tablet shape (round instead of oblong/oval)',
        'Absence of film coating causing rapid crumbling in humidity',
        'Counterfeit blister packs with poor blister sealing'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Corn starch', 'Under-dosed API (less than 20% active)'],
      healthHazards: 'Inadequate bacterial eradication, persistent fever, and development of macrolide resistance.',
      lastAlertDate: '2026-03-01'
    },
    regulatoryInfo: 'CDSCO Schedule H1 / US FDA Approved Monograph',
    warningInfo: 'Prescription medicine. Take 1 hour before or 2 hours after meals for optimal absorption.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED006',
    medicineId: 'MED006',
    medicineName: 'Metformin',
    brandName: 'Glucophage / Glycomet / Riomet',
    genericName: 'Metformin Hydrochloride',
    category: 'Endocrine',
    therapeuticCategory: 'Antidiabetic',
    prescriptionRequired: true,
    identificationKeywords: ['Metformin', 'Metformin Hydrochloride', '500 mg', 'Glycomet', 'MED006'],
    strength: '500 mg',
    dosageForm: 'Tablet',
    manufacturer: 'USV / Merck KGaA / Sun Pharma',
    country: 'Global / India',
    riskCategory: 'Moderate',
    description: 'First-line biguanide oral antihyperglycemic medication for the management of type 2 diabetes mellitus and metabolic syndrome.',
    packaging: {
      boxColor: 'White carton with green/blue healthcare color bands and clear dosage labeling',
      blisterType: 'PVC-Alu',
      blisterFoilPattern: 'Clear thermoformed blister cavities with high-opacity silver foil backing',
      fontFamilySpecs: 'Precision industrial sans-serif font with high-visibility lot details',
      microtextLocation: 'Microtext along the blister foil margins',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Factory tamper-evident glued end flaps'
    },
    pill: {
      shape: 'Round',
      color: 'White',
      coating: 'Film-coated',
      scoring: 'Single Score',
      imprintFront: 'M 500',
      imprintBack: 'Plain',
      diameterMm: 11.0,
      thicknessMm: 4.5,
      weightMg: 520
    },
    batchRules: {
      formatRegex: '^[A-Z0-9]{7,9}$',
      exampleBatch: 'GM500124',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901230009871'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Mottled white surface with irregular dark speckles',
        'Excessive chalky powder inside the blister pocket',
        'Blurry or incorrect font on foil backing'
      ],
      adulterantsFound: ['Talc filler', 'Starch binder', '0% Active API'],
      healthHazards: 'Severe hyperglycemia, diabetic ketoacidosis risk, and long-term diabetic vascular complications.',
      lastAlertDate: '2026-01-28'
    },
    regulatoryInfo: 'CDSCO Schedule G / US FDA Approved Monograph',
    warningInfo: 'Take with meals to minimize gastrointestinal discomfort. Monitor renal function periodically.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED007',
    medicineId: 'MED007',
    medicineName: 'Amlodipine',
    brandName: 'Norvasc / Amlong / Stamlo',
    genericName: 'Amlodipine',
    category: 'Cardiovascular',
    therapeuticCategory: 'Antihypertensive',
    prescriptionRequired: true,
    identificationKeywords: ['Amlodipine', '5 mg', 'Norvasc', 'Amlodipine Besylate', 'MED007'],
    strength: '5 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer / Micro Labs / Dr. Reddy\'s',
    country: 'United States / India / Global',
    riskCategory: 'High',
    description: 'Long-acting dihydropyridine calcium channel blocker used in the management of essential hypertension and chronic stable angina.',
    packaging: {
      boxColor: 'White carton with deep purple/navy blue accents and sharp embossed details',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Cold-form Alu-Alu blister with tight cross-hatch seal',
      fontFamilySpecs: 'Universal Neo-Grotesque font with high-contrast active substance labeling',
      microtextLocation: 'Hairline security microtext along blister margins',
      securitySealType: 'Hologram Sticker',
      securitySealDescription: 'Holographic security seal on carton flap'
    },
    pill: {
      shape: 'Hexagonal',
      color: 'White to Pale Yellow',
      coating: 'Uncoated',
      scoring: 'Single Score',
      imprintFront: 'AML 5',
      imprintBack: 'Score',
      diameterMm: 7.5,
      thicknessMm: 2.8,
      weightMg: 120
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{4}[A-Z]?$',
      exampleBatch: 'AM8901',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '00300694310123'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Round pill shape instead of genuine distinctive hexagonal shape',
        'Missing deboss "AML 5" imprint',
        'Foil that tears with irregular jagged edges'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Underdosed active molecule'],
      healthHazards: 'Hypertensive crisis, elevated risk of stroke, and unstable angina due to lack of blood pressure control.',
      lastAlertDate: '2026-02-22'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA NDA #019787',
    warningInfo: 'Do not stop abruptly. May cause peripheral edema. Store in a dry place below 30°C.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED008',
    medicineId: 'MED008',
    medicineName: 'Atorvastatin',
    brandName: 'Lipitor / Atorva / Storvas',
    genericName: 'Atorvastatin Calcium',
    category: 'Cardiovascular',
    therapeuticCategory: 'Lipid-lowering agent',
    prescriptionRequired: true,
    identificationKeywords: ['Atorvastatin', 'Atorvastatin Calcium', '10 mg', 'Lipitor', 'MED008'],
    strength: '10 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Pfizer / Zydus / Sun Pharma',
    country: 'United States / India / Global',
    riskCategory: 'High',
    description: 'HMG-CoA reductase inhibitor (statin) used to lower LDL cholesterol and triglycerides, reducing cardiovascular mortality and stroke risk.',
    packaging: {
      boxColor: 'White carton with navy blue/gold ribbon design and Braille embossing',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'High-barrier cold formed aluminum foil with high-tensile waffle knurling',
      fontFamilySpecs: 'Clear Sans-Serif font with high-visibility lot numbers',
      microtextLocation: 'Microtext along the blister perimeter margins',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Tamper-evident carton closure'
    },
    pill: {
      shape: 'Oval',
      color: 'White',
      coating: 'Film-coated',
      scoring: 'Unscored',
      imprintFront: 'ATV 10',
      imprintBack: 'PD 155',
      diameterMm: 9.5,
      thicknessMm: 3.6,
      weightMg: 150
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{5}$',
      exampleBatch: 'AT49210',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '00300694110892'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Missing "ATV 10" or "PD 155" imprint',
        'Crumbly edges and chalk residue on fingers',
        'Misaligned packaging typography'
      ],
      adulterantsFound: ['Talc / Starch', 'Inactive powder matrix'],
      healthHazards: 'Uncontrolled hypercholesterolemia leading to plaque progression and myocardial infarction.',
      lastAlertDate: '2026-01-20'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA NDA #020702',
    warningInfo: 'Prescription only. Report unexplained muscle pain or weakness immediately. Protect from light.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED009',
    medicineId: 'MED009',
    medicineName: 'Pantoprazole',
    brandName: 'Pantocid / Pan 40 / Protonix',
    genericName: 'Pantoprazole',
    category: 'Gastrointestinal',
    therapeuticCategory: 'Proton pump inhibitor',
    prescriptionRequired: true,
    identificationKeywords: ['Pantoprazole', '40 mg', 'Pantocid', 'Pan 40', 'MED009'],
    strength: '40 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Alkem Laboratories / Sun Pharma / Pfizer',
    country: 'India / United States / Global',
    riskCategory: 'Moderate',
    description: 'Proton pump inhibitor that suppresses gastric acid secretion, used for gastroesophageal reflux disease (GERD), peptic ulcer disease, and Zollinger-Ellison syndrome.',
    packaging: {
      boxColor: 'White carton with distinctive golden-yellow accents and clear enteric coating labeling',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Alu-Alu cold form blister strip designed to prevent moisture absorption',
      fontFamilySpecs: 'Industrial Sans-Serif font with high-definition laser printing',
      microtextLocation: 'Microtext printed on foil backing margin',
      securitySealType: 'Color-Shift Ink',
      securitySealDescription: 'Manufacturer logo color-shift security seal'
    },
    pill: {
      shape: 'Oval',
      color: 'Yellow',
      coating: 'Film-coated',
      scoring: 'Unscored',
      imprintFront: 'P 40',
      imprintBack: 'Plain',
      diameterMm: 10.2,
      thicknessMm: 4.0,
      weightMg: 190
    },
    batchRules: {
      formatRegex: '^[A-Z]{3}[0-9]{4}$',
      exampleBatch: 'PAN8019',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901043007812'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'White or discolored tablet core without proper enteric yellow coating',
        'Rapid dissolution in water (genuine enteric coating resists acid dissolution for >1 hour)',
        'Thin foil that tears easily'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Yellow food coloring (Tartrazine) with zero API'],
      healthHazards: 'Severe gastric ulcer perforation, acute acid rebound, and untreated GI bleeding.',
      lastAlertDate: '2026-03-12'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA Approved',
    warningInfo: 'Swallow whole with water before morning meal. Do not crush, chew, or split the enteric tablet.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED010',
    medicineId: 'MED010',
    medicineName: 'Omeprazole',
    brandName: 'Prilosec / Omez / Losec',
    genericName: 'Omeprazole',
    category: 'Gastrointestinal',
    therapeuticCategory: 'Proton pump inhibitor',
    prescriptionRequired: true,
    identificationKeywords: ['Omeprazole', '20 mg', 'Omez', 'Prilosec', 'MED010'],
    strength: '20 mg',
    dosageForm: 'Capsule',
    manufacturer: 'Dr. Reddy\'s / AstraZeneca / Generic Pharma',
    country: 'Global / India',
    riskCategory: 'Moderate',
    description: 'Proton pump inhibitor in enteric-coated pellet capsule formulation, used for treatment of duodenal ulcers, gastric ulcers, and reflux esophagitis.',
    packaging: {
      boxColor: 'White carton with purple/lavender gradient and Dr. Reddy\'s distinctive branding',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Strip packaging or Alu-Alu blister with moisture barrier',
      fontFamilySpecs: 'Clear modern sans-serif typography with distinct warning labels',
      microtextLocation: 'Microtext along the blister perforation edges',
      securitySealType: 'Hologram Sticker',
      securitySealDescription: 'Holographic verification tag on package lid'
    },
    pill: {
      shape: 'Capsule',
      color: 'Pink / Brown or Lavender / White (Dual-tone)',
      coating: 'Capsule Shell',
      scoring: 'Unscored',
      imprintFront: 'OMEZ 20',
      imprintBack: 'DRL',
      diameterMm: 15.8,
      thicknessMm: 5.8,
      weightMg: 280
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{6}$',
      exampleBatch: 'OM230891',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901148003219'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Capsule containing plain white powder instead of enteric-coated micro-pellets',
        'Capsule shell easily deformed or sticky from moisture exposure',
        'Smudged lot numbering on foil'
      ],
      adulterantsFound: ['Flour / Starch filler', 'Inactive micro-granules'],
      healthHazards: 'Lack of acid suppression causing persistent heartburn, ulcer progression, and esophagitis.',
      lastAlertDate: '2026-02-05'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA NDA #019810',
    warningInfo: 'Take 30-60 minutes before food. Protect capsules from moisture.',
    referenceImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED011',
    medicineId: 'MED011',
    medicineName: 'Cetirizine',
    brandName: 'Zyrtec / Cetzine / Alerid',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Antiallergic',
    therapeuticCategory: 'Antihistamine',
    prescriptionRequired: false,
    identificationKeywords: ['Cetirizine', 'Cetirizine Hydrochloride', '10 mg', 'Cetzine', 'MED011'],
    strength: '10 mg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK / Dr. Reddy\'s / Cipla',
    country: 'Global / India',
    riskCategory: 'Moderate',
    description: 'Second-generation H1-receptor antihistamine that provides rapid relief from allergic rhinitis, perennial allergic symptoms, and chronic urticaria.',
    packaging: {
      boxColor: 'White carton with bright green/cyan medical banner',
      blisterType: 'PVC-Alu',
      blisterFoilPattern: 'Standard blister strip with high-clarity PVC and foil backing',
      fontFamilySpecs: 'High-contrast sans-serif font',
      microtextLocation: 'Microtext along the foil margins',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Factory sealed blister pack'
    },
    pill: {
      shape: 'Round',
      color: 'White',
      coating: 'Film-coated',
      scoring: 'Single Score',
      imprintFront: 'CT 10',
      imprintBack: 'Score',
      diameterMm: 7.0,
      thicknessMm: 2.6,
      weightMg: 110
    },
    batchRules: {
      formatRegex: '^[A-Z0-9]{6,8}$',
      exampleBatch: 'CT90123',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901086005512'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Chalky tablet that dissolves into cloudy mud within 10 seconds',
        'Missing score mark or blurry imprint',
        'Poorly sealed blister backing'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Corn starch'],
      healthHazards: 'Ineffective allergy relief, potential anaphylaxis complications in acute allergic reactions.',
      lastAlertDate: '2026-01-10'
    },
    regulatoryInfo: 'OTC / Pharmacopoeia Monograph (IP / USP)',
    warningInfo: 'May cause mild drowsiness in sensitive individuals. Do not exceed 10 mg daily.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED012',
    medicineId: 'MED012',
    medicineName: 'Levocetirizine',
    brandName: 'Xyzal / Levocet / Teczine',
    genericName: 'Levocetirizine Dihydrochloride',
    category: 'Antiallergic',
    therapeuticCategory: 'Antihistamine',
    prescriptionRequired: false,
    identificationKeywords: ['Levocetirizine', 'Levocetirizine Dihydrochloride', '5 mg', 'Xyzal', 'MED012'],
    strength: '5 mg',
    dosageForm: 'Tablet',
    manufacturer: 'UCB / Sun Pharma / Glenmark',
    country: 'Global / India',
    riskCategory: 'Moderate',
    description: 'Active R-enantiomer of cetirizine with enhanced H1-receptor affinity, indicated for seasonal allergic rhinitis, ocular pruritus, and chronic idiopathic urticaria.',
    packaging: {
      boxColor: 'White carton with deep turquoise / blue styling and crisp typography',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Alu-Alu cold form strip with high moisture resistance',
      fontFamilySpecs: 'Universal Modern Sans font with distinct strength marking',
      microtextLocation: 'Microtext along the blister perimeter',
      securitySealType: 'Color-Shift Ink',
      securitySealDescription: 'Manufacturer logo verification mark'
    },
    pill: {
      shape: 'Oval',
      color: 'White',
      coating: 'Film-coated',
      scoring: 'Unscored',
      imprintFront: 'LC 5',
      imprintBack: 'Plain',
      diameterMm: 6.5,
      thicknessMm: 2.5,
      weightMg: 95
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{5}$',
      exampleBatch: 'LC45012',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901117008923'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Oversized or irregular tablet shape',
        'Missing deboss "LC 5"',
        'Blister foil that peels off cleanly in one single sheet'
      ],
      adulterantsFound: ['Starch / Chalk binder', '0% Active API'],
      healthHazards: 'Persistent uncontrolled allergic rhinitis, conjunctivitis, and asthma flare-ups.',
      lastAlertDate: '2026-02-14'
    },
    regulatoryInfo: 'OTC / Prescription according to regional jurisdiction',
    warningInfo: 'Take once daily in the evening. Avoid alcohol consumption during therapy.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED013',
    medicineId: 'MED013',
    medicineName: 'Ibuprofen',
    brandName: 'Brufen / Advil / Motrin',
    genericName: 'Ibuprofen',
    category: 'Analgesic',
    therapeuticCategory: 'NSAID',
    prescriptionRequired: false,
    identificationKeywords: ['Ibuprofen', '400 mg', 'Brufen', 'Advil', 'MED013'],
    strength: '400 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Abbott / Pfizer / Generic Pharma',
    country: 'Global / United States / India',
    riskCategory: 'Moderate',
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) with analgesic and antipyretic properties, indicated for arthritis, dental pain, dysmenorrhea, and inflammatory disorders.',
    packaging: {
      boxColor: 'White carton with deep magenta/pink accent stripe and clear strength banner',
      blisterType: 'PVC-Alu',
      blisterFoilPattern: 'High-clarity blister cavities with push-through backing foil',
      fontFamilySpecs: 'Clear bold typography with prominent active ingredient label',
      microtextLocation: 'Microtext along the foil borders',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Tamper-evident carton seal'
    },
    pill: {
      shape: 'Round',
      color: 'Magenta / Pink',
      coating: 'Film-coated',
      scoring: 'Single Score',
      imprintFront: 'BRUFEN 400',
      imprintBack: 'Score',
      diameterMm: 11.5,
      thicknessMm: 4.6,
      weightMg: 510
    },
    batchRules: {
      formatRegex: '^[A-Z0-9]{6,8}$',
      exampleBatch: 'BF40091',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901043001290'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Dull faded pink or white mottled color',
        'Chalky dust coating the inside of the blister cavity',
        'Missing deboss "BRUFEN 400" stamp'
      ],
      adulterantsFound: ['Industrial chalk', 'Cornstarch', 'Sub-therapeutic active compound'],
      healthHazards: 'Lack of anti-inflammatory relief and potential gastric irritation from toxic excipients.',
      lastAlertDate: '2026-01-05'
    },
    regulatoryInfo: 'OTC / Pharmacopoeia Monograph (IP / BP / USP)',
    warningInfo: 'Take with or after food. Contraindicated in active peptic ulcer disease and severe renal impairment.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED014',
    medicineId: 'MED014',
    medicineName: 'Diclofenac',
    brandName: 'Voveran / Voltaren / Diclogel',
    genericName: 'Diclofenac Sodium',
    category: 'Analgesic',
    therapeuticCategory: 'NSAID',
    prescriptionRequired: true,
    identificationKeywords: ['Diclofenac', 'Diclofenac Sodium', '50 mg', 'Voveran', 'MED014'],
    strength: '50 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Novartis / Sun Pharma / Cipla',
    country: 'Switzerland / India / Global',
    riskCategory: 'High',
    description: 'Potent nonsteroidal anti-inflammatory drug (NSAID) with pronounced analgesic, anti-inflammatory, and antipyretic properties for acute musculoskeletal injuries and rheumatoid arthritis.',
    packaging: {
      boxColor: 'White carton with distinctive orange/blue band and Novartis / Sun Pharma branding',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Alu-Alu cold form blister strip with high moisture and light protection',
      fontFamilySpecs: 'Universal Modern Sans with Schedule H Rx warning',
      microtextLocation: 'Microtext along the blister perimeter margins',
      securitySealType: 'Hologram Sticker',
      securitySealDescription: 'Tamper-evident holographic strip on carton lid'
    },
    pill: {
      shape: 'Round',
      color: 'Light Brown / Orange-Yellow',
      coating: 'Film-coated',
      scoring: 'Unscored',
      imprintFront: 'VOV 50',
      imprintBack: 'Plain',
      diameterMm: 8.0,
      thicknessMm: 3.2,
      weightMg: 160
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{5}$',
      exampleBatch: 'VN50291',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901117006741'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Chalky white tablet lacking genuine orange-yellow enteric film coat',
        'Missing deboss "VOV 50"',
        'Blister foil that easily peels off by hand'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Corn starch', 'Under-dosed API'],
      healthHazards: 'Uncontrolled chronic inflammatory pain, severe arthritis flare-ups, and gastric risk from toxic binders.',
      lastAlertDate: '2026-02-19'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA Approved',
    warningInfo: 'Prescription only. Take with meals. Use lowest effective dose for the shortest duration necessary.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED015',
    medicineId: 'MED015',
    medicineName: 'Losartan',
    brandName: 'Cozaar / Losacar / Repace',
    genericName: 'Losartan Potassium',
    category: 'Cardiovascular',
    therapeuticCategory: 'Antihypertensive',
    prescriptionRequired: true,
    identificationKeywords: ['Losartan', 'Losartan Potassium', '50 mg', 'Cozaar', 'MED015'],
    strength: '50 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Merck & Co. / Zydus / Sun Pharma',
    country: 'United States / India / Global',
    riskCategory: 'High',
    description: 'Angiotensin II Receptor Blocker (ARB) prescribed for essential hypertension, reduction of stroke risk in hypertensive patients with left ventricular hypertrophy, and diabetic nephropathy.',
    packaging: {
      boxColor: 'White carton with deep navy and cyan design with high-definition laser batch details',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Reinforced Alu-Alu barrier strip with waffle knurling',
      fontFamilySpecs: 'Precision sans-serif font with clear strength designation',
      microtextLocation: 'Hairline security microtext along blister margins',
      securitySealType: 'Color-Shift Ink',
      securitySealDescription: 'Manufacturer logo color-shift security seal'
    },
    pill: {
      shape: 'Oval',
      color: 'White',
      coating: 'Film-coated',
      scoring: 'Single Score',
      imprintFront: '952',
      imprintBack: 'Score',
      diameterMm: 9.8,
      thicknessMm: 3.8,
      weightMg: 180
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{4}[A-Z]?$',
      exampleBatch: 'LS5092',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '00300694501239'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Round shape instead of authentic teardrop/oval shape',
        'Missing debossed "952" imprint',
        'Foil backing with blurry ink bleed'
      ],
      adulterantsFound: ['Chalk / Talc', 'Carcinogenic nitrosamine impurities / underdosed API'],
      healthHazards: 'Hypertensive emergency, accelerated renal failure in diabetics, and increased cardiovascular events.',
      lastAlertDate: '2026-03-02'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA NDA #020386',
    warningInfo: 'Contraindicated in pregnancy (fetal toxicity). Monitor serum potassium and creatinine periodically.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED016',
    medicineId: 'MED016',
    medicineName: 'Telmisartan',
    brandName: 'Micardis / Telma / Telmikind',
    genericName: 'Telmisartan',
    category: 'Cardiovascular',
    therapeuticCategory: 'Antihypertensive',
    prescriptionRequired: true,
    identificationKeywords: ['Telmisartan', '40 mg', 'Telma', 'Micardis', 'MED016'],
    strength: '40 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Boehringer Ingelheim / Glenmark / Mankind',
    country: 'Germany / India / Global',
    riskCategory: 'High',
    description: 'Potent, long-acting non-peptide angiotensin II receptor blocker (ARB) with a 24-hour terminal elimination half-life, used for cardiovascular risk reduction and hypertension.',
    packaging: {
      boxColor: 'White carton with deep red/maroon styling and clear Glenmark / Boehringer branding',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'High-barrier cold form Alu-Alu blister to prevent moisture degradation',
      fontFamilySpecs: 'Universal Clean Sans font with high-visibility lot details',
      microtextLocation: 'Microtext along the foil edges',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Factory heat-sealed carton flap'
    },
    pill: {
      shape: 'Oblong',
      color: 'White to Off-White',
      coating: 'Uncoated',
      scoring: 'Single Score',
      imprintFront: 'TL 40',
      imprintBack: 'Score',
      diameterMm: 12.0,
      thicknessMm: 4.2,
      weightMg: 240
    },
    batchRules: {
      formatRegex: '^[A-Z]{3}[0-9]{4}$',
      exampleBatch: 'TLM4012',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901117009812'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Powdery pill that sticks to the blister cavity due to moisture breakdown',
        'Missing deboss "TL 40"',
        'Misaligned packaging typography'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Corn starch binder'],
      healthHazards: 'Lack of blood pressure control leading to hypertensive crisis, heart failure exacerbation, or stroke.',
      lastAlertDate: '2026-02-28'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA NDA #020850',
    warningInfo: 'Contraindicated in pregnancy. Store in original moisture-barrier blister until immediately before consumption.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED017',
    medicineId: 'MED017',
    medicineName: 'Levothyroxine',
    brandName: 'Synthroid / Eltroxin / Thyronorm',
    genericName: 'Levothyroxine Sodium',
    category: 'Endocrine',
    therapeuticCategory: 'Thyroid hormone',
    prescriptionRequired: true,
    identificationKeywords: ['Levothyroxine', 'Levothyroxine Sodium', '50 mcg', 'Thyronorm', 'Synthroid', 'MED017'],
    strength: '50 mcg',
    dosageForm: 'Tablet',
    manufacturer: 'Abbott / GSK / Pfizer',
    country: 'United States / India / Global',
    riskCategory: 'Critical',
    description: 'Synthetic levorotatory isomer of thyroxine (T4) prescribed for hypothyroidism, pituitary TSH suppression, and thyroid goiter management. Critical narrow therapeutic index drug.',
    packaging: {
      boxColor: 'White carton with distinctive light blue / turquoise panel and Abbott / GSK branding',
      blisterType: 'HDPE Bottle',
      blisterFoilPattern: 'Child-resistant HDPE container with induction heat-sealed inner foil liner and silica gel desiccant',
      fontFamilySpecs: 'High-precision micro-typography with distinct strength in micrograms (mcg)',
      microtextLocation: 'Microtext along the perimeter of the bottle label',
      securitySealType: 'Color-Shift Ink',
      securitySealDescription: 'Induction tamper-evident neck seal with color-shift authenticity logo'
    },
    pill: {
      shape: 'Round',
      color: 'White',
      coating: 'Uncoated',
      scoring: 'Single Score',
      imprintFront: '50',
      imprintBack: 'Plain',
      diameterMm: 6.0,
      thicknessMm: 2.4,
      weightMg: 80
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{5}$',
      exampleBatch: 'TH50891',
      shelfLifeMonths: 24,
      has2DDataMatrix: true,
      gtinCode: '08901043009021'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Broken or missing induction foil seal under the bottle cap',
        'Pills with irregular thickness and missing "50" deboss',
        'Mottled pill surface with dark spots'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Lactose filler with 0% thyroid hormone API'],
      healthHazards: 'Profound hypothyroid coma, severe fatigue, weight gain, cardiac dysfunction, and myxedema crisis.',
      lastAlertDate: '2026-03-08'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA Narrow Therapeutic Index Monograph',
    warningInfo: 'Take on an empty stomach with a full glass of water at least 30-60 minutes before breakfast.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED018',
    medicineId: 'MED018',
    medicineName: 'Montelukast',
    brandName: 'Singulair / Montair / Telekast',
    genericName: 'Montelukast Sodium',
    category: 'Respiratory',
    therapeuticCategory: 'Leukotriene receptor antagonist',
    prescriptionRequired: true,
    identificationKeywords: ['Montelukast', 'Montelukast Sodium', '10 mg', 'Montair', 'Singulair', 'MED018'],
    strength: '10 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Cipla / Merck & Co. / Sun Pharma',
    country: 'India / United States / Global',
    riskCategory: 'Moderate',
    description: 'Potent and selective leukotriene D4 receptor antagonist used for the prophylaxis and chronic treatment of bronchial asthma, exercise-induced bronchoconstriction, and allergic rhinitis.',
    packaging: {
      boxColor: 'White carton with deep blue / teal accents and Cipla / MSD branding',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Light-resistant Alu-Alu blister to prevent photodegradation',
      fontFamilySpecs: 'Precision Sans-Serif font with high-visibility lot numbers',
      microtextLocation: 'Microtext along the blister foil margins',
      securitySealType: 'Hologram Sticker',
      securitySealDescription: 'Holographic security strip on carton flap'
    },
    pill: {
      shape: 'Square / Rounded Square',
      color: 'Beige to Pale Yellow',
      coating: 'Film-coated',
      scoring: 'Unscored',
      imprintFront: 'M 10',
      imprintBack: 'Plain',
      diameterMm: 8.2,
      thicknessMm: 3.5,
      weightMg: 175
    },
    batchRules: {
      formatRegex: '^[A-Z]{3}[0-9]{4}$',
      exampleBatch: 'MON8910',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901086007821'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Round pill shape instead of authentic rounded-square shape',
        'Missing deboss "M 10"',
        'Blister foil that tears with paper-thin resistance'
      ],
      adulterantsFound: ['Talc / Starch', 'Inactive yellow binder'],
      healthHazards: 'Acute asthma exacerbation, severe wheezing, and nocturnal respiratory distress.',
      lastAlertDate: '2026-01-22'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA NDA #020829',
    warningInfo: 'Take once daily in the evening for asthma. Not indicated for the reversal of acute bronchospasm.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED019',
    medicineId: 'MED019',
    medicineName: 'Furosemide',
    brandName: 'Lasix / Frusenex',
    genericName: 'Furosemide',
    category: 'Cardiovascular',
    therapeuticCategory: 'Diuretic',
    prescriptionRequired: true,
    identificationKeywords: ['Furosemide', '40 mg', 'Lasix', 'Frusenex', 'MED019'],
    strength: '40 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Sanofi / Generic Pharma',
    country: 'France / Global / India',
    riskCategory: 'High',
    description: 'Potent loop diuretic that inhibits the sodium-potassium-chloride (Na+/K+/2Cl-) symporter in the thick ascending limb of the loop of Henle, indicated for pulmonary edema, congestive heart failure, and hypertension.',
    packaging: {
      boxColor: 'White carton with deep yellow / grey Sanofi brand livery and tactile Braille',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Light-shielded Alu-Alu blister strip',
      fontFamilySpecs: 'High-contrast sans-serif font',
      microtextLocation: 'Microtext along the foil borders',
      securitySealType: 'Tamper-Evident Perforation',
      securitySealDescription: 'Factory sealed blister pack'
    },
    pill: {
      shape: 'Round',
      color: 'White',
      coating: 'Uncoated',
      scoring: 'Cross Score',
      imprintFront: 'LASIX 40',
      imprintBack: 'Cross Score',
      diameterMm: 8.5,
      thicknessMm: 3.1,
      weightMg: 150
    },
    batchRules: {
      formatRegex: '^[A-Z0-9]{6,8}$',
      exampleBatch: 'LX40982',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901230004512'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'Missing distinctive 4-way cross score on the reverse side',
        'Chalky crumbling tablet that leaves white residue on fingers',
        'Smudgy batch numbers'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Corn starch'],
      healthHazards: 'Severe fluid retention, acute decompensated heart failure, pulmonary edema, and sudden hypertensive crisis.',
      lastAlertDate: '2026-02-15'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA Monograph',
    warningInfo: 'Potent diuretic. Monitor serum electrolytes, BUN, and creatinine. Protect from direct light.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'MED020',
    medicineId: 'MED020',
    medicineName: 'Ondansetron',
    brandName: 'Zofran / Emeset / Ondem',
    genericName: 'Ondansetron',
    category: 'General',
    therapeuticCategory: 'Antiemetic',
    prescriptionRequired: true,
    identificationKeywords: ['Ondansetron', '4 mg', '8 mg', 'Emeset', 'Zofran', 'MED020'],
    strength: '4 mg',
    dosageForm: 'Tablet',
    manufacturer: 'GSK / Cipla / Alkem',
    country: 'United Kingdom / India / Global',
    riskCategory: 'Moderate',
    description: 'Selective 5-HT3 receptor antagonist used for the prevention of nausea and vomiting associated with emetogenic cancer chemotherapy, radiotherapy, and postoperative states.',
    packaging: {
      boxColor: 'White carton with distinctive blue/orange band and high-definition laser batch stamp',
      blisterType: 'Alu-Alu',
      blisterFoilPattern: 'Alu-Alu moisture-barrier blister',
      fontFamilySpecs: 'Universal Modern Sans with Schedule H Rx marking',
      microtextLocation: 'Microtext along the foil edges',
      securitySealType: 'Hologram Sticker',
      securitySealDescription: 'Holographic security seal on carton flap'
    },
    pill: {
      shape: 'Oval',
      color: 'Yellow',
      coating: 'Film-coated',
      scoring: 'Unscored',
      imprintFront: 'OND 4',
      imprintBack: 'Plain',
      diameterMm: 7.2,
      thicknessMm: 2.9,
      weightMg: 110
    },
    batchRules: {
      formatRegex: '^[A-Z]{2}[0-9]{5}$',
      exampleBatch: 'ON40891',
      shelfLifeMonths: 36,
      has2DDataMatrix: true,
      gtinCode: '08901086004912'
    },
    knownCounterfeits: {
      commonFakeFlaws: [
        'White or discolored pill without yellow film coating',
        'Missing deboss "OND 4"',
        'Blister foil with blurry low-resolution printing'
      ],
      adulterantsFound: ['Chalk / Calcium Carbonate', 'Yellow food dye with zero API'],
      healthHazards: 'Uncontrolled chemotherapy-induced nausea, intractable vomiting, severe dehydration, and electrolyte depletion.',
      lastAlertDate: '2026-03-05'
    },
    regulatoryInfo: 'CDSCO Schedule H / US FDA NDA #020007',
    warningInfo: 'Prescription only. May cause mild headache or constipation. Store below 30°C.',
    referenceImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  }
];

export interface SampleTestCase {
  id: string;
  name: string;
  type: 'genuine' | 'counterfeit' | 'non-medicine';
  description: string;
  expectedStatus: 'VERIFIED_AGAINST_AVAILABLE_DATA' | 'SUSPICIOUS_REQUIRES_VERIFICATION' | 'UNABLE_TO_VERIFY';
  imageUrl: string;
  tag: string;
}

export const SAMPLE_TEST_CASES: SampleTestCase[] = [
  {
    id: 'sample-sertraline-auth',
    name: 'Sertraline 50 mg (Genuine Authentic)',
    type: 'genuine',
    description: 'Pfizer authentic blister with clear "ZLT 50" deboss and verified lot FL8921.',
    expectedStatus: 'VERIFIED_AGAINST_AVAILABLE_DATA',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    tag: 'Authentic Monograph Match'
  },
  {
    id: 'sample-lithosun-fake',
    name: 'Lithosun SR 400 (Counterfeit Clone)',
    type: 'counterfeit',
    description: 'Sun Pharma cloned packaging with static fake gold seal and chalky tablet.',
    expectedStatus: 'SUSPICIOUS_REQUIRES_VERIFICATION',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    tag: 'Seizure Alert Match'
  },
  {
    id: 'sample-amox-auth',
    name: 'Amoxicillin 500 mg (Authentic GSK)',
    type: 'genuine',
    description: 'Genuine dual-tone capsule in authentic Alu-Alu cold form blister.',
    expectedStatus: 'VERIFIED_AGAINST_AVAILABLE_DATA',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    tag: 'Verified Batch AX59201'
  }
];

export const INITIAL_ALERTS: CounterfeitAlert[] = [
  {
    id: 'ALERT-2026-001',
    medicineName: 'Lithosun SR (Lithium Carbonate 400mg)',
    detectedBatchNumber: 'JK4829-FAKE',
    affectedRegions: ['Mumbai', 'Maharashtra', 'Gujarat (India)', 'Online Pharmacies'],
    severity: 'CRITICAL',
    reportedDate: '2026-03-04',
    summary: 'Counterfeit lot with identical brand markings and cloned batch number. Failed 45° optical variable ink test and contains sub-therapeutic API levels with heavy metal contaminants.',
    indicators: [
      'Gold OVI seal does NOT shift to emerald green under 45-degree angle tilt',
      'Tablet crumbles into chalky powder under light fingertip pressure',
      'Debossed imprint is shallow (0.12mm vs genuine 0.35mm)',
      'Batch code cloned from genuine 2024 production run'
    ],
    verifiedManufacturerNotice: 'Sun Pharma Official Seizure Bulletin ref: SP-SEC-2026-089',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ALERT-2026-002',
    medicineName: 'Sertraline 50mg Tablets (Zoloft / Generic)',
    detectedBatchNumber: 'FL8921-CLONE',
    affectedRegions: ['Delhi NCR', 'Punjab', 'Rajasthan (India)'],
    severity: 'HIGH',
    reportedDate: '2026-02-18',
    summary: 'Fake blister strips with cloned lot numbers circulating in wholesale markets. Tested sample showed 0% active Sertraline with substituted diazepam traces.',
    indicators: [
      'Missing microprinted "PFIZER HEALTH AUTHENTIC" on blister margins',
      'Mottled dark-blue tablet color with irregular speckles',
      'Blister foil easily peels off without tearing resistance'
    ],
    verifiedManufacturerNotice: 'CDSCO National Alert Notice #CDSCO-QC-2026-114',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ALERT-2026-003',
    medicineName: 'Augmentin 625 Duo (Amoxicillin + Clavulanate)',
    detectedBatchNumber: 'AG6259-MAL',
    affectedRegions: ['Uttar Pradesh', 'Bihar', 'West Bengal'],
    severity: 'CRITICAL',
    reportedDate: '2026-01-29',
    summary: 'Spurious antibiotic tablets with zero active Clavulanic acid. Packaged in imitation Alu-Alu strips with blurred manufacturer logos.',
    indicators: [
      'Spelling mistake on back foil: "GlaxoSmithKlne" missing "i"',
      'No 2D DataMatrix code on individual blister blisters',
      'Tablets turn yellow/brown immediately when exposed to ambient air'
    ],
    verifiedManufacturerNotice: 'GSK Global Anti-Illicit Trade Unit Alert #GSK-AIT-2026-04',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-001',
    medicineName: 'Lithosun SR 400',
    batchNumber: 'JK4829',
    pharmacyName: 'Shree Medico Chemists',
    location: 'Andheri West, Mumbai',
    notes: 'Bought this pack yesterday. When tilted, the gold logo does not change color to green like my previous strip. Tablet broke in half inside the blister cavity.',
    reportedDate: '2026-03-02',
    riskRating: 'High',
    status: 'CONFIRMED_FAKE'
  },
  {
    id: 'rep-002',
    medicineName: 'Sertraline 50 mg',
    batchNumber: 'FL8921',
    pharmacyName: 'Central Health Pharmacy',
    location: 'Sector 18, Noida',
    notes: 'Pills have a strong chemical paint smell. Imprint says ZLT 50 but the font looks thick and smudged.',
    reportedDate: '2026-02-25',
    riskRating: 'Critical',
    status: 'UNDER_INVESTIGATION'
  }
];
