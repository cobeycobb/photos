export interface Photo {
  id: string;
  title: string;
  description?: string;
  location: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  category: 'astrophotography' | 'national-parks' | 'landscapes' | 'wildlife' | 'other';
  date: string;
  thumbnail: string;
  fullSize: string;
  exif?: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
  };
  tags?: string[];
}
