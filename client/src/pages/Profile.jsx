import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const [userFiles, setUserFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserFiles = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:6969/notes/getFiles/${user._id}`);
        setUserFiles(data.data || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) {
      getUserFiles();
    }
  }, [user?._id]);

  const numberofUploads = userFiles.length;
  const numberofFiles = userFiles.reduce((count, file) => count + 1, 0);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row p-4">
      {/* Profile Section */}
      <div className="w-full lg:w-2/5 p-6 bg-white rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
        <div className="flex flex-col items-center">
          <div className="h-40 w-40 rounded-full bg-gray-200 overflow-hidden mb-4">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-300 text-4xl font-bold">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-center">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-gray-600 text-center">@{user?.userName}</p>
          {user?.userBio && (
            <p className="text-gray-700 text-center mt-2">{user.userBio}</p>
          )}
          
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600">Uploads</p>
              <p className="text-3xl font-bold text-blue-600">
                {isLoading ? '-' : numberofUploads}
              </p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600">Files</p>
              <p className="text-3xl font-bold text-blue-600">
                {isLoading ? '-' : numberofFiles}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="w-full lg:w-3/5 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">My Documents</h1>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : userFiles.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No documents uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userFiles.map((file) => (
              <a
                href={`http://localhost:6969/files/${file.files}`}
                key={file._id}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className="font-medium truncate max-w-[180px]">
                    {file.fileName}
                  </span>
                </div>
                <FaArrowRight className="text-gray-400" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;