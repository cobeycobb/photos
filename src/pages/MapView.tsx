import { useState } from 'react';
import type { Photo } from '../types/Photo';
import PhotoMap from '../components/PhotoMap';
import Lightbox from '../components/Lightbox';
import photosData from '../data/photos.json';

export default function MapView() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const photos = (photosData as Photo[]).map(photo => ({
    ...photo,
    thumbnail: import.meta.env.BASE_URL + photo.thumbnail.slice(1),
    fullSize: import.meta.env.BASE_URL + photo.fullSize.slice(1),
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Photo Locations</h1>
        <p className="mt-2 text-gray-400">
          Explore where these photos were taken on the map
        </p>
      </div>

      <PhotoMap photos={photos} onPhotoClick={setSelectedPhoto} />

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
