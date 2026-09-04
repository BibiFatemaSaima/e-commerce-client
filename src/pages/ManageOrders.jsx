import { useEffect, useState } from "react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    fetch("http://localhost:3000/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading orders:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Status update result:", data);

        if (data.modifiedCount > 0) {
          alert("Order status updated successfully!");

          setOrders((previousOrders) =>
            previousOrders.map((order) =>
              order._id === orderId ? { ...order, status: newStatus } : order,
            ),
          );
        }
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        alert("Failed to update order status");
      });
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold">Manage Orders</h1>

          <p className="text-gray-500 mt-2">View and manage customer orders.</p>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="bg-base-100 rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No orders found</h2>

            <p className="text-gray-500 mt-2">
              There are no customer orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-base-100 rounded-xl shadow p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order._id}</h2>

                    <p className="text-gray-500 mt-2">
                      Customer: {order.email}
                    </p>

                    <p className="mt-2">
                      <span className="font-semibold">Transaction ID:</span>{" "}
                      {order.transactionId}
                    </p>

                    <p className="mt-2">
                      <span className="font-semibold">Total:</span> $
                      {Number(order.totalPrice).toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="font-semibold block mb-2">
                      Order Status
                    </label>

                    <select
                      className="select select-bordered"
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>

                      <option value="Processing">Processing</option>

                      <option value="Shipped">Shipped</option>

                      <option value="Delivered">Delivered</option>

                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Products */}
                <div className="border-t mt-5 pt-5">
                  <h3 className="font-bold text-lg mb-4">Ordered Products</h3>

                  <div className="space-y-4">
                    {order.products?.map((product, index) => (
                      <div
                        key={`${product._id}-${index}`}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 border rounded-lg p-4"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold">{product.name}</h4>

                          <p className="text-sm text-gray-500">
                            Quantity: {product.quantity}
                          </p>

                          <p className="text-sm mt-1">
                            Price: ${Number(product.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
