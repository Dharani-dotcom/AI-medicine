import React, { useState } from 'react';
import {
  Download,
  Share,
  X,
  Smartphone,
  Shield,
  Check,
  PlusSquare,
  Sparkles,
  Monitor,
  ExternalLink,
  SmartphoneNfc
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<boolean>;
  isInstallable: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isIframe?: boolean;
  isInstalled: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable,
  isIOS,
  isAndroid,
  isIframe = false,
  isInstalled,
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'ios' | 'android' | 'desktop'>(
    isIOS ? 'ios' : isAndroid ? 'android' : 'prompt'
  );

  if (!isOpen || isInstalled) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await onInstall();
      if (success) {
        onClose();
        return;
      }
    }

    if (isIOS) {
      setActiveTab('ios');
    } else if (isAndroid) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }
  };

  const directAppUrl = window.location.href;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header with App Brand */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-700 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-teal-200 hover:text-white p-1.5 rounded-full hover:bg-teal-600/50 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-teal-800 shadow-md shrink-0 border-2 border-teal-200">
              <Shield className="w-8 h-8 text-teal-800" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 bg-teal-900/60 text-teal-200 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase mb-1">
                <Sparkles className="w-3 h-3 text-teal-300" />
                <span>PWA Mobile App</span>
              </div>
              <h3 className="font-bold text-lg text-white tracking-tight leading-tight">
                Download to Phone
              </h3>
              <p className="text-xs text-teal-100">
                Install PharmaShield to your device Home Screen
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          {/* Key Benefits */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2.5 text-slate-800">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <span className="font-medium text-xs">Full screen camera scanner without browser bar</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-800">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <span className="font-medium text-xs">Offline database checks for fake medicines</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-800">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <span className="font-medium text-xs">Direct app icon on your phone home screen</span>
            </div>
          </div>

          {/* If inside preview iframe, offer direct browser launch for 100% native install */}
          {isIframe && (
            <div className="bg-teal-50/70 border border-teal-200 p-3 rounded-xl space-y-2 text-teal-900">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-teal-950">
                <SmartphoneNfc className="w-4 h-4 text-teal-700" />
                <span>Mobile Direct Install:</span>
              </div>
              <p className="text-[11px] text-teal-800 leading-relaxed">
                To download directly to your phone launcher, tap below to open full screen in your browser:
              </p>
              <a
                href={directAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-teal-800 hover:bg-teal-700 text-white rounded-lg font-bold text-xs shadow-xs"
              >
                <span>Open in Phone Browser</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* iOS Safari Step-by-Step Guide */}
          {(activeTab === 'ios' || isIOS) && (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl space-y-2 text-amber-900">
              <p className="font-bold text-xs flex items-center gap-1.5 text-amber-900">
                <Smartphone className="w-4 h-4 text-amber-700" />
                iPhone / iPad (Safari) 2-Step Install:
              </p>
              <div className="space-y-2 text-[11px] text-amber-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold bg-amber-200 px-1.5 py-0.2 rounded text-[10px]">1</span>
                  <span>Tap the <strong>Share icon</strong> <Share className="w-3.5 h-3.5 inline mx-0.5 text-amber-900" /> in Safari at bottom of screen.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold bg-amber-200 px-1.5 py-0.2 rounded text-[10px]">2</span>
                  <span>Scroll down and tap <strong>"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-amber-900" />.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold bg-amber-200 px-1.5 py-0.2 rounded text-[10px]">3</span>
                  <span>Tap <strong>Add</strong> at top right to place PharmaShield on your home screen.</span>
                </div>
              </div>
            </div>
          )}

          {/* Android Chrome Step-by-Step Guide */}
          {(activeTab === 'android' || (!isIOS && !isInstallable)) && !isIframe && (
            <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-xl space-y-2 text-teal-900">
              <p className="font-bold text-xs flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-teal-700" />
                Android (Chrome) Install Steps:
              </p>
              <div className="space-y-1.5 text-[11px] text-teal-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold bg-teal-200 px-1.5 py-0.2 rounded text-[10px]">1</span>
                  <span>Tap the <strong>three dots (⋮)</strong> menu in the top right of Chrome.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold bg-teal-200 px-1.5 py-0.2 rounded text-[10px]">2</span>
                  <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            {isInstallable ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-3 bg-teal-700 hover:bg-teal-600 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download to Phone Home Screen</span>
              </button>
            ) : isIOS ? (
              <button
                onClick={() => setActiveTab('ios')}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-600 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm text-xs"
              >
                <Share className="w-4 h-4" />
                <span>Show iPhone Instructions</span>
              </button>
            ) : (
              <button
                onClick={handleInstallClick}
                className="w-full py-3 bg-teal-700 hover:bg-teal-600 active:scale-[0.99] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download to Home Screen</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition-colors"
            >
              Continue in Browser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
