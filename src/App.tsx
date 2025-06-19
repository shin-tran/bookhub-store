import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Outlet, useHref, useNavigate } from "react-router";

const App = () => {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider placement="top-center" />
      <Outlet />
    </HeroUIProvider>
  );
};
export default App;
