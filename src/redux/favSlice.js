import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "details",
  initialState: [],
  reducers: {
    setFav: (state, action) => {
      return [...state, { ...action.payload }];
    },
    deleteFav: (state, action) => {
      return state.filter((data) => data.id !== action.payload);
    },
  },
});

export const { setFav, deleteFav } = favSlice.actions;
export default favSlice.reducer;
