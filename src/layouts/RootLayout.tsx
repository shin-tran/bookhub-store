import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useGetUser } from "@hooks/useUsers";
import { useAuthStore } from "@stores/authStore";
import { useEffect } from "react";

const RootLayout = () => {
  const { data: user, isSuccess, isLoading } = useGetUser();
  const { setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isSuccess && user) setUser(user);
  }, [user, setUser, isSuccess]);

  const isUserLoading =
    (isAuthenticated || !!localStorage.getItem("isAuthenticated")) && isLoading;

  return (
    <>
      <Header isUserLoading={isUserLoading} />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
