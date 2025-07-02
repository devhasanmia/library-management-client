import { FiBookOpen, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
const BookItem = ({ book }: any) => {
    const { _id, title, author, genre, isbn, description, copies, available } = book;
    return (
        <div className="bg-white shadow-xl rounded-3xl border border-gray-100 p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    {genre}
                </span>
                <div className="bg-gray-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <FiBookOpen className="text-gray-500 text-lg" />
                </div>
            </div>
            {/* Title & Author */}
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-3">by {author}</p>
            {/* Description */}
            {description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
            )}
            {/* ISBN & Year */}
            <div className="text-xs text-gray-400 mb-4 flex justify-between">
                <span>ISBN: {isbn}</span>
            </div>
            {/* Availability */}
            <div className="mb-4">
                <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${available && copies > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {copies > 0 ? `Available (${copies})` : "Out of Stock"}
                </span>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 text-sm text-gray-600">
                <Link to={`/edit-book/${_id}`} className="hover:text-blue-600 flex items-center gap-1">
                    <FiEdit /> Edit
                </Link>
                <Link
                    to={`/borrow/${_id}`}
                    className={`flex items-center gap-1 ${copies > 0
                        ? "text-green-600 hover:text-green-800"
                        : "text-gray-400 cursor-not-allowed"
                        }`}
                    onClick={(e) => copies <= 0 && e.preventDefault()}
                >
                    <FiBookOpen /> Borrow
                </Link>
                <button
                    className="hover:text-red-600 flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                    }}
                >
                    <FiTrash2 /> Delete
                </button>
            </div>
        </div>
    );
};

export default BookItem;
