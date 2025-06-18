import ProtectedRoute from "@components/ProtectedRoute";
import RootLayout from "@layouts/RootLayout";
import About from "@pages/About";
import Admin from "@pages/Admin";
import Books from "@pages/Books";
import Checkout from "@pages/Checkout";
import Error from "@pages/Error";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import App from "./App";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: RootLayout,
        children: [
          { index: true, Component: Home },
          { path: "books", Component: Books },
          { path: "about", Component: About },
          {
            path: "checkout",
            element: createElement(ProtectedRoute, {
              children: createElement(Checkout),
            }),
          },
          { path: "error", Component: Error },
        ],
      },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      {
        path: "admin",
        element: createElement(ProtectedRoute, {
          children: createElement(Admin),
        }),
      },
      { path: "*", Component: Error },
    ],
  },
]);
