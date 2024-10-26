import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import RegisterPage from "./pages/_registerPage/RegisterPage";
import ForgotPasswordPage from "./pages/_forgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/_resetPasswordPage/ResetPasswordPage";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "forget-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
  {
    path: "/verify-success",
    element: <h1> ini success</h1>,
  },
  {
    path: "/verify-failed",
    element: <h1> ini gagal</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
