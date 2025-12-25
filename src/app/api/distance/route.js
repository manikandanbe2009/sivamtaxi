import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { origin, destination } = await req.json();

    const key = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${key}`;

    const res = await fetch(url);
    const data = await res.json();

    if (
      data.status !== "OK" ||
      data.rows[0].elements[0].status !== "OK"
    ) {
      return NextResponse.json(
        { error: "Distance not found" },
        { status: 400 }
      );
    }

    const distanceKm = data.rows[0].elements[0].distance.value / 1000;
    const distanceText= data.rows[0].elements[0].distance.text;
    const durationText= data.rows[0].elements[0].duration.text;

    return NextResponse.json({ distanceKm,  distanceText,
      durationText });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
