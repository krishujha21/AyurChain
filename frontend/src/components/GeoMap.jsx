import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom SVG Icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export const GeoMap = ({ markers = [], polyline = [], height = "350px", center = [21.1458, 79.0882], zoom = 5, isSuspicious = false }) => {
  const mapCenter = markers.length > 0 ? markers[0].gps : center;
  const polylineCoords = polyline.length > 0 ? polyline : markers.map(m => m.gps);

  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden border border-borderDark relative shadow-inner">
      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <ChangeView center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {polylineCoords.length > 1 && (
          <Polyline
            positions={polylineCoords}
            color={isSuspicious ? "#F85149" : "#3FB950"}
            weight={3}
            dashArray={isSuspicious ? "6, 8" : "2, 4"}
          />
        )}

        {markers.map((m, idx) => (
          <Marker
            key={idx}
            position={m.gps}
            icon={isSuspicious && idx === markers.length - 1 ? redIcon : (idx === 0 ? greenIcon : goldIcon)}
          >
            <Popup>
              <div className="p-1 max-w-xs font-sans text-slate-800">
                <p className="font-bold text-xs text-emerald-800 mb-1">{m.stage || m.title || "Location"}</p>
                <p className="text-xs">{m.location || m.actor || "GPS Tagged"}</p>
                {m.timestamp && <p className="text-[10px] text-slate-500 mt-1">{m.timestamp}</p>}
                {m.gps && <p className="text-[10px] font-mono text-emerald-600 mt-0.5">[{m.gps[0].toFixed(4)}, {m.gps[1].toFixed(4)}]</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
