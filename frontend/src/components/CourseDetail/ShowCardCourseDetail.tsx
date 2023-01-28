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

// api
import { GetCourseDetail } from "../../services/HttpClientService";
import { GetDescription } from "../../services/HttpClientService";

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
                maxWidth: "1024px",
                margin: "5rem auto",
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
                    to="/admin/create"
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
                            padding: "4px 8px",
                            fontSize: "1.5rem",
                        }}
                        startIcon={<CreateIcon />}
                        className="btn-user"
                        variant="outlined"
                    >
                        Write
                    </ButtonWrite>
                </Link>
            </Box>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {courseDetail.map((item) => {
                    return (
                        <Grid item xs={6} sm={4} md={4} key={item.ID}>
                            <CardCourseDetail
                                id={item.ID!}
                                coverPage={item.CoverPage!}
                                courseName={item.CourseName!}
                                courseType={item.Description?.CourseType!}
                                goal={item?.Description?.Goal!}
                                description={item?.Description?.Description!}
                                price={item?.Price?.Price!}
                                duration={item?.Price?.Duration!}
                                name={item?.Admin?.Name!}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default ShowCardCourseDetail;
