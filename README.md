# My Photography Gallery

A beautiful, interactive photo gallery website for showcasing astrophotography and national parks photos. Built with React, TypeScript, and Tailwind CSS, designed to be hosted on GitHub Pages.

## Features

- 📸 **Interactive Photo Gallery** - Grid layout with hover effects and smooth transitions
- 🗺️ **Map View** - See where your photos were taken on an interactive map
- 🔍 **Smart Filtering** - Filter by category and search by title, location, or tags
- 🖼️ **Lightbox Viewer** - Full-screen photo viewing with detailed EXIF data
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark Theme** - Beautiful dark interface perfect for viewing photos

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Leaflet** - Interactive maps
- **GitHub Pages** - Free hosting

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A GitHub account

### Local Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Adding Your Photos

### 1. Add Image Files

Place your photos in the `public/images` directory:
- `public/images/thumbnails/` - Optimized thumbnails (recommended: 800px max width)
- `public/images/full/` - Full-resolution images

**Tip:** Use image optimization tools to reduce file sizes:
- For thumbnails: resize to 800px max width, ~80% quality
- For full images: resize to 2000px max width, ~85% quality

### 2. Update Photo Data

Edit `src/data/photos.json` and add your photo metadata:

```json
{
  "id": "unique-id",
  "title": "Photo Title",
  "description": "Optional description of the photo",
  "location": {
    "name": "Location Name, State",
    "coordinates": {
      "lat": 37.8651,
      "lng": -119.5383
    }
  },
  "category": "astrophotography",
  "date": "2024-08-15",
  "thumbnail": "/images/thumbnails/photo.jpg",
  "fullSize": "/images/full/photo.jpg",
  "exif": {
    "camera": "Camera Model",
    "lens": "Lens Model",
    "focalLength": "24mm",
    "aperture": "f/2.8",
    "shutterSpeed": "1/250s",
    "iso": "100"
  },
  "tags": ["tag1", "tag2", "tag3"]
}
```

**Categories available:**
- `astrophotography`
- `national-parks`
- `landscapes`
- `wildlife`
- `other`

**Note:** Coordinates are optional. Photos without coordinates won't appear on the map but will still show in the gallery.

## Deploying to GitHub Pages

### First-Time Setup

1. Create a new repository on GitHub (e.g., `photo_website`)

2. **Important:** Update the base path in two files if your repo name is different:

   In `vite.config.ts`:
   ```typescript
   base: '/your-repo-name/',
   ```

   In `src/App.tsx`:
   ```typescript
   <Router basename="/your-repo-name">
   ```

3. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/cobeycobb/photo_website.git
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

5. The site will automatically deploy! Visit: `https://cobeycobb.github.io/photo_website/`

### Updating Your Site

Whenever you add new photos or make changes:

```bash
git add .
git commit -m "Add new photos"
git push
```

The site will automatically rebuild and deploy in about 2-3 minutes.

## Project Structure

```
photo_website/
├── public/
│   └── images/
│       ├── thumbnails/    # Optimized thumbnail images
│       └── full/          # Full-resolution images
├── src/
│   ├── components/        # React components
│   │   ├── FilterBar.tsx
│   │   ├── Lightbox.tsx
│   │   ├── Navigation.tsx
│   │   ├── PhotoCard.tsx
│   │   ├── PhotoGrid.tsx
│   │   └── PhotoMap.tsx
│   ├── data/
│   │   └── photos.json    # Photo metadata
│   ├── pages/
│   │   ├── Gallery.tsx
│   │   └── MapView.tsx
│   ├── types/
│   │   └── Photo.ts       # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── .github/
│   └── workflows/
│       └── deploy.yml     # Automated deployment
└── vite.config.ts
```

## Tips for Best Results

### Image Optimization
- Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) to compress images
- Keep thumbnails under 200KB each
- Keep full images under 2MB each

### Getting Coordinates
- Use [Google Maps](https://maps.google.com) - right-click a location and copy the coordinates
- Or use your camera's GPS data (check EXIF with tools like [ExifTool](https://exiftool.org/))

### Adding Categories
To add new categories, edit:
1. `src/types/Photo.ts` - add to the category type
2. Add photos with the new category to `photos.json`

## Customization

### Change Site Name
Edit `src/components/Navigation.tsx` and update the title.

### Change Colors
Edit `tailwind.config.js` to customize colors, or update the class names in components.

### Add More Pages
1. Create a new file in `src/pages/`
2. Add a route in `src/App.tsx`
3. Add navigation link in `src/components/Navigation.tsx`

## Troubleshooting

**Images not loading:**
- Check that image paths in `photos.json` match actual file paths
- Ensure paths start with `/` (e.g., `/images/thumbnails/photo.jpg`)
- Verify images are in the `public/images` directory

**Map not showing:**
- Check that coordinates are in the correct format (lat, lng)
- Ensure coordinates are valid numbers

**Deployment failing:**
- Check GitHub Actions tab for error details
- Verify `base` path in `vite.config.ts` matches your repo name

## License

MIT License - feel free to use this for your own photo gallery!

## Credits

Built with love for photography 📸
