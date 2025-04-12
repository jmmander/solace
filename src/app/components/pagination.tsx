"use client";

import { PrevIcon, NextIcon } from "./icons";

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PaginationProps {
  paginationMeta: PaginationMeta;
  onPageChange: (page: number) => void;
  searchTerm?: string;
}

export default function Pagination({ paginationMeta, onPageChange, searchTerm }: PaginationProps) {
  // Skip rendering if only one page
  if (paginationMeta.totalPages <= 1) {
    return null;
  }

  // Calculate items being displayed
  const startItem = paginationMeta.totalCount === 0 
    ? 0 
    : (paginationMeta.currentPage - 1) * paginationMeta.pageSize + 1;
  
  const endItem = Math.min(
    paginationMeta.currentPage * paginationMeta.pageSize,
    paginationMeta.totalCount
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile pagination controls */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(paginationMeta.currentPage - 1)}
          disabled={!paginationMeta.hasPrevPage}
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            paginationMeta.hasPrevPage
              ? "text-blue-dark hover:bg-gray-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(paginationMeta.currentPage + 1)}
          disabled={!paginationMeta.hasNextPage}
          className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
            paginationMeta.hasNextPage
              ? "text-blue-dark hover:bg-gray-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop pagination controls */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span>{" "}
            of <span className="font-medium">{paginationMeta.totalCount}</span> results
            {searchTerm && <span className="italic ml-1"> for &quot;{searchTerm}&quot;</span>}
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
            <button
              onClick={() => onPageChange(paginationMeta.currentPage - 1)}
              disabled={!paginationMeta.hasPrevPage}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                paginationMeta.hasPrevPage
                  ? "text-gray-500 hover:bg-gray-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Previous</span>
              <PrevIcon />
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, paginationMeta.totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum: number;
              if (paginationMeta.totalPages <= 5) {
                // If 5 or fewer pages, show all
                pageNum = i + 1;
              } else if (paginationMeta.currentPage <= 3) {
                // If near start, show first 5
                pageNum = i + 1;
              } else if (paginationMeta.currentPage >= paginationMeta.totalPages - 2) {
                // If near end, show last 5
                pageNum = paginationMeta.totalPages - 4 + i;
              } else {
                // Otherwise, show 2 before and 2 after current
                pageNum = paginationMeta.currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    pageNum === paginationMeta.currentPage
                      ? "z-10 bg-blue text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => onPageChange(paginationMeta.currentPage + 1)}
              disabled={!paginationMeta.hasNextPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                paginationMeta.hasNextPage
                  ? "text-gray-500 hover:bg-gray-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Next</span>
              <NextIcon />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}