import { FiBookOpen, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useDeleteBookMutation } from "../redux/features/books/bookApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAddBorrowMutation } from "@/redux/features/borrow/borrowApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
const BookItem = ({ book }: any) => {
  const { _id, title, author, genre, isbn, description, copies, available } =
    book;
  const [deleteBook] = useDeleteBookMutation();

  const [dueDate, setDueDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (error: any) {
      toast.warning(error?.data?.message || "Failed to delete the book");
    }
  };

  const [addBorrow] = useAddBorrowMutation();
  const handleBorrow = async () => {
    try {
      const payload = {
        dueDate: dueDate,
        book: _id,
        quantity: quantity,
      };
      const result = await addBorrow(payload).unwrap();
      toast.success(result?.message);
      navigate("/borrow-summary");
    } catch (error: any) {
      toast.warning(error?.data?.message);
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl border border-gray-100 p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {genre}
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <FiBookOpen /> Details
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              <DialogDescription>Book Details</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Author:</span> {author}
              </p>
              <p>
                <span className="font-semibold">Genre:</span> {genre}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {isbn}
              </p>
              {description && (
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {description}
                </p>
              )}
              <p>
                <span className="font-semibold">Available Copies:</span>{" "}
                {available ? `${copies}` : "Not Available"}
              </p>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Title & Author */}
      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-3">by {author}</p>

      {/* ISBN */}
      <div className="text-xs text-gray-400 mb-4 flex justify-between">
        <span>ISBN: {isbn}</span>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            available && copies > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {copies > 0 ? `Available (${copies})` : "Unavailable"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 text-sm text-gray-600">
        <Link
          to={`/edit-book/${_id}`}
          className="hover:text-blue-600 flex items-center gap-1"
        >
          <FiEdit /> Edit
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className={`px-2 py-1 text-sm font-semibold ${
                copies > 0 ? "text-green-600" : "text-gray-400"
              }`}
              disabled={copies <= 0}
            >
              <FiBookOpen className="mr-1" /> Borrow
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Borrow Book</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-muted-foreground">{author}</p>
              </div>

              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  max={copies}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all text-lg font-semibold"
                onClick={handleBorrow}
              >
                Confirm Borrow
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
            >
              <FiTrash2 /> Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete the
                book:{" "}
                <span className="font-semibold text-gray-900">{title}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDelete(_id)}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default BookItem;
