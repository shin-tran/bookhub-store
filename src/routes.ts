import ProtectedRoute from "@components/ProtectedRoute";
import DashboardLayout from "@dashboard/layouts/DashboardLayout";
import ManageBooks from "@dashboard/pages/ManageBooks";
import ManageOrders from "@dashboard/pages/ManageOrders";
import ManageUsers from "@dashboard/pages/ManageUsers";
import Overview from "@dashboard/pages/Overview";
import AuthLayout from "@layouts/AuthLayout";
import RootLayout from "@layouts/RootLayout";
import About from "@pages/About";
import Books from "@pages/Books";
import Checkout from "@pages/Checkout";
import Error from "@pages/Error";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import { createElement } from "react";
import { createBrowserRouter } from "react-router";

const createProtectedRoute = (Component: React.ComponentType) =>
  createElement(ProtectedRoute, {
    children: createElement(Component),
  });

const adminRoutesConfig = [
  { Component: Overview, isIndex: true },
  { path: "manage-users", Component: ManageUsers },
  { path: "manage-books", Component: ManageBooks },
  { path: "manage-orders", Component: ManageOrders },
];

export const router = createBrowserRouter([
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
  {
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "admin",
    Component: DashboardLayout,
    children: adminRoutesConfig.map(({ Component, path, isIndex }) => ({
      ...(isIndex ? { index: true } : { path }),
      element: createProtectedRoute(Component),
    })),
  },
  { path: "*", Component: Error },
]);
