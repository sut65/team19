import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import '../App.css';

type Props = {
  id: number;
  coverImage: string;
  title: string;
  content: string;
  category: string;
  tag: string;
  author: string;
};

function CardBlog({
  id,
  coverImage,
  title,
  content,
  category,
  tag,
  author,
}: Props) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
      className={title}
    >
      <CardMedia
        component="img"
        height="200"
        image={coverImage}
        alt="green iguana"
      />
      <CardContent>
        <Box
          sx={
            {
              // display: "flex",
              // justifyContent: "space-between",
            }
          }
        >
          <Typography
            sx={{
              color: "#6b7280",
            }}
            gutterBottom
            variant="caption"
            component="div"
            style={{ fontSize: "1rem" }}
          >
            Author : {author}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Category: {category}
          </Typography>
          <Typography
            mb={2}
            gutterBottom
            variant="h3"
            component="div"
            // color={"#3b82f6"}
            style={{ textTransform: "capitalize", fontSize: "1.6rem" }}
          >
            <b>{title}</b>
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "1.2rem" }}
          variant="h5"
          style={{ marginBottom: "0.5rem" }}
        >
          {content.slice(0, 80)}
        </Typography>
        <Typography
          variant="caption"
          fontSize={"0.9rem"}
          sx={{
            border: "solid 1px #252525",
            borderRadius: "1rem",
            p: "4px 8px",
          }}
        >
          #{tag}
        </Typography>
      </CardContent>
      <Link
        to={`/article/${id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          className="btn-user"
          variant="contained"
          style={{
            margin: "0 0 16px 14px",
            color: "#fff",
            borderRadius: 20,
            backgroundColor: "#3b82f6",
            padding: "8px 16px",
            fontSize: "12px",
          }}
        >
          Read more
        </Button>
      </Link>
    </Card>
  );
}

export default CardBlog;
