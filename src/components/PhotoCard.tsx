import type { Photo } from '../types/Photo';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-800 transition-transform hover:scale-102"
    >
      <img
        src={photo.thumbnail}
        alt={photo.title}
        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{photo.title}</h3>
          <p className="text-sm text-gray-300">{photo.location.name}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-blue-600 px-2 py-1 text-xs">
              {photo.category.replace('-', ' ')}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(photo.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
