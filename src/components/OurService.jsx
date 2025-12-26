export default function WhyChooseBox({ icon, title, description, activeClass }) {
  return (
      <div className="col-md-3">
          <div className={`service-card ${activeClass ? 'active-service' : ''} p-4`}>
              <div className="icon-wrap">
                  <img src={icon} alt="" />
              </div>

              <h4 className="mt-4 mb-2">{title}</h4>
              <p className="mb-2">
                  {description}
              </p>

              <button className="service-btn">
                  <i className="bi bi-arrow-right"></i>
              </button>
          </div>
      </div>
  );
}