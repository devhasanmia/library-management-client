import { useForm } from "react-hook-form";
import { FiBookOpen, FiUser, FiHash, FiLayers } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { useAddBookMutation } from "../redux/features/books/bookApi";
import { toast } from "sonner";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const CreateBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addBook] = useAddBookMutation()
  const onSubmit = async (data: any) => {
    try {
      const result = await addBook(data);
      toast.success(result?.data?.message)
      reset();
    } catch (error) {

    }
  };
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center  px-4 py-12">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
            <FiBookOpen className="text-blue-600 text-3xl" />
            <span>Add New Book</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Fill out the form below to add a new book to the collection.
          </p>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Title */}
          <div className="col-span-1">
            <label className="text-gray-700 font-medium mb-2 block">Title</label>
            <div className="relative">
              <FiBookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Enter book title"
                className="pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Author */}
          <div className="col-span-1">
            <label className="text-gray-700 font-medium mb-2 block">Author</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("author", { required: true })}
                type="text"
                placeholder="Enter author name"
                className="pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Genre */}
          <div className="col-span-1">
            <label className="text-gray-700 font-medium mb-2 block">Genre</label>
            <div className="relative">
              <MdCategory className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                {...register("genre", { required: true })}
                className="pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              >
                <option value="">Select Genre</option>
                {genreOptions.map((genre) => (
                  <option key={genre} value={genre}>{genre.replace("_", " ")}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ISBN */}
          <div className="col-span-1">
            <label className="text-gray-700 font-medium mb-2 block">ISBN</label>
            <div className="relative">
              <FiHash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("isbn", { required: true })}
                type="text"
                placeholder="Enter ISBN"
                className="pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Copies */}
          <div className="col-span-1">
            <label className="text-gray-700 font-medium mb-2 block">Copies</label>
            <div className="relative">
              <FiLayers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("copies", {
                  required: true,
                  min: {
                    value: 1,
                    message: "Copies must be at least 1",
                  },
                  valueAsNumber: true,
                })}
                type="number"
                min="1"
                step="1"
                placeholder="Number of copies"
                className="pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>


          {/* Description */}
          <div className="col-span-full">
            <label className="text-gray-700 font-medium mb-2 block">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Book description (optional)"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all text-lg font-semibold"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
