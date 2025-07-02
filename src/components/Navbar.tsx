import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, Book, BookPlus, List } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 transition-all
    font-medium rounded-lg group
    ${isActive
      ? "text-blue-600 bg-blue-50"
      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 
      bg-white py-2
      `}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-700 py-3"
        >
          {/* <Book className="h-6 w-6 text-blue-600" /> */}
          <img src="/logo.png" alt="" className="h-full w-10 text-blue-600" />
          <span>Library Management</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/books" className={navItemClass}>
            <Book size={18} />
            Books
          </NavLink>
          <NavLink to="/add-book" className={navItemClass}>
            <BookPlus size={18} />
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={navItemClass}>
            <List size={18} />
            Borrow Summary
          </NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg rounded-b-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="flex flex-col py-2">
          <NavLink
            to="/books"
            className={navItemClass}
            onClick={() => setIsOpen(false)}
          >
            <Book size={18} />
            Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={navItemClass}
            onClick={() => setIsOpen(false)}
          >
            <BookPlus size={18} />
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={navItemClass}
            onClick={() => setIsOpen(false)}
          >
            <List size={18} />
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;