import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`https://e-commerce-server-roan-mu.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    setUpdating(true);

    const form = e.target;

    const updatedProduct = {
      name: form.name.value,
      price: Number(form.price.value),
      category: form.category.value,
      image: form.image.value,
      stock: Number(form.stock.value),
      description: form.description.value,
    };

    try {
      const response = await fetch(`https://e-commerce-server-roan-mu.vercel.app/products/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();

      console.log("Update result:", data);

      if (data.modifiedCount > 0) {
        alert("Product updated successfully!");
        navigate("/manageProducts");
      } else {
        alert("No changes were made.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

          <form onSubmit={handleUpdateProduct} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Product Name</span>
              </label>

              <input
                type="text"
                name="name"
                defaultValue={product.name}
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
                defaultValue={product.price}
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
                defaultValue={product.category}
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
                defaultValue={product.image}
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
                defaultValue={product.stock}
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
                defaultValue={product.description}
                className="textarea textarea-bordered w-full"
                rows="5"
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Product"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/manage-products")}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
