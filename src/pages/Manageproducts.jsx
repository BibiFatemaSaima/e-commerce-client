import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Delete result:", data);

        if (data.deletedCount > 0) {
          alert("Product deleted successfully!");
          loadProducts();
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        {" "}
        <span className="loading loading-spinner loading-lg"></span>{" "}
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-base-200 p-6">
      {" "}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Products</h1>

            <p className="text-gray-500 mt-2">
              Add, edit and delete your products.
            </p>
          </div>

          <Link to="/addProduct" className="btn btn-primary">
            + Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-base-100 rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No products found</h2>

            <p className="text-gray-500 mt-2">Add a product to your store.</p>
          </div>
        ) : (
          <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td>
                      <div className="font-semibold">{product.name}</div>
                    </td>

                    <td>{product.category}</td>

                    <td>${Number(product.price).toFixed(2)}</td>

                    <td>{product.stock}</td>

                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/editProduct/${product._id}`}
                          className="btn btn-sm btn-info"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
