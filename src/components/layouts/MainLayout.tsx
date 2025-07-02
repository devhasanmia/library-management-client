import { Outlet } from "react-router";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Main Content */}
      <Outlet />
    </>
  );
};

export default MainLayout;
