"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function Charts({ bookings }) {
  const statusCount = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  const revenueByDate = {};
  bookings.forEach((b) => {
    const date = new Date(b.created_at).toLocaleDateString("en-IN");
    revenueByDate[date] =
      (revenueByDate[date] || 0) + Number(b.total_amount);
  });

  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="card p-3">
          <h6>Trips by Status</h6>
          <Bar
            data={{
              labels: Object.keys(statusCount),
              datasets: [
                {
                  label: "Trips",
                  data: Object.values(statusCount),
                  backgroundColor: "#0d6efd",
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="card p-3">
          <h6>Revenue by Date</h6>
          <Line
            data={{
              labels: Object.keys(revenueByDate),
              datasets: [
                {
                  label: "Revenue (₹)",
                  data: Object.values(revenueByDate),
                  borderColor: "#198754",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
