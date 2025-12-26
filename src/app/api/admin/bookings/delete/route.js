import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "../../../../../lib/db";

export async function POST(req) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");

  if (!auth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { bookingId } = await req.json();

  if (!bookingId) {
    return NextResponse.json(
      { success: false, message: "Booking ID required" },
      { status: 400 }
    );
  }

  try {
    await db.query("DELETE FROM bookings WHERE id = ?", [bookingId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
