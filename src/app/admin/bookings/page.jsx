<<<<<<< HEAD
"use client";

import { useEffect, useState } from "react";
import Charts from "./Charts";

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [vehicleFilter, setVehicleFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const res = await fetch(`/api/admin/bookings?page=${page}`);

                // 🔐 Unauthorized → redirect
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                    return;
                }

                // ❗ If no content, stop
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    console.error("No JSON response");
                    return;
                }


                const data = await res.json();



                if (data.success) {
                    setBookings(data.data);
                    setFilteredBookings(data.data);
                    setTotalPages(data.totalPages);
                }

            } catch (err) {
                console.error("Admin fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);
    useEffect(() => {
        let result = [...bookings];

        if (statusFilter !== "all") {
            result = result.filter((b) => b.status === statusFilter);
        }

        if (vehicleFilter !== "all") {
            result = result.filter((b) => b.vehicle === vehicleFilter);
        }

        if (dateFilter) {
            result = result.filter((b) => {
                const bookingDate = new Date(b.travel_datetime)
                    .toISOString()
                    .slice(0, 10);
                return bookingDate === dateFilter;
            });
        }

        setFilteredBookings(result);
    }, [statusFilter, vehicleFilter, dateFilter, bookings]);


    const statusBadge = (status) => {
        const map = {
            pending: "secondary",
            confirmed: "primary",
            completed: "success",
            cancelled: "danger",
        };
        return `badge bg-${map[status] || "secondary"}`;
    };



    const logout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">🚕 Cab Bookings</h2>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                    Logout
                </button>
            </div>
            <div className="row g-3 mb-4">
                {/* STATUS FILTER */}
                <div className="col-md-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* VEHICLE FILTER */}
                <div className="col-md-3">
                    <label className="form-label">Vehicle</label>
                    <select
                        className="form-select"
                        value={vehicleFilter}
                        onChange={(e) => setVehicleFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        {[...new Set(bookings.map((b) => b.vehicle))].map(
                            (vehicle) => (
                                <option key={vehicle} value={vehicle}>
                                    {vehicle}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* DATE FILTER */}
                <div className="col-md-3">
                    <label className="form-label">Travel Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>

                {/* RESET */}
                <div className="col-md-3 d-flex align-items-end">
                    <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => {
                            setStatusFilter("all");
                            setVehicleFilter("all");
                            setDateFilter("");
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
                <button
                    className="btn btn-success mb-3"
                    onClick={() => {
                        window.location.href = "/api/admin/bookings/export";
                    }}
                >
                    ⬇ Export to Excel
                </button>
            </div>
            <Charts bookings={bookings} />
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Mobile</th>
                            <th>Route</th>
                            <th>Vehicle</th>
                            <th>Trip</th>
                            <th>Distance</th>
                            <th>Total</th>
                            <th>Travel</th>
                            <th>Booked At</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((b, i) => (
                            <tr key={b.id}>
                                <td>{i + 1}</td>
                                <td>
                                    <strong>{b.customer_name}</strong>
                                    <br />
                                    <small>{b.email || "-"}</small>
                                </td>
                                <td>{b.mobile}</td>
                                <td>{b.pickup} → {b.drop_location}</td>
                                <td>{b.vehicle}</td>
                                <td className="text-capitalize">{b.trip_type}</td>
                                <td>{b.distance_km} km</td>
                                <td className="fw-bold text-success">₹{b.total_amount}</td>
                                <td>{b.travel_datetime}</td>
                                <td>{b.created_at}</td>
                                <td>
                                    <span className={statusBadge(b.status)}>
                                        {b.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        {/* STATUS SELECT */}
                                        <select
                                            className="form-select form-select-sm"
                                            value={b.status}
                                            onChange={async (e) => {
                                                const newStatus = e.target.value;

                                                await fetch("/api/admin/bookings/status", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        bookingId: b.id,
                                                        status: newStatus,
                                                    }),
                                                });

                                                setBookings((prev) =>
                                                    prev.map((item) =>
                                                        item.id === b.id
                                                            ? { ...item, status: newStatus }
                                                            : item
                                                    )
                                                );
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                        {/* DELETE BUTTON */}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={async () => {
                                                if (!confirm("Are you sure you want to delete this booking?")) {
                                                    return;
                                                }

                                                const res = await fetch("/api/admin/bookings/delete", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ bookingId: b.id }),
                                                });

                                                const result = await res.json();

                                                if (result.success) {
                                                    setBookings((prev) =>
                                                        prev.filter((item) => item.id !== b.id)
                                                    );
                                                } else {
                                                    alert("Failed to delete booking");
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>



                </table>
            </div>
            <nav className="mt-3">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 && "disabled"}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Prev
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, i) => (
                        <li
                            key={i}
                            className={`page-item ${page === i + 1 && "active"}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${page === totalPages && "disabled"}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    );
}
=======
"use client";

import { useEffect, useState } from "react";
import Charts from "./Charts";

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [vehicleFilter, setVehicleFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const res = await fetch(`/api/admin/bookings?page=${page}`);

                // 🔐 Unauthorized → redirect
                if (res.status === 401) {
                    window.location.href = "/admin/login";
                    return;
                }

                // ❗ If no content, stop
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    console.error("No JSON response");
                    return;
                }


                const data = await res.json();



                if (data.success) {
                    setBookings(data.data);
                    setFilteredBookings(data.data);
                    setTotalPages(data.totalPages);
                }

            } catch (err) {
                console.error("Admin fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);
    useEffect(() => {
        let result = [...bookings];

        if (statusFilter !== "all") {
            result = result.filter((b) => b.status === statusFilter);
        }

        if (vehicleFilter !== "all") {
            result = result.filter((b) => b.vehicle === vehicleFilter);
        }

        if (dateFilter) {
            result = result.filter((b) => {
                const bookingDate = new Date(b.travel_datetime)
                    .toISOString()
                    .slice(0, 10);
                return bookingDate === dateFilter;
            });
        }

        setFilteredBookings(result);
    }, [statusFilter, vehicleFilter, dateFilter, bookings]);


    const statusBadge = (status) => {
        const map = {
            pending: "secondary",
            confirmed: "primary",
            completed: "success",
            cancelled: "danger",
        };
        return `badge bg-${map[status] || "secondary"}`;
    };



    const logout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">🚕 Cab Bookings</h2>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                    Logout
                </button>
            </div>
            <div className="row g-3 mb-4">
                {/* STATUS FILTER */}
                <div className="col-md-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* VEHICLE FILTER */}
                <div className="col-md-3">
                    <label className="form-label">Vehicle</label>
                    <select
                        className="form-select"
                        value={vehicleFilter}
                        onChange={(e) => setVehicleFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        {[...new Set(bookings.map((b) => b.vehicle))].map(
                            (vehicle) => (
                                <option key={vehicle} value={vehicle}>
                                    {vehicle}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* DATE FILTER */}
                <div className="col-md-3">
                    <label className="form-label">Travel Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>

                {/* RESET */}
                <div className="col-md-3 d-flex align-items-end">
                    <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => {
                            setStatusFilter("all");
                            setVehicleFilter("all");
                            setDateFilter("");
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
                <button
                    className="btn btn-success mb-3"
                    onClick={() => {
                        window.location.href = "/api/admin/bookings/export";
                    }}
                >
                    ⬇ Export to Excel
                </button>
            </div>
            <Charts bookings={bookings} />
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Mobile</th>
                            <th>Route</th>
                            <th>Vehicle</th>
                            <th>Trip</th>
                            <th>Distance</th>
                            <th>Total</th>
                            <th>Travel</th>
                            <th>Booked At</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((b, i) => (
                            <tr key={b.id}>
                                <td>{i + 1}</td>
                                <td>
                                    <strong>{b.customer_name}</strong>
                                    <br />
                                    <small>{b.email || "-"}</small>
                                </td>
                                <td>{b.mobile}</td>
                                <td>{b.pickup} → {b.drop_location}</td>
                                <td>{b.vehicle}</td>
                                <td className="text-capitalize">{b.trip_type}</td>
                                <td>{b.distance_km} km</td>
                                <td className="fw-bold text-success">₹{b.total_amount}</td>
                                <td>{b.travel_datetime}</td>
                                <td>{b.created_at}</td>
                                <td>
                                    <span className={statusBadge(b.status)}>
                                        {b.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        {/* STATUS SELECT */}
                                        <select
                                            className="form-select form-select-sm"
                                            value={b.status}
                                            onChange={async (e) => {
                                                const newStatus = e.target.value;

                                                await fetch("/api/admin/bookings/status", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        bookingId: b.id,
                                                        status: newStatus,
                                                    }),
                                                });

                                                setBookings((prev) =>
                                                    prev.map((item) =>
                                                        item.id === b.id
                                                            ? { ...item, status: newStatus }
                                                            : item
                                                    )
                                                );
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                        {/* DELETE BUTTON */}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={async () => {
                                                if (!confirm("Are you sure you want to delete this booking?")) {
                                                    return;
                                                }

                                                const res = await fetch("/api/admin/bookings/delete", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ bookingId: b.id }),
                                                });

                                                const result = await res.json();

                                                if (result.success) {
                                                    setBookings((prev) =>
                                                        prev.filter((item) => item.id !== b.id)
                                                    );
                                                } else {
                                                    alert("Failed to delete booking");
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>



                </table>
            </div>
            <nav className="mt-3">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 && "disabled"}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Prev
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, i) => (
                        <li
                            key={i}
                            className={`page-item ${page === i + 1 && "active"}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${page === totalPages && "disabled"}`}>
                        <button
                            className="page-link"
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    );
}
>>>>>>> 67886b3d4e54dfae9e1864a230271ec22ed9722b
