export default function WhyChooseBox({ image, title }) {
  return (
      <div
          className="col-6 col-md-4 col-lg-2 mx-auto"
          data-aos="zoom-in"
      >
          <div className="choose-box p-3">
              <img
                  src={image}
                  className="wc-icon img-fluid"
                  alt=""
              />
              <h6 className="mt-3">
                  <small>{title}</small>
              </h6>
          </div>
      </div>
   
  );
}