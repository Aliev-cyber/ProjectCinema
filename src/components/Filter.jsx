import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { LIMIT } from "../utils/consts";
import { useMovieContext } from "../contexts/MovieContext";

export default function Filter() {
  const { setPage, getMovie } = useMovieContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setgenres] = React.useState(
    searchParams.get("genres") || "all"
  );

  const handleChange = (_, value) => {
    value && setgenres(value);
  };
  React.useEffect(() => {
    getMovie();
  }, [searchParams]);

  React.useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (genres === "all") {
      const { _page, q } = currentParams;
      setSearchParams({
        _limit: LIMIT,
        _page: _page || 1,
        _q: q || "",
      });
    } else {
      setSearchParams({
        ...currentParams,
        genres,
      });
      setPage(1);
    }
  }, [genres]);

  return (
    <Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
      <ToggleButtonGroup
        color="primary"
        value={genres}
        exclusive
        onChange={handleChange}
        aria-label="Platform">
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="romance">Romance</ToggleButton>
        <ToggleButton value="thriller">Thriller</ToggleButton>
        <ToggleButton value="fiction">Fiction</ToggleButton>
        <ToggleButton value="horror">Horror</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
