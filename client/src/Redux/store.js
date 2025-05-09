import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage के लिए
import userReducer from "./slices/user-slice";

// Redux Persist कॉन्फिगरेशन
const persistConfig = {
  key: "root", // localStorage में key
  storage,      // storage engine (localStorage)
  whitelist: ["user"], // केवल user reducer को persist करें
};

// Persisted reducer बनाएं
const persistedReducer = persistReducer(persistConfig, userReducer);

// Root reducer (अगर आपके और reducers हों तो)
const rootReducer = {
  user: persistedReducer,
};

// Store कॉन्फिगर करें
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Redux Persist के warnings को ignore करें
      },
    }),
});

// Persistor export करें (इसे main.jsx में use करेंगे)
export const persistor = persistStore(store);