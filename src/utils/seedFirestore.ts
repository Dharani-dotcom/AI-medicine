import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { INITIAL_MEDICINES, INITIAL_ALERTS, INITIAL_COMMUNITY_REPORTS } from '../data/medicineDatabase';

export async function seedFirestoreDatabase(forceOverwrite = false): Promise<{ success: boolean; count: number; message: string }> {
  if (!db) {
    return { success: false, count: 0, message: 'Firestore is not initialized.' };
  }

  try {
    let totalSeeded = 0;

    // 1. Seed medicines monographs
    for (const med of INITIAL_MEDICINES) {
      const docRef = doc(db, 'medicines', med.id);
      await setDoc(docRef, {
        ...med,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      totalSeeded++;
    }

    // 2. Seed regulatory alerts
    for (const alert of INITIAL_ALERTS) {
      const docRef = doc(db, 'alerts', alert.id);
      await setDoc(docRef, {
        ...alert,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      totalSeeded++;
    }

    // 3. Seed community reports
    for (const report of INITIAL_COMMUNITY_REPORTS) {
      const docRef = doc(db, 'reports', report.id);
      await setDoc(docRef, {
        id: report.id,
        medicineName: report.medicineName,
        batchNumber: report.batchNumber,
        pharmacyOrLocation: `${report.pharmacyName} (${report.location})`,
        description: report.notes,
        reportedAt: report.reportedDate || new Date().toISOString().split('T')[0],
        userId: 'anonymous',
        riskRating: report.riskRating,
        status: report.status
      }, { merge: true });
      totalSeeded++;
    }

    // 4. Seed initial verified scan specimen record into 'scans' collection
    const sampleScanId = 'scan-seed-sertraline-01';
    await setDoc(doc(db, 'scans', sampleScanId), {
      id: sampleScanId,
      timestamp: new Date().toISOString(),
      medicineName: 'Sertraline 50 mg Tablets (Zoloft / Generic)',
      genericName: 'Sertraline Hydrochloride',
      detectedManufacturer: 'Pfizer Inc. / Viatris Inc.',
      strength: '50 mg',
      batchNumber: 'FL8921',
      mfgDate: '09/2025',
      expiryDate: '08/2028',
      verificationStatus: 'VERIFIED_AGAINST_AVAILABLE_DATA',
      overallSummary: 'Visual, deboss imprint ("ZLT 50"), and lot formatting match official pharmaceutical reference monograph.',
      ocrConfidence: 96,
      packageSimilarity: 94,
      medicineIdConfidence: 97,
      imageQualityScore: 92,
      rawOcrText: 'Sertraline 50 mg Tablets\nPfizer Inc.\nLot: FL8921 Exp: 08/2028',
      userId: 'anonymous'
    }, { merge: true });
    totalSeeded++;

    return {
      success: true,
      count: totalSeeded,
      message: `Successfully seeded ${totalSeeded} documents across medicines, alerts, reports, and scans collections in Firestore!`
    };
  } catch (error: any) {
    console.error('Error seeding Firestore:', error);
    return {
      success: false,
      count: 0,
      message: error?.message || 'Failed to seed Firestore database.'
    };
  }
}
