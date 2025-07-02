import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-6 py-4 transition-all duration-300 
   text-sm font-medium
   after:absolute after:left-0 after:bottom-0 after:h-[2px]
   after:bg-blue-600 after:w-0 hover:after:w-full after:transition-all after:duration-300
   ${
     isActive
       ? "text-blue-600 after:w-full after:bg-blue-600"
       : "text-gray-700 hover:text-blue-600"
   }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">
          Library Manager
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <NavLink to="/books" className={navItemClass}>
            Books
          </NavLink>
          <NavLink to="/add-book" className={navItemClass}>
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={navItemClass}>
            Borrow Summary
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          <NavLink
            to="/"
            className={navItemClass}
            onClick={() => setIsOpen(false)}
          >
            Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={navItemClass}
            onClick={() => setIsOpen(false)}
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={navItemClass}
            onClick={() => setIsOpen(false)}
          >
            Borrow Summary
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
