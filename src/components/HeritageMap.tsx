import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Destination } from "../data/destinations.ts";

type Props = {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
};

export default function HeritageMap({
  destinations,
  onSelectDestination,
}: Props) {
  return (
    <section style={{ margin: "32px 0" }}>
      <h2>Explore Heritage on the Map</h2>
      <p>Select any marker to explore a monument.</p>

      <MapContainer
        center={[22.5, 79]}
        zoom={5}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "16px",
          zIndex: 1,
        }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={[
              destination.latitude,
              destination.longitude,
            ]}
             eventHandlers={{
    click: () => onSelectDestination(destination),
  }}
          >
            <Popup>
              <strong>{destination.name}</strong>
              <p>{destination.city}, {destination.state}</p>
              <button
                onClick={() => onSelectDestination(destination)}
              >
                View details
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}