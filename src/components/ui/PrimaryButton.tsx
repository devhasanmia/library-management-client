import { Link } from "react-router";

interface PrimaryButtonProps {
    to: string;
    text: string;
}

const PrimaryButton = ({ to, text }: PrimaryButtonProps) => {
    return (
        <Link
            to={to}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            {text}
        </Link>
    );
};

export default PrimaryButton;
