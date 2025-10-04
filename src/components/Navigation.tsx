import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="text-xl font-bold text-white">
            My Photo Gallery
          </Link>

          <div className="flex gap-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/map"
              className={`text-sm font-medium transition-colors ${
                isActive('/map')
                  ? 'text-blue-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Map
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
