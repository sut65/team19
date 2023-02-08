import React, { useState, useEffect } from "react";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { Description } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
// Component
import Box from "@mui/material/Box";
import { Button, Grid, styled } from "@mui/material";
import CardCourseDetail from "./CardCourseDetail";
import "../../App.css";

import homeBg from "../../images/CourseBG.jpg" 

// api
import { GetCourseDetail } from "../../services/HttpClientService";
import { GetCourseType } from "../../services/HttpClientService";

// Style
const ButtonWrite = styled(Button)({
    backgroundColor: "#252525",
    "&:hover": {
        color: "#252525",
        backgroundColor: "#fff",
        border: "#252525 1px solid"
    }
})

function ShowCardCourseDetail() {
    const [courseDetail, setCourseDetail] = useState<CourseDetailInterface[]>([]);

    const fetchCourseDetail = async () => {
        let res = await GetCourseDetail();
        res && setCourseDetail(res);
    };

    useEffect(() => {
        fetchCourseDetail();
    }, []);

    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            flexFlow: "",
            overflow: "auto",
            alignItems: "center",
            gap: 6,
            height: "calc(100vh - 15px)",
            width: "100%",
            backgroundSize: "cover",
            color: "#f5f5f5",
            //backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)))`,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
          }}>
            <Box
                sx={{
                    maxWidth: "1024px",
                    margin: "2rem auto 10rem", 
                }}
            >
                {/* Button Write */}
                <Box
                    sx={{
                        // mt: "5rem",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Link
                        to="/admin/create-course"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <ButtonWrite
                            sx={{
                                width: "150px",
                                margin: "0 0 16px 14px",
                                color: "#fff",
                                borderRadius: 20,
                                padding: "4px 8px",
                                fontSize: "1.5rem",
                            }}
                            startIcon={<CreateIcon />}
                            className="btn-user"
                            variant="outlined"
                        >
                            เพิ่มคอร์ส
                        </ButtonWrite>
                    </Link>
                </Box>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {courseDetail.map((item) => {
                        return (
                            <Grid item xs={6} sm={4} md={4} key={item.ID}>
                                <CardCourseDetail
                                    ID={item.ID}
                                    CourseName={item.CourseName}
                                    CoverPage={item.CoverPage}
                                    Description={item.Description}
                                    Goal={item.Goal}
                                    CourseTypeID={item.CourseTypeID}
                                    CourseType={item.CourseType}
                                    AdminID={item.AdminID}
                                    Admin={item.Admin}
                                    PriceID={item.PriceID}
                                    Price={item.Price}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box >
        </Box>
    );
}

export default ShowCardCourseDetail;