import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CalendarEventWithCalendar } from '../../services/calendarService';

interface EstimatorWithColor {
  id: string;
  name: string;
  color: string;
}

interface DispatchingMapViewProps {
  events: CalendarEventWithCalendar[];
  selectedSubcontractors: string[];
  subcontractorsWithColors: EstimatorWithColor[];
}

const createNumberedIcon = (number: number, color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">${number}</div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const MapBoundsUpdater: React.FC<{ bounds: L.LatLngBoundsExpression | null }> = ({ bounds }) => {
  const map = useMap();

  React.useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);

  return null;
};

export const DispatchingMapView: React.FC<DispatchingMapViewProps> = ({
  events,
  selectedSubcontractors,
  subcontractorsWithColors
}) => {
  const getEventsForEstimator = (subcontractorName: string) => {
    return events
      .filter(event => event.estimator?.name === subcontractorName)
      .filter(event => event.latitude && event.longitude)
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  };

  const allEventsWithCoords = events.filter(e => e.latitude && e.longitude);

  const bounds: L.LatLngBoundsExpression | null = allEventsWithCoords.length > 0
    ? allEventsWithCoords.map(e => [e.latitude!, e.longitude!] as [number, number])
    : null;

  const defaultCenter: [number, number] = allEventsWithCoords.length > 0
    ? [allEventsWithCoords[0].latitude!, allEventsWithCoords[0].longitude!]
    : [40.7608, -111.8910];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="flex-fill position-relative" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, minHeight: '500px' }}>
        <MapContainer
          center={defaultCenter}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {bounds && <MapBoundsUpdater bounds={bounds} />}

          {selectedSubcontractors.map((subcontractorName) => {
            const subcontractor = subcontractorsWithColors.find(s => s.name === subcontractorName);
            const estimatorEvents = getEventsForEstimator(subcontractorName);

            if (estimatorEvents.length === 0) return null;

            const routeCoords: [number, number][] = estimatorEvents.map(e => [e.latitude!, e.longitude!]);

            return (
              <React.Fragment key={subcontractorName}>
                {routeCoords.length > 1 && (
                  <Polyline
                    positions={routeCoords}
                    color={subcontractor?.color || '#3b82f6'}
                    weight={4}
                    opacity={0.7}
                    dashArray="10, 10"
                  />
                )}

                {estimatorEvents.map((event, index) => (
                  <Marker
                    key={event.id}
                    position={[event.latitude!, event.longitude!]}
                    icon={createNumberedIcon(index + 1, subcontractor?.color || '#3b82f6')}
                  >
                    <Popup>
                      <div style={{ minWidth: '180px' }}>
                        <div style={{
                          fontWeight: 'bold',
                          color: subcontractor?.color,
                          marginBottom: '4px',
                          fontSize: '0.9rem'
                        }}>
                          {formatTime(event.start_date)} - {formatTime(event.end_date)}
                        </div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                          {event.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '4px' }}>
                          {event.contact_name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          {event.location}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#9ca3af',
                          marginTop: '8px',
                          paddingTop: '8px',
                          borderTop: '1px solid #e5e7eb'
                        }}>
                          Assigned to: {subcontractorName}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      <div className="border-top bg-white p-3" style={{ flexShrink: 0 }}>
        <div className="d-flex gap-3" style={{ overflowX: 'auto' }}>
          {selectedSubcontractors.map((subcontractorName) => {
            const subcontractor = subcontractorsWithColors.find(s => s.name === subcontractorName);
            const estimatorEvents = getEventsForEstimator(subcontractorName);

            return (
              <div key={subcontractorName} className="d-flex align-items-center gap-2 bg-light rounded p-2" style={{ minWidth: '200px' }}>
                <div
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: subcontractor?.color || '#9ca3af',
                    flexShrink: 0
                  }}
                />
                <div className="flex-fill">
                  <div style={{ fontSize: '0.8rem', fontWeight: '600' }} className="text-dark mb-1">
                    {subcontractorName}
                  </div>
                  <div className="d-flex gap-1 flex-wrap" style={{ fontSize: '0.7rem' }}>
                    {estimatorEvents.slice(0, 4).map((event, idx) => (
                      <span key={event.id} className="text-muted">
                        {formatTime(event.start_date)}{idx < Math.min(estimatorEvents.length, 4) - 1 ? ' \u2192' : ''}
                      </span>
                    ))}
                    {estimatorEvents.length > 4 && (
                      <span className="text-muted">+{estimatorEvents.length - 4}</span>
                    )}
                    {estimatorEvents.length === 0 && (
                      <span className="text-muted fst-italic">No appointments</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
