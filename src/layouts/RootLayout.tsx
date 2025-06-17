import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useGetUser } from "@hooks/useUsers";
import { useAuthStore } from "@stores/authStore";
import { useEffect } from "react";

const RootLayout = () => {
  const { data: user, isLoading } = useGetUser();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <>
      <Header isLoading={isLoading} />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
