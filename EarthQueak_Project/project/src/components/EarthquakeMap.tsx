import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Earthquake } from '../services/earthquakeService';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
}

function getMagnitudeColor(magnitude: number): string {
  if (magnitude >= 7) return '#b91c1c';
  if (magnitude >= 6) return '#dc2626';
  if (magnitude >= 5) return '#f97316';
  if (magnitude >= 4) return '#fbbf24';
  if (magnitude >= 3) return '#fde047';
  return '#a3e635';
}

function getMagnitudeRadius(magnitude: number): number {
  return Math.max(4, magnitude * 3);
}

function MapUpdater({ earthquakes }: { earthquakes: Earthquake[] }) {
  const map = useMap();

  useEffect(() => {
    if (earthquakes.length > 0) {
      const bounds = earthquakes.map(eq => eq.coordinates);
      map.fitBounds(bounds as any, { padding: [50, 50], maxZoom: 5 });
    }
  }, [earthquakes, map]);

  return null;
}

export default function EarthquakeMap({ earthquakes }: EarthquakeMapProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-xl">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater earthquakes={earthquakes} />

        {earthquakes.map((earthquake) => (
          <CircleMarker
            key={earthquake.id}
            center={earthquake.coordinates}
            radius={getMagnitudeRadius(earthquake.magnitude)}
            pathOptions={{
              fillColor: getMagnitudeColor(earthquake.magnitude),
              fillOpacity: 0.7,
              color: '#fff',
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-base mb-2">
                  M {earthquake.magnitude.toFixed(1)} - {earthquake.place}
                </h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Time:</span>{' '}
                    {new Date(earthquake.time).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Depth:</span>{' '}
                    {earthquake.depth.toFixed(1)} km
                  </p>
                  <p>
                    <span className="font-semibold">Coordinates:</span>{' '}
                    {earthquake.coordinates[0].toFixed(3)}, {earthquake.coordinates[1].toFixed(3)}
                  </p>
                  {earthquake.tsunami === 1 && (
                    <p className="text-red-600 font-semibold">⚠️ Tsunami Warning</p>
                  )}
                  <a
                    href={earthquake.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block mt-2"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
