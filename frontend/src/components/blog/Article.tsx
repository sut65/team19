import React, { useState, useEffect } from "react";
import { BlogInterface } from "../../interfaces/IBlog";
import {
  Button,
  Typography,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";

// api
import { GetBlogByID, DeleteBlog } from "../../services/HttpClientService";

import { MemberInterface } from "../../interfaces/IMember";

const actions = [
  { icon: <EditIcon />, name: "Edit", color: "#3f50b5" },
  { icon: <DeleteIcon />, name: "Delete", color: "#f44336" },
];

function Article() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [memberLogin, setMemberLogin] = useState<MemberInterface>({
    ID: Number(localStorage.getItem("uid")),
  });
  const [article, setArticle] = useState<BlogInterface>({});
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleClickOpenPopup = () => setIsOpenPopup(true);
  const handleClickClosePopup = () => setIsOpenPopup(false);

  const handleOpenAction = () => setOpen(true);
  const handleCloseAction = () => setOpen(false);

  const deleteArticle = async () => {
    let res = await DeleteBlog(id + "");
    if (res) {
      window.location.href = "/user/articles";
    }
  };

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
          <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{ position: "absolute", bottom: 20, right: 16 }}
              icon={<SpeedDialIcon />}
              onClose={handleCloseAction}
              onOpen={handleOpenAction}
              open={open}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  sx={{
                    color: `${action.color}`,
                    width: "55px",
                    height: "55px"
                  }}
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={
                    action.name === "Edit"
                      ? () => navigate("update-article")
                      : handleClickOpenPopup
                  }
                />
              ))}
            </SpeedDial>
          </Box>
        </>
      )}
      {/* Popup */}
      <Dialog
        open={isOpenPopup}
        onClose={handleClickClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#e65100",
              fontSize: "2rem",
            }}
          >
            Delete Article {<PriorityHighIcon fontSize="large" />}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClosePopup}>Cancel</Button>
          <Button onClick={deleteArticle}>Sure</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Article;