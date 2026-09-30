import React, { useState } from 'react';
import { Download, Share, X, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <>
      {/* Desktop / Android In-App Banner */}
      {isInstallable && (
        <div className="bg-teal-800 text-white px-4 py-2.5 shadow-sm text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-teal-200 shrink-0" />
            <span>
              <strong>Install PharmaShield App:</strong> Add to your home screen for instant camera scanning and offline medicine checks.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={install}
              className="px-3 py-1 bg-white text-teal-900 hover:bg-teal-50 font-semibold rounded text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-teal-200 hover:text-white"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Home Screen Guide Trigger */}
      {isIOS && !isInstallable && (
        <div className="bg-slate-100 border-b border-slate-200 text-slate-800 px-4 py-2 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Install on iPhone: Tap Share then "Add to Home Screen"</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIOSGuide(true)}
              className="px-2.5 py-1 bg-teal-700 text-white rounded text-[11px] font-semibold flex items-center gap-1"
            >
              <Share className="w-3 h-3" />
              <span>How to Install</span>
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-slate-500 hover:text-slate-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Instructions Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-xl space-y-4 text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Install on iPhone / iPad</h3>
              <button onClick={() => setShowIOSGuide(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>
            <ol className="space-y-2.5 text-slate-700 list-decimal list-inside">
              <li>Open this page in <strong>Safari</strong> on your iPhone.</li>
              <li>Tap the <strong>Share</strong> button (square with arrow pointing up) at the bottom toolbar.</li>
              <li>Scroll down and select <strong>"Add to Home Screen"</strong>.</li>
              <li>Tap <strong>Add</strong> in the top-right corner.</li>
            </ol>
            <div className="pt-2">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 bg-teal-700 text-white rounded font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
