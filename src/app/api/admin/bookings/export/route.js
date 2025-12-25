import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import ExcelJS from "exceljs";

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");

  if (!auth) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const [rows] = await db.query(
    `SELECT 
      id,
      customer_name,
      mobile,
      email,
      pickup,
      drop_location,
      vehicle,
      trip_type,
      distance_km,
      total_amount,
      status,
      travel_datetime,
      created_at
     FROM bookings
     ORDER BY id DESC`
  );

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Bookings");

  sheet.columns = [
    { header: "Booking ID", key: "id", width: 12 },
    { header: "Customer Name", key: "customer_name", width: 20 },
    { header: "Mobile", key: "mobile", width: 15 },
    { header: "Email", key: "email", width: 25 },
    { header: "Pickup", key: "pickup", width: 20 },
    { header: "Drop", key: "drop_location", width: 20 },
    { header: "Vehicle", key: "vehicle", width: 15 },
    { header: "Trip Type", key: "trip_type", width: 12 },
    { header: "Distance (km)", key: "distance_km", width: 14 },
    { header: "Total Amount (₹)", key: "total_amount", width: 18 },
    { header: "Status", key: "status", width: 14 },
    { header: "Travel Date", key: "travel_datetime", width: 20 },
    { header: "Booked At", key: "created_at", width: 20 },
  ];

  rows.forEach((row) => {
    sheet.addRow({
      ...row,
      travel_datetime: new Date(row.travel_datetime).toLocaleString("en-IN"),
      created_at: new Date(row.created_at).toLocaleString("en-IN"),
    });
  });

  sheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="cab-bookings.xlsx"`,
    },
  });
}
