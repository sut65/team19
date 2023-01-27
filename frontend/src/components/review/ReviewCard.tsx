import React, { useEffect, useState } from "react";
import { ReviewInterface } from "../../interfaces/IReview";
// api
import { GetReviews } from "../../services/HttpClientService";
import { Avatar, Box, Grid, Rating, Typography, styled } from "@mui/material";

type Props = {
  id: number;
  image: string;
  content: string;
  rankName: string;
  rating: number;
  courseName: string;
  firstName: string;
  lastName: string;
};

// style
const BoxAuthor = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "1.5rem",
});

function ReviewCard({
  id,
  image,
  content,
  rankName,
  rating,
  courseName,
  firstName,
  lastName,
}: Props) {
  console.log(rankName);
  console.log(rating);

  return (
    <Box>
      {/* Card one */}
      <Box
        sx={{
          backgroundColor: "#FFF9F9",
          maxWidth: "500px",
          mx: "auto",
          p: "2rem 4rem",
          borderRadius: "2rem",
        }}
      >
        {/* Author and rating */}
        <BoxAuthor>
          {/* Avatar */}
          <Avatar
            alt=""
            src="https://us-tuna-sounds-images.voicemod.net/8fab1c3e-1cb9-47b6-8fe3-699bc7c2aaa9-1655706403347.jpg"
            sx={{ width: 60, height: 60 }}
          />
          {/* Author */}
          <Box>
            <Typography>
              <Box
                sx={{
                  wordSpacing: "4px",
                  display: "inline-block",
                  fontWeight: "900",
                  fontSize: "1.5rem",
                }}
              >
                {firstName} {lastName}
              </Box>
            </Typography>
            {/* Rating */}
            <Rating name="simple-controlled" value={rating} readOnly />
            <Typography sx={{ wordSpacing: "4px" }}>course: {courseName}</Typography>
          </Box>
        </BoxAuthor>
        {/* Content */}
        <Box>
          <Typography>{content}</Typography>
          <Box
            sx={{
              maxWidth: "250px",
              mx: "auto",
              mt: "1.2rem",
            }}
          >
            <img src={image} alt="" style={{ width: "100%" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewCard;
