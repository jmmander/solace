"use client";

import { ChangeEvent } from "react";
import { SearchIcon, ResetIcon } from "./icons";

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  searchTerm, 
  onChange, 
  onReset, 
  placeholder = "Search..." 
}: SearchBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <div className="w-full sm:w-auto flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          className="w-full pl-8 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue focus:border-blue transition-all text-sm bg-white shadow-sm"
          placeholder={placeholder}
          onChange={onChange}
          value={searchTerm}
        />
      </div>
      <button
        className="whitespace-nowrap px-4 py-2 bg-blue text-white text-sm rounded-md hover:bg-blue-dark transition-colors shadow-sm flex items-center justify-center"
        onClick={onReset}
      >
        <ResetIcon className="h-4 w-4 mr-1" />
        Reset
      </button>
    </div>
  );
}