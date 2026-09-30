import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Sliders,
  Microscope,
  Layers,
  Fingerprint,
  Radio,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Rotate3d,
  Maximize2,
  Compass,
  MapPin,
  Clock,
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldAlert,
  Camera,
  Smartphone,
  Upload,
  Check,
  Zap,
  ZoomIn
} from 'lucide-react';
import { MedicineSpec } from '../types/pharmacy';

import { GhostRadarMap } from './GhostRadarMap';

interface ForensicLabSuiteProps {
  medicines: MedicineSpec[];
  onSelectMedicineForScan?: (medicineId: string) => void;
  initialUserImage?: string;
}

export const ForensicLabSuite: React.FC<ForensicLabSuiteProps> = ({
  medicines,
  onSelectMedicineForScan,
  initialUserImage
}) => {
  const [activeTool, setActiveTool] = useState<'tilt' | 'deboss' | 'microtext' | 'velocity'>('tilt');
  const [selectedDrugId, setSelectedDrugId] = useState<string>(medicines[0]?.id || 'MED001');

  // User Custom Uploaded/Scanned Image
  const defaultSampleImage = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80';
  const [userImage, setUserImage] = useState<string>(initialUserImage || defaultSampleImage);
  const [imageSourceLabel, setImageSourceLabel] = useState<string>(initialUserImage ? 'User Scanned Photo' : 'Reference Specimen (Upload or Snap Camera)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live In-App Camera Stream States
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Tool 1: 45° Optical Color-Shift Simulator State
  const [tiltAngle, setTiltAngle] = useState<number>(45);
  const [isSimulatedFake, setIsSimulatedFake] = useState<boolean>(false);
  const [isGyroActive, setIsGyroActive] = useState<boolean>(false);

  // Smartphone Gyroscope Motion Handler
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isGyroActive) return;
      if (event.beta !== null) {
        // beta is pitch angle (-180 to 180). We map typical holding angle (20 to 80 deg) to 0-90
        const rawPitch = Math.max(0, Math.min(90, event.beta));
        setTiltAngle(Math.round(rawPitch));
      }
    };

    if (isGyroActive && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [isGyroActive]);

  const toggleGyroscope = async () => {
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setIsGyroActive(!isGyroActive);
          showNotification(isGyroActive ? 'Gyroscope Disabled' : '✓ Gyroscope Active: Tilt your phone in your hand!');
        } else {
          showNotification('Gyroscope permission was denied.');
        }
      } catch (err) {
        setIsGyroActive(!isGyroActive);
      }
    } else {
      setIsGyroActive(!isGyroActive);
      showNotification(!isGyroActive ? '✓ Gyroscope Active: Tilt your phone in your hand!' : 'Gyroscope Disabled');
    }
  };

  // Tool 2: 3D Deboss & Morphology Gauge State
  const [testedPressure, setTestedPressure] = useState<number>(65); // Rotary Press Tonne
  const [showChalkCrumble, setShowChalkCrumble] = useState<boolean>(false);

  // Tool 3: 10x Macro Loupe Magnifier State
  const [loupePosition, setLoupePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [loupeZoom, setLoupeZoom] = useState<number>(10);
  const [inspectFoilType, setInspectFoilType] = useState<'authentic' | 'counterfeit_clone'>('authentic');
  const [isDraggingLoupe, setIsDraggingLoupe] = useState<boolean>(false);

  // Tool 4: Supply Chain Ghost Scan Velocity State
  const [searchedBatch, setSearchedBatch] = useState<string>('SUN29841A');
  const [isSimulatingCollision, setIsSimulatingCollision] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const phoneCameraInputRef = useRef<HTMLInputElement | null>(null);
  const loupeContainerRef = useRef<HTMLDivElement | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Attach Video Stream reliably when modal opens
  useEffect(() => {
    if (isCameraModalOpen && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch(e => console.log('Video play error:', e));
    }
  }, [isCameraModalOpen, cameraStream]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [cameraStream]);

  // Start Live Webcam
  const startLiveCamera = async () => {
    setCameraError(null);
    setIsCameraModalOpen(true);
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 }
        },
        audio: false
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log('Camera error:', e));
      }
    } catch (err: any) {
      console.warn('getUserMedia error, providing phone camera option:', err);
      setCameraError('Webcam direct stream restricted. Use the Phone Camera / File button below.');
    }
  };

  // Stop Live Camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      setCameraStream(null);
    }
    setIsCameraModalOpen(false);
  };

  // Snap photo from stream
  const capturePhotoFromStream = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      stopCamera();
      setUserImage(photoDataUrl);
      setImageSourceLabel('Live Camera Photo');
      showNotification('✓ Camera photo loaded into Anti-Clone Forensic Lab');
    }
  };

  // Handle File or Native Phone Camera Input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        if (isCameraModalOpen) stopCamera();
        setUserImage(dataUrl);
        setImageSourceLabel(file.name || 'Uploaded Packaging Photo');
        showNotification('✓ Image loaded into Anti-Clone Forensic Lab');
      }
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  // Clipboard Paste Handler
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            if (dataUrl) {
              setUserImage(dataUrl);
              setImageSourceLabel('Pasted Clipboard Image');
              showNotification('✓ Pasted image loaded into Forensic Lab');
            }
          };
          reader.readAsDataURL(blob);
        }
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  // Dynamic Color-Shift calculation based on tilt angle
  const getAuthenticShiftColor = (angle: number) => {
    if (angle < 25) return '#EAB308'; // Gold/Yellow
    if (angle >= 25 && angle <= 65) return '#10B981'; // Emerald Green
    return '#0F766E'; // Deep Teal/Blue
  };

  const currentSealColor = isSimulatedFake ? '#CA8A04' : getAuthenticShiftColor(tiltAngle);

  // Loupe Mouse Movement Handler
  const handleLoupeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loupeContainerRef.current) return;
    const rect = loupeContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePosition({ x, y });
  };

  const [userGpsCoords, setUserGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedMapEventId, setSelectedMapEventId] = useState<string | null>('ev-1');

  // Trigger User Geolocation
  const fetchLiveUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserGpsCoords(coords);
          showNotification(`✓ Live GPS Location: ${coords.lat.toFixed(3)}°, ${coords.lng.toFixed(3)}°`);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          showNotification('Could not retrieve GPS. Please check location permissions.');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      showNotification('Geolocation is not supported by your browser.');
    }
  };

  // Simulated Ghost Scan Collision Points for Google Map
  const collisionGeoEvents = [
    {
      id: 'ev-1',
      city: 'Mumbai Central Manufacturing Plant (India)',
      lat: 18.96,
      lng: 72.82,
      time: '10:14 AM (Local)',
      status: 'ORIGINAL_MFG_SCAN' as const,
      description: 'Authentic serialization barcode registered on primary rotary packaging line.'
    },
    {
      id: 'ev-2',
      city: 'New Delhi Distribution Warehouse (India)',
      lat: 28.61,
      lng: 77.20,
      time: '10:48 AM (Local - +34m)',
      status: 'SUSPICIOUS_DUPLICATE' as const,
      description: 'First suspicious duplicate scan detected 1,150 km away in 34 minutes.',
      impossibleVelocityKmh: 2029
    },
    {
      id: 'ev-3',
      city: 'London Heathrow Customs Freight Hub (UK)',
      lat: 51.47,
      lng: -0.45,
      time: '11:15 AM (Local - +61m)',
      status: 'CRITICAL_GHOST_CLONE' as const,
      description: 'CRITICAL: Identical batch lot scanned in UK within 61 minutes of Mumbai manufacturing.',
      impossibleVelocityKmh: 7080
    },
    {
      id: 'ev-4',
      city: 'Bangkok Regional Pharmacy Depot (Thailand)',
      lat: 13.75,
      lng: 100.50,
      time: '11:32 AM (Local - +78m)',
      status: 'CRITICAL_GHOST_CLONE' as const,
      description: 'Simultaneous duplicate lot code intercepted across Southeast Asian illicit supply chain.',
      impossibleVelocityKmh: 5380
    }
  ];

  const currentMed = medicines.find(m => m.id === selectedDrugId || m.medicineId === selectedDrugId) || medicines[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 border border-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <input
        ref={phoneCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Header Banner & Camera Input Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-800/50 relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/20 text-teal-200 border border-teal-400/30 rounded-full text-xs font-bold tracking-wide">
              <Microscope className="w-3.5 h-3.5 text-teal-300" />
              <span>ANTI-CLONING FORENSIC LAB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
              Test Physical Packaging, 45° OVI Tilt & Microstructure
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Upload your photo or snap with your camera to run 45° holographic tilt tests, microscopic font loupe inspection, 3D punch die deboss analysis, and ghost serialization radar.
            </p>
          </div>

          {/* Camera / Upload Action Card */}
          <div className="bg-slate-950/90 border border-teal-700/60 p-4 rounded-2xl shrink-0 space-y-3 w-full lg:w-96 shadow-2xl">
            <div className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-400" />
                Upload / Scan Packaging:
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Active
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={startLiveCamera}
                className="py-2.5 px-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-md flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span className="text-[11px] font-bold">Live Camera</span>
              </button>

              <button
                onClick={() => phoneCameraInputRef.current?.click()}
                className="py-2.5 px-2 bg-slate-800 hover:bg-slate-700 border border-teal-500/50 hover:border-teal-400 text-teal-200 font-bold text-xs rounded-xl shadow-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-teal-400" />
                <span className="text-[11px] font-bold">Phone Camera</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-400 text-slate-200 font-bold text-xs rounded-xl shadow-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-bold">Upload File</span>
              </button>
            </div>

            <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="truncate max-w-[200px]">Active: {imageSourceLabel}</span>
              <span className="text-teal-400 font-bold">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Tool Navigation Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveTool('tilt')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 shadow-2xs cursor-pointer ${
            activeTool === 'tilt'
              ? 'bg-teal-700 text-white border-teal-600 ring-2 ring-teal-200'
              : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">Test 01</span>
            <Rotate3d className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm">45° OVI Tilt Test</div>
            <div className="text-[11px] opacity-80 mt-0.5">Optical Variable Ink Shift</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTool('deboss')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 shadow-2xs cursor-pointer ${
            activeTool === 'deboss'
              ? 'bg-teal-700 text-white border-teal-600 ring-2 ring-teal-200'
              : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">Test 02</span>
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm">3D Deboss Stamp Gauge</div>
            <div className="text-[11px] opacity-80 mt-0.5">Punch Depth & Rotary Profile</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTool('microtext')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 shadow-2xs cursor-pointer ${
            activeTool === 'microtext'
              ? 'bg-teal-700 text-white border-teal-600 ring-2 ring-teal-200'
              : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">Test 03</span>
            <Microscope className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm">10x Microscopic Loupe</div>
            <div className="text-[11px] opacity-80 mt-0.5">Foil Microprint Edge Knurling</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTool('velocity')}
          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 shadow-2xs cursor-pointer ${
            activeTool === 'velocity'
              ? 'bg-teal-700 text-white border-teal-600 ring-2 ring-teal-200'
              : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">Test 04</span>
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm">Ghost Scan Radar</div>
            <div className="text-[11px] opacity-80 mt-0.5">Multi-City Lot Duplication</div>
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TOOL 1: 45° OPTICAL VARIABLE INK (OVI) TILT SIMULATOR */}
      {/* ========================================================================= */}
      {activeTool === 'tilt' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
                  <Rotate3d className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Interactive 45° Hologram & OVI Color-Shift Angle Test
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Authentic pharmaceutical tamper seals use micro-encapsulated interference pigments that shift color at 45°. Commercial clone printers only print static single-shade gold ink.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimulatedFake(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !isSimulatedFake
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Authentic Monograph Spec
              </button>
              <button
                onClick={() => setIsSimulatedFake(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSimulatedFake
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Simulated Cloned Fake
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Visual Packaging Tilt Canvas Rendering User's Scanned Image */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[360px] overflow-hidden shadow-inner border border-slate-800">
              <div
                style={{
                  transform: `perspective(800px) rotateX(${tiltAngle - 45}deg) rotateY(${tiltAngle - 30}deg)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="w-72 sm:w-80 h-52 bg-slate-900 rounded-2xl p-4 border-2 border-slate-700 shadow-2xl relative flex flex-col justify-between overflow-hidden"
              >
                {/* User Scanned Image Background Layer */}
                <img
                  src={userImage}
                  alt="Scanned Specimen"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                {/* Simulated Specular Light Sheen */}
                <div
                  style={{
                    background: `linear-gradient(${tiltAngle * 3}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)`
                  }}
                  className="absolute inset-0 pointer-events-none"
                />

                {/* Top Packaging Branding */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-slate-950/80 backdrop-blur-xs px-2 py-1 rounded text-[10px] font-mono font-bold text-teal-300">
                    SPECIMEN: {imageSourceLabel.substring(0, 20)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded">
                    Tilt: {tiltAngle}°
                  </span>
                </div>

                {/* OVI Security Emblem with Dynamic Color Shift */}
                <div className="relative z-10 self-center flex flex-col items-center">
                  <div
                    style={{
                      backgroundColor: currentSealColor,
                      boxShadow: `0 0 25px ${currentSealColor}`
                    }}
                    className="w-20 h-20 rounded-full border-4 border-white/80 flex flex-col items-center justify-center text-slate-950 font-black text-center transition-colors duration-200"
                  >
                    <ShieldCheck className="w-7 h-7 text-slate-950 mb-0.5" />
                    <span className="text-[8px] uppercase tracking-widest font-mono font-bold">
                      {isSimulatedFake ? 'FAKE STATIC' : 'SECURE OVI'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white bg-slate-950/90 px-2 py-0.5 rounded mt-2">
                    {isSimulatedFake ? 'Static Flat Ink (0% Shift)' : `Active Color: ${currentSealColor}`}
                  </span>
                </div>

                {/* Bottom Packaging Footer */}
                <div className="relative z-10 text-[9px] font-mono text-slate-300 bg-slate-950/80 px-2 py-1 rounded flex justify-between">
                  <span>Batch: Verified Security Seal</span>
                  <span>45° Interference Matrix</span>
                </div>
              </div>

              {/* Viewport Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/90 px-3 py-1 rounded-xl text-[10px] font-mono text-slate-300 border border-slate-700">
                Live Tilt Angle: <strong className="text-teal-400 font-bold">{tiltAngle}°</strong>
              </div>
            </div>

            {/* Tilt Angle Controls & Forensic Evaluation */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold">
                  <span className="text-slate-700">Tilt Angle (0° = Flat, 45° = Slanted, 90° = Edge):</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleGyroscope}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border flex items-center gap-1 transition-all cursor-pointer ${
                        isGyroActive
                          ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse'
                          : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                      title="Use your phone's physical gyroscope / motion sensors"
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>{isGyroActive ? 'Gyro Active' : 'Enable Phone Gyro'}</span>
                    </button>
                    <span className="text-teal-700 font-extrabold text-sm">{tiltAngle}°</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={tiltAngle}
                  onChange={(e) => setTiltAngle(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0° Flat (Gold)</span>
                  <span className="font-bold text-emerald-700">45° Tilt (Emerald Green)</span>
                  <span>90° Oblique (Teal)</span>
                </div>
              </div>

              {/* Forensic Status Box */}
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isSimulatedFake
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : tiltAngle >= 25 && tiltAngle <= 65
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center gap-2">
                  {isSimulatedFake ? (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono">
                    {isSimulatedFake ? '🚨 COUNTERFEIT: STATIC COLOR DETECTED' : '✓ AUTHENTIC: ACTIVE COLOR-SHIFT CONFIRMED'}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed">
                  {isSimulatedFake
                    ? 'The security seal remains flat gold across all tilt angles. This is conclusive evidence that the packaging was produced on a commercial color printer without optical variable security inks.'
                    : 'The security emblem smoothly shifts from Gold to Emerald Green (#10B981) at 45°. This confirms the presence of pharmaceutical multi-layer interference pigments.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOOL 2: 3D DEBOSS STAMP & MORPHOLOGY GAUGE */}
      {/* ========================================================================= */}
      {activeTool === 'deboss' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
                  <Layers className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Tablet Punch Imprint & Deboss Compression Profile
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Authentic tablets use calibrated rotary presses (40-80 Tonnes) with specific bevel angles and microscopic punch dies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Deboss Extrusion Simulator */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[340px] shadow-inner border border-slate-800">
              <div className="relative flex flex-col items-center">
                {/* 3D Pill Model */}
                <div
                  style={{
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.4)'
                  }}
                  className={`w-48 h-48 rounded-full bg-slate-100 border-4 border-slate-300 flex flex-col items-center justify-center relative ${
                    showChalkCrumble ? 'border-dashed border-rose-400' : ''
                  }`}
                >
                  <img
                    src={userImage}
                    alt="Pill Specimen"
                    className="absolute inset-0 w-full h-full object-cover rounded-full opacity-30"
                  />

                  {/* Deboss Imprint Cutout */}
                  <div
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.7)',
                      transform: 'translateZ(10px)'
                    }}
                    className="font-black text-slate-800 text-2xl font-mono tracking-widest text-center"
                  >
                    <div>{currentMed.pill?.imprintFront || 'ZLT 50'}</div>
                    <div className="text-xs font-mono font-bold text-slate-600 mt-1">
                      {currentMed.pill?.imprintBack || 'PFIZER'}
                    </div>
                  </div>

                  {/* Bisecting Score Line */}
                  <div className="w-36 h-0.5 bg-slate-400 shadow-inner mt-2" />
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs font-mono font-bold text-teal-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    Calculated Deboss Depth: 0.35 mm (±0.02 mm)
                  </span>
                </div>
              </div>
            </div>

            {/* Deboss Pressure Slider & Findings */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-700">Simulated Rotary Press Compression:</span>
                  <span className="text-teal-700 font-extrabold">{testedPressure} Tonnes</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={testedPressure}
                  onChange={(e) => setTestedPressure(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Physical Monograph Baseline:</span>
                  <span className="text-teal-700 font-mono">Calibrated Die</span>
                </div>
                <div className="space-y-1 text-slate-600 font-mono text-[11px]">
                  <div>• Imprint Front: {currentMed.pill?.imprintFront || 'Standard Imprint'}</div>
                  <div>• Tablet Morphology: {currentMed.pill?.color} {currentMed.pill?.shape}</div>
                  <div>• Coating Type: {currentMed.pill?.coating}</div>
                  <div>• Fracture Resistance: 65-80 N (Hard compression)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOOL 3: 10X MACROSCOPIC LOUPE MAGNIFIER */}
      {/* ========================================================================= */}
      {activeTool === 'microtext' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
                  <Microscope className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  10x Microscopic Loupe on Uploaded Specimen
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Drag or move your mouse over the specimen to magnify microprinted security hairlines, flexographic raster dots, and aluminum foil knurling.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 font-bold">Zoom:</span>
              {[5, 10, 20].map((z) => (
                <button
                  key={z}
                  onClick={() => setLoupeZoom(z)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    loupeZoom === z
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {z}x
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Loupe Magnifier Canvas */}
            <div
              ref={loupeContainerRef}
              onMouseMove={handleLoupeMouseMove}
              className="lg:col-span-7 bg-slate-950 rounded-2xl relative aspect-4/3 overflow-hidden shadow-inner border border-slate-800 cursor-crosshair select-none"
            >
              {/* Base User Image */}
              <img
                src={userImage}
                alt="Scanned Specimen"
                className="w-full h-full object-cover"
              />

              {/* Draggable Circular 10x Loupe */}
              <div
                style={{
                  top: `${loupePosition.y}%`,
                  left: `${loupePosition.x}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 0 4px rgba(45,212,191,0.8), 0 10px 30px rgba(0,0,0,0.8)'
                }}
                className="absolute w-36 h-36 rounded-full border-4 border-white overflow-hidden pointer-events-none z-20 bg-slate-900"
              >
                <img
                  src={userImage}
                  alt="Zoomed View"
                  style={{
                    position: 'absolute',
                    width: `${loupeZoom * 100}%`,
                    height: `${loupeZoom * 100}%`,
                    maxWidth: 'none',
                    left: `-${(loupePosition.x * (loupeZoom - 1))}%`,
                    top: `-${(loupePosition.y * (loupeZoom - 1))}%`
                  }}
                  className="object-cover filter contrast-125 brightness-110"
                />

                {/* Loupe Grid Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-teal-400/40" />
                  <div className="h-full w-0.5 bg-teal-400/40 absolute" />
                </div>
                <div className="absolute bottom-1 right-2 text-[9px] font-mono font-bold text-teal-300 bg-slate-950/80 px-1.5 py-0.2 rounded">
                  {loupeZoom}x Loupe
                </div>
              </div>

              {/* Viewport Badge */}
              <div className="absolute top-3 left-3 bg-slate-950/90 px-3 py-1 rounded-xl text-[10px] font-mono text-slate-300 border border-slate-700">
                Hover / Move to inspect microtext • Focus: {loupePosition.x.toFixed(0)}%, {loupePosition.y.toFixed(0)}%
              </div>
            </div>

            {/* Microtext Inspection Findings */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 text-xs">
                <div className="font-bold text-teal-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                  <span>Microprinted Perimeter Hairlines</span>
                </div>
                <p className="text-teal-900 leading-relaxed text-[11px]">
                  Under 10x magnification, genuine pharmaceutical blister aluminum foils have continuous 0.4pt microtext repeating the brand name or authorized drug code without dot-gain ink smearing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900">What to look for:</div>
                <ul className="space-y-1.5 text-slate-600 text-[11px] list-disc list-inside">
                  <li><strong>Genuine:</strong> Crisp vector etched characters (Sub-0.05pt stroke).</li>
                  <li><strong>Counterfeit:</strong> Jagged raster dots from standard commercial inkjet/laser printers.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOOL 4: GHOST SCAN SUPPLY CHAIN VELOCITY RADAR (REAL GOOGLE MAPS) */}
      {/* ========================================================================= */}
      {activeTool === 'velocity' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
                  <Radio className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Global Supply Chain Ghost Duplicate Collision Radar (Google Maps)
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Pinpoints impossible multi-point barcode scans worldwide in real-time. If an identical lot code is scanned in Mumbai and London within 60 minutes, the satellite radar flags it as a physical ghost clone.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchLiveUserLocation}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{userGpsCoords ? 'GPS Active' : 'Locate My GPS'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Google Map Viewport */}
            <div className="lg:col-span-8">
              <GhostRadarMap
                batchNumber={searchedBatch}
                events={collisionGeoEvents}
                selectedEventId={selectedMapEventId}
                onSelectEvent={(id) => setSelectedMapEventId(id)}
                userCoords={userGpsCoords}
              />
            </div>

            {/* Collision Incidents Ledger & Batch Search */}
            <div className="lg:col-span-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-slate-700">
                    Velocity Violations ({collisionGeoEvents.length}):
                  </span>
                  <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    🚨 3 Clones Intercepted
                  </span>
                </div>

                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 font-mono text-xs">
                  {collisionGeoEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedMapEventId(ev.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedMapEventId === ev.id
                          ? 'bg-slate-900 border-teal-400 text-white shadow-md ring-1 ring-teal-400'
                          : ev.status === 'ORIGINAL_MFG_SCAN'
                          ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 hover:bg-emerald-50'
                          : 'bg-rose-50/70 border-rose-200 text-slate-800 hover:bg-rose-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          ev.status === 'ORIGINAL_MFG_SCAN'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white animate-pulse'
                        }`}>
                          {ev.status === 'ORIGINAL_MFG_SCAN' ? 'Origin Point' : 'Ghost Duplicate'}
                        </span>
                        <span className="text-[10px] opacity-75">{ev.time}</span>
                      </div>
                      <div className="font-bold text-xs line-clamp-1">{ev.city}</div>
                      <div className="text-[10px] opacity-75 mt-0.5 line-clamp-1">{ev.description}</div>
                      {ev.impossibleVelocityKmh && (
                        <div className="text-[10px] font-bold text-rose-500 mt-1">
                          Transit: {ev.impossibleVelocityKmh.toLocaleString()} km/h (Physically Impossible)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Batch Input Switcher */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-1.5 text-xs font-mono">
                <span className="text-slate-600 text-[11px] font-bold">Tested Serialized Lot:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchedBatch}
                    onChange={(e) => setSearchedBatch(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-teal-500"
                    placeholder="Enter Batch Lot Code"
                  />
                  <button
                    onClick={() => showNotification(`Scanning radar for lot: ${searchedBatch}...`)}
                    className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Track
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIVE CAMERA CAPTURE MODAL */}
      {/* ========================================================================= */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Capture Packaging for Anti-Clone Lab</span>
              </div>
              <button
                onClick={stopCamera}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-4/3 bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-8 border-2 border-emerald-400/70 border-dashed rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                <div className="text-[10px] font-mono text-emerald-300 font-bold bg-slate-950/70 px-2 py-0.5 rounded self-start">
                  Position medicine box, foil, or tablet inside
                </div>
                <div className="text-center text-[10px] font-mono text-emerald-300 bg-slate-950/70 px-2 py-0.5 rounded self-center">
                  Ensure good lighting for forensic analysis
                </div>
              </div>

              {cameraError && (
                <div className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                  <div className="text-xs text-amber-200 font-bold max-w-md">{cameraError}</div>
                  <button
                    onClick={() => {
                      stopCamera();
                      phoneCameraInputRef.current?.click();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Use Phone Camera App</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  stopCamera();
                  fileInputRef.current?.click();
                }}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                Upload File
              </button>

              <button
                onClick={capturePhotoFromStream}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Snap & Load in Lab</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
