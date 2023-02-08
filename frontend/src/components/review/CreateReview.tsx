import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Rating,
  SelectChangeEvent,
  Snackbar,
  TextField,
  styled,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FilterIcon from "@mui/icons-material/Filter";

import { RankInterface } from "../../interfaces/IRank";
import { ReviewInterface } from "../../interfaces/IReview";

// api
import { GetRanks, CreateReviews } from "../../services/HttpClientService";
import { Link, useParams, useNavigate } from "react-router-dom";

// style
const BoxRating = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 200,
});

const ImgBox = styled(Box)({
  width: "240px",
  marginTop: "2rem",
});

interface RatingLabelsInterface {
  [index: string]: string;
}

function CreateReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState<ReviewInterface>({ RankID: 0 });
  const [ranks, setRanks] = useState<RankInterface[]>([]);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [hover, setHover] = useState(-1);
  const [labels, setLabels] = useState<RatingLabelsInterface>({});
  const [image, setImage] = useState({ name: "", src: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);

    success && navigate(`/user/reviews/${id}`);

  };

  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof review;

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "Image") {
        setReview({ ...review, [name]: dataURL?.toString() });
      }
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setReview({ ...review, [name]: e.target.value });
  };

  const fetchRanks = async () => {
    let res = await GetRanks();
    res && setRanks(res);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  // insert data to db
  const submit = async () => {
    let data = {
      CourseDetailID: convertType(id),
      RankID: convertType(review.RankID),
      MemberID: Number(localStorage.getItem("uid")),
      Content: review.Content,
      Image: review.Image,
    };

    let res = await CreateReviews(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  };

  useEffect(() => {
    fetchRanks();
    return () => {
      const objRating: any = ranks.reduce(
        (obj, item) => Object.assign(obj, { [item.ID + ""]: item.Name }),
        {}
      );
      setLabels(objRating);
    };
  }, [hover, ratingValue]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: "2.5rem auto",
        gap: "1rem",
        // boxShadow: 1,
      }}
    >
      {/* Alert */}
      <Snackbar
        open={success}
        autoHideDuration={7000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={7000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      <BoxRating>
        {ratingValue !== null && (
          <Box sx={{ position: "absolute", top: "-24px" }}>
            {labels[hover !== -1 ? hover : ratingValue]}
          </Box>
        )}
        <Rating
          name="hover-feedback"
          value={review.Rank?.ID}
          // getLabelText={getLabelText}
          onChange={(event, newValue: any) => {
            setReview({
              ...review,
              ["RankID"]: newValue,
            });
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.8 }} fontSize="inherit" />}
        />
      </BoxRating>
      {/* Content */}
      <TextField
        id="content"
        name="Content"
        value={review.Content}
        onChange={handleInputChange}
        multiline
        placeholder="Tell your review..."
        // minRows={2}
        sx={{
          fontSize: "1.5rem",
          minWidth: "100%",
          // minHeight: 200,
          "& fieldset": {
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
          },
        }}
      />
      {/* Upload Cover Image */}
      <Box>
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            left: "0",
            color: "#252525",
          }}
        >
          <FilterIcon />
          <input
            id="image"
            name="Image"
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleChangeImages}
          />
        </IconButton>
      </Box>
      <ImgBox>
        <img src={image.src} alt={image.name} style={{ width: "100%" }} />
      </ImgBox>
      {/* Button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="success"
          sx={{
            width: "120px",
            margin: "0 0 16px 14px",
            color: "#fff",
            borderRadius: 20,
            padding: "8px 16px",
            fontSize: "1rem",
          }}
          onClick={submit}
          className="btn-user"
          variant="contained"
        >
          Publish
        </Button>
        <Link to={`/user/reviews/${id}`} style={{ textDecoration: "none" }}>
          <Button
            className="btn-user"
            variant="contained"
            style={{
              width: "120px",
              margin: "0 0 16px 14px",
              color: "#fff",
              borderRadius: 20,
              backgroundColor: "#333",
              padding: "8px 16px",
              fontSize: "1rem",
            }}
          >
            Back
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default CreateReview;
