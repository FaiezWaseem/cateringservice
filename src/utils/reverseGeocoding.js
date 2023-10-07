import MAP_APIKEY from './Key'
export default async function getAddress(lat, long) {
  let promise = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${MAP_APIKEY}`
  );
  let data = await promise.json();
  return data;
}
