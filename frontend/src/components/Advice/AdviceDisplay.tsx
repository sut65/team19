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
import { GetAdvice, updateAdvice, DeleteAdvice , GetAdviceByCourseService} from '../../services/HttpClientService';
import { CourseServiceInterface } from '../../interfaces/ICourseService';

function AdviceDisplay() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [advice, setAdvice] = useState<AdviceInterface[]>([]);
    const [adviceByCourse, setAdviceByCourse] = useState<AdviceInterface[]>([]);
    const [courseService, setCourseService] = useState<CourseServiceInterface[]>([]);
    const [loading, setLoading] = useState(false);

    const deleteAdvice = async (id: any) => {
        
        try{
            setLoading(true)
            const res = await DeleteAdvice(id + "")
            
        }
        catch(e) {
            console.log(e);
        }
        finally {
            setLoading(false)
        }
    }

    const fetchAdvice = async () => {
        let res = await GetAdvice();
        res && setAdvice(res);
    }

    const fetchAdviceByCourseService = async (id: string) => {
        let res = await GetAdviceByCourseService(id);
        res && setAdviceByCourse(res);
    }

    const fetchCourseService = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        const res = await (await fetch(`http://localhost:8080/course_services`, requestOptions)).json();
        console.log(res.data);
        setCourseService(res.data);

    };

    useEffect(() => {
        fetchCourseService();
        fetchAdvice();
    }, [loading]);

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




                {/* ตาราง course service*/}
                <TableContainer component={Paper} sx={{ width: "100%", marginRight: 0, mb: "1rem" }}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell align="center" sx={{ color: "#ec407a" }}>ไอดี</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>รูปภาพ</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>ชื่อ</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>นามสกุล</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>เพศ</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>ประเภทคอร์ส</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>เทรนเนอร์</TableCell>
                                <TableCell align="center" sx={{ color: "#259b24" }}>เพิ่มคำแนะนำ</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody >
                            {courseService.map((courseService) => (
                                <TableRow key={courseService.ID} onClick={() => fetchAdviceByCourseService((courseService.ID)!.toString())}>
                                    <TableCell align="center" >{courseService.ID}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <Avatar src={courseService?.Member?.ProfileUser}
                                                sx={{ width: 110, height: 110 }} />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" >{String(courseService?.Member?.Firstname)}</TableCell>
                                    <TableCell align="center">{String(courseService?.Member?.Lastname)}</TableCell>
                                    <TableCell align="center">{String(courseService?.Member?.Gender?.Name)}</TableCell>
                                    <TableCell align="center">{String(courseService?.CourseDetail?.CourseType?.TypeName)}</TableCell>
                                    <TableCell align="center">{String(courseService?.Trainer?.Name)}</TableCell>
                                    <TableCell align="center">
                                        {/* ปุ่มเพิ่มข้อมูล */}
                                        <IconButton aria-label="delete" size="large" onClick={() => navigate(`/create-advice/${courseService.MemberID}`)} color="info">
                                        <Avatar src={AddIcon} />
                                        </IconButton>
                                    </TableCell>
                                    


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* ตาราง advice */}
                <TableContainer component={Paper} sx={{ width: "100%", marginRight: 0 }}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell align="center" sx={{ color: "#ec407a" }}>ไอดี</TableCell>
                                <TableCell align="center" sx={{ color: "#4527a0" }}>คำแนะนำ</TableCell>
                                <TableCell align="center" sx={{ color: "#4527a0" }}>Recording Date</TableCell>
                                <TableCell align="center" sx={{ color: "#259b24" }}>แก้ไข</TableCell>
                                <TableCell align="center" sx={{ color: "#d01716" }}>ลบ</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody >
                            {adviceByCourse.map((adviceByCourse) => (
                                <TableRow key={adviceByCourse.ID} onClick={() => console.log(adviceByCourse.ID)}>
                                    <TableCell align="center">{adviceByCourse.ID}</TableCell>
                                    <TableCell align="left">{String(adviceByCourse.Advice)}</TableCell>
                                    <TableCell align="center">{String(adviceByCourse.RecordingDate).slice(0,10).replaceAll("-",".")}</TableCell>
                                    <TableCell align="center">
                                        {/* ปุ่มแก้ไขข้อมูล */}
                                        <IconButton aria-label="delete" size="large" onClick={() => navigate(`/update-advice/${adviceByCourse.ID}`)} color="info">
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        {/* ปุ่มลบข้อมูล */}
                                        <IconButton aria-label="delete" size="large" onClick={() => deleteAdvice} color="error">
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </Box>
    );
}

export default AdviceDisplay;