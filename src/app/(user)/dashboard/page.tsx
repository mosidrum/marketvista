"use client";
import { useState } from "react";
import { useAuth } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ProductionDataType } from "@/app/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface FirestoreOrder {
  id: string;
  amount: number;
  items: ProductionDataType[];
}

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

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const ordersRef =
    user?.email
      ? collection(db, "users", user.email, "orders")
      : null;

  const [snapshot] = useCollection(ordersRef);

  const orders: FirestoreOrder[] = (snapshot?.docs ?? []).map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      amount: data?.value?.amount ?? 0,
      items: data?.value?.items ?? [],
    };
  });

  const [selectedOrder, setSelectedOrder] = useState<FirestoreOrder | null>(null);

  const totalSpent = orders.reduce((acc, o) => acc + o.amount, 0).toFixed(2);

  const orderData = {
    labels: orders.map((_, i) => `Order ${i + 1}`),
    datasets: [
      {
        label: "Order Total ($)",
        data: orders.map((o) => o.amount),
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
    } catch {
      // Logout errors are surfaced via the useAuth hook
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Total Spent" value={`$${totalSpent}`} />
        <StatCard
          label="Total Items"
          value={orders.reduce((acc, o) => acc + o.items.length, 0)}
        />
      </div>

      {/* === Order Table === */}
      <div className="bg-white p-6 shadow rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-200 rounded-xl">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2 hidden sm:table-cell">Items</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium truncate max-w-[120px]">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {order.items.length}
                    </td>
                    <td className="px-4 py-3">${order.amount.toFixed(2)}</td>
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
        )}
      </div>

      {/* === Order Chart === */}
      {orders.length > 0 && (
        <div className="bg-white p-6 shadow rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Order Trend</h2>
          <Line data={orderData} />
        </div>
      )}

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
              <strong>Items:</strong> {selectedOrder.items.length}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.amount.toFixed(2)}
            </p>
            {selectedOrder.items.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {selectedOrder.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>× {item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
