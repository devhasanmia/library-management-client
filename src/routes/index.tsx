import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import Books from "../pages/Books";
import AddBook from "../pages/AddBook";
import BorrowSummary from "../pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "",
        Component: Books
      },
      {
        path: "books",
        Component: Books
      },
      {
        path: "add-book",
        Component: AddBook
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary
      }
    ]
  }

]);

export default router;
