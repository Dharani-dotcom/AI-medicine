import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { PWAInstallModal } from './components/PWAInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { HomeScreen } from './components/HomeScreen';
import { CameraScanner } from './components/CameraScanner';
import { InspectionReportView } from './components/InspectionReportView';
import { MedicineDatabaseView } from './components/MedicineDatabaseView';
import { ScannedHistoryView, ScannedHistoryItem } from './components/ScannedHistoryView';
import { BatchVerifierTool } from './components/BatchVerifierTool';
import { LiveAlertsFeed } from './components/LiveAlertsFeed';
import { AboutDisclaimerView } from './components/AboutDisclaimerView';
import { ForensicLabSuite } from './components/ForensicLabSuite';
import { TrueMedDiscrepancyStudio } from './components/TrueMedDiscrepancyStudio';
import { AIChatbotView } from './components/AIChatbotView';
import { ReportCounterfeitModal } from './components/ReportCounterfeitModal';
import { CounterfeitAlert, CommunityReport, VerificationReport, MedicineSpec } from './types/pharmacy';
import { INITIAL_MEDICINES, INITIAL_ALERTS, INITIAL_COMMUNITY_REPORTS } from './data/medicineDatabase';
import { usePWAInstall } from './hooks/usePWAInstall';
import { ShieldCheck, Download, Database, RefreshCw, CheckCircle2, Bot, X, MessageSquare, Sparkles } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { seedFirestoreDatabase } from './utils/seedFirestore';
import { AppTab } from './components/Navbar';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [medicines, setMedicines] = useState<MedicineSpec[]>(INITIAL_MEDICINES);
  const [alerts, setAlerts] = useState<CounterfeitAlert[]>(INITIAL_ALERTS);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>(INITIAL_COMMUNITY_REPORTS);
  const [scannedHistory, setScannedHistory] = useState<ScannedHistoryItem[]>([]);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(true);
  const [isSeedingDb, setIsSeedingDb] = useState<boolean>(false);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState<boolean>(false);

  const [currentReport, setCurrentReport] = useState<VerificationReport | null>(null);

  // PWA Install Hook
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isAndroid,
    isIframe,
    isOpenModal: isPWAInstallModalOpen,
    openModal: openPWAInstallModal,
    closeModal: closePWAInstallModal,
    install: installPWA
  } = usePWAInstall();

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedReportForModal, setSelectedReportForModal] = useState<VerificationReport | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Seed / Sync Firestore on initial load
  useEffect(() => {
    const bootstrapFirestore = async () => {
      try {
        const result = await seedFirestoreDatabase();
        if (result.success) {
          console.log('Firestore bootstrapped:', result.message);
        }
      } catch (err) {
        console.warn('Firestore bootstrap note:', err);
      }
    };

    bootstrapFirestore();
  }, []);

  // Initial fetch for baseline data
  useEffect(() => {
    const fetchState = async () => {
      try {
        const [alertRes, repRes, histRes, medRes] = await Promise.all([
          fetch('/api/alerts'),
          fetch('/api/reports'),
          fetch('/api/scanned-history'),
          fetch('/api/medicines')
        ]);

        if (alertRes.ok) {
          const alertData = await alertRes.json();
          if (alertData.success && alertData.data?.length) setAlerts(alertData.data);
        }
        if (repRes.ok) {
          const repData = await repRes.json();
          if (repData.success && repData.data?.length) setCommunityReports(repData.data);
        }
        if (histRes.ok) {
          const histData = await histRes.json();
          if (histData.success && histData.data) setScannedHistory(histData.data);
        }
        if (medRes.ok) {
          const medData = await medRes.json();
          if (medData.success && medData.data?.length) setMedicines(medData.data);
        }
      } catch (err) {
        console.warn('Initial state fetch notice:', err);
      }
    };

    fetchState();
  }, []);

  // Real-Time Firebase Firestore Synchronization
  useEffect(() => {
    if (!db) return;

    // Real-time scans listener
    const scansPath = 'scans';
    const scansUnsub = onSnapshot(
      collection(db, scansPath),
      snapshot => {
        setIsDbConnected(true);
        if (!snapshot.empty) {
          const remoteScans: ScannedHistoryItem[] = [];
          snapshot.forEach(docSnap => {
            const data = docSnap.data();
            remoteScans.push({
              id: data.id || docSnap.id,
              timestamp: data.timestamp || new Date().toISOString(),
              medicineName: data.medicineName || 'Medicine',
              genericName: data.genericName || '',
              detectedManufacturer: data.detectedManufacturer || '',
              strength: data.strength || '',
              batchNumber: data.batchNumber || 'N/A',
              verificationStatus: data.verificationStatus || 'UNABLE_TO_VERIFY',
              confidenceScores: {
                overallConfidence: data.ocrConfidence || 90,
                ocrConfidence: data.ocrConfidence || 90,
                packageSimilarity: data.packageSimilarity || 90
              },
              imageThumbnail: data.imageThumbnail || '',
              overallSummary: data.overallSummary || ''
            });
          });
          remoteScans.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setScannedHistory(prev => {
            const merged = [...remoteScans];
            prev.forEach(p => {
              if (!merged.some(m => m.id === p.id)) merged.push(p);
            });
            return merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          });
        }
      },
      error => {
        console.warn('Realtime scans listener note:', error);
      }
    );

    // Real-time community reports listener
    const reportsPath = 'reports';
    const reportsUnsub = onSnapshot(
      collection(db, reportsPath),
      snapshot => {
        if (!snapshot.empty) {
          const remoteReports: CommunityReport[] = [];
          snapshot.forEach(docSnap => {
            const data = docSnap.data();
            remoteReports.push({
              id: data.id || docSnap.id,
              medicineName: data.medicineName || '',
              batchNumber: data.batchNumber || '',
              location: data.pharmacyOrLocation || data.location || '',
              pharmacyName: data.pharmacyOrLocation || data.pharmacyName || '',
              reportedDate: data.reportedAt || data.reportedDate || '',
              status: 'Investigating',
              notes: data.description || data.notes || '',
              riskRating: data.riskRating || 90
            });
          });
          setCommunityReports(prev => {
            const combined = [...remoteReports];
            prev.forEach(p => {
              if (!combined.some(c => c.id === p.id)) combined.push(p);
            });
            return combined;
          });
        }
      },
      error => {
        console.warn('Realtime reports listener note:', error);
      }
    );

    // Real-time medicines monographs listener
    const medsUnsub = onSnapshot(
      collection(db, 'medicines'),
      snapshot => {
        if (!snapshot.empty) {
          const remoteMeds: MedicineSpec[] = [];
          snapshot.forEach(docSnap => {
            remoteMeds.push(docSnap.data() as MedicineSpec);
          });
          if (remoteMeds.length > 0) {
            setMedicines(remoteMeds);
          }
        }
      },
      error => {
        console.warn('Realtime medicines listener note:', error);
      }
    );

    return () => {
      scansUnsub();
      reportsUnsub();
      medsUnsub();
    };
  }, []);

  const handleManualSeedFirestore = async () => {
    setIsSeedingDb(true);
    try {
      const res = await seedFirestoreDatabase(true);
      if (res.success) {
        showToast(`🎉 Firestore Populated! ${res.count} documents created across medicines, alerts, reports & scans.`);
      } else {
        showToast(`Seed note: ${res.message}`);
      }
    } catch (e: any) {
      showToast(`Error seeding database: ${e?.message}`);
    } finally {
      setIsSeedingDb(false);
    }
  };

  const handleReportGenerated = async (report: VerificationReport) => {
    setCurrentReport(report);
    const newItem: ScannedHistoryItem = {
      id: report.id,
      timestamp: report.timestamp,
      medicineName: report.detectedMedicine.name,
      genericName: report.detectedMedicine.genericName,
      detectedManufacturer: report.detectedMedicine.manufacturer,
      strength: report.detectedMedicine.strength,
      batchNumber: report.extractedData?.batchNumber || 'N/A',
      verificationStatus: report.verificationStatus,
      confidenceScores: report.confidenceMetrics,
      imageThumbnail: report.analyzedImage,
      overallSummary: report.overallVerdict
    };
    setScannedHistory(prev => [newItem, ...prev.filter(i => i.id !== newItem.id)]);

    // Write real-time scan record into Firestore
    try {
      if (db) {
        const path = 'scans';
        await setDoc(doc(db, path, report.id), {
          id: report.id,
          timestamp: report.timestamp,
          medicineName: report.detectedMedicine.name,
          genericName: report.detectedMedicine.genericName,
          detectedManufacturer: report.detectedMedicine.manufacturer,
          strength: report.detectedMedicine.strength || '',
          batchNumber: report.extractedData?.batchNumber || 'N/A',
          mfgDate: report.extractedData?.mfgDate || '',
          expiryDate: report.extractedData?.expiryDate || '',
          verificationStatus: report.verificationStatus,
          overallSummary: report.overallVerdict,
          ocrConfidence: report.confidenceMetrics.ocrConfidence,
          packageSimilarity: report.confidenceMetrics.packageSimilarity,
          medicineIdConfidence: report.confidenceMetrics.medicineIdConfidence,
          imageQualityScore: report.confidenceMetrics.imageQualityScore,
          rawOcrText: report.extractedData?.rawOcrText || '',
          userId: 'anonymous'
        });
        showToast('Scan saved to real-time Firestore database.');
      }
    } catch (fsErr) {
      console.warn('Firestore write notification:', fsErr);
    }
  };

  const handleClearHistory = async () => {
    setScannedHistory([]);
    try {
      await fetch('/api/scanned-history/all', { method: 'DELETE' });
    } catch {
      // ignore
    }
    showToast('Scanned history ledger cleared.');
  };

  const handleOpenReportCounterfeit = (rep?: VerificationReport) => {
    setSelectedReportForModal(rep || currentReport || null);
    setIsReportModalOpen(true);
  };

  const handleNewCommunityReportAdded = async (newRep: CommunityReport) => {
    setCommunityReports(prev => [newRep, ...prev]);
    showToast(`Batch ${newRep.batchNumber} added to community vigilance log.`);

    // Write to Firestore reports collection
    try {
      if (db) {
        await setDoc(doc(db, 'reports', newRep.id), {
          id: newRep.id,
          medicineName: newRep.medicineName,
          batchNumber: newRep.batchNumber,
          pharmacyOrLocation: `${newRep.pharmacyName} (${newRep.location})`,
          description: newRep.notes,
          reportedAt: new Date().toISOString(),
          userId: 'anonymous'
        });
      }
    } catch (err) {
      console.warn('Firestore report write notice:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* PWA Install Top Notification */}
      <PWAInstallBanner />

      {/* PWA Home Screen Download Pop-up Modal */}
      <PWAInstallModal
        isOpen={isPWAInstallModalOpen}
        onClose={closePWAInstallModal}
        onInstall={installPWA}
        isInstallable={isInstallable}
        isIOS={isIOS}
        isAndroid={isAndroid}
        isIframe={isIframe}
        isInstalled={isInstalled}
      />

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
        }}
        alertCount={alerts.length}
        historyCount={scannedHistory.length}
        onOpenInstallModal={openPWAInstallModal}
        isInstalled={isInstalled}
        isDbConnected={isDbConnected}
      />

      {/* Floating Download App Trigger */}
      {!isInstalled && (
        <button
          onClick={openPWAInstallModal}
          className="fixed bottom-18 md:bottom-6 right-4 z-40 bg-teal-800 hover:bg-teal-700 text-white px-3.5 py-2 rounded-full shadow-lg text-xs font-bold flex items-center gap-2 border border-teal-600 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4 text-teal-200" />
          <span>Download App</span>
        </button>
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-28 md:bottom-16 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl text-xs shadow-2xl font-medium border border-teal-500/50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8">
        {activeTab === 'home' && (
          <HomeScreen
            onStartScan={() => {
              setCurrentReport(null);
              setActiveTab('scanner');
            }}
            onOpenDatabase={() => setActiveTab('database')}
            onOpenBatchVerifier={() => setActiveTab('batch')}
            onOpenAlerts={() => setActiveTab('alerts')}
            onOpenHistory={() => setActiveTab('history')}
            onOpenAbout={() => setActiveTab('about')}
            onOpenTrueMedStudio={() => setActiveTab('truemed')}
            onOpenForensicLab={() => setActiveTab('forensic')}
            onOpenChat={() => setActiveTab('chat')}
            onSyncFirestore={handleManualSeedFirestore}
            isSeedingDb={isSeedingDb}
            medicines={medicines}
            alerts={alerts}
            historyCount={scannedHistory.length}
          />
        )}

        {activeTab === 'scanner' && (
          <>
            {currentReport ? (
              <InspectionReportView
                report={currentReport}
                onBackToScanner={() => setCurrentReport(null)}
                onOpenReportModal={handleOpenReportCounterfeit}
                onOpenDatabaseMonograph={() => setActiveTab('database')}
                onOpenForensicLab={() => setActiveTab('forensic')}
                onOpenTrueMedStudio={() => setActiveTab('truemed')}
              />
            ) : (
              <CameraScanner
                onReportGenerated={handleReportGenerated}
                onOpenDatabase={() => setActiveTab('database')}
              />
            )}
          </>
        )}

        {activeTab === 'database' && (
          <MedicineDatabaseView
            medicines={medicines}
            onSelectMedicineForInspection={() => {
              setCurrentReport(null);
              setActiveTab('scanner');
            }}
          />
        )}

        {activeTab === 'history' && (
          <ScannedHistoryView
            history={scannedHistory}
            onSelectReport={() => setActiveTab('scanner')}
            onClearHistory={handleClearHistory}
            onOpenScanner={() => {
              setCurrentReport(null);
              setActiveTab('scanner');
            }}
          />
        )}

        {activeTab === 'batch' && (
          <BatchVerifierTool
            medicines={medicines}
            alerts={alerts}
          />
        )}

        {activeTab === 'alerts' && (
          <LiveAlertsFeed
            alerts={alerts}
            communityReports={communityReports}
            onOpenReportModal={() => handleOpenReportCounterfeit()}
          />
        )}

        {activeTab === 'forensic' && (
          <ForensicLabSuite
            medicines={medicines}
            onSelectMedicineForScan={() => {
              setCurrentReport(null);
              setActiveTab('scanner');
            }}
          />
        )}

        {activeTab === 'truemed' && (
          <TrueMedDiscrepancyStudio
            medicines={medicines}
            onOpenScanner={() => {
              setCurrentReport(null);
              setActiveTab('scanner');
            }}
          />
        )}

        {activeTab === 'chat' && (
          <AIChatbotView
            medicines={medicines}
            onOpenDatabase={(medId) => setActiveTab('database')}
            onOpenScanner={() => {
              setCurrentReport(null);
              setActiveTab('scanner');
            }}
            onOpenBatchVerifier={() => setActiveTab('batch')}
          />
        )}

        {activeTab === 'about' && (
          <AboutDisclaimerView />
        )}
      </main>

      {/* Floating Quick AI Assistant Button (when not on chat tab) */}
      {activeTab !== 'chat' && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40">
          <button
            onClick={() => setActiveTab('chat')}
            className="p-3.5 sm:px-4 sm:py-3 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-teal-950/40 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-teal-400/40"
            title="Open MedVerify AI Pharmacist Chatbot"
          >
            <Bot className="w-5 h-5 text-teal-200" />
            <span className="hidden sm:inline text-xs font-bold tracking-wide">Ask AI Pharmacist</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
            </span>
          </button>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <ReportCounterfeitModal
          initialReport={selectedReportForModal}
          onClose={() => setIsReportModalOpen(false)}
          onSubmitSuccess={handleNewCommunityReportAdded}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-5 text-xs text-slate-500 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="text-slate-900 font-extrabold">MedVerify AI</span>
            <span>— AI-Powered Counterfeit Medicine Detection Using Smartphone Camera</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <button
              onClick={handleManualSeedFirestore}
              disabled={isSeedingDb}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isSeedingDb ? 'animate-spin' : ''}`} />
              <span>{isSeedingDb ? 'Populating...' : 'Sync Firestore Collections'}</span>
            </button>
            <span>•</span>
            <a
              href="https://console.firebase.google.com/project/nifty-hue-c8gvj/firestore/databases/ai-studio-pharmashieldaico-a5a682ee-d64e-4542-a287-079164cf295b/data"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 hover:underline font-semibold"
            >
              Open Firestore Console ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
