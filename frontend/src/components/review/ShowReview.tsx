import React, { useState, useEffect } from "react";
import { ReviewInterface } from "../../interfaces/IReview";
// api
import { GetReviews } from "../../services/HttpClientService";
import { Avatar, Box, Grid, Rating, Typography, styled } from "@mui/material";

// Component
import ReviewCard from "./ReviewCard";


const ShowReview = () => {
  const [reviews, setReview] = useState<ReviewInterface[]>([]);
  const [value, setValue] = useState<number | null>();

  const fetchReviews = async () => {
    let res = await GetReviews();
    res && setReview(res);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Grid container spacing={2} my={4}>
      {reviews.map((item) => {
        return (
            <Grid item xs={6}>
              <ReviewCard
                id={item.ID!}
                content={item.Content!}
                image={item.Image!}
                rankName={item.Rank?.Name!}
                rating={item.RankID!}
                courseName={item.CourseDetail?.CourseName!}
                memberID={item.MemberID!}
                firstName={item?.Member?.Firstname!}
                lastName={item?.Member?.Lastname!}
              />
            </Grid>
        );
      })}
    </Grid>
  );
};

export default ShowReview;
