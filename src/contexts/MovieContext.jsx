import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../utils/consts";
import axios from "axios";

const movieContext = createContext();

export function useMovieContext() {
  return useContext(movieContext);
}
const init = {
  movies: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.movies:
      return { ...state, movies: action.payload };
    case ACTIONS.movie:
      return { ...state, movie: action.payload };
    default:
      return state;
  }
}
const MovieContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);

  async function addMovie(newMovie) {
    try {
      await axios.post(API, newMovie);
    } catch (e) {
      console.log(e);
    }
  }
  async function getMovie() {
    try {
      const { data } = await axios.get(API);
      dispatch({
        type: ACTIONS.movies,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getOneMovie(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      dispatch({
        type: ACTIONS.movie,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteMovie(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getMovie();
    } catch (e) {
      console.log(e);
    }
  }

  async function editMovie(id, newData) {
    try {
      await axios.patch(`${API}/${id}`, newData);
      // getOneMovie();
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    movies: state.movies,
    movie: state.movie,
    addMovie,
    getMovie,
    deleteMovie,
    editMovie,
    getOneMovie,
  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieContext;
