import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button, Stack, IconButton, } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

import AddIcon from "../../images/AddIcon.png"
import AdviceIcon from "../../images/AdviceIcon.png"
import homeBg from "../../images/AdviceBG.jpg"

//Interface
import { AdviceInterface } from '../../interfaces/IAdvice';

//api
import { GetAdvice, GetAdviceByCourseService} from '../../services/HttpClientService';
import { CourseServiceInterface } from '../../interfaces/ICourseService';

function ShowAdvice() {
    let navigate = useNavigate();
    const { id } = useParams();
    const uid = localStorage.getItem("uid")
    const [advice, setAdvice] = useState<AdviceInterface[]>([]);
    const [adviceByCourse, setAdviceByCourse] = useState<AdviceInterface[]>([]);
    const [courseService, setCourseService] = useState<CourseServiceInterface[]>([]);

    // const fetchAdvice = async () => {
    //     let res = await GetAdvice();
    //     res && setAdvice(res);
    // }

    const fetchAdviceByCourseService = async (id: string) => {
        let res = await GetAdviceByCourseService(id);
        res && setAdviceByCourse(filterID(res));
    }

    // const fetchAdvice = async () => {
    //     const requestOptions = {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json",
    //         },
    //     };
    //     const res = await (await fetch(`http://localhost:8080/advices`, requestOptions)).json();
    //     console.log(res.data);
    //     setCourseService(filterID(res.data));

    // };

    const filterID = (res: any) => {
        return res.filter((v: any) => v.MemberID === parseInt(id || "")).map((i: any) => i);
    }

    useEffect(() => {
        // fetchAdviceByCourseService();
        // fetchCourseService();
        // fetchAdvice();
    }, []);

    return (
        //ภาพพื้นหลัง
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
                gap: 6,
                height: "100vh",
                width: "100vw",
                backgroundSize: "cover",
                color: "#f5f5f5",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
            }}
        >
            <Container sx={{ margin: "3rem" }}>
                {/* Header */}
                <Stack direction="row" spacing={2}>

                    <Avatar src={AdviceIcon} />

                    <h1>ระบบให้คำแนะนำ</h1>

                    <Avatar src={AdviceIcon} />

                </Stack>

                <h1> </h1>

                {/* ตาราง advice */}
                <TableContainer component={Paper} sx={{ width: "100%", marginRight: 0 }}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell align="center" sx={{ color: "#ec407a" }}>ไอดี</TableCell>
                                <TableCell align="center" sx={{ color: "#4527a0" }}>คำแนะนำ</TableCell>
                                <TableCell align="center" sx={{ color: "#4527a0" }}>Recording Date</TableCell>
                                <TableCell align="center" sx={{ color: "#4527a0" }}>เทรนเนอร์</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody >
                            {adviceByCourse.map((adviceByCourse) => (
                                <TableRow key={adviceByCourse.ID} >
                                    <TableCell align="center">{adviceByCourse.ID}</TableCell>
                                    <TableCell align="left">{String(adviceByCourse.Advice)}</TableCell>
                                    <TableCell align="center">{String(adviceByCourse.RecordingDate).slice(0,10).replaceAll("-",".")}</TableCell>
                                    <TableCell align="center">{String(adviceByCourse.Trainer?.Name)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </Box>
    );
}

export default ShowAdvice;