import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(`https://e-commerce-server-roan-mu.vercel.app/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading orders:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold">
            No orders found
          </h3>

          <p className="text-gray-500 mt-2">
            You have not placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="card bg-base-100 shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Order #{order._id}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Transaction ID: {order.transactionId}
                  </p>

                  <p className="mt-2">
                    <span className="font-semibold">
                      Total:
                    </span>{" "}
                    ${Number(order.totalPrice).toFixed(2)}
                  </p>
                </div>

                <div>
                  <span className="badge badge-success">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t mt-5 pt-5">
                <h4 className="font-semibold mb-3">
                  Products
                </h4>

                <div className="space-y-3">
                  {order.products?.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div>
                        <p className="font-semibold">
                          {product.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {product.quantity}
                        </p>

                        <p className="text-sm">
                          ${product.price}
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
  );
};

export default MyOrders;