import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar space */}
      <Navbar />

      {/* Main content fills the rest */}
      <main className="flex-1 pt-[70px] px-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
