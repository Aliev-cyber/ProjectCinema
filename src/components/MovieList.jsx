import React, { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieItem from "./MovieItem";
import { Box, CircularProgress, TextField, Slider, Button } from "@mui/material";

const MovieList = () => {
  const { getMovie, movies, search, setSearch, setRating, rating } =
    useMovieContext();
  console.log(movies);

  useEffect(() => {
    getMovie();
  }, [search, rating]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };
  const handleResetRating = () => {
    setRating(null);
  };
  return (
    <Box>
      <TextField
        label="Search Movie"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        sx={{
          margin: "3rem",
          width: "100",
          display: "block",
          "> .MuiOutlinedInput-root": {
            display: "block",
            width: "25rem",
          },
        }}
      />
      <Slider
        value={rating}
        onChange={handleRatingChange}
        min={1}
        max={5}
        step={1}
        marks
        valueLabelDisplay="auto"
        sx={{ margin: "3rem", width: "40vw" }}
      />
      <Button variant="outlined" onClick={handleResetRating} sx={{ margin: "3rem", width: "10vw" }}>
        All Movies
      </Button>

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
    </Box>
  );
};

export default MovieList;
