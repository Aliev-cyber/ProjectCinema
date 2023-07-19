import React, { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieItem from "./MovieItem";
import { Box, CircularProgress } from "@mui/material";

const MovieList = () => {
  const { getMovie, movies } = useMovieContext();
  console.log(movies);

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {movies.length > 0 ? (
        movies.map((item) => <MovieItem key={item.id} item={item} />)
      ) : (
        <CircularProgress
          sx={{ mx: "auto", mt: 5, display: "block" }}
          size={200}
        />
      )}
    </Box>
  );
};

export default MovieList;
