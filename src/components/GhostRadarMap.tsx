import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { MapPin, AlertTriangle, ShieldAlert, CheckCircle2, Navigation, Compass, Radio } from 'lucide-react';

interface GeoScanEvent {
  id: string;
  city: string;
  lat: number;
  lng: number;
  time: string;
  status: 'ORIGINAL_MFG_SCAN' | 'SUSPICIOUS_DUPLICATE' | 'CRITICAL_GHOST_CLONE';
  description: string;
  impossibleVelocityKmh?: number;
}

interface GhostRadarMapProps {
  batchNumber: string;
  events: GeoScanEvent[];
  selectedEventId?: string | null;
  onSelectEvent?: (eventId: string) => void;
  userCoords?: { lat: number; lng: number } | null;
}

// Polyline flight paths renderer
const FlightArcs: React.FC<{ events: GeoScanEvent[] }> = ({ events }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof google === 'undefined' || !google.maps || events.length < 2) return;

    const pathCoordinates = events.map(e => ({ lat: e.lat, lng: e.lng }));

    // Red warning polyline for counterfeit cloned transit
    const flightPath = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#EF4444',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 3,
            strokeColor: '#DC2626',
            fillColor: '#F87171',
            fillOpacity: 1
          },
          offset: '50%',
          repeat: '100px'
        }
      ]
    });

    flightPath.setMap(map);

    return () => {
      flightPath.setMap(null);
    };
  }, [map, events]);

  return null;
};

export const GhostRadarMap: React.FC<GhostRadarMapProps> = ({
  batchNumber,
  events,
  selectedEventId,
  onSelectEvent,
  userCoords
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAiBgihtXMlhMCeAnRwO6RaNkWbEXfnrzU';
  const [activeMarker, setActiveMarker] = useState<GeoScanEvent | null>(events[0] || null);

  // Default Center (Equatorial view over India / Europe / Asia)
  const defaultCenter = { lat: 26.5, lng: 55.0 };

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={3}
          mapId="pharmashield_ghost_radar_map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full"
        >
          {/* Geodesic Flight Arcs between duplicate scan points */}
          <FlightArcs events={events} />

          {/* Markers for all collision points */}
          {events.map((ev) => {
            const isOriginal = ev.status === 'ORIGINAL_MFG_SCAN';
            const isCritical = ev.status === 'CRITICAL_GHOST_CLONE';

            return (
              <AdvancedMarker
                key={ev.id}
                position={{ lat: ev.lat, lng: ev.lng }}
                onClick={() => {
                  setActiveMarker(ev);
                  if (onSelectEvent) onSelectEvent(ev.id);
                }}
              >
                <Pin
                  background={isOriginal ? '#10B981' : isCritical ? '#DC2626' : '#F59E0B'}
                  borderColor="#FFFFFF"
                  glyphColor="#FFFFFF"
                  scale={selectedEventId === ev.id ? 1.3 : 1.1}
                />
              </AdvancedMarker>
            );
          })}

          {/* User's live GPS marker if available */}
          {userCoords && (
            <AdvancedMarker position={userCoords}>
              <div className="relative flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-teal-500 border-2 border-white shadow-lg animate-pulse" />
                <div className="w-10 h-10 rounded-full bg-teal-400/30 absolute animate-ping pointer-events-none" />
              </div>
            </AdvancedMarker>
          )}

          {/* InfoWindow for Active Clicked Marker */}
          {activeMarker && (
            <InfoWindow
              position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="p-1 max-w-xs space-y-1 text-slate-900 font-sans">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  {activeMarker.status === 'ORIGINAL_MFG_SCAN' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                  )}
                  <span className="truncate">{activeMarker.city}</span>
                </div>
                <div className="text-[11px] text-slate-600 font-mono">
                  Timestamp: <strong>{activeMarker.time}</strong>
                </div>
                <div className="text-[11px] text-slate-700 leading-snug">
                  {activeMarker.description}
                </div>
                {activeMarker.impossibleVelocityKmh && (
                  <div className="mt-1 bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    Velocity: {activeMarker.impossibleVelocityKmh.toLocaleString()} km/h (Impossible)
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Real-time Map HUD Overlay */}
      <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl text-white space-y-1 shadow-lg pointer-events-auto">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-rose-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider">
            Live GPS Satellite Radar
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          Tracking Serialized Lot: <strong className="text-teal-300 font-bold">{batchNumber}</strong>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-white flex items-center gap-3 text-[10px] font-mono shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Origin Plant</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Regional Hub</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
          <span>Ghost Duplicate</span>
        </div>
      </div>
    </div>
  );
};
