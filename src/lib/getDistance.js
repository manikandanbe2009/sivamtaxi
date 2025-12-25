export async function getDistanceKm(origin, destination) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${key}`;

  const res = await fetch(url);
  const data = await res.json();

  if (
    data.status !== "OK" ||
    data.rows[0].elements[0].status !== "OK"
  ) {
    throw new Error("Unable to calculate distance");
  }

  // distance in KM
  return data.rows[0].elements[0].distance.value / 1000;
}
