import React, { useEffect } from "react";
import MovieList from "../components/MovieList";
import { Box, Pagination } from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../utils/consts";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getMovie, pageTotalCount, page, setPage } = useMovieContext();

  useEffect(() => {
    getMovie();
  }, [searchParams]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...currentParams,
      _page: page,
      _limit: LIMIT,
    });
  }, [page]);
  return (
    <div>
      <MovieList />
      <Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
        <Pagination
          count={pageTotalCount}
          page={page}
          onChange={(_, val) => setPage(val)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default HomePage;
