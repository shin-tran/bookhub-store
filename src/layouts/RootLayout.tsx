import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto max-w-7xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
