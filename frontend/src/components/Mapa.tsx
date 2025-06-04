import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { useCidadeContext } from '../context/CidadeContext';
import 'leaflet/dist/leaflet.css';
import wellknown from 'wellknown';
import { useMemo, useEffect } from 'react';
import L from 'leaflet';

// 🔄 Componente auxiliar para centralizar visão no polígono
function AjustarVisaoPoligono({ geojson }: { geojson: any }) {
  const map = useMap();

  useEffect(() => {
    if (geojson) {
      const bounds = L.geoJSON(geojson).getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [geojson, map]);

  return null;
}

export default function Mapa() {
  const { irradiacao } = useCidadeContext();

  const geojson = useMemo(() => {
    if (!irradiacao?.geom) return null;
    try {
      const parsed = wellknown.parse(irradiacao.geom);
      return parsed?.type === 'Polygon' || parsed?.type === 'MultiPolygon' ? parsed : null;
    } catch (err) {
      console.error("Erro ao converter WKT:", err);
      return null;
    }
  }, [irradiacao]);

  const posicao = useMemo(() => {
    if (
      irradiacao &&
      typeof irradiacao.lat === 'number' &&
      typeof irradiacao.lon === 'number'
    ) {
      return [irradiacao.lat, irradiacao.lon] as [number, number];
    }
    return null;
  }, [irradiacao]);

  return (
    <MapContainer center={[-15, -55]} zoom={4} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geojson && irradiacao?.id && (
        <>
          <GeoJSON
            key={`geojson-${irradiacao.id}`}
            data={geojson}
            style={{ color: 'orange', weight: 2, fillOpacity: 0.3 }}
          />
          <AjustarVisaoPoligono geojson={geojson} />
        </>
      )}

      {posicao && (
        <Marker position={posicao}>
          <Popup>
            <strong>ID:</strong> {irradiacao.id}<br />
            <strong>Anual:</strong> {irradiacao.anual} kWh/m²
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
