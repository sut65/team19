import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useNavigate } from "react-router-dom";
import { MemberInterface } from "../../interfaces/IMember";

// api
import { DeleteReview, GetMemberByID } from "../../services/HttpClientService";

type Props = {
  idCourse: number;
  id: number;
  image: string;
  content: string;
  rankName: string;
  rating: number;
  courseName: string;
  memberID: number;
  firstName: string;
  lastName: string;
};

// style
const BoxAuthor = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "1.5rem",
  position: "relative",
});

const options = [
  { icon: <EditIcon />, label: "Edit", color: "#3f50b5" },
  { icon: <DeleteIcon />, label: "Delete", color: "#f44336" },
];

function ReviewCard({
  idCourse,
  id,
  image,
  content,
  rankName,
  rating,
  courseName,
  memberID,
  firstName,
  lastName,
}: Props) {
  const navigate = useNavigate();
  const [memberLogin, setMemberLogin] = useState<MemberInterface>({
    ID: Number(localStorage.getItem("uid")),
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleClickOpenPopup = () => setIsOpenPopup(true);
  const handleClickClosePopup = () => setIsOpenPopup(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkMemberLogin = () => {
    if (memberID === memberLogin.ID) {
      console.log("same");
      setIsShow(!isShow);
    }
  };

  const deleteReview = async () => {
    let res = await DeleteReview(id + "");
    if (res) {
      window.location.href = `/user/reviews/${idCourse}`;
    }
  };

  const fetchMemberByID = async () => {
    let res = await GetMemberByID();
    res && setMemberLogin(res);
  };

  useEffect(() => {
    checkMemberLogin();
    fetchMemberByID();
  }, []);

  return (
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
          src={memberLogin.ProfileUser}
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
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Rating name="simple-controlled" value={rating} readOnly />
            <Typography sx={{ wordSpacing: "4px", opacity: "0.6" }}>
              {rankName}
            </Typography>
          </Box>
          <Typography sx={{ wordSpacing: "4px" }}>
            course: {courseName}
          </Typography>
        </Box>
        {/* Edit, Delete */}
        {isShow && (
          <>
            <IconButton
              sx={{ position: "absolute", right: -32 }}
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  // maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option, idx) => (
                <MenuItem
                  sx={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    color: `${option.color}`,
                  }}
                  key={idx}
                  selected={option.label === "Pyxis"}
                  onClick={
                    option.label === "Edit"
                      ? () => navigate(`update-review/${id}`)
                      : handleClickOpenPopup
                  }
                >
                  {option.label} {option.icon}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
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
            Delete Review {<PriorityHighIcon fontSize="large" />}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this review (id: {id})?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClosePopup}>Cancel</Button>
          <Button onClick={deleteReview}>Sure</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ReviewCard;
