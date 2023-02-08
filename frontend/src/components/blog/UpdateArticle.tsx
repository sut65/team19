import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  styled,
  SelectChangeEvent,
  Box,
  Snackbar,
} from "@mui/material";
// import { Box } from "@mui/system";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { MemberInterface } from "../../interfaces/IMember";
import { CategoryInterface } from "../../interfaces/ICategory";
import { TagInterface } from "../../interfaces/ITag";
import { BlogInterface } from "../../interfaces/IBlog";

// api
import {
  GetCategories,
  GetTags,
  GetBlogByID,
  UpdateBlog,
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

function UpdateArticle() {
  const date = new Date();
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogInterface>({});
  // const [member, setMember] = useState<UserInterface>({ID: Number(localStorage.getItem("uid"))})
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [tags, setTags] = useState<TagInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({ name: "", src: "" });
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

    success && navigate("/user/articles");
  };

  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof article;

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "CoverImage") {
        setArticle({ ...article, [name]: dataURL?.toString() });
      }
    };
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof article;
    setArticle({
      ...article,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setArticle({ ...article, [name]: e.target.value });
  };

  const fetchCategories = async () => {
    let res = await GetCategories();
    res && setCategories(res);
  };

  const fetchTags = async () => {
    let res = await GetTags();
    res && setTags(res);
  };

  const fetchArticle = async () => {
    let res = await GetBlogByID(id + "");
    res && setArticle(res);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  // insert data to db
  const submit = async () => {
    let newData = {
      ID: convertType(article.ID),
      CategoryID: convertType(article.CategoryID),
      TagID: convertType(article.TagID),
      MemberID: Number(localStorage.getItem("uid")),
      CoverImage: article.CoverImage,
      Title: article.Title,
      Content: article.Content,
    };

    let res = await UpdateBlog(newData);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
    return () => {
      fetchArticle();
    };
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
        mt: "3rem",
        gap: "1rem",
        mb: "2rem",
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
        <img
          src={article.CoverImage}
          alt={image.name}
          style={{ width: "100%" }}
        />
      </ImgBox>

      {/* Title */}
      <TextField
        sx={{
          "& fieldset": { border: "none" },
          marginTop: "1.8rem",
          width: "100%",
        }}
        id="title"
        name="Title"
        value={article.Title}
        onChange={handleInputChange}
        placeholder="Title..."
        variant="outlined"
        inputProps={{ style: { fontSize: 36 } }}
        InputLabelProps={{ style: { fontSize: 40 } }}
      />
      {/* Category and Tag */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "2rem",
          flexGrow: 1,
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Select
            native
            fullWidth
            id="category"
            value={article.CategoryID + ""}
            onChange={handleSelectChange}
            inputProps={{
              name: "CategoryID",
            }}
          >
            <option aria-label="None" value="">
              Category
            </option>
            {categories.map((item: CategoryInterface) => (
              <option key={item.ID} value={item.ID}>
                {item.Name}
              </option>
            ))}
          </Select>
        </Box>

        {/* Tag */}
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Select
            native
            fullWidth
            id="tag"
            value={article.TagID + ""}
            onChange={handleSelectChange}
            inputProps={{
              name: "TagID",
            }}
          >
            <option aria-label="None" value="">
              Tag
            </option>
            {tags.map((item: TagInterface) => (
              <option key={item.ID} value={item.ID}>
                {item.Name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Content */}
      <TextField
        id="content"
        name="Content"
        value={article.Content}
        onChange={handleInputChange}
        multiline
        placeholder="Tell your story..."
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
          Update
        </Button>
        <Link to="/user/articles" style={{ textDecoration: "none" }}>
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

export default UpdateArticle;
