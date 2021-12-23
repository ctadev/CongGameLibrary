import { createSlice } from "@reduxjs/toolkit";
const localData = localStorage.getItem("favourites);

const favSlice = createSlice({
  name: "details",
  initialState: localData ? JSON.parse(localData) : [],
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
