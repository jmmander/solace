import React from "react";
import { AlertIcon } from "./icons";


interface ErrorProps {
  message?: string;
  retryAction?: () => void;
  fullScreen?: boolean;
}

export default function Error({
  message = "Something went wrong. Please try again.",
  retryAction,
  fullScreen = false,
}: ErrorProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
    : "w-full flex items-center justify-center py-10";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center bg-white max-w-md">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <AlertIcon className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600 text-center mb-4">{message}</p>
        {retryAction && (
          <button
            onClick={retryAction}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}