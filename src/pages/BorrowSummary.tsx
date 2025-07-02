import React, { useState, useEffect } from "react";
import Loading from "../utils/Loading";
import ErrorAlert from "../utils/ErrorAlert";

interface BorrowSummaryItem {
  id: string;
  title: string;
  isbn: string;
  totalBorrowed: number;
}

const demoData: BorrowSummaryItem[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    isbn: "9780743273565",
    totalBorrowed: 12,
  },
  {
    id: "2",
    title: "A Brief History of Time",
    isbn: "9780553380163",
    totalBorrowed: 7,
  },
  {
    id: "3",
    title: "Harry Potter and the Sorcerer's Stone",
    isbn: "9780590353427",
    totalBorrowed: 20,
  },
  {
    id: "4",
    title: "The Art of War",
    isbn: "9781599869773",
    totalBorrowed: 4,
  },
];

const BorrowSummary = () => {
  const [data, setData] = useState<BorrowSummaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(demoData);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (isError) {
    return (
      <ErrorAlert/>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          📚
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          No borrow records found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          No books have been borrowed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        📋 Borrow Summary
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map(({ id, title, isbn, totalBorrowed }) => (
          <div
            key={id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-gray-500 mb-3">ISBN: {isbn}</p>
            <p className="text-indigo-600 font-semibold text-lg">
              Total Borrowed: {totalBorrowed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowSummary;
