import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { Link } from "react-router";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiBookOpen,
} from "react-icons/fi";

const Books = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);

  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
            <FiBookOpen className="text-blue-600" />
            Book Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Browse our collection of {books?.data?.length || 0} books
          </p>
        </div>
      <Link
  to="/create-book"
  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  <FiPlus className="text-lg group-hover:scale-110 transition-transform duration-200" />
  Add New Book
</Link>
      </div>

      {/* Loading / Error / No Book */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading books...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-sm text-red-700">
            ❌ Failed to load books. Please try again later.
          </p>
        </div>
      ) : books?.data?.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBookOpen className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">No books found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adding a new book to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books?.data?.map((book: any) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {book.genre}
                  </span>
                  <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <FiBookOpen className="text-gray-500 text-xl" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-4">By {book.author}</p>

                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      book.copies > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.copies > 0
                      ? `Available (${book.copies})`
                      : "Out of stock"}
                  </span>
                  {book.publicationDate && (
                    <span className="text-xs text-gray-500">
                      {new Date(book.publicationDate).getFullYear()}
                    </span>
                  )}
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-4">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-1 text-sm"
                  >
                    <FiEdit className="text-gray-400" />
                    Edit
                  </Link>
                  <Link
                    to={`/borrow/${book._id}`}
                    className={`flex items-center gap-1 text-sm ${
                      book.copies > 0
                        ? "text-green-600 hover:text-green-800"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={(e) => book.copies <= 0 && e.preventDefault()}
                  >
                    <FiBookOpen />
                    Borrow
                  </Link>
                  <button
                    className="text-gray-600 hover:text-red-600 flex items-center gap-1 text-sm"
                    onClick={() => {
                      // TODO: Add delete confirmation
                    }}
                  >
                    <FiTrash2 className="text-gray-400" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
