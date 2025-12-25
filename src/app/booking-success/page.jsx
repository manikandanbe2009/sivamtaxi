<<<<<<< HEAD
"use client";

import Link from "next/link";

export default function BookingSuccess() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card shadow text-center">
            <div className="card-body p-4">

              <div className="mb-3">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                  style={{ width: 70, height: 70, fontSize: 32 }}
                >
                  ✓
                </span>
              </div>

              <h3 className="fw-bold mb-2">Booking Confirmed</h3>

              <p className="text-muted">
                Your cab booking has been successfully submitted.
                Our team will contact you shortly.
              </p>

              <div className="alert alert-success mt-3">
                📲 WhatsApp confirmation has been sent
              </div>

              <div className="d-grid gap-2 mt-4">
                <Link href="/" className="btn btn-primary">
                  Book Another Cab
                </Link>

                <a
                  href="tel:+919952077745"
                  className="btn btn-outline-secondary"
                >
                  Call Support
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
=======
"use client";

import Link from "next/link";

export default function BookingSuccess() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card shadow text-center">
            <div className="card-body p-4">

              <div className="mb-3">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                  style={{ width: 70, height: 70, fontSize: 32 }}
                >
                  ✓
                </span>
              </div>

              <h3 className="fw-bold mb-2">Booking Confirmed</h3>

              <p className="text-muted">
                Your cab booking has been successfully submitted.
                Our team will contact you shortly.
              </p>

              <div className="alert alert-success mt-3">
                📲 WhatsApp confirmation has been sent
              </div>

              <div className="d-grid gap-2 mt-4">
                <Link href="/" className="btn btn-primary">
                  Book Another Cab
                </Link>

                <a
                  href="tel:+919952077745"
                  className="btn btn-outline-secondary"
                >
                  Call Support
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
>>>>>>> 67886b3d4e54dfae9e1864a230271ec22ed9722b
