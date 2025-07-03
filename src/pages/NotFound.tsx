import { Link } from "react-router";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center mt-10 text-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
          <FiAlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-medium text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiHome className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;