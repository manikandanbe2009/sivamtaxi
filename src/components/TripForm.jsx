"use client";

import { useState } from "react";
import Image from "next/image";
import LocationInputs from "./LocationInputs";


export default function TripForm({ type,
    pickup,
    drop,
    setPickup,
    setDrop,
    onEstimate }) {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [pricing, setPricing] = useState("Select vehicle type");
    const [loading, setLoading] = useState(false);
    const [durationText, setDurationText] = useState("");
    const [distanceText, setDistanceText] = useState("");
    
    const vehicles = [
        {
            name: "SEDAN",
            img: "/images/prime-play-1.png",
            oneWayPrice: 14,
            roundTripPrice: 13,
        },
        {
            name: "ETIOS",
            img: "/images/lux-1__2_.png",
            oneWayPrice: 15,
            roundTripPrice: 14,
        },
        {
            name: "SUV",
            img: "/images/prime-suv-1.png",
            oneWayPrice: 19,
            roundTripPrice: 18,
        },
        {
            name: "INNOVA",
            img: "/images/prime-suv-1.png",
            oneWayPrice: 20,
            roundTripPrice: 19,
        },
        {
            name: "INNOVA CRYSTA",
            img: "/images/prime-suv-1.png",
            oneWayPrice: 22,
            roundTripPrice: 20,
        },
        {
            name: "TEMPO TRAVELLER",
            img: "/images/prime-suv-1.png",
            oneWayPrice: 25,
            roundTripPrice: 23,
        },
    ];
    const fetchDistance = async (origin, destination) => {
        const res = await fetch("/api/distance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ origin, destination }),
        });

        if (!res.ok) throw new Error("Distance error");

        const data = await res.json();
        setDistanceText(data.distanceText);
        setDurationText(data.durationText);
        return data.distanceKm;
    };

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [estimate, setEstimate] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pickup || !drop || !selectedVehicle) {
            setDistanceText(null);
            setDurationText(null);
            alert("Please fill all fields");

            return;
        }

        try {
            setLoading(true);

            // ✅ SERVER-SIDE DISTANCE
            const actualDistance = await fetchDistance(pickup, drop);

            const minKm = type === "round" ? 250 : 130;
            const chargeableKm = Math.max(actualDistance, minKm);

            const pricePerKm =
                type === "round"
                    ? selectedVehicle.roundTripPrice
                    : selectedVehicle.oneWayPrice;

            const driverBeta = 400;

            const distanceFare = Math.round(chargeableKm * pricePerKm);
            const totalFare = distanceFare + driverBeta;

            const estimateObject = {
                actualDistance: actualDistance.toFixed(1),
                chargeableKm,
                pricePerKm,
                distanceFare,
                driverBeta,
                total: totalFare,
            };

            onEstimate({
                ...estimateObject,
                vehicle: selectedVehicle,
                customer: {
                    name,
                    mobile,
                    email,
                },
            });
        } catch (err) {
            alert("Distance calculation failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row g-3" >
            <form className="row g-3" onSubmit={handleSubmit}>

                {/* Name */}
                <div className="col-md-4 mb-3">
                    <input
                        className="form-control"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <input
                        className="form-control"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) =>
                            setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        required
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Pickup */}
                <div className="col-md-6">
                    <input
                        className="form-control"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Pickup e.g. Chennai Central Railway Station"
                        required
                    />
                </div>

                {/* Drop */}
                <div className="col-md-6">
                    <input
                        className="form-control"
                        placeholder="Drop e.g. Chennai Airport"
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                        required
                    />
                </div>
                {/* <LocationInputs
                    onPickup={(v) => setPickup(v)}
                    onDrop={(v) => setDrop(v)}
                /> */}

                {/* Date */}
                <div className="col-md-4">
                    <input type="date" className="form-control" required />
                </div>

                {/* Time */}
                <div className="col-md-4">
                    <input type="time" className="form-control" required />
                </div>



                {/* VEHICLE DROPDOWN */}
                <div className="col-md-4">
                    <div className="dropdown">
                        <button
                            type="button"
                            className="form-control text-start d-flex align-items-center justify-content-between"
                            data-bs-toggle="dropdown"
                        >
                            {selectedVehicle ? (
                                <div className="d-flex align-items-center gap-2">
                                    <img
                                        src={selectedVehicle.img}
                                        alt={selectedVehicle.name}
                                        width={40}
                                        height={24}
                                        style={{ objectFit: "contain" }}
                                    />
                                    <span>{selectedVehicle.name}</span>
                                </div>
                            ) : (
                                <span className="text-muted">Select vehicle type</span>
                            )}

                            <span className="dropdown-toggle"></span>
                        </button>

                        <ul
                            className="dropdown-menu w-100 p-0"
                            style={{ maxHeight: "280px", overflowY: "auto" }}
                        >
                            {vehicles.map((v) => (
                                <li key={v.name}>
                                    <button
                                        type="button"
                                        className="dropdown-item d-flex align-items-center gap-3 py-2"
                                        onClick={() => setSelectedVehicle(v)}
                                    >
                                        <img
                                            src={v.img}
                                            alt={v.name}
                                            width={40}
                                            height={24}
                                            style={{ objectFit: "contain" }}
                                        />
                                        <span>{v.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Submit */}

                <div className="d-flex justify-content-between">
                    <button className="btn btn-warning" disabled={loading}>
                        {loading ? "Calculating Distance..." : "Get Estimation"}
                    </button>
                    {distanceText && durationText && (
                        <div className="fs-6 font-monospace text-dark text-right">
                            <div>Distance: {distanceText}</div>
                            <div>Approx travel time: {durationText}</div>
                        </div>
                    )}
                </div>

            </form>
            {/* {estimate && (
                <div className="mt-4 border rounded bg-light">
                    <h6 className="fw-bold mb-3">Trip Estimation</h6>

                    <p><strong>Trip Type:</strong> {type === "round" ? "Round Trip" : "One Way"}</p>
                    <p><strong>Vehicle:</strong> {selectedVehicle.name}</p>

                    <p><strong>Actual Distance:</strong> {estimate.actualDistance} KM</p>
                    <p><strong>Minimum Chargeable:</strong> {estimate.chargeableKm} KM</p>

                    <p><strong>Price / KM:</strong> ₹{estimate.pricePerKm}</p>
                    <p><strong>Distance Fare:</strong> ₹{estimate.distanceFare}</p>
                    <p><strong>Driver Beta:</strong> ₹{estimate.driverBeta}</p>

                    <hr />

                    <p className="fw-bold text-success fs-5">
                        Total Amount: ₹{estimate.total}
                    </p>
                </div>
            )} */}
        </div>
    );
}
