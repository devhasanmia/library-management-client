import { FiBookOpen, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";
import { useAddBorrowMutation } from "@/redux/features/borrow/borrowApi";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const BookItem = ({ book }: any) => {
  const { _id, title, author, genre, isbn, description, copies, available } = book;
  const navigate = useNavigate();

  const [deleteBook] = useDeleteBookMutation();
//   const [updateBook] = useUpdateBookMutation();
  const [addBorrow] = useAddBorrowMutation();

  const [editForm, setEditForm] = useState({
    title,
    author,
    genre,
    isbn,
    copies,
  });

  const [dueDate, setDueDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    try {
    //   const updatedBook = { ...editForm, _id };
    //   await updateBook(updatedBook).unwrap();
      toast.success("Book updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update book");
    }
  };

  const handleBorrow = async () => {
    try {
      const payload = {
        dueDate,
        book: _id,
        quantity,
      };
      const result = await addBorrow(payload).unwrap();
      toast.success(result?.message);
      navigate("/borrow-summary");
    } catch (error: any) {
      toast.warning(error?.data?.message || "Borrow failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(_id).unwrap();
      toast.success("Book deleted successfully");
    } catch (error: any) {
      toast.warning(error?.data?.message || "Failed to delete the book");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl border border-gray-100 p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {genre}
        </span>

        {/* Book Details Modal */}
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
              <p><span className="font-semibold">Author:</span> {author}</p>
              <p><span className="font-semibold">Genre:</span> {genre}</p>
              <p><span className="font-semibold">ISBN:</span> {isbn}</p>
              {description && <p><span className="font-semibold">Description:</span> {description}</p>}
              <p><span className="font-semibold">Available Copies:</span> {copies > 0 ? copies : "Not Available"}</p>
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
      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">by {author}</p>

      {/* ISBN */}
      <div className="text-xs text-gray-400 mb-4 flex justify-between">
        <span>ISBN: {isbn}</span>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            available && copies > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {copies > 0 ? `Available (${copies})` : "Unavailable"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 text-sm text-gray-600">
        {/* Edit Modal */}
       <Dialog>
  <DialogTrigger asChild>
    <Button variant="ghost" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
      <FiEdit /> Edit
    </Button>
  </DialogTrigger>

  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold">Edit Book</DialogTitle>
      <DialogDescription>Edit and update book information</DialogDescription>
    </DialogHeader>

    <form  className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Title */}
      <div className="col-span-1">
        <label className="text-gray-700 font-medium mb-1 block">Title</label>
        <input
        //   {...register("title", { required: true })}
          type="text"
          placeholder="Book title"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Author */}
      <div className="col-span-1">
        <label className="text-gray-700 font-medium mb-1 block">Author</label>
        <input
        //   {...register("author", { required: true })}
          type="text"
          placeholder="Author name"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Genre */}
      <div className="col-span-1">
        <label className="text-gray-700 font-medium mb-1 block">Genre</label>
        <select
        //   {...register("genre", { required: true })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
        >
          <option value="">Select Genre</option>
          {/* {genreOptions.map((g) => (
            <option key={g} value={g}>{g.replace("_", " ")}</option>
          ))} */}
        </select>
      </div>

      {/* ISBN */}
      <div className="col-span-1">
        <label className="text-gray-700 font-medium mb-1 block">ISBN</label>
        <input
        //   {...register("isbn", { required: true })}
          type="text"
          placeholder="ISBN number"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Copies */}
      <div className="col-span-1">
        <label className="text-gray-700 font-medium mb-1 block">Copies</label>
        <input
        //   {...register("copies", { required: true, valueAsNumber: true })}
          type="number"
          min="1"
          placeholder="Total copies"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Description */}
      <div className="col-span-full">
        <label className="text-gray-700 font-medium mb-1 block">Description</label>
        <textarea
        //   {...register("description")}
          rows={3}
          placeholder="Book description"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div className="col-span-full flex justify-end gap-4 mt-4">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Update Book</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

        {/* Borrow Modal */}
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
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input type="number" max={copies} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
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

        {/* Delete Confirm */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="text-red-600 hover:text-red-800 flex items-center gap-1">
              <FiTrash2 /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete the book:{" "}
                <span className="font-semibold text-gray-900">{title}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDelete}
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
