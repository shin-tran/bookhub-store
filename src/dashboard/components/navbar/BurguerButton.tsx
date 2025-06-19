import { useSidebarContext } from "@dashboard/layouts/DashboardProvider";
import { StyledBurgerButton } from "./navbarStyles";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      data-open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
};
