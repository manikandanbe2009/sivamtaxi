"use client";

export default function CabEstimateCard({
    vehicle,
    estimate,
    route,
    datetime,
    onSelect,
    onBook
}) {
    if (!vehicle || !estimate) return null; // 🔥 prevents runtime crash

    return (
           <div className="container">            
            <ul className="list-group shadow">
                <li className="list-group-item d-flex justify-content-between">
                    <span>🚖 Your Cab Estimate</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Selected Cab</span>
                    <strong>{vehicle.name}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Route</span>
                    <strong>{route}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Date & Time</span>
                    <strong>{datetime}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Distance</span>
                    <strong>{estimate.actualDistance} km</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Estimated Fare</span>
                    <strong>₹{estimate.distanceFare}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Driver Bata</span>
                    <strong>₹{estimate.driverBeta}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between list-group-item-success">
                    <span>Total</span>
                    <strong>₹{estimate.total}</strong>
                </li>
            </ul>

            <div className="d-grid mt-3">
                <button className="btn btn-success btn-lg" onClick={onBook}>
                    Book Cab Now
                </button>
            </div>
        </div>

    );
}
