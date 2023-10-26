import {GOOGLE_MAPS_API} from '@env'
export default async function getAddress(lat, long) {
  let promise = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAPS_API}`
  );
  let data = await promise.json();
  return data;
}
