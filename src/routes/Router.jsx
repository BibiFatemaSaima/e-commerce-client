import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../component/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/Home/Products/Products";
import ProductDetails from "../pages/Home/ProductDetails/ProductDetails";
import Register from "../pages/Home/Register/Register";
import Login from "../pages/Home/Login/Login";
import Cart from "../pages/Cart/Cart";
import PrivateRoute from "../component/PrivateRoute";
import Checkout from "../pages/Checkout/Checkout";
import MyOrders from "../pages/orders/MyOrders";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddProduct from "../pages/Addproduct/AddProducts";
import ManageProducts from "../pages/Manageproducts";
import EditProduct from "../pages/EditProduct";
import ManageOrders from "../pages/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "myOrders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "dashBoard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manageProducts",
        element: (
          <PrivateRoute>
            <ManageProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "editProduct/:id",
        element: (
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <ManageOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
