import { FiBookOpen } from 'react-icons/fi'

const BookNotFound = () => {
    return (
        <div className="text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBookOpen className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">No books found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
                Try adding a new book to get started.
            </p>
        </div>
    )
}

export default BookNotFound