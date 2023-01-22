import React, { useState, useEffect } from 'react';
// Component
import Box from "@mui/material/Box";
import { Grid, SelectChangeEvent } from "@mui/material";
import CardBlog from './blog/CardBlog';
import { Margin } from "@mui/icons-material";
import { CourseServiceInterface } from "../interfaces/ICourseService";
import { UserInterface } from "../interfaces/IUser";
import { CourseDetailInterface } from '../interfaces/ICourseDetail';
import { TrainerInterface } from '../interfaces/ITrainer';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import '../App.css';
import {
  GetCourseService,
  GetUser,
  GetCourseDetail,
  GetTrainer,
  CreateCourseService,
  CourseServices,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ShowCourseBlog() {
  const [CourseService, setCourseService] = useState<CourseServiceInterface>({});
  const [User, setUser] = useState<UserInterface[]>([]);
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface[]>([]);
  const [Trainer, setTrainer] = useState<TrainerInterface[]>([]);
  const [Agreement, setAgreement] = useState<string>("Disagree")
  const [Status, setStatus] = useState<string>("Ready")

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof CourseService;
    setCourseService({
      ...CourseService,
      [name]: event.target.value,
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const getUser = async () => {
    let res = await GetUser();
    if (res) {
      setUser(res);
    }
  };

  const getCourseDetail = async () => {
    let res = await GetCourseDetail();
    if (res) {
      setCourseDetail(res);
    }
  };

  const getTrainer = async () => {
    let res = await GetTrainer();
    if (res) {
      setTrainer(res);
    }
  };

  useEffect(() => {
    getUser();
    getCourseDetail();
    getTrainer();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function Submit() {
    let data = {
      UserID: convertType(CourseService.UserID),
      CourseDetailID: convertType(CourseService.CourseDetailID),
      TrainerID: convertType(CourseService.TrainerID),
      CRegisterDate: new Date(), // สร้างค่าใหม่เพื่อให้เวลาเป็นปัจจุบันตอนบันทึก
      Agreement,
      Status,
    };

    let res = await CourseServices(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>

      <FormControl fullWidth variant="outlined">
        <Select
          native
          value={CourseService.CourseDetailID + ""}
          onChange={handleChange}
          inputProps={{
            name: "CourseDetailID",
          }}
        >
          <option aria-label="None" value="" style={{color: "grey"}}>
            Course Detail ID
          </option>
          {CourseDetail.map((item: CourseDetailInterface) => (
            <option value={item.ID} key={item.ID}>
              {item.Name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default ShowCourseBlog;
