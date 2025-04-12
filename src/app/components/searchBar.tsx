"use client";

import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { SearchIcon, ResetIcon } from "./icons";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm?: string;
  placeholder?: string;
  debounceTime?: number;
}

export default function SearchBar({ 
  onSearch, 
  initialSearchTerm = "", 
  placeholder = "Search...",
  debounceTime = 300
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedTerm, setDebouncedTerm] = useState(initialSearchTerm);
  
  // Set up the debounce effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceTime);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, debounceTime]);

  // Only call onSearch when debouncedTerm changes
  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setDebouncedTerm("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <div className="w-full sm:w-auto flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          className="w-full pl-8 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue focus:border-blue transition-all text-sm bg-white shadow-sm"
          placeholder={placeholder}
          onChange={handleChange}
          value={searchTerm}
        />
      </div>
      {searchTerm && (
        <button
          className="whitespace-nowrap px-4 py-2 bg-blue text-white text-sm rounded-md hover:bg-blue-dark transition-colors shadow-sm flex items-center justify-center"
          onClick={handleReset}
        >
          <ResetIcon className="h-4 w-4 mr-1" />
          Reset
        </button>
      )}
    </div>
  );
}