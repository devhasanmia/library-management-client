import { FiAlertCircle } from "react-icons/fi";

interface ErrorAlertProps {
  message?: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm flex items-start gap-3 animate-fade-in">
      <div className="text-red-500 mt-1">
        <FiAlertCircle size={22} />
      </div>
      <div className="text-sm text-red-700 font-medium">
        {message || "Something went wrong. Please try again later."}
      </div>
    </div>
  );
};

export default ErrorAlert;