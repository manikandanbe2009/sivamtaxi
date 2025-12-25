"use client";

import { useRef, useState } from "react";
import TripForm from "../components/TripForm";
import CabEstimateCard from "../components/CabEstimateCard";
import { useRouter } from "next/navigation";



export default function BookingForm() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const router = useRouter();


  const [activeTab, setActiveTab] = useState("oneway");
  const [vehicle, setVehicle] = useState("Select vehicle type");
  const [estimateData, setEstimateData] = useState(null);
  const estimateRef = useRef(null);

  const onBookHandle = async () => {
    if (!estimateData) return;

    const payload = {
      tripType: activeTab,
      customerName: estimateData.customer.name,
      mobile: estimateData.customer.mobile,
      email: estimateData.customer.email,
      pickup,
      drop,
      vehicle: estimateData.vehicle.name,
      distance: estimateData.actualDistance,
      pricePerKm: estimateData.pricePerKm,
      driverBeta: estimateData.driverBeta,
      totalAmount: estimateData.total,
      travelDateTime: new Date(),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      
      sendWhatsAppConfirmation(estimateData);
      alert("🚕 Booking confirmed! We will contact you shortly.");
      setTimeout(() => {
        router.push("/booking-success");
      }, 500);
    } catch {
      alert("❌ Booking failed. Please try again.");
    }
  };

  const sendWhatsAppConfirmation = (booking) => {
    const phoneNumber = "917299448663"; // 🔴 your business WhatsApp number

    const message = `
🚕 *Cab Booking Confirmed*

Name: ${booking.customer.name}
Mobile: ${booking.customer.mobile}

Trip Type: ${activeTab === "round" ? "Round Trip" : "One Way"}
Route: ${pickup} → ${drop}
Vehicle: ${booking.vehicle.name}
Distance: ${booking.actualDistance} km

Estimated Fare: ₹${booking.distanceFare}
Driver Beta: ₹${booking.driverBeta}
Total: ₹${booking.total}

Travel Date & Time:
${new Date().toLocaleString()}
  `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };


  const selectVehicle = (name) => {
    setVehicle(name);
  };

  return (
    <section id="hero" className="hero section">
      <img
        className="hero-bg"
        src="/images/hero-bg.jpg"
        alt="Hero"
      />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">

                {/* Tabs */}
                <ul className="nav nav-pills bg-warning nav-justified mb-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "oneway" ? "active" : ""}`}
                      data-bs-toggle="pill"
                      data-bs-target="#oneway"
                      type="button"
                      onClick={() => setActiveTab("oneway")}
                    >
                      One Way
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "round" ? "active" : ""}`}
                      data-bs-toggle="pill"
                      data-bs-target="#round"
                      type="button"
                      onClick={() => setActiveTab("round")}
                    >
                      Round Trip
                    </button>
                  </li>
                </ul>
                <div className="tab-content">

                  <div className="tab-pane fade show active" id="oneway">
                    <TripForm
                      type="oneway"
                      pickup={pickup}
                      drop={drop}
                      setPickup={setPickup}
                      setDrop={setDrop}
                      onEstimate={(data) => {
                        setEstimateData(data);
                        setTimeout(() => {
                          estimateRef.current?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                    />

                  </div>

                  <div className="tab-pane fade" id="round">
                    <TripForm
                      type="round"
                      pickup={pickup}
                      drop={drop}
                      setPickup={setPickup}
                      setDrop={setDrop}
                      onEstimate={(data) => {
                        setEstimateData(data);
                        setTimeout(() => {
                          estimateRef.current?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                    />
                  </div>

                </div>


              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <CabEstimateCard
              vehicle={estimateData?.vehicle}
              estimate={estimateData}
              route={`${pickup} → ${drop}`}
              datetime={new Date().toLocaleString()}
              onBook={onBookHandle}
            />

          </div>
        </div>
      </div>
    </section>
  );
}
