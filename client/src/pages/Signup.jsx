import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUploadCloud, FiX } from "react-icons/fi";
import axios from "axios";

const Signup = () => {
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [profileImageError, setProfileImageError] = useState(null);

  const registerUser = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userBio", userBio);
      formData.append("userEmail", userEmail);
      formData.append("userMobile", userMobile);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);
      formData.append("profileImage", profileImage);

      const result = await axios.post(
        "http://localhost:6969/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("User Entry Saved in Database");
    } catch (error) {
      "Failed to Register User: ", error;
    }
  };

  return (
    <div className=" flex w-full items-center justify-center bg-[#f3f4f6]">
      <form
        className="flex h-full w-full max-w-[420px] flex-col gap-3 bg-white p-5"
        onSubmit={registerUser}
      >
        <h1 className="text-2xl font-black">Register</h1>
        <div className="flex items-start justify-center gap-4">
          {/* First Name Field */}
          <div className="flex w-full flex-col items-start justify-center">
            <label className="font-bold" htmlFor="firstName">
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none ${
                firstName && !/^[A-Za-z]+$/.test(firstName)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Given name"
              value={firstName}
              onChange={(e) => {
                // Only allow alphabetic characters
                const alphabeticOnly = e.target.value.replace(/[^A-Za-z]/g, "");
                setFirstName(alphabeticOnly);
              }}
              required
              minLength={2}
              maxLength={20}
              pattern="[A-Za-z]+"
            />
            {firstName && !/^[A-Za-z]+$/.test(firstName) && (
              <p className="mt-1 text-sm text-red-500">
                Only alphabetic characters allowed
              </p>
            )}
            {firstName && firstName.length < 2 && (
              <p className="mt-1 text-sm text-red-500">
                Minimum 2 characters required
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="flex w-full flex-col items-start justify-center">
            <label className="font-bold" htmlFor="lastName">
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none ${
                lastName && !/^[A-Za-z]+$/.test(lastName)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Family name"
              value={lastName}
              onChange={(e) => {
                // Only allow alphabetic characters
                const alphabeticOnly = e.target.value.replace(/[^A-Za-z]/g, "");
                setLastName(alphabeticOnly);
              }}
              required
              minLength={2}
              maxLength={20}
              pattern="[A-Za-z]+"
            />
            {lastName && !/^[A-Za-z]+$/.test(lastName) && (
              <p className="mt-1 text-sm text-red-500">
                Only alphabetic characters allowed
              </p>
            )}
            {lastName && lastName.length < 2 && (
              <p className="mt-1 text-sm text-red-500">
                Minimum 2 characters required
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userBio">
            Bio{" "}
            {userBio.length > 0 && (
              <span className="text-sm font-normal text-gray-500">
                ({userBio.length}/200)
              </span>
            )}
          </label>
          <textarea
            id="userBio"
            name="userBio"
            rows="3"
            className={`mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none ${
              userBio.length > 200 ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tell us something about yourself"
            value={userBio}
            onChange={(e) => {
              if (e.target.value.length <= 200) {
                setUserBio(e.target.value);
              }
            }}
            maxLength={200}
            required
          />
          {userBio.length > 200 ? (
            <p className="mt-1 text-sm text-red-500">
              Bio cannot exceed 200 characters (currently {userBio.length})
            </p>
          ) : (
            userBio.length > 150 && (
              <p className="mt-1 text-sm text-yellow-600">
                {200 - userBio.length} characters remaining
              </p>
            )
          )}
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userEmail">
            Email*
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className={`w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none ${
              userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="your.email@example.com"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
          {userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail) && (
            <p className="mt-1 text-sm text-red-500">
              Please enter a valid email address (e.g., your.name@example.com)
            </p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userMobile">
            Mobile Number
          </label>
          <input
            type="tel"
            id="userMobile"
            name="userMobile"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            placeholder="1234567890"
            value={userMobile}
            onChange={(e) => {
              // Remove any non-digit characters
              const numbersOnly = e.target.value.replace(/\D/g, "");
              // Limit to 10 digits
              if (numbersOnly.length <= 10) {
                setUserMobile(numbersOnly);
              }
            }}
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />
          {userMobile && userMobile.length !== 10 && (
            <p className="mt-1 text-sm text-red-500">
              Please enter exactly 10 digits
            </p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userName">
            Username*
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className={`w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none ${
              userName && !/^[a-zA-Z0-9_]{3,20}$/.test(userName)
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="user123"
            value={userName}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only alphanumeric + underscore, no spaces
              if (/^[a-zA-Z0-9_]*$/.test(value) && value.length <= 20) {
                setUserName(value);
              }
            }}
            required
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_]{3,20}"
          />
          {userName && !/^[a-zA-Z0-9_]{3,20}$/.test(userName) && (
            <div className="mt-1 text-sm text-red-500">
              {userName.length < 3 ? (
                <p>Username must be at least 3 characters</p>
              ) : userName.length > 20 ? (
                <p>Username cannot exceed 20 characters</p>
              ) : (
                <p>Only letters, numbers, and underscores (_) allowed</p>
              )}
            </div>
          )}
          {userName && /^[a-zA-Z0-9_]{3,20}$/.test(userName) && (
            <p className="mt-1 text-sm text-green-500">✓ Valid username</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userPassword">
            Password*
          </label>
          <div className="relative w-full">
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className={`w-full rounded-lg border p-2 pr-10 focus:border-blue-500 focus:outline-none ${
                userPassword &&
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  userPassword,
                )
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••••••"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
              minLength={8}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
            />
            {/* Password strength indicator */}
            {userPassword && (
              <div className="mt-1">
                <div className="h-1 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-1 rounded-full ${
                      userPassword.length < 4
                        ? "w-1/4 bg-red-500"
                        : userPassword.length < 8
                          ? "w-1/2 bg-yellow-500"
                          : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                                userPassword,
                              )
                            ? "w-full bg-green-500"
                            : "w-3/4 bg-orange-500"
                    }`}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {!userPassword
                    ? ""
                    : userPassword.length < 4
                      ? "Very Weak"
                      : userPassword.length < 8
                        ? "Weak"
                        : !/(?=.*[A-Z])/.test(userPassword)
                          ? "Needs uppercase"
                          : !/(?=.*[a-z])/.test(userPassword)
                            ? "Needs lowercase"
                            : !/(?=.*\d)/.test(userPassword)
                              ? "Needs number"
                              : !/(?=.*[@$!%*?&])/.test(userPassword)
                                ? "Needs special character"
                                : "Strong password"}
                </p>
              </div>
            )}
          </div>
          {userPassword &&
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              userPassword,
            ) && (
              <ul className="mt-1 list-disc pl-5 text-sm text-red-500">
                {userPassword.length < 8 && <li>Minimum 8 characters</li>}
                {!/(?=.*[a-z])/.test(userPassword) && (
                  <li>At least one lowercase letter</li>
                )}
                {!/(?=.*[A-Z])/.test(userPassword) && (
                  <li>At least one uppercase letter</li>
                )}
                {!/(?=.*\d)/.test(userPassword) && <li>At least one number</li>}
                {!/(?=.*[@$!%*?&])/.test(userPassword) && (
                  <li>At least one special character (@$!%*?&)</li>
                )}
              </ul>
            )}
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          {/* Image Preview */}
          <div className="relative mb-4 h-[200px] w-[200px]">
            <div className="grid h-full w-full place-content-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
              {profilePreviewImage ? (
                <>
                  <img
                    src={profilePreviewImage}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                    onError={() => setProfilePreviewImage(null)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProfilePreviewImage(null);
                      setProfileImage(null);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <p className="text-sm font-bold text-gray-500">Profile Image</p>
              )}
            </div>
          </div>

          {/* File Upload */}
          <label
            htmlFor="dropzone-file"
            className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
              profileImageError ? "border-red-500" : "border-gray-300"
            } bg-gray-50 hover:bg-gray-100`}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <FiUploadCloud className="mb-4 h-8 w-8 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
              <input
                type="file"
                id="dropzone-file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Validate file type
                    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
                    if (!validTypes.includes(file.type)) {
                      setProfileImageError(
                        "Only PNG, JPG, JPEG images are allowed",
                      );
                      return;
                    }

                    // Validate file size (5MB max)
                    if (file.size > 5 * 1024 * 1024) {
                      setProfileImageError("Image must be less than 5MB");
                      return;
                    }

                    setProfileImageError(null);
                    setProfilePreviewImage(URL.createObjectURL(file));
                    setProfileImage(file);
                  }
                }}
                className="hidden"
              />
            </div>
          </label>

          {/* Validation Messages */}
          {profileImageError && (
            <p className="mt-2 text-sm text-red-500">{profileImageError}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={!profileImage || !!profileImageError}
            className={`mt-6 rounded-lg px-5 py-2 font-bold text-white ${
              !profileImage || profileImageError
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Register
          </button>

          {/* Login Link */}
          <div className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
