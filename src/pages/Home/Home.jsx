import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-base-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* Hero Text */}
            <div>
              <p className="text-primary font-semibold mb-3">
                Welcome to Our Store
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Find Everything You Need in One Place
              </h1>

              <p className="mt-5 text-gray-600 text-lg">
                Discover quality products at great prices. Shop your favorite
                products easily and securely.
              </p>

              <Link to="/products" className="btn btn-primary mt-7">
                Shop Now
              </Link>
            </div>

            {/* Hero Image */}
            <div>
              <img
                src="https://i.ibb.co.com/5g3xXk4/online-shopping.png"
                alt="Online Shopping"
                className="w-full max-w-lg mx-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <h3 className="text-xl font-semibold">Electronics</h3>
              <p className="text-gray-500">Latest electronic products</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <h3 className="text-xl font-semibold">Fashion</h3>
              <p className="text-gray-500">Trendy fashion products</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <h3 className="text-xl font-semibold">Beauty</h3>
              <p className="text-gray-500">Beauty and personal care</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
            <div className="card-body items-center text-center">
              <h3 className="text-xl font-semibold">Grocery</h3>
              <p className="text-gray-500">Everyday grocery products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-base-200">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Explore Our Products</h2>

          <p className="mt-3 text-gray-600">
            Browse our collection and find products you love.
          </p>

          <Link to="/products" className="btn btn-outline btn-primary mt-6">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
