import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle"); // "idle", "searching", "found", "not-found"
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const username = user?.userName; // Added optional chaining for safety

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Don't search empty queries

    setSearchStatus("searching");
    setError(null);

    try {
      const response = await axios.get("http://localhost:6969/notes/getFiles", {
        params: {
          title: searchQuery.trim(), // Trim whitespace
        },
      });

      if (response.data.data?.length > 0) {
        setSearchResults(response.data.data);
        setSearchStatus("found");
      } else {
        setSearchResults([]);
        setSearchStatus("not-found");
      }
    } catch (error) {
      console.error("Error Fetching Notes: ", error);
      setError("Failed to fetch notes. Please try again.");
      setSearchStatus("error");
    }
  };

  const showPDF = (filePath) => {
    window.open(
      `http://localhost:6969/files/${encodeURIComponent(filePath)}`,
      "_blank",
      "noreferrer"
    );
  };

  return (
    <div className="h-heightWithoutNavbar flex flex-col items-center justify-start p-4">
      <div className="flex w-full items-center justify-center">
        <form
          className="w-full max-w-[700px] rounded-xl border border-black bg-[#374151] p-4"
          onSubmit={handleSearch}
        >
          <div className="flex items-center justify-between">
            <FaSearch className="text-2xl text-white" />
            <input
              type="search"
              placeholder="Search for Notes"
              className="ml-3 w-full bg-[#374151] text-white focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search notes"
            />
            <button
              type="submit"
              disabled={searchStatus === "searching" || !searchQuery.trim()}
              className="ml-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {searchStatus === "searching" ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {/* Status messages */}
      {searchStatus === "searching" && (
        <div className="mt-4 text-center text-gray-400">Searching...</div>
      )}
      {error && (
        <div className="mt-4 text-center text-red-500">{error}</div>
      )}

      {/* Search results */}
      <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {searchStatus === "found" &&
          searchResults.map((note) => (
            <div
              key={note._id}
              className="flex w-full max-w-[300px] items-center justify-between rounded-xl bg-[#374151] px-3 py-2 text-white shadow-lg"
            >
              <p className="text-sm">
                <span className="font-bold">File name: </span>
                <span className="truncate">{note.fileName}</span>
              </p>
              <button
                onClick={() => showPDF(note.files)}
                className="rounded-xl bg-blue-500 px-3 py-1 text-sm font-bold hover:bg-blue-600"
              >
                View
              </button>
            </div>
          ))}

        {searchStatus === "not-found" && (
          <div className="col-span-full mt-4 text-center text-gray-600 dark:text-gray-400">
            No notes found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;