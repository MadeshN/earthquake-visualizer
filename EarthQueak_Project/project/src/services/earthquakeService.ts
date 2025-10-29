export interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  coordinates: [number, number];
  depth: number;
  url: string;
  tsunami: number;
  significance: number;
}

export interface EarthquakeFilters {
  minMagnitude: number;
  days: number;
}

export async function fetchEarthquakes(filters: EarthquakeFilters): Promise<Earthquake[]> {
  const { minMagnitude, days } = filters;

  const endTime = new Date();
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - days);

  const params = new URLSearchParams({
    format: 'geojson',
    starttime: startTime.toISOString(),
    endtime: endTime.toISOString(),
    minmagnitude: minMagnitude.toString(),
    orderby: 'time'
  });

  const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch earthquake data');
  }

  const data = await response.json();

  return data.features.map((feature: any) => ({
    id: feature.id,
    magnitude: feature.properties.mag,
    place: feature.properties.place,
    time: feature.properties.time,
    coordinates: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
    depth: feature.geometry.coordinates[2],
    url: feature.properties.url,
    tsunami: feature.properties.tsunami,
    significance: feature.properties.sig
  }));
}
