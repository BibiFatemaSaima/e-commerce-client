import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold">Your cart is empty</h3>

          <p className="text-gray-500 mt-2">Add some products to your cart.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Products */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-md p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Product Information */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>

                    <p className="text-lg font-medium mt-2">${item.price}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="btn btn-sm"
                      >
                        -
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="btn btn-sm"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="btn btn-error btn-sm mt-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="card bg-base-100 shadow-md p-6 h-fit">
            <h3 className="text-2xl font-bold mb-5">Order Summary</h3>

            <div className="flex justify-between mb-3">
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-xl font-bold border-t pt-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              onClick={() => console.log("Checkout clicked")}
              className="btn btn-primary w-full mt-6"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
