"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="w-full hidden md:inline-flex flex-1 h-12 relative">
        <CiSearch
          size={20}
          className="absolute left-3 text-lg mt-3.5 text-lightOrange"
        />
        <input
          type="text"
          placeholder="Search product..."
          className="flex-1 h-full outline-none bg-transparent placeholder-lightText border-[1px] border-accent/20 text-lightText rounded-md pl-9 pr-28"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        {searchTerm && (
          <FaTimes
            onClick={() => setSearchTerm("")}
            className="text-accent/50 hover:text-lightRed hoverEffect cursor-pointer absolute right-[94px] top-4"
          />
        )}
        <button className="bg-lightOrange text-accentWhite absolute right-0 px-3.5 py-1.5 mr-1.5 text-sm hover:bg-darkOrange hoverEffect font-medium top-2 rounded-md">
          Search
        </button>
      </div>
    </>
  );
};
