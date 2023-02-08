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
import { GetCourseDetailByID, DeleteCourseDetail } from "../../services/HttpClientService";

import { AdminInterface } from "../../interfaces/IAdmin";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";

const actions = [
    { icon: <EditIcon />, name: "Edit", color: "#3f50b5" },
    { icon: <DeleteIcon />, name: "Delete", color: "#f44336" },
];

function CourseDetail() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [adminLogin, setAdminLogin] = useState<AdminInterface>({ Name: "" });
    const [courseDetail, setCourseDetail] = useState<CourseDetailInterface>({});
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const handleClickOpenPopup = () => setIsOpenPopup(true);
    const handleClickClosePopup = () => setIsOpenPopup(false);

    const handleOpenAction = () => setOpen(true);
    const handleCloseAction = () => setOpen(false);

    const deleteCourseDetail = async () => {
        let res = await DeleteCourseDetail(id + "");
        if (res) {
            window.location.href = "/admin/course";
        }
    };

    const checkAdmin = () => {
        console.log("course detail admin", courseDetail.AdminID);
        console.log("admin login", adminLogin.ID);
        if (courseDetail.AdminID === adminLogin.ID) {
            console.log("same");
            setIsOpen(!isOpen);
        }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const fetchCourseDetail = async () => {
        let res = await GetCourseDetailByID(convertType(id));
        res && setCourseDetail(res);
    };

    useEffect(() => {
        fetchCourseDetail();
        checkAdmin();
    }, [courseDetail.AdminID, adminLogin]);

    return (
        <div>
            {/* Cover Page */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "360px",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${courseDetail.CoverPage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <Typography color={"#fff"} fontSize={"4rem"} variant="h1">
                    {courseDetail.CourseName}
                </Typography>
            </Box>

            {/* Description */}
            <Box
                sx={{
                    margin: "2rem 8rem",
                }}
            >
                {/* Admin */}
                <Typography color={"#252525"} mb={2} fontSize={"1.2rem"} variant="h3">
                    Admin :{" "}
                    <Box
                        sx={{
                            ml: "1rem",
                            display: "inline",
                            wordSpacing: "12px",
                        }}
                    >
                        <b>{courseDetail.Admin?.Name}</b>
                    </Box>
                </Typography>

                {/* Course type */}
                <Typography color={"#252525"} mb={2} fontSize={"1.2rem"} variant="h3">
                    ประเภทคอร์ส :{" "}
                    <b style={{ marginLeft: "1rem" }}>{courseDetail.CourseType?.TypeName}</b>
                </Typography>

                {/* Description */}
                <Typography
                    mt={2}
                    mb={3}
                    fontSize={"1.2rem"}
                    variant="h3"
                    style={{ color: "#252525", wordSpacing: "4px", letterSpacing: "1px" }}
                >
                    {courseDetail.Description}
                </Typography>
                {/* price */}
                <Typography
                    variant="caption"
                    fontSize={"1rem"}
                    sx={{
                        border: "solid 1px #252525",
                        borderRadius: "1rem",
                        p: "4px 16px",
                        fontWeight: "bold",
                        display: "inline"
                    }}
                >
                    {courseDetail.Price?.Price} บาท
                </Typography>

                {/* duration */}
                <Typography
                        sx={{
                            pl: "16px",
                            fontSize: "1.2rem",
                            display: "inline"
                        }}>
                        ระยะเวลาคอร์ส {courseDetail.Price?.Duration}
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
                                    }}
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={
                                        action.name === "Edit"
                                            ? () => navigate("update-course")
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
                aria-labelledby="alert-dialog-courseName"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-course">
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
                        Are you sure to delete this course?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClosePopup}>Cancel</Button>
                    <Button onClick={deleteCourseDetail}>Sure</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CourseDetail;