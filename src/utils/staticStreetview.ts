import { STATIC_STREET_VIEW_URL_IMG } from 'constants/constants';
// This is only for demo porpouses, don't use this in production
export const getStaticStreetviewImg = (lat: number, lng: number) => {
  const size = `size=400x300`;
  const location = `location=${lat},${lng}`;
  const url = `${STATIC_STREET_VIEW_URL_IMG}?&${size}&${location}&fov=80&heading=70&pitch=0&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return url;
};
