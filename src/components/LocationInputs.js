"use client";
import { useEffect, useRef } from "react";

export default function LocationInputs({ onPickup, onDrop }) {
  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const options = {
      componentRestrictions: { country: "in" },
      fields: ["formatted_address", "geometry"],
    };

    const pickupAuto = new google.maps.places.Autocomplete(
      pickupRef.current,
      options
    );

    const dropAuto = new google.maps.places.Autocomplete(
      dropRef.current,
      options
    );

    pickupAuto.addListener("place_changed", () => {
      const place = pickupAuto.getPlace();
      onPickup(place.formatted_address);
    });

    dropAuto.addListener("place_changed", () => {
      const place = dropAuto.getPlace();
      onDrop(place.formatted_address);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <label className="form-label">Pickup Location</label>
        <input
          ref={pickupRef}
          type="text"
          className="form-control"
          placeholder="Enter pickup location"
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">Drop Location</label>
        <input
          ref={dropRef}
          type="text"
          className="form-control"
          placeholder="Enter drop location"
        />
      </div>
    </div>
  );
}