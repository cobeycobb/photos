import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Photo } from '../types/Photo';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface PhotoMapProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export default function PhotoMap({ photos, onPhotoClick }: PhotoMapProps) {
  // Filter photos that have coordinates
  const photosWithCoordinates = photos.filter(
    (photo) => photo.location.coordinates
  );

  // Calculate center point (average of all coordinates)
  const center: [number, number] =
    photosWithCoordinates.length > 0
      ? [
          photosWithCoordinates.reduce(
            (sum, photo) => sum + (photo.location.coordinates?.lat || 0),
            0
          ) / photosWithCoordinates.length,
          photosWithCoordinates.reduce(
            (sum, photo) => sum + (photo.location.coordinates?.lng || 0),
            0
          ) / photosWithCoordinates.length,
        ]
      : [39.8283, -98.5795]; // Center of USA

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-lg">
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {photosWithCoordinates.map((photo) => (
          <Marker
            key={photo.id}
            position={[
              photo.location.coordinates!.lat,
              photo.location.coordinates!.lng,
            ]}
          >
            <Popup>
              <div className="min-w-[200px]">
                <img
                  src={photo.thumbnail}
                  alt={photo.title}
                  className="mb-2 h-32 w-full rounded object-cover"
                />
                <h3 className="font-semibold">{photo.title}</h3>
                <p className="text-sm text-gray-600">{photo.location.name}</p>
                <button
                  onClick={() => onPhotoClick(photo)}
                  className="mt-2 w-full rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                >
                  View Photo
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
