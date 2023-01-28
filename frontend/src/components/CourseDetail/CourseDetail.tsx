import React, { useState, useEffect } from "react";
import { BlogInterface } from "../../interfaces/IBlog";
import { Button, Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../App.css";

// api
import { GetCourseDetailByID, DeleteCourseDetail } from "../../services/HttpClientService";

import { AdminInterface } from "../../interfaces/IAdmin";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";

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

function CourseDetail() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [adminLogin, setAdminLogin] = useState<AdminInterface>({
        ID: Number(localStorage.getItem("uid")),
    });
    const [courseDetail, setCourseDetail] = useState<CourseDetailInterface>({});
    const [isOpen, setIsOpen] = useState(false);

    const deleteCourseDetail = async () => {
        alert("Are you sure?")
        let res = await DeleteCourseDetail(id + "");
        if (res) {
            window.location.href = "/course_detail"
        }

    }

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
        console.log(id);
    }, [courseDetail.AdminID, adminLogin]);


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

                {/* Course Type */}
                <Typography color={"#252525"} mb={2} fontSize={"1.2rem"} variant="h3">
                    Course Type :{" "}
                    <b style={{ marginLeft: "1rem" }}>{courseDetail.Description?.CourseType}</b>
                </Typography>

                {/* Description */}
                <Typography
                    mt={2}
                    mb={3}
                    fontSize={"1.2rem"}
                    variant="h3"
                    style={{ color: "#252525", wordSpacing: "4px", letterSpacing: "1px" }}
                >
                    {courseDetail.Description?.Description}
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
                            onClick={deleteCourseDetail}
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

export default CourseDetail;
