"use client";
import { useState } from "react";
import { useAuth } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-white p-6 shadow rounded-2xl">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold ";
  const statusColor =
    status === "Delivered"
      ? "bg-green-100 text-green-700"
      : status === "Shipped"
        ? "bg-blue-100 text-blue-700"
        : "bg-yellow-100 text-yellow-700";
  return <span className={base + statusColor}>{status}</span>;
};

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [] = useCollection(user && query);

  const [orders] = useState([
    {
      id: "ORD-1234",
      date: "2025-06-15",
      status: "Delivered",
      total: 129.99,
      items: 3,
    },
    {
      id: "ORD-1235",
      date: "2025-06-12",
      status: "Shipped",
      total: 89.5,
      items: 2,
    },
    {
      id: "ORD-1236",
      date: "2025-06-10",
      status: "Pending",
      total: 59.0,
      items: 1,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const totalSpent = orders.reduce((acc, o) => acc + o.total, 0).toFixed(2);

  const orderData = {
    labels: orders.map((o) => o.date),
    datasets: [
      {
        label: "Order Total ($)",
        data: orders.map((o) => o.total),
        fill: false,
        backgroundColor: "#4f46e5",
        borderColor: "#6366f1",
      },
    ],
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* === Summary Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Total Spent" value={`$${totalSpent}`} />
        <StatCard
          label="Delivered"
          value={orders.filter((o) => o.status === "Delivered").length}
        />
        <StatCard
          label="Pending"
          value={orders.filter((o) => o.status === "Pending").length}
        />
      </div>

      {/* === Order Table === */}
      <div className="bg-white p-6 shadow rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200 rounded-xl">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2 hidden sm:table-cell">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 hidden sm:table-cell">Items</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {order.date}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {order.items}
                  </td>
                  <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-indigo-600 hover:underline text-sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Order Chart === */}
      <div className="bg-white p-6 shadow rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Order Trend</h2>
        <Line data={orderData} />
      </div>

      {/* === Modal === */}
      {selectedOrder && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <p>
              <strong>ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <StatusBadge status={selectedOrder.status} />
            </p>
            <p>
              <strong>Items:</strong> {selectedOrder.items}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
