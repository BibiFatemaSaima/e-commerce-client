import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const CheckoutForm = ({ totalPrice }) => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (totalPrice > 0) {
      fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          price: totalPrice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    if (!user) {
      setError("Please login before placing an order.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const order = {
        email: user.email,
        products: cart,
        totalPrice: totalPrice,
        transactionId: paymentIntent.id,
        status: "paid",
        createdAt: new Date(),
      };

      fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Order saved:", data);

          setSuccess("Payment successful! Order created successfully.");
          setError("");

          clearCart();
        })
        .catch((error) => {
          console.error(error);
          setError("Payment was successful, but order could not be saved.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-4 border rounded-lg" />

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {success && <p className="text-green-500 mt-3">{success}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn btn-primary w-full mt-6"
      >
        Pay ${totalPrice.toFixed(2)}
      </button>
    </form>
  );
};

export default CheckoutForm;
