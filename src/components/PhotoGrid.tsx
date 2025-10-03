import type { Photo } from '../types/Photo';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {photos.map((photo) => (
        <div key={photo.id} className="mb-4 break-inside-avoid">
          <PhotoCard photo={photo} onClick={() => onPhotoClick(photo)} />
        </div>
      ))}
    </div>
  );
}
