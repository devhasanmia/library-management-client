import { useGetBorrowQuery } from "@/redux/features/borrow/borrowApi";
import Loading from "../utils/Loading";
import ErrorAlert from "../utils/ErrorAlert";
import { FiBook, FiHash, FiTrendingUp, FiBookOpen } from "react-icons/fi";

const BorrowSummary = () => {
  const { data: borrowData, isLoading, isError } = useGetBorrowQuery("");
  if (isLoading) return <Loading />;
  if (isError) return <ErrorAlert />;
  const borrowList = borrowData?.data || [];
  const totalBooksBorrowed = borrowList.reduce(
    (sum: number, item: any) => sum + item.totalQuantity,
    0
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FiBookOpen className="text-blue-600" />
              Borrow Summary
            </h1>
            <p className="mt-2 text-gray-600">
              Overview of all borrowed books in the library
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-green-50 rounded-lg px-4 py-2 inline-flex items-center gap-2">
              <FiTrendingUp className="text-green-600" />
              <span className="text-green-800 font-medium">
                Total Copies : {totalBooksBorrowed}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {!borrowList.length ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
          <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <FiBook className="text-indigo-600" size={28} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No borrow records found
          </h3>
          <p className="text-gray-500 max-w-md">
            Currently there are no books borrowed from the library.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <FiBook size={16} />
                      Book Title
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <FiHash size={16} />
                      ISBN
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Borrowed Copies
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowList.map((item: any) => (
                  <tr
                    key={item.book.isbn}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.book.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {item.book.isbn}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        {item.totalQuantity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
