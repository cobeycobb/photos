import { useState, useMemo } from 'react';
import type { Photo } from '../types/Photo';
import PhotoGrid from '../components/PhotoGrid';
import FilterBar from '../components/FilterBar';
import Lightbox from '../components/Lightbox';
import photosData from '../data/photos.json';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const photos = (photosData as Photo[]).map(photo => ({
    ...photo,
    thumbnail: import.meta.env.BASE_URL + photo.thumbnail.slice(1),
    fullSize: import.meta.env.BASE_URL + photo.fullSize.slice(1),
  }));

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(photos.map((photo) => photo.category)));
  }, [photos]);

  // Filter photos based on category and search query
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesCategory =
        selectedCategory === 'all' || photo.category === selectedCategory;

      const matchesSearch =
        searchQuery === '' ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [photos, selectedCategory, searchQuery]);

  return (
    <div>
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filteredPhotos.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xl">No photos found matching your criteria.</p>
        </div>
      ) : (
        <PhotoGrid photos={filteredPhotos} onPhotoClick={setSelectedPhoto} />
      )}

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
