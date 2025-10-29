import { useState, useEffect } from 'react';
import { Activity, AlertCircle } from 'lucide-react';
import EarthquakeMap from './components/EarthquakeMap';
import FilterControls from './components/FilterControls';
import { fetchEarthquakes, Earthquake, EarthquakeFilters } from './services/earthquakeService';

function App() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EarthquakeFilters>({
    minMagnitude: 4.5,
    days: 7,
  });

  useEffect(() => {
    loadEarthquakes();
  }, [filters]);

  async function loadEarthquakes() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchEarthquakes(filters);
      setEarthquakes(data);
    } catch (err) {
      setError('Failed to load earthquake data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-800">Earthquake Visualizer</h1>
          </div>
          <p className="text-slate-600">
            Real-time earthquake data from the USGS Earthquake Hazards Program
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <FilterControls
              filters={filters}
              onFilterChange={setFilters}
              earthquakeCount={earthquakes.length}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="relative h-[600px] lg:h-[700px]">
              {loading && (
                <div className="absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading earthquake data...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center z-10">
                  <div className="text-center max-w-md px-6">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-slate-800 font-semibold mb-2">Error Loading Data</p>
                    <p className="text-slate-600 mb-4">{error}</p>
                    <button
                      onClick={loadEarthquakes}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {!loading && !error && <EarthquakeMap earthquakes={earthquakes} />}
            </div>
          </main>
        </div>

        <footer className="mt-6 text-center text-sm text-slate-500">
          Data provided by the{' '}
          <a
            href="https://earthquake.usgs.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            USGS Earthquake Hazards Program
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
