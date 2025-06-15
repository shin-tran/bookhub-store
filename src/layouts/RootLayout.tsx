import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
