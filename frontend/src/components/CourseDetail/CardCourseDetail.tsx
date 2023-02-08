import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../../App.css";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { GetCourseDetail } from "../../services/HttpClientService";

function CardCourseDetail({
    ID,
    CourseName,
    CoverPage,
    Description,
    Price,
    Admin,
}: CourseDetailInterface) {
    const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface[]>([])
    const navigate = useNavigate();

    const getCourseDetail = async () => {
        let res = await GetCourseDetail();
        if (res) {
            setCourseDetail(res);
        }
    };

    useEffect(() => {
        getCourseDetail();
    }, []);

    return (

        <Card
            sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                maxWidth: 345,
                height: "100%",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            className={CourseName}
        >
            <CardMedia
                component="img"
                height="300"
                image={CoverPage}
                alt="green iguana"
            />
            <CardContent>
                <Box
                    sx={
                        {
                            // display: "flex",
                            // justifyContent: "space-between",
                        }
                    }
                >
                    <Typography
                        sx={{
                            color: "#6b7280",
                        }}
                        gutterBottom
                        variant="caption"
                        component="div"
                        style={{ fontSize: "1rem" }}
                    >
                        Admin:
                        <Box
                            sx={{
                                ml: "0.5rem",
                                wordSpacing: "4px",
                                display: "inline-block",
                                fontWeight: "900",
                            }}
                        >
                            {Admin?.Name}
                        </Box>
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        ประเภทคอร์ส: {Description?.CourseType}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        เป้าหมาย: {Description?.Goal}
                    </Typography>

                    <Typography
                        mb={2}
                        gutterBottom
                        variant="h3"
                        component="div"
                        // color={"#3b82f6"}
                        style={{ textTransform: "capitalize", fontSize: "1.6rem" }}
                    >
                        <b>{CourseName}</b>
                    </Typography>
                </Box>

                <Typography
                    sx={{ fontSize: "1.2rem" }}
                    variant="h5"
                    style={{ marginBottom: "2rem" }}
                >
                    {Description?.Description.slice(0, 100)}
                </Typography>

            </CardContent>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: "16px" }}>
                    <Typography
                        variant="caption"
                        fontSize={"1rem"}
                        sx={{
                            border: "solid 1px #252525",
                            borderRadius: "1rem",
                            p: "4px 16px",
                            fontWeight: "bold",
                        }}
                    >
                        {Price?.Price} บาท
                    </Typography>
                    <Typography
                        sx={{
                            pl: "16px",
                            fontSize: "0.9rem"
                        }}>
                        ระยะเวลาคอร์ส {Price?.Duration}
                    </Typography>
                </Box>
                <Link
                    to={`/admin/course_detail/${ID}`}
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <Button
                        className="btn-user"
                        variant="contained"
                        style={{
                            margin: "0 0 16px 14px",
                            color: "#fff",
                            borderRadius: 20,
                            backgroundColor: "#3b82f6",
                            padding: "8px 16px",
                            fontSize: "12px",
                        }}
                    >
                        Read More
                    </Button>
                </Link>
            </div>

        </Card>
    );
}

export default CardCourseDetail;
