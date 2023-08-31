import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newsAdminFilterReducer from "./reducers/newsAdminFilterReducer";

const rootReducer = combineReducers({
  newsAdminFilter: newsAdminFilterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
