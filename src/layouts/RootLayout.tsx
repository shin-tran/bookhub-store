import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Outlet, useHref, useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider placement="top-center" />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
        <Footer />
      </div>
    </HeroUIProvider>
  );
};

export default RootLayout;
