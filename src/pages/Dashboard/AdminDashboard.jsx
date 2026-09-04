import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error loading orders:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/all-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error loading users:", error));
  }, []);

  return (
    <div className="min-h-[70vh] bg-base-200 p-6">
      {" "}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard 👑</h1>

          <p className="text-gray-500 mt-2">Manage your store from here.</p>
        </div>
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Products */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Total Products</h2>

              <p className="text-3xl font-bold text-primary">
                {products.length}
              </p>
            </div>
          </div>

          {/* Total Orders */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Total Orders</h2>

              <p className="text-3xl font-bold text-primary">{orders.length}</p>
            </div>
          </div>

          {/* Total Users */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Total Users</h2>

              <p className="text-3xl font-bold text-primary">{users.length}</p>
            </div>
          </div>
        </div>
        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Manage Products */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Manage Products</h2>

              <p className="text-gray-500">Add, edit and delete products.</p>

              <div className="flex gap-2 mt-3">
                <Link to="/addProduct" className="btn btn-primary">
                  Add Product
                </Link>

                <Link
                  to="/manageProducts"
                  className="btn btn-outline btn-primary"
                >
                  Manage Products
                </Link>
              </div>
            </div>
          </div>
          {/* Manage Orders */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Manage Orders</h2>

              <p className="text-gray-500">View and update customer orders.</p>

              <Link to="/manage-orders" className="btn btn-primary mt-3">
                Manage Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
