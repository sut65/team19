import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "../../App.css";

type Props = {
    id: number;
    coverPage: string;
    courseName: string;
    courseType: string;
    goal: string;
    description: string;
    price: number;
    duration: string;
    name: string
};

function CardCourseDetail({
    id,
    coverPage,
    courseName,
    courseType,
    goal,
    description,
    price,
    duration,
    name,
}: Props) {

    return (
        <Card
            sx={{
                maxWidth: 345,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

            }}
            className={courseName}
        >
            <CardMedia
                component="img"
                height="200"
                image={coverPage}
                alt="green soda"
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
                        Admin :
                        <Box
                            sx={{
                                ml: "0.5rem",
                                wordSpacing: "4px",
                                display: "inline-block",
                                fontWeight: "900",
                            }}
                        >
                            {name}
                        </Box>

                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Course Type:{" "}
                        <Box
                            sx={{
                                ml: "0.5rem",
                                display: "inline-block",
                                fontWeight: "900",
                            }}
                        >
                            {courseType}
                        </Box>
                    </Typography>

                    <Typography
                        mb={2}
                        gutterBottom
                        variant="h3"
                        component="div"
                        // color={"#3b82f6"}
                        style={{ textTransform: "capitalize", fontSize: "1.6rem" }}
                    >
                        <b>{courseName}</b>
                    </Typography>
                </Box>

                <Typography
                    sx={{ fontSize: "1.2rem" }}
                    variant="h5"
                    style={{ marginBottom: "0.5rem" }}
                >
                    {description.slice(0, 80)}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Goal:{" "}
                    <Box
                        sx={{
                            ml: "0.5rem",
                            display: "inline-block",
                            fontWeight: "900",
                        }}
                    >
                        {goal}
                    </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Price:{" "}
                    <Box
                        sx={{
                            ml: "0.5rem",
                            display: "inline-block",
                            fontWeight: "900",
                        }}
                    >
                        {price}
                    </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Duration:{" "}
                    <Box
                        sx={{
                            ml: "0.5rem",
                            display: "inline-block",
                            fontWeight: "900",
                        }}
                    >
                        {duration}
                    </Box>
                </Typography>
            </CardContent>

            <Link
                to={`/admin/course_detail/${id}`}
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
                    READ MORE
                </Button>
            </Link>
        </Card>
    );
}

export default CardCourseDetail;
