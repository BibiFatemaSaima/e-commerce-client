import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, name, price, category, image, stock } = product;

  return (
    <div className="card bg-base-100 shadow-md">
      <figure className="h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{name}</h2>

        <p>${price}</p>

        <div className="card-actions">
          <Link
            to={`/products/${_id}`}
            className="btn btn-outline btn-primary"
          >
            View Details
          </Link>


        </div>
      </div>
    </div>
  );
};

export default ProductCard;