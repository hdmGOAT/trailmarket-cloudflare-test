import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthContext.tsx"; // Import the AuthProvider

import App from "./App.tsx";
import SignOrLoginPage from "./pages/login_signup/SignOrLoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import TopNavBar from "./pages/navbar/TopNavBar.tsx";
import SellerPage from "./pages/SellerPage.tsx";
import AboutUs from "./pages/AboutUs.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <SignOrLoginPage />,
  },
  {
    path: "/seller",
    element: <SellerPage />,
  },
  {
    path: "/signup",
    element: <SignOrLoginPage />,
  },
  {
    path: "/forget",
    element: <SignOrLoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/navbar2",
    element: <TopNavBar />,
  },

  {
    path: "/about",
    element: <AboutUs />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/contact-us",
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/profile",
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/myprofile",
    element: <SellerPage />,
    errorElement: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
