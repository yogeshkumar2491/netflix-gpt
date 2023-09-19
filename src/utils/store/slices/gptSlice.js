import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    isFetching: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleGPTSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    updateFetchStatus: (state) => {
      state.isFetching = true;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.isFetching = false;
      state.movieResults = movieResults;
      state.movieNames = movieNames;
    },
  },
});

export const { toggleGPTSearchView, addGptMovieResult, updateFetchStatus } =
  gptSlice.actions;
export default gptSlice.reducer;
