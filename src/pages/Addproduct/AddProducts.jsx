import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const form = e.target;

    const product = {
      name: form.name.value,
      price: Number(form.price.value),
      category: form.category.value,
      image: form.image.value,
      stock: Number(form.stock.value),
      description: form.description.value,
    };

    setLoading(true);

    try {
      const response = await fetch("https://e-commerce-server-roan-mu.vercel.app/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      console.log("Product added:", data);

      alert("Product added successfully!");

      form.reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-base-200 p-6">
      {" "}
      <div className="max-w-3xl mx-auto">
        {" "}
        <div className="bg-base-100 rounded-xl shadow p-6">
          {" "}
          <h1 className="text-3xl font-bold mb-6">Add New Product </h1>
          <form onSubmit={handleAddProduct} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Product Name</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Price</span>
              </label>

              <input
                type="number"
                name="price"
                placeholder="Enter price"
                step="0.01"
                min="0"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>

              <input
                type="text"
                name="category"
                placeholder="Enter category"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Image URL</span>
              </label>

              <input
                type="url"
                name="image"
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Stock</span>
              </label>

              <input
                type="number"
                name="stock"
                placeholder="Enter stock quantity"
                min="0"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>

              <textarea
                name="description"
                placeholder="Enter product description"
                className="textarea textarea-bordered w-full"
                rows="5"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
