import { useThemeManager } from "@hooks/useThemeManager"
import { Outlet } from "react-router"

const DashboardLayout = () => {
  useThemeManager()
  return (
    <Outlet />
  )
}
export default DashboardLayout