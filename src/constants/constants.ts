// Lat and lng of Lima
export const DEFAULT_CENTER = {
  lat: -12.058972,
  lng: -77.052625,
  placeId: 'ChIJxz7uGfbFBZERSi5FzLlsIBQ',
};
// This is only for demo porpouses, don't use this in production
export const STATIC_STREET_VIEW_URL_IMG =
  'https://maps.googleapis.com/maps/api/streetview';

export const DEFAULT_LAYERS = {
  policeStation: {
    label: 'Comisarías',
    id: 'policeStation',
    markerColor: 'blue',
    icon: 'http://maps.google.com/mapfiles/kml/shapes/cabs.png',
  },
  traffic: {
    label: 'Tráfico',
    id: 'trafficLayer',
    markerColor: 'red',
  },
  population: {
    label: 'Población',
    id: 'populationLayer',
    markerColor: 'green',
  },
};


export const COMISARIAS_DATA = [
  {
    id: 1,
    "nombre": "Estación de Policía Chapinero",
    "latitud": 4.648263,
    "longitud": -74.060033,
    type: 'policeStation',
  },
  {
    id: 2,
    "nombre": "Estación de Policía San Victorino",
    "latitud": 4.606635,
    "longitud": -74.076408,
    type: 'policeStation',
  },
  {
    id: 3,
    "nombre": "Estación de Policía Teusaquillo",
    "latitud": 4.633995,
    "longitud": -74.074706,
    type: 'policeStation',
  },
  {
    id: 4,
    "nombre": "Estación de Policía Kennedy",
    "latitud": 4.630499,
    "longitud": -74.151046,
    type: 'policeStation',
  },
  {
    id: 5,
    "nombre": "Estación de Policía Rafael Uribe Uribe",
    "latitud": 4.580158,
    "longitud": -74.100568,
    type: 'policeStation',
  },
  {
    id: 6,
    "nombre": "Estación de Policía Suba",
    "latitud": 4.747734,
    "longitud": -74.087325,
    type: 'policeStation',
  },
  {
    id: 7,
    "nombre": "Estación de Policía Engativá",
    "latitud": 4.703618,
    "longitud": -74.117487,
    type: 'policeStation',
  },
  {
    id: 8,
    "nombre": "Estación de Policía Barrios Unidos",
    "latitud": 4.666845,
    "longitud": -74.074759,
    type: 'policeStation',
  },
  {
    id: 9,
    "nombre": "Estación de Policía Fontibón",
    "latitud": 4.680971,
    "longitud": -74.147613,
    type: 'policeStation',
  },
  {
    id: 10,
    "nombre": "Estación de Policía Usaquén",
    "latitud": 4.696091,
    "longitud": -74.031141,
    type: 'policeStation',
  }
]