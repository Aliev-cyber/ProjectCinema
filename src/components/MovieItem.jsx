import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import Rating from "@mui/material/Rating";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MovieItem({ item }) {
  const { deleteMovie } = useMovieContext();
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    authors: "",
    description: "",
    image: "",
    rating: item.rating,
  });

  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ m: "30px", width: "350px" }}>
      <CardHeader
        action={
          <>
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem
                component={Button}
                endIcon={<DeleteIcon />}
                sx={{ textTransform: "capitalize", color: "red" }}
                onClick={() => deleteMovie(item.id)}>
                Delete
              </MenuItem>
              <MenuItem
                component={Button}
                endIcon={<EditIcon />}
                sx={{ textTransform: "capitalize", width: "100%" }}
                onClick={() => navigate(`/edit/${item.id}`)}>
                Edit
              </MenuItem>
            </Menu>
          </>
        }
        title={item.title}
        subheader={item.category}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6">{item.authors}</Typography>
        <Typography variant="body2" color="text.secondary">
          <Rating name="simple-controlled" value={formValue.rating} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{item.description}</Typography>
          <Typography paragraph>{item.composition}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
