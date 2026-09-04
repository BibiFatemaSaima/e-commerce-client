import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://e-commerce-server-roan-mu.vercel.app/users?email=${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.error("Error loading user:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://e-commerce-server-roan-mu.vercel.app/orders?email=${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error("Error loading orders:", error);
        });
    }
  }, [user]);

  // Admin হলে Admin Dashboard দেখাবে
  if (userInfo?.role === "admin") {
    return <AdminDashboard />;
  }

  // Customer Dashboard
  return (
    <div className="min-h-[70vh] bg-base-200 p-6">
      {" "}
      <div className="max-w-5xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold">Welcome to Dashboard 👋</h1>

          <p className="mt-2 text-gray-500">{user?.email}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Profile */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">My Profile</h2>

              <div className="mt-3">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {userInfo?.email}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">Role:</span> {userInfo?.role}
                </p>
              </div>
            </div>
          </div>

          {/* My Orders */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">My Orders</h2>

              <p className="text-gray-500">
                You have{" "}
                <span className="font-bold text-primary">{orders.length}</span>{" "}
                order(s).
              </p>

              <div className="card-actions mt-3">
                <Link to="/myOrders" className="btn btn-primary">
                  View Orders
                </Link>
              </div>
            </div>
          </div>

          {/* Shop Products */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Shop Products</h2>

              <p className="text-gray-500">Browse available products.</p>

              <div className="card-actions mt-3">
                <Link to="/products" className="btn btn-primary">
                  Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
