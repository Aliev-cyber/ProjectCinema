import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate, useParams } from "react-router-dom";

const defaultTheme = createTheme();

export default function EditMoviePage() {
  const { editMovie, movie, getOneMovie } = useMovieContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    authors: "",
    description: "",
    image: "",
    rating: 0,
  });

  useEffect(() => {
    getOneMovie(id);
  }, []);

  useEffect(() => {
    if (movie) {
      setFormValue(movie);
    }
  }, [movie]);

  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formValue);

    if (
      !formValue.title.trim() ||
      !formValue.authors.trim() ||
      !formValue.description.trim() ||
      !formValue.image.trim() ||
      !formValue.rating
    ) {
      return;
    }
    editMovie(id, formValue);
    navigate("/");

    // setFormValue({
    //   title: "",
    //   authors: "",
    //   description: "",
    //   image: "",
    //   rating: 0,
    // });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography component="h1" variant="h5">
            Edit Movie
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="authors"
              label="Authors"
              value={formValue.authors}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              value={formValue.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image"
              value={formValue.image}
              onChange={handleChange}
            />

            <Rating
              name="simple-controlled"
              value={formValue.rating}
              onChange={(event, newValue) => {
                setFormValue({ ...formValue, rating: newValue });
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "black" }}>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
