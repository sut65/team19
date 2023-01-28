import React, { useState, useEffect } from "react";
import { BlogInterface } from "../../interfaces/IBlog";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
// Component
import Box from "@mui/material/Box";
import { Button, Grid, styled } from "@mui/material";
import CardBlog from "./CardBlog";
import "../../App.css";

// api
import { GetBlogs } from "../../services/HttpClientService";

// Style
const ButtonWrite = styled(Button)({
  backgroundColor: "#252525",
  "&:hover": {
    color: "#252525",
    backgroundColor: "#fff",
    border: "#252525 1px solid",
  },
});

function ShowCardBlog() {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);

  const fetchBlogs = async () => {
    let res = await GetBlogs();
    res && setBlogs(res);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "1024px",
        margin: "2rem auto",
      }}
    >
      {/* Button Write */}
      <Box
        sx={{
          // mt: "5rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link
          to="/user/create-article"
          style={{
            textDecoration: "none",
          }}
        >
          <ButtonWrite
            sx={{
              width: "120px",
              margin: "0 0 16px 14px",
              color: "#fff",
              borderRadius: 20,
              padding: "4px 8px",
              fontSize: "1.5rem",
            }}
            startIcon={<CreateIcon />}
            className="btn-user"
            variant="outlined"
          >
            Write
          </ButtonWrite>
        </Link>
      </Box>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {blogs.map((item) => {
          return (
            <Grid item xs={6} sm={4} md={4} key={item.ID}>
              <CardBlog
                id={item.ID!}
                coverImage={item.CoverImage!}
                title={item.Title!}
                content={item.Content!}
                category={item?.Category?.Name!}
                tag={item?.Tag?.Name!}
                firstName={item?.Member?.Firstname!}
                lastName={item?.Member?.Lastname!}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ShowCardBlog;
