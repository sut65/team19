import React, { useEffect, useState } from "react";
import { ReviewInterface } from "../../interfaces/IReview";
// api
import { GetReviews } from "../../services/HttpClientService";
import { Avatar, Box, Grid, Rating, Typography, styled } from "@mui/material";

// style
const BoxAuthor = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "1.5rem",
});

function ReviewCard() {
  const [reviews, setReview] = useState<ReviewInterface[]>([]);
  const [value, setValue] = React.useState<number | null>();

  const fetchReviews = async () => {
    let res = await GetReviews();
    res && setReview(res);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Grid container gap={3} >
      {/* Card one */}
      <Box
        sx={{
          backgroundColor: "#FFF9F9",
          maxWidth: "600px",
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
                  fontSize: "1.5rem"
                }}
              >
                {/* {item.Member?.Firstname} {item.Member?.Lastname} */}
                Test Der
              </Box>
            </Typography>
            {/* Rating */}
            <Rating
              name="simple-controlled"
              value={4}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
        </BoxAuthor>
        {/* Content */}
        <Box>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            eum explicabo quisquam esse eaque incidunt, doloribus eius odit
            dolor maxime molestiae odio aspernatur, tempora quasi aut obcaecati
            libero eos nostrum?
          </Typography>
          <Box sx={{
          maxWidth: "250px",
          mx: "auto",
          mt: "1.2rem"
        }}>
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80 " alt="" style={{width: "100%"}} />
        </Box>
        </Box>
      </Box>
      {/* Card 2 */}
      <Box
        sx={{
          backgroundColor: "#FFF9F9",
          maxWidth: "600px",
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
            src="https://preview.redd.it/7qalrjf53th51.png?auto=webp&s=5394748cc864bcb0d0dd4b1809e17a3ef296e437"
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
                  fontSize: "1.5rem"
                }}
              >
                {/* {item.Member?.Firstname} {item.Member?.Lastname} */}
                Mike Wazowski
              </Box>
            </Typography>
            {/* Rating */}
            <Rating
              name="simple-controlled"
              value={5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
        </BoxAuthor>
        {/* Content */}
        <Box>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            eum explicabo quisquam esse eaque incidunt, doloribus eius odit
            dolor maxime molestiae odio aspernatur, tempora quasi aut obcaecati
            libero eos nostrum?
          </Typography>
        </Box>
        <Box sx={{
          maxWidth: "250px",
          mx: "auto",
          mt: "1.2rem"
        }}>
          <img src="https://images.unsplash.com/photo-1518770352423-dce09a3d3307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="" style={{width: "100%"}} />
        </Box>
      </Box>
    </Grid>
  );
}

export default ReviewCard;
