import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Gallery from './pages/Gallery';
import MapView from './pages/MapView';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const isGalleryPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={isGalleryPage}
      />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Gallery searchQuery={searchQuery} />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router basename="/photos">
      <AppContent />
    </Router>
  );
}

export default App;
