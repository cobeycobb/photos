import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Gallery from './pages/Gallery';
import MapView from './pages/MapView';

function App() {
  return (
    <Router basename="/photo_website">
      <div className="min-h-screen bg-gray-950">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/map" element={<MapView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
