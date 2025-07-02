import { Outlet } from "react-router";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <div className="pt-[70px] px-4 min-h-[calc(100vh-140px)]">
      <Navbar />
      {/* Main Content */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
