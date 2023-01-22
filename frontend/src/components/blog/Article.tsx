import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import '../../App.css';

function Article() {
  // const { id } = useParams()
  // const article = articles.find((item) => String(item.id) === id);
  const date = new Date()
  console.log(date)
  
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
            "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://images.unsplash.com/photo-1673897986805-3a0a2b6f3945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Typography color={"#fff"} fontSize={"4rem"} variant="h1">
          How to ออกกำลังกายด้วยงบ 0 บาท
        </Typography>
      </Box>
      
      {/* Content */}
      <Box
        sx={{
          margin: "2rem 8rem",
        }}
      >
        {/* Author */}
        <Typography
          mb={2}
          fontSize={"1.2rem"}
          variant="h3"
          style={{ color: "#252525" }}
        >
          Author : <b>Dang Guitar</b>
        </Typography>
        {/* Category */}
        <Typography
          mb={2}
          fontSize={"1.2rem"}
          variant="h3"
          style={{ color: "#252525" }}
        >
          Category : <b>ออกกำลังกาย</b>
        </Typography>
        {/* Created */}
        <Typography
          mb={2}
          fontSize={"1.2rem"}
          variant="h3"
          style={{ color: "#252525" }}
          >
          Created : <b>{date.toLocaleDateString()}</b>
        </Typography>
        <hr style={{ opacity: "0.4" }} />
        {/* Content */}
        <Typography
          mt={2}
          mb={3}
          fontSize={"1.2rem"}
          variant="h3"
          style={{ color: "#252525", wordSpacing: "4px", letterSpacing: "2px" }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
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
          #งบประหยัด
        </Typography>
      </Box>
    </div>
  );
}

export default Article;
