import RootLayout from "@layouts/RootLayout";
import About from "@pages/About";
import Book from "@pages/Book";
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
      { path: "book", Component: Book },
      { path: "about", Component: About },
    ],
  },
  { path: "login", Component: Login },
  { path: "signup", Component: Signup },
]);
