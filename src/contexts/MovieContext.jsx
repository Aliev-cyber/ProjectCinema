import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../utils/consts";
import axios from "axios";

const movieContext = createContext();

export function useMovieContext() {
  return useContext(movieContext);
}
const init = {
  movies: [],
  movie: {},
  search: "",
  rating: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.movies:
      return { ...state, movies: action.payload };
    case ACTIONS.movie:
      return { ...state, movie: action.payload };
    case ACTIONS.rating:
      return { ...state, rating: action.payload };
    case ACTIONS.search:
      return { ...state, search: action.payload };
    default:
      return state;
  }
}

const MovieContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  function setSearch(newSearch) {
    dispatch({ type: ACTIONS.search, payload: newSearch });
  }
  function setRating(newRating) {
    dispatch({ type: ACTIONS.rating, payload: newRating });
  }
  async function addMovie(newMovie) {
    try {
      await axios.post(API, newMovie);
    } catch (e) {
      console.log(e);
    }
  }
  async function getMovie() {
    try {
      const { data } = await axios.get(API, {
        params: {
          title_like: encodeURIComponent(state.search),
          rating_like: state.rating,
        },
      });
      dispatch({ type: ACTIONS.movies, payload: data });
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteMovie(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getMovie()
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
  async function editMovie(id, newData) {
    try {
      await axios.patch(`${API}/${id}`, newData);
      getMovie()
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    movies: state.movies,
    movie: state.movie,
    search: state.search,
    rating: state.rating,
    addMovie,
    getMovie,
    deleteMovie,
    setSearch,
    dispatch,
    setRating,
    editMovie,
    getOneMovie,
  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieContext;
