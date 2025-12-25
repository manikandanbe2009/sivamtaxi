"use client";
import { useEffect, useState } from "react";

export default function PricingAdmin() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((r) => r.json())
      .then((d) => setPrices(d.data));
  }, []);

  const updatePrice = async (p) => {
    await fetch("/api/admin/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    alert("Updated successfully");
  };

  return (
    <div className="container">
      <h3>Cab Pricing</h3>
      {prices.map((p) => (
        <div key={p.id} className="card p-3 mb-2">
          <h6>{p.vehicle}</h6>
          <input
            type="number"
            value={p.price_per_km}
            onChange={(e) =>
              setPrices((prev) =>
                prev.map((x) =>
                  x.id === p.id ? { ...x, price_per_km: e.target.value } : x
                )
              )
            }
          />
          <input
            type="number"
            value={p.driver_beta}
            onChange={(e) =>
              setPrices((prev) =>
                prev.map((x) =>
                  x.id === p.id ? { ...x, driver_beta: e.target.value } : x
                )
              )
            }
          />
          <button onClick={() => updatePrice(p)}>Save</button>
        </div>
      ))}
    </div>
  );
}
