import React, { useState, useEffect } from "react";
import { ReviewInterface } from "../../interfaces/IReview";
// api
import {
  GetReviews,
  GetReviewByCourseID,
} from "../../services/HttpClientService";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';

// Component
import ReviewCard from "./ReviewCard";
import { Link, useParams } from "react-router-dom";

// Style
const ButtonWrite = styled(Button)({
  backgroundColor: "#252525",
  "&:hover": {
    color: "#252525",
    backgroundColor: "#fff",
    border: "#252525 1px solid",
  },
});

const ShowReview = () => {
  const { id } = useParams();
  const [reviews, setReview] = useState<ReviewInterface[]>([]);
  const [isShow, setIsShow] = useState(false);

  const fetchReviews = async () => {
    let res = await GetReviewByCourseID(id + "");
    if (res) {
      setReview(res);
      setIsShow(!isShow);
    }
  };

  console.log(isShow);

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Box>
      {/* Button Write */}
      <Box
        sx={{
          m: "2rem 5rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link
          to={`/user/reviews/${id}/create`}
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
              padding: "6px 18px",
              fontSize: "1.5rem",
            }}
            startIcon={<RateReviewIcon />}
            className="btn-user"
            variant="outlined"
          >
            Review
          </ButtonWrite>
        </Link>
      </Box>
      {isShow ? (
        <Grid container spacing={2} my={4}>
          {reviews.map((item) => {
            return (
              <Grid item xs={6} key={item.ID!}>
                <ReviewCard
                  idCourse={Number(id)}
                  id={item.ID!}
                  content={item.Content!}
                  image={item.Image!}
                  rankName={item.Rank?.Name!}
                  rating={item.RankID!}
                  courseName={item.CourseDetail?.CourseName!}
                  memberID={item.MemberID!}
                  avatar={item.Member?.ProfileUser!}
                  firstName={item?.Member?.Firstname!}
                  lastName={item?.Member?.Lastname!}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            overflowY: "hidden",
            wordSpacing: "12px",
          }}
        >
          <Typography fontSize={"3rem"} fontWeight={"bold"}>
            Reviews Not Found!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ShowReview;
