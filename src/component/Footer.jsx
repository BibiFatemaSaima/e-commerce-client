import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white p-10 mt-10">

      {/* Website Name */}
      <aside>
        <h2 className="text-2xl font-bold">
          E-Shop
        </h2>

        <p>
          Your trusted online shopping platform.
        </p>

        <p>
          © {new Date().getFullYear()} E-Shop. All rights reserved.
        </p>
      </aside>


      {/* Navigation Links */}
      <nav>
        <div className="grid grid-flow-col gap-6">

          <Link to="/" className="link link-hover">
            Home
          </Link>

          <Link to="/products" className="link link-hover">
            Products
          </Link>

          <Link to="/cart" className="link link-hover">
            Cart
          </Link>

        </div>
      </nav>


      {/* Social Links */}
      <nav>
        <div className="grid grid-flow-col gap-4">

          <a
            href="#"
            aria-label="Facebook"
            className="link link-hover"
          >
            Facebook
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="link link-hover"
          >
            Instagram
          </a>

          <a
            href="#"
            aria-label="GitHub"
            className="link link-hover"
          >
            GitHub
          </a>

        </div>
      </nav>

    </footer>
  );
};

export default Footer;