import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { sendBookingEmail } from "../../../../lib/mailer";
export async function POST(req) {
    try {
        const body = await req.json();

        const {
            tripType,
            customerName,
            mobile,
            email,
            pickup,
            drop,
            vehicle,
            distance,
            pricePerKm,
            driverBeta,
            totalAmount,
            travelDateTime,
        } = body;

        const mysqlDateTime = new Date(travelDateTime)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        await db.execute(
            `INSERT INTO bookings 
  (trip_type, customer_name, mobile, email, pickup, drop_location, vehicle,
   distance_km, price_per_km, driver_beta, total_amount, travel_datetime)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                tripType,
                customerName,
                mobile,
                email,
                pickup,
                drop,
                vehicle,
                Number(distance) || 0,
                Number(pricePerKm) || 0,
                Number(driverBeta) || 0,
                Number(totalAmount) || 0,
                mysqlDateTime,
            ]
        );
        await sendBookingEmail(body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("❌ INSERT ERROR:", error.sqlMessage || error.message);
        console.error("❌ FULL ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.sqlMessage || error.message,
            },
            { status: 500 }
        );
    }
}
