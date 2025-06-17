import RootLayout from "@layouts/RootLayout";
import About from "@pages/About";
import Admin from "@pages/Admin";
import Books from "@pages/Books";
import Checkout from "@pages/Checkout";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "books", Component: Books },
      { path: "about", Component: About },
      { path: "checkout", Component: Checkout },
    ],
  },
  { path: "login", Component: Login },
  { path: "signup", Component: Signup },
  { path: "admin", Component: Admin },
]);
