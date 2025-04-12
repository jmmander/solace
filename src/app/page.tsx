"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Pagination, { PaginationMeta } from "./components/pagination";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string;
  phoneNumber: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  
  // Pagination state
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchAdvocates = async (page = 1, pageSize = 10, search = "") => {
   
    try {
      // Build URL with query parameters
      const url = new URL("/api/advocates", window.location.origin);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());
      if (search) {
        url.searchParams.append("search", search);
      }
      
      const response = await fetch(url.toString());
      const jsonResponse = await response.json();
      
      setAdvocates(jsonResponse.data);
      setPaginationMeta(jsonResponse.meta);
    } catch (error) {
      console.error("Error fetching advocates:", error);
    }
  };

  useEffect(() => {
    fetchAdvocates(paginationMeta.currentPage, paginationMeta.pageSize);
  }, []);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Reset to page 1 when searching
      fetchAdvocates(1, paginationMeta.pageSize, searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const onReset = () => {
    setSearchTerm("");
    // Reset search and go back to first page
    fetchAdvocates(1, paginationMeta.pageSize, "");
  };

  const goToPage = (page: number) => {
    fetchAdvocates(page, paginationMeta.pageSize, searchTerm);
  };

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background-dark p-8">
      <div className="max-w-full mx-auto">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-dark">
              Find your Solace Advocate
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="w-full sm:w-auto flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="w-full pl-8 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue focus:border-blue transition-all text-sm bg-white shadow-sm"
                placeholder="Search by name, city, specialty or anything else..."
                onChange={onChange}
                value={searchTerm}
              />
            </div>
            <button
              className="whitespace-nowrap px-4 py-2 bg-blue text-white text-sm rounded-md hover:bg-blue-dark transition-colors shadow-sm flex items-center justify-center"
              onClick={onReset}
            >
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            {advocates.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No advocates found matching your search criteria.</p>
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead className="bg-primary/90 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">First Name</th>
                    <th className="px-4 py-2 text-left">Last Name</th>
                    <th className="px-4 py-2 text-left">City</th>
                    <th className="px-4 py-2 text-left">Degree</th>
                    <th className="px-4 py-2 text-left">Specialties</th>
                    <th className="px-4 py-2 text-left">Experience</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {advocates.map((advocate, index) => (
                    <tr
                      key={advocate.id}
                      className={`hover:bg-blue-light/10 transition-colors ${index % 2 === 0 ? "bg-background/50" : "bg-white"}`}
                    >
                      <td className="px-4 py-3">{advocate.firstName}</td>
                      <td className="px-4 py-3 font-medium text-primary-dark">
                        {advocate.lastName}
                      </td>
                      <td className="px-4 py-3">{advocate.city}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-light/20 text-blue-dark">
                          {advocate.degree}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {advocate.specialties.length > 0 && (
                          <div className="flex flex-col">
                            {expandedRows.has(advocate.id) ? (
                              <>
                                <div className="flex flex-wrap gap-1 mb-1">
                                  {advocate.specialties.map((specialty, i) => (
                                    <span
                                      key={i}
                                      className="inline-block px-2 py-0.5 text-xs font-medium bg-secondary-light text-black rounded-full border border-secondary/30"
                                      title={specialty}
                                    >
                                      {specialty}
                                    </span>
                                  ))}
                                </div>
                                <div className="w-full text-right">
                                  <button
                                    onClick={() => toggleExpand(advocate.id)}
                                    className="text-xs text-black hover:text-gray-600 transition-colors mt-1"
                                  >
                                    Show less
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center">
                                <span
                                  className="inline-block px-2 py-0.5 text-xs font-medium bg-secondary-light text-black rounded-full border border-secondary/30 truncate max-w-[150px] overflow-hidden"
                                  title={advocate.specialties[0]}
                                >
                                  {advocate.specialties[0]}
                                </span>
                                {advocate.specialties.length > 1 && (
                                  <button
                                    onClick={() => toggleExpand(advocate.id)}
                                    className="ml-1 text-xs font-medium bg-secondary-light text-black rounded-full border border-secondary/30 px-2 py-0.5 whitespace-nowrap"
                                  >
                                    +{advocate.specialties.length - 1}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary-light/20 text-primary-dark">
                          {advocate.yearsOfExperience} years
                        </span>
                      </td>
                      <td className="px-4 py-3 text-primary">
                        {advocate.phoneNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Component */}
          <Pagination 
            paginationMeta={paginationMeta}
            onPageChange={goToPage}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </main>
  );
}