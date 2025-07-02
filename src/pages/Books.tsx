import { useGetBooksQuery } from "../redux/features/books/bookApi";
import {
  FiBookOpen,
} from "react-icons/fi";
import Loading from "../utils/Loading";
import ErrorAlert from "../utils/ErrorAlert";
import BookNotFound from "../utils/BookNotFound";
import PrimaryButton from "../components/ui/PrimaryButton";
import BookItem from "../components/BookItem";

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
        <PrimaryButton text="Add New Book" to="/add-book" />
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorAlert />
      ) : books?.data?.length === 0 ? (
        <BookNotFound />
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books?.data?.map((book: any) => <BookItem book={book} />)}
        </div>
      )
      }
    </div >
  );
};

export default Books;
