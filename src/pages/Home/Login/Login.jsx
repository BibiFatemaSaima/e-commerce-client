import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    loginUser(email, password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin}>
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />

            <label className="label mt-3">
              <span className="label-text">Password</span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />

            {error && (
              <p className="text-red-500 text-sm mt-3">{error}</p>
            )}

            <button type="submit" className="btn btn-primary w-full mt-6">
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;