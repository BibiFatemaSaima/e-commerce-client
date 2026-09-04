import { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../../context/CartContext";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Checkout = () => {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="card bg-base-200 p-6">
          <h3 className="text-2xl font-bold mb-5">Order Summary</h3>

          {cart.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-3">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="flex justify-between text-xl font-bold mt-6">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Stripe Payment Form */}
        <div className="card bg-base-200 p-6">
          <h3 className="text-2xl font-bold mb-5">Payment Information</h3>

          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
