import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "details",
  initialState: [],
  reducers: {
    setFav: (state, action) => {
      return [...state, {...action.payload}]
    },
  },
});

export const { setFav } = favSlice.actions;
export default favSlice.reducer;
