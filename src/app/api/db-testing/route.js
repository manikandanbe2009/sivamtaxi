import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
