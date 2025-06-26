'use client';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DashboardPage() {

    const [orders, setOrders] = useState([
      { id: 'ORD-1234', date: '2025-06-15', status: 'Delivered', total: 129.99, items: 3 },
      { id: 'ORD-1235', date: '2025-06-12', status: 'Shipped', total: 89.5, items: 2 },
      { id: 'ORD-1236', date: '2025-06-10', status: 'Pending', total: 59.0, items: 1 },
    ]);

    const totalSpent = orders.reduce((acc, o) => acc + o.total, 0).toFixed(2);

    const orderData = {
      labels: orders.map((o) => o.date),
      datasets: [
        {
          label: 'Order Total ($)',
          data: orders.map((o) => o.total),
          fill: false,
          backgroundColor: '#4f46e5',
          borderColor: '#6366f1',
        },
      ],
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {/* === Cards === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 shadow rounded-2xl">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold">{orders.length}</p>
            </div>
            <div className="bg-white p-6 shadow rounded-2xl">
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-semibold">${totalSpent}</p>
            </div>
            <div className="bg-white p-6 shadow rounded-2xl">
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-semibold">{orders.filter(o => o.status === 'Delivered').length}</p>
            </div>
            <div className="bg-white p-6 shadow rounded-2xl">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-semibold">{orders.filter(o => o.status === 'Pending').length}</p>
            </div>
          </div>

          {/* === Graph === */}
          <div className="bg-white p-6 shadow rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Order Trend</h2>
            <Line data={orderData} />
          </div>

          {/* === Table === */}
          <div className="bg-white p-6 shadow rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-200 rounded-xl">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Items</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                {orders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{order.date}</td>
                      <td className="px-4 py-3">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'Shipped'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {order.status}
                    </span>
                      </td>
                      <td className="px-4 py-3">{order.items}</td>
                      <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <button className="text-indigo-600 hover:underline text-sm">View</button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  };

