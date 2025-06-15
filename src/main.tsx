import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>,
);
