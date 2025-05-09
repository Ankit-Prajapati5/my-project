import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely get and parse localStorage data
const getStoredUserData = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to parse user data from localStorage:', error);
    localStorage.removeItem('userData'); // Remove corrupted data
    return null;
  }
};

const initialState = {
  userData: getStoredUserData(),
  isAuthenticated: !!getStoredUserData()
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      try {
        localStorage.setItem('userData', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Failed to save user data to localStorage:', error);
      }
    },
    removeUserData: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userData');
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;