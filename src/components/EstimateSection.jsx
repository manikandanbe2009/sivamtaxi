<<<<<<< HEAD
import React from "react";

export default function EstimateSection({ estimate, vehicle, type }) {
  if (!estimate) return null;

  return (
    <section id="estimate" className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div className="card shadow">
              <div className="card-body">

                <h4 className="text-center mb-4">
                  Trip Estimation Details
                </h4>

                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Trip Type</th>
                        <td>{type === "round" ? "Round Trip" : "One Way"}</td>
                      </tr>
                      <tr>
                        <th>Vehicle</th>
                        <td>{vehicle.name}</td>
                      </tr>
                      <tr>
                        <th>Actual Distance</th>
                        <td>{estimate.actualDistance} KM</td>
                      </tr>
                      <tr>
                        <th>Chargeable Distance</th>
                        <td>{estimate.chargeableKm} KM</td>
                      </tr>
                      <tr>
                        <th>Price / KM</th>
                        <td>₹{estimate.pricePerKm}</td>
                      </tr>
                      <tr>
                        <th>Distance Fare</th>
                        <td>₹{estimate.distanceFare}</td>
                      </tr>
                      <tr>
                        <th>Driver Beta</th>
                        <td>₹{estimate.driverBeta}</td>
                      </tr>
                      <tr className="table-success">
                        <th>Final Amount</th>
                        <td className="fw-bold">
                          ₹{estimate.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-muted small mt-2">
                  * Toll, parking & permit charges are extra if applicable
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
=======
import React from "react";

export default function EstimateSection({ estimate, vehicle, type }) {
  if (!estimate) return null;

  return (
    <section id="estimate" className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div className="card shadow">
              <div className="card-body">

                <h4 className="text-center mb-4">
                  Trip Estimation Details
                </h4>

                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Trip Type</th>
                        <td>{type === "round" ? "Round Trip" : "One Way"}</td>
                      </tr>
                      <tr>
                        <th>Vehicle</th>
                        <td>{vehicle.name}</td>
                      </tr>
                      <tr>
                        <th>Actual Distance</th>
                        <td>{estimate.actualDistance} KM</td>
                      </tr>
                      <tr>
                        <th>Chargeable Distance</th>
                        <td>{estimate.chargeableKm} KM</td>
                      </tr>
                      <tr>
                        <th>Price / KM</th>
                        <td>₹{estimate.pricePerKm}</td>
                      </tr>
                      <tr>
                        <th>Distance Fare</th>
                        <td>₹{estimate.distanceFare}</td>
                      </tr>
                      <tr>
                        <th>Driver Beta</th>
                        <td>₹{estimate.driverBeta}</td>
                      </tr>
                      <tr className="table-success">
                        <th>Final Amount</th>
                        <td className="fw-bold">
                          ₹{estimate.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-muted small mt-2">
                  * Toll, parking & permit charges are extra if applicable
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
>>>>>>> 67886b3d4e54dfae9e1864a230271ec22ed9722b
