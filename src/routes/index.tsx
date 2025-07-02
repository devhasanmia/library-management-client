import { createBrowserRouter } from "react-router";
import Book from "../pages/Book";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Book,
  }

]);

export default router;
