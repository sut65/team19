import React, { useState, useEffect } from "react";
import { BlogInterface } from "../../interfaces/IBlog";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import "../../App.css";

// api
import { GetBlogByID } from "../../services/HttpClientService";

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState<BlogInterface>({});
  
  const fetchArticle = async () => {
    let res = await GetBlogByID(id + "");
    console.log(res);
    res && setArticle(res);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div>
      {/* Cover Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "360px",
          backgroundImage:
            `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${article.CoverImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Typography color={"#fff"} fontSize={"4rem"} variant="h1">
          {article.Title}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          margin: "2rem 8rem",
        }}
      >
        {/* Author */}
        <Typography color={"#252525"} mb={2} fontSize={"1.2rem"} variant="h3">
          Author :{" "}
          <Box
            sx={{
              ml: "1rem",
              display: "inline",
              wordSpacing: "12px",
            }}
          >
            <b>{article.Member?.Firstname}</b> <b>{article.Member?.Lastname}</b>
          </Box>
        </Typography>
        {/* Category */}
        <Typography color={"#252525"} mb={2} fontSize={"1.2rem"} variant="h3">
          Category : <b style={{marginLeft: "1rem"}}>{article.Category?.Name}</b>
        </Typography>
        {/* Created */}
        <Typography
          mb={2}
          fontSize={"1.2rem"}
          variant="h3"
          style={{ color: "#252525" }}
        >
          Created : <b>{article.CreatedAt?.toString().slice(0, 10)}</b>
        </Typography>
        <hr style={{ opacity: "0.4" }} />
        {/* Content */}
        <Typography
          mt={2}
          mb={3}
          fontSize={"1.2rem"}
          variant="h3"
          style={{ color: "#252525", wordSpacing: "4px", letterSpacing: "1px" }}
        >
          {article.Content}
        </Typography>
        {/* Tag */}
        <Typography
          variant="caption"
          fontSize={"0.9rem"}
          sx={{
            border: "solid 1px #252525",
            borderRadius: "1rem",
            p: "6px 12px",
          }}
        >
          #{article.Tag?.Name}
        </Typography>
      </Box>
    </div>
  );
}

export default Article;
