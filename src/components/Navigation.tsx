import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

export default function Navigation({ searchQuery, onSearchChange, showSearch }: NavigationProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-lg font-bold text-white whitespace-nowrap">
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

          {showSearch && onSearchChange && (
            <input
              type="text"
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="max-w-xs flex-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          )}
        </div>
      </div>
    </nav>
  );
}
