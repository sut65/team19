import React, { useState, useEffect } from "react";
import { BlogInterface } from "../../interfaces/IBlog";
import { Button, Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../App.css";

// api
import { GetBlogByID, DeleteBlog } from "../../services/HttpClientService";

import { UserInterface } from "../../interfaces/IUser";

// Style
const ButtonEdit = styled(Button)({
  backgroundColor: "#252525",
  "&:hover": {
    color: "#252525",
    backgroundColor: "#fff",
    border: "#252525 1px solid",
  },
});

const ButtonDelete = styled(Button)({
  backgroundColor: "#DC0000",
  "&:hover": {
    color: "#252525",
    backgroundColor: "#fff",
    border: "#252525 1px solid",
  },
});

function Article() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [memberLogin, setMemberLogin] = useState<UserInterface>({
    ID: Number(localStorage.getItem("uid")),
  });
  const [article, setArticle] = useState<BlogInterface>({});
  const [isOpen, setIsOpen] = useState(false);

  const deleteArticle = async () => {
    alert("Are you sure?")
    let res = await DeleteBlog(id+"");
    if (res) {
      window.location.href = "/articles"
    }

  }

  const checkMember = () => {
    console.log("article member", article.MemberID);
    console.log("member login", memberLogin.ID);
    if (article.MemberID === memberLogin.ID) {
      console.log("same");
      setIsOpen(!isOpen);
    }
  };

  const fetchArticle = async () => {
    let res = await GetBlogByID(id + "");
    res && setArticle(res);
  };
  
  useEffect(() => {
    fetchArticle();
    checkMember();
  }, [article.MemberID, memberLogin]);


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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${article.CoverImage})`,
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
          Category :{" "}
          <b style={{ marginLeft: "1rem" }}>{article.Category?.Name}</b>
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

      {/* Button */}
      {isOpen && (
        <>
        {/* Btn Edit */}
        <Box
          sx={{
            // mt: "5rem",
            display: "flex",
            justifyContent: "flex-end",
            mr: 12,
          }}
        >
          <ButtonEdit
            onClick={() => navigate("update-article")}
            sx={{
              width: "120px",
              margin: "0 0 16px 14px",
              color: "#fff",
              borderRadius: 20,
              padding: "4px 8px",
              fontSize: "1.5rem",
            }}
            // startIcon={<CreateIcon />}
            className="btn-user"
            variant="outlined"
          >
            Edit
          </ButtonEdit>
        </Box>

        {/* Btn Delete */}
        <Box
          sx={{
            // mt: "5rem",
            display: "flex",
            justifyContent: "flex-end",
            mr: 12,
          }}
        >
          <ButtonDelete
            onClick={deleteArticle}
            sx={{
              width: "120px",
              margin: "0 0 16px 14px",
              color: "#fff",
              borderRadius: 20,
              padding: "4px 8px",
              fontSize: "1.5rem",
            }}
            // startIcon={<CreateIcon />}
            className="btn-user"
            variant="outlined"
          >
            Delete
          </ButtonDelete>
        </Box>
        </>
      )}
    </div>
  );
}

export default Article;
