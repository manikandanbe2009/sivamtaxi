export default function TripCard({image, title, type, duration, price}) {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="trip-card">
                <div className="trip-img">
                    <img src={image} alt={title}/>
                </div>

                <div className="trip-content">
                    <h5>{title}</h5>
                    <p className="trip-type">{type}</p>
                    <p className="trip-info">Duration: {duration}</p>
                    <p className ="trip-price">Price: <span>{price}</span></p>

                    <div className="trip-actions">
                        <a href="tel:+919952077745" className="btn btn-call">Call Now</a>
                        <a href="#" className="btn btn-book">Book Now</a>
                    </div>
                </div>
            </div>
        </div>
    );
}