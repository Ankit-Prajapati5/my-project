import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const UploadNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;

  const submitFile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a PDF file to upload");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("tags", tags.trim());
      formData.append("file", file);
      formData.append("userId", userId);

      const result = await axios.post(
        "http://localhost:6969/notes/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setSuccess("Notes uploaded successfully!");
      "Upload result:", result;

      // Reset form
      setTitle("");
      setDescription("");
      setTags("");
      setFile(null);
    } catch (error) {
      console.error("Failed to submit file: ", error);
      setError(
        error.response?.data?.message ||
          "Failed to upload note. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-blue-800 p-4 text-white shadow-md">
        <h1 className="text-2xl font-bold">Upload Your Study Notes</h1>
      </header>

      {/* Content: Centered Form */}
      <div className="flex flex-grow items-center justify-center bg-gray-900 p-4 pt-20 sm:p-8 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md rounded-2xl bg-white/95 shadow-lg sm:backdrop-blur-sm dark:bg-gray-800/95"
        >
          <div className="p-6 sm:p-8">
            <div className="mb-6 text-center sm:mb-8">
              <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">
                Upload Study Notes
              </h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-300">
                Share your knowledge with the student community
              </p>
            </div>

            <form onSubmit={submitFile}>
              {/* Title Input */}
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-gray-700 sm:mb-2 dark:text-gray-300"
                >
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Note title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:rounded-xl sm:p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              {/* Description Input */}
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="description"
                  className="mb-1 block text-sm font-medium text-gray-700 sm:mb-2 dark:text-gray-300"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  placeholder="Brief description..."
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:rounded-xl sm:p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              {/* Tags Input */}
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="tags"
                  className="mb-1 block text-sm font-medium text-gray-700 sm:mb-2 dark:text-gray-300"
                >
                  Tags* (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  placeholder="math, physics"
                  required
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:rounded-xl sm:p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>

              {/* File Upload */}
              <div className="mb-6 sm:mb-8">
                <label className="mb-1 block text-sm font-medium text-gray-700 sm:mb-2 dark:text-gray-300">
                  PDF File* (Max 10MB)
                </label>
                {file ? (
                  <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-3 sm:rounded-xl sm:p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-gray-500 sm:mr-3 sm:h-5 sm:w-5 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18V2a.969.969 0 0 0-.933-1H1.933A.97.97 0 0 0 1 2v16Z"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3v14m6-14v14"
                        />
                      </svg>
                      <span className="text-xs text-gray-700 sm:text-sm dark:text-gray-300">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 sm:h-40 sm:rounded-xl dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-4 pt-3 sm:pb-6 sm:pt-5">
                      <FiUploadCloud className="mb-2 h-6 w-6 text-gray-500 sm:mb-3 sm:h-8 sm:w-8 dark:text-gray-400" />
                      <p className="mb-1 text-xs text-gray-500 sm:mb-2 sm:text-sm dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
                        PDF only (Max 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      id="dropzone-file"
                      accept="application/pdf"
                      required
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Status Messages */}
              {error && (
                <div className="mb-4 rounded-lg bg-red-100 p-2 text-xs text-red-700 sm:mb-6 sm:p-3 sm:text-sm dark:bg-red-200 dark:text-red-800">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 rounded-lg bg-green-100 p-2 text-xs text-green-700 sm:mb-6 sm:p-3 sm:text-sm dark:bg-green-200 dark:text-green-800">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:rounded-xl sm:px-5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:focus:ring-offset-gray-800"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-3 w-3 animate-spin sm:h-4 sm:w-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 0 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload Notes"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadNote;
