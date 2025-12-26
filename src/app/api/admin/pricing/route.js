import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "../../../../lib/db";

export async function GET() {
  const auth = (await cookies()).get("admin_auth");
  if (!auth) return NextResponse.json({ success: false }, { status: 401 });

  const [rows] = await db.query("SELECT * FROM cab_prices");
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req) {
  const auth = (await cookies()).get("admin_auth");
  if (!auth) return NextResponse.json({ success: false }, { status: 401 });

  const { id, price_per_km, driver_beta } = await req.json();

  await db.query(
    "UPDATE cab_prices SET price_per_km=?, driver_beta=? WHERE id=?",
    [price_per_km, driver_beta, id]
  );

  return NextResponse.json({ success: true });
}
