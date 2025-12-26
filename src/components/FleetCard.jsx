export default function FleetCard({ icon, title, onewayPrice, roundtripPrice, passengers, bags, type }) {
    return (
        <div className="col-md-4">
            <div className="fleet-card shadow-sm">
                <div className="fleet-img-box">
                    <img src={icon} className="img-fluid" alt="SUV" />
                </div>

                <div className="fleet-content p-4">
                    <div
                        className="d-flex justify-content-between align-items-center"
                    >
                        <h4 className="fw-bold mb-0">{title}</h4>
                        <span className="badge popular-badge">Popular</span>
                    </div>

                    <div className="pricing mt-3">
                        <p className="m-0">One Way <span>₹{onewayPrice}/km</span></p>
                        <p className="m-0">Round Trip <span>₹{roundtripPrice}/km</span></p>
                    </div>

                    <div className="fleet-info-icons mt-3 mb-2">
                        <span><i className="bi bi-people-fill"></i> {passengers}+ Passengers</span>
                        <span
                        ><i className="bi bi-briefcase-fill"></i> {bags} Large Bags</span
                        >
                    </div>

                    <p className="type-text">
                        <strong>Type:</strong> {type}
                    </p>

                    <div className="beta-box">
                        Flat Driver Beta: <strong>₹400</strong> — applies to
                        <b>both One Way & Round Trip</b>
                    </div>
                    <div className="d-grid gap-2 mt-4">
                        <a href="#bookingForm" className="btn fleet-btn-primary"
                            >Book Now</a>
                            
                        <a href="tel:+919952077745" className="btn fleet-btn-outline">Call Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}