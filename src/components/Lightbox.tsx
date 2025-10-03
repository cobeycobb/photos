import { useEffect } from 'react';
import type { Photo } from '../types/Photo';

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

export default function Lightbox({ photo, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (photo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-4xl text-white hover:text-gray-300"
      >
        &times;
      </button>

      <div
        className="flex max-h-[90vh] w-full max-w-7xl flex-col gap-4 lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 items-center justify-center">
          <img
            src={photo.fullSize}
            alt={photo.title}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
          />
        </div>

        <div className="w-full space-y-4 overflow-y-auto bg-gray-900 p-6 text-white lg:w-96">
          <div>
            <h2 className="text-2xl font-bold">{photo.title}</h2>
            {photo.description && (
              <p className="mt-2 text-gray-300">{photo.description}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400">Location</h3>
            <p className="text-lg">{photo.location.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400">Date</h3>
            <p className="text-lg">
              {new Date(photo.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400">Category</h3>
            <p className="text-lg capitalize">{photo.category.replace('-', ' ')}</p>
          </div>

          {photo.exif && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-400">Camera Settings</h3>
              <div className="space-y-1 text-sm">
                {photo.exif.camera && <p>Camera: {photo.exif.camera}</p>}
                {photo.exif.lens && <p>Lens: {photo.exif.lens}</p>}
                {photo.exif.focalLength && <p>Focal Length: {photo.exif.focalLength}</p>}
                {photo.exif.aperture && <p>Aperture: {photo.exif.aperture}</p>}
                {photo.exif.shutterSpeed && <p>Shutter Speed: {photo.exif.shutterSpeed}</p>}
                {photo.exif.iso && <p>ISO: {photo.exif.iso}</p>}
              </div>
            </div>
          )}

          {photo.tags && photo.tags.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-400">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-600 px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
