import { configureStore } from "@reduxjs/toolkit";
import details from "../redux/detailSlice";
import searchs from "../redux/searchSlice";
import favSlice from "../redux/favSlice";

const store = configureStore({
  reducer: {
    detail: details,
    search: searchs,
    toggle: favSlice,
  },
});

export default store;
