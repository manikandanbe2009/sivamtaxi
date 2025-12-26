import Image from "next/image";
import BookingForm from "../components/BookingForm";
import WhyChooseBox from "../components/WhyChooseBox";
import OurService from "../components/OurService";
import FleetCard from "../components/FleetCard";
import TripCard from "../components/TripCard";

export default function Home() {
  return (
    <>
      <div id="bookingForm">
        <BookingForm />
      </div>
      <section className="why-choose-us">
        <div className="container">
          <div className="row text-center g-4">
            <WhyChooseBox
              image={"/images/departure-time.png"}
              title={"Departure time of your choice"}
            />
            <WhyChooseBox
              image={"/images/home-pickup.png"}
              title={"Door Step Pickup & Drop"}
            />
            <WhyChooseBox
              image={"/images/airport-pickup.png"}
              title={"Airport Pickup & Drop"}
            />
            <WhyChooseBox
              image={"/images/safety.png"}
              title={"Reliability and Safety"}
            />
            <WhyChooseBox
              image={"/images/time.png"}
              title={"24/7 Cab Availability"}
            />
            <WhyChooseBox
              image={"/images/cab-pricing.png"}
              title={"Reasonable Pricing"}
            />
          </div>
        </div>
      </section>
      <section className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* <!-- Left Image --> */}
            <div className="col-md-5">
              <div className="about-img-box p-3">
                <img
                  src="/images/cab-about-us.png"
                  className="img-fluid"
                  alt="Driver"
                />
              </div>
            </div>

            {/* <!-- Right Content --> */}
            <div className="col-md-7 mt-4 mt-md-0">
              <h2 className="fw-bold mb-3">Sivam Oneway Taxi</h2>

              <p className="about-text">
                Sivam Oneway Taxi offers easy and safe drop taxi services across
                Tamil Nadu, Bangalore, Pondicherry and nearby cities.
              </p>

              <ul className="about-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  One-way pricing — pay only for the trip you take, no return
                  fare.
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Clean, comfortable cars — driven by friendly, experienced
                  drivers.
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  24/7 availability — book anytime, from anywhere.
                </li>
              </ul>

              <p className="about-text mt-3">
                Whether it's a short trip or a long-distance ride, we are here
                to serve you — simple, safe, and reliable.
              </p>

              <a
                href="tel:+919952077745"
                className="about-btn mt-3 d-inline-flex align-items-center"
              >
                <i className="bi bi-telephone-fill me-2"></i>
                +91 99520 77745
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="services-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Explore Our Services</h2>
          <div className="row g-4 justify-content-center">
            <OurService
              icon={"/images/driver.png"}
              title={"One Way Taxi"}
              description={" Perfect for city-to-city travel with no return charges."}
              activeClass={true}
            />
            <OurService
              icon={"/images/clock.png"}
              title={"Round Trip Taxi"}
              description={"Ideal for day trips or return journeys. Comfortable rides at competitive prices."}
            />
            <OurService
              icon={"/images/taxi.png"}
              title={"Airport Transfer"}
              description={"On-time pickup and drop to all major airports across Tamil Nadu & Bengaluru."}
            />
            <OurService
              icon={"/images/tour.png"}
              title={"Taxi Packages"}
              description={" Planning a tour? Custom packages for individuals & groups  available."}
            />

          </div>
        </div>
      </section>
      <section className="fleet-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Fleet</h2>
          <div className="row g-4">
            <FleetCard
              icon={"/images/xylo-img.png"}
              title={"SUV"}
              onewayPrice={19}
              roundtripPrice={28}
              passengers={6}
              bags={4}
              type={"Suv, XYLO, Ertiga"}
            />
            <FleetCard
              icon={"/images/sedan-img.png"}
              title={"Sedan"}
              onewayPrice={14}
              roundtripPrice={13}
              passengers={4}
              bags={2}
              type={"Aspire, Dzire, Xcent, Zest"}
            />
            <FleetCard
              icon={"/images/innova-img.png"}
              title={"INNOVA"}
              onewayPrice={20}
              roundtripPrice={19}
              passengers={7}
              bags={3}
              type={"Assured Innova"}

            />
            <FleetCard
              icon={"/images/toyato-etios-img.png"}
              title={"Etios"}
              onewayPrice={15}
              roundtripPrice={13}
              passengers={4}
              bags={3}
              type={"Toyota Etios"}

            />
            <FleetCard
              icon={"/images/ertiga-img.png"}
              title={"SUV ERTIGA"}
              onewayPrice={19}
              roundtripPrice={18}
              passengers={6}
              bags={3}
              type={"Assured Ertiga"}

            />
            <FleetCard
              icon={"/images/innova-crysta-img.png"}
              title={"INNOVA CRYSTA"}
              onewayPrice={22}
              roundtripPrice={20}
              passengers={7}
              bags={3 - 4}
              type={"Innova Crysta"}

            />
          </div>
        </div>
      </section>
      <section className="trip-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Popular Outstation Trip</h2>
          <div className="row g-4">
            <TripCard
              image={"/images/cities/pondy-city.jpg"}
              title={"Chennai to Puducherry"}
              type={"Sivam Oneway Taxi"}
              duration={"3 hr 18 min"}
              price={"₹2,733"}
            />
            <TripCard
              image={"/images/cities/trichy-city.jpg"}
              title={"Chennai to Trichy"}
              type={"Sivam Oneway Taxi"}
              duration={"5 hr 42 min"}
              price={"₹5,027"}
            />
            <TripCard
              image={"/images/cities/salem-city.jpg"}
              title={"Chennai to Salem"}
              type={"Sivam Oneway Taxi"}
              duration={"3 hr 58 min"}
              price={"₹2,993"}
            />
            <TripCard
              image={"/images/cities/coimbatore-city.jpg"}
              title={"Chennai to Coimbatore"}
              type={"Sivam Oneway Taxi"}
              duration={"8 hr 53 min"}
              price={"₹7,522"}
            />
            <TripCard
              image={"/images/cities/rameshwaram-city.jpg"}
              title={"Chennai to Rameshwaram"}
              type={"Sivam Oneway Taxi"}
              duration={"7 hr 02 min"}
              price={"₹4,961"}
            />
            <TripCard
              image={"/images/cities/vellore-city.jpg"}
              title={"Chennai to Vellore"}
              type={"Sivam Oneway Taxi"}
              duration={"7 hr 37 min"}
              price={"₹6,784"}
            />
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="cta-overlay"></div>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center text-white">
              <h2 className="cta-title" data-aos="fade-up">
                Ready to Book Your Taxi?
              </h2>
              <p className="cta-text" data-aos="fade-up" data-aos-delay="150">
                Get instant confirmation for your drop taxi booking. Professional drivers,
                clean vehicles, and affordable rates guaranteed.
              </p>
              <div className="cta-buttons" data-aos="zoom-in" data-aos-delay="300">
                <a href="tel:+919952077745" className="btn btn-call">
                  📞 +91 99520 77745
                </a>
                <a href="#bookingForm" className="btn btn-book">
                  → Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
