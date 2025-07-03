import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import Books from "../pages/Books";
import BorrowSummary from "../pages/BorrowSummary";
import CreateBook from "../pages/CreateBook";
import NotFound from "@/pages/NotFound";

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
        path: "create-book",
        Component: CreateBook
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary
      },
      {
        path: "*",
        Component: NotFound
      }
    ]
  }

]);

export default router;
