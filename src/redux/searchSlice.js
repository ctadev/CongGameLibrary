import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "details",
  initialState: `https://api.rawg.io/api/games?key=${process.env.REACT_APP_GAME_API}&page_size=50`,
  reducers: {
    fetchAPI: (state, action) => {
      return (state = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_GAME_API}&search=${action.payload}&page_size=50`);
    },
    fetchPlatform: (state, action) => {
      return (state = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_GAME_API}&parent_platforms=${action.payload}&page_size=50`);
    },
    returnHome: (state) => {
      return (state = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_GAME_API}&page_size=50`);
    },
  },
});

export const { fetchAPI, fetchPlatform, returnHome } = searchSlice.actions;
export default searchSlice.reducer;
