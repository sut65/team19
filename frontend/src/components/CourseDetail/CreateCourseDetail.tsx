import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button, TextField, Select, styled, SelectChangeEvent, Box, Snackbar,
} from "@mui/material";
// import { Box } from "@mui/system";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdminInterface } from "../../interfaces/IAdmin";
import { DescriptionInterface } from "../../interfaces/IDescription";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";

// api
import {
  GetAdmin,
  createCourseDetail,
} from "../../services/HttpClientService";

// Style
const ImgBox = styled(Box)({
  width: "280px",
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateCourseDetail() {
  //const date = new Date();
  const [courseDetail, setCourseDetail] = useState<CourseDetailInterface>({});
  //const [description, setDescription] = useState<DescriptionInterface>({})
  // const [member, setMember] = useState<UserInterface>({})
  // const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({ name: "", src: "" });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof courseDetail;

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "CoverPage") {
        setCourseDetail({ ...courseDetail, [name]: dataURL?.toString() });
      }
    };
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof courseDetail;
    setCourseDetail({
      ...courseDetail,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setCourseDetail({ ...courseDetail, [name]: e.target.value });
  };

  // const fetchCategories = async () => {
  //   let res = await GetCategories();
  //   res && setCategories(res);
  // };


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  // insert data to db
  const submit = async () => {
    let data = {
      // CategoryID: convertType(blog.CategoryID),
      // TagID: convertType(blog.TagID),
      AdminID: Number(localStorage.getItem("uid")),
      CoverPage: courseDetail.CoverPage,
      CourseName: courseDetail.CourseName,
      Description: courseDetail.Description,
    };

    let res = await createCourseDetail(data);
    res ? setSuccess(true) : setError(true);
    window.location.href = "/course_detail"
  };

  useEffect(() => {
    // fetchCategories();
    // fetchTags();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "50%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // mt: "6rem",
        gap: "1rem",
        mb: "2rem",
      }}
    >
      {/* Alert */}
      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      {/* Upload Cover Image */}
      <Box>
        <Button
          variant="contained"
          component="label"
          sx={{
            position: "absolute",
            left: "0",
            backgroundColor: "#f2f2f2",
            color: "#252525",
          }}
        >
          Upload
          <input
            id="coverImage"
            name="CoverImage"
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleChangeImages}
          />
        </Button>
      </Box>
      <ImgBox>
        <img src={image.src} alt={image.name} style={{ width: "100%" }} />
      </ImgBox>

      {/* Title */}
      <TextField
        sx={{
          "& fieldset": { border: "none" },
          marginTop: "1.8rem",
          width: "100%",
        }}
        id="course name"
        name="Course Name"
        value={courseDetail.CourseName}
        onChange={handleInputChange}
        placeholder="Course Name..."
        variant="outlined"
        inputProps={{ style: { fontSize: 36 } }}
        InputLabelProps={{ style: { fontSize: 40 } }}
      />

      {/* Content */}
      <TextField
        id="content"
        name="Content"
        value={courseDetail.Description?.Description}
        onChange={handleInputChange}
        multiline
        placeholder="Tell your description..."
        minRows={8}
        sx={{
          fontSize: "1.5rem",
          minWidth: "100%",
          minHeight: 200,
        }}
      />
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
        <Link to="/admin/course" style={{ textDecoration: "none" }}>
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

export default CreateCourseDetail;
