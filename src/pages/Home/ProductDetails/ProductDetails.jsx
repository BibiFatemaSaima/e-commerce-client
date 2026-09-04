import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Load product
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
      });
  }, [id]);

  // Load reviews
  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error loading reviews:", error);
      });
  }, [id]);

  // Submit review
  const handleReview = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to submit a review.");
      navigate("/login");
      return;
    }

    if (!reviewText.trim()) {
      return;
    }

    const newReview = {
      productId: id,
      email: user.email,
      rating: Number(rating),
      comment: reviewText,
    };

    setReviewLoading(true);

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      const data = await response.json();

      console.log("Review result:", data);

      if (data.success) {
        const reviewWithId = {
          ...newReview,
          _id: data.insertedId,
          createdAt: new Date(),
        };

        setReviews([reviewWithId, ...reviews]);
        setReviewText("");
        setRating(5);

        alert("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Image Gallery */}
        <div>
          <div className="bg-base-200 rounded-xl p-6">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="border-2 border-base-300 rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-24 h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <p className="badge badge-primary mb-4">{product.category}</p>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <p className="text-3xl font-bold text-primary mb-4">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <p className="mb-6">
            <span className="font-semibold">Stock:</span>{" "}
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </p>

          <button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="btn btn-primary"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        {/* Review Form */}
        <form
          onSubmit={handleReview}
          className="bg-base-200 rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

          {/* Rating */}
          <div className="mb-4">
            <label className="font-semibold block mb-2">Rating</label>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="select select-bordered"
            >
              <option value="5">⭐⭐⭐⭐⭐ - 5</option>
              <option value="4">⭐⭐⭐⭐ - 4</option>
              <option value="3">⭐⭐⭐ - 3</option>
              <option value="2">⭐⭐ - 2</option>
              <option value="1">⭐ - 1</option>
            </select>
          </div>

          {/* Review Text */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={reviewLoading}
          >
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        {/* Review List */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="card bg-base-200 p-5">
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                  <div>
                    <p className="font-semibold">{review.email}</p>

                    <p className="text-sm mt-1">
                      {"⭐".repeat(Number(review.rating))}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <p className="mt-3">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
