import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET(req) {
  try {
    // ✅ read cookies correctly
    const cookieStore = await cookies();
    const auth = cookieStore.get("admin_auth");

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ read query params correctly
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = 10;
    const offset = (page - 1) * limit;

    // ✅ total count
    const [[{ total }]] = await db.query(
      "SELECT COUNT(*) AS total FROM bookings"
    );

    // ✅ paginated data
    const [rows] = await db.query(
      `SELECT *
       FROM bookings
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: rows,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
