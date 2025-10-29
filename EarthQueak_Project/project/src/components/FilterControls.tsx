import { Sliders } from 'lucide-react';
import { EarthquakeFilters } from '../services/earthquakeService';

interface FilterControlsProps {
  filters: EarthquakeFilters;
  onFilterChange: (filters: EarthquakeFilters) => void;
  earthquakeCount: number;
}

export default function FilterControls({
  filters,
  onFilterChange,
  earthquakeCount,
}: FilterControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="magnitude" className="block text-sm font-medium text-slate-700 mb-2">
            Minimum Magnitude: {filters.minMagnitude}
          </label>
          <input
            id="magnitude"
            type="range"
            min="2"
            max="8"
            step="0.5"
            value={filters.minMagnitude}
            onChange={(e) =>
              onFilterChange({ ...filters, minMagnitude: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>2.0</span>
            <span>8.0</span>
          </div>
        </div>

        <div>
          <label htmlFor="days" className="block text-sm font-medium text-slate-700 mb-2">
            Time Range: Last {filters.days} {filters.days === 1 ? 'day' : 'days'}
          </label>
          <select
            id="days"
            value={filters.days}
            onChange={(e) => onFilterChange({ ...filters, days: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="1">Last 24 hours</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">{earthquakeCount}</span> earthquakes found
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600">
          <p className="font-semibold mb-2">Magnitude Scale:</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#b91c1c]"></div>
              <span>7.0+ Major</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#dc2626]"></div>
              <span>6.0-6.9 Strong</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
              <span>5.0-5.9 Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
              <span>4.0-4.9 Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#fde047]"></div>
              <span>3.0-3.9 Minor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#a3e635]"></div>
              <span>2.0-2.9 Micro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
