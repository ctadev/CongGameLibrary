import { createSlice } from "@reduxjs/toolkit";

const localData = localStorage.getItem("favourites");

const detailSlice = createSlice({
  name: "details",
  initialState: 5679,
  reducers: {
    fetchID: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { fetchID } = detailSlice.actions;
export default detailSlice.reducer;
