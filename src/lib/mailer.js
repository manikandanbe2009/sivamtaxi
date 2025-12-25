import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBookingEmail(data) {
  const {
    name,
    email,
    phone,
    pickup,
    drop,
    cab,
    distance,
    fare,
    driverBeta,
    total,
    travelDateTime,
  } = data;

  return transporter.sendMail({
    from: `"Sivam One Way Taxi" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🚕 Booking Confirmed – Sivam One Way Taxi",
    html: `
      <h2>Booking Confirmation</h2>
      <p>Dear <b>${name}</b>,</p>

      <p>Your cab booking has been confirmed successfully.</p>

      <table border="1" cellpadding="8" cellspacing="0">
        <tr><td><b>Cab</b></td><td>${cab}</td></tr>
        <tr><td><b>Route</b></td><td>${pickup} → ${drop}</td></tr>
        <tr><td><b>Date & Time</b></td><td>${travelDateTime}</td></tr>
        <tr><td><b>Distance</b></td><td>${distance} km</td></tr>
        <tr><td><b>Fare</b></td><td>₹${fare}</td></tr>
        <tr><td><b>Driver Beta</b></td><td>₹${driverBeta}</td></tr>
        <tr><td><b>Total</b></td><td><b>₹${total}</b></td></tr>
      </table>

      <p><b>Contact:</b> +91 99520 77745</p>

      <p>Thank you for choosing Sivam One Way Taxi 🚖</p>
    `,
  });
}
