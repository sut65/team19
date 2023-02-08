import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import {
  TextField,
  SelectChangeEvent,
  Button,
  styled,
  Select,
  Box,
  Stack,
  Paper,
  Typography,
  Snackbar,
} from '@mui/material';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Interface
import { FoodTypeInterface } from '../../interfaces/IFoodType';
import { MainIngredientInterface } from '../../interfaces/IMainIngredient';
import { AdminInterface } from '../../interfaces/IAdmin';
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';

//API
import {
  GetFoodTypes,
  GetMainIngredients,
  UpdateFoodInformation,
  GetAdminByID,
  GetFoodInformationByID,
} from '../../services/HttpClientService';

const ImgBox = styled(Box)({
  width: "280px",
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateFood() {
  const { id } = useParams();
  const [foodinformation, setFoodInformation] = useState<FoodInformationInterface>({});
  const [foodtypes, setFoodTypes] = useState<FoodTypeInterface[]>([]);
  const [mainingredients, setMainIngredients] = useState<MainIngredientInterface[]>([]);
  const [datetime, setDatetime] = useState<Date | string | null>(new Date());
  const [admin, setAdmin] = useState<AdminInterface>({ Name: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({ name: "", src: "" });
  const [message, setAlertMessage] = React.useState("");

  console.log(datetime)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setFoodInformation({ ...foodinformation, [name]: e.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof foodinformation;
    setFoodInformation({
      ...foodinformation,
      [name]: event.target.value,
    });
  };

  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof foodinformation;

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "Image") {
        setFoodInformation({ ...foodinformation, [name]: dataURL?.toString() });
      }
    };
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //FetchAPI
  const fetchFoodTypes = async () => {
    let res = await GetFoodTypes();
    res && setFoodTypes(res);
  };

  const fetchMainIngredients = async () => {
    let res = await GetMainIngredients();
    res && setMainIngredients(res);
  };

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    foodinformation.AdminID = res.ID;
    if (res) {
      console.log(res)
      setAdmin(res);
    }
  };

  const fetchFoodInformation = async () => {
    let res = await GetFoodInformationByID(id + "");
    res && setFoodInformation(res);
  };

  // อัปเดตข้อมูลเข้า Database
  const submit = async () => {
    let newdata = {
      ID: convertType(id),
      FoodTypeID: convertType(foodinformation.FoodTypeID),
      MainIngredientID: convertType(foodinformation.MainIngredientID),
      AdminID: convertType(foodinformation.AdminID),
      Image: foodinformation.Image,
      Name: foodinformation.Name,
      Datetime: datetime?.toLocaleString(),
    };

    let res = await UpdateFoodInformation(newdata);
    if (res.status) {
      setSuccess(true);
      setAlertMessage("อัปเตดข้อมูลอาหารสำเร็จ");
      window.location.href = "/admin/food-display"
    } else {
      setError(true);
      setAlertMessage(res.message);
    }
    console.log(JSON.stringify(newdata))
  };

  useEffect(() => {
    fetchFoodTypes();
    fetchMainIngredients();
    fetchAdminByID();
    return (() => {
      fetchFoodInformation()
    })

  }, []);

  return (
    <Container sx={{ height: "100vh" }}>

      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      <h1>แก้ไขข้อมูลอาหาร</h1>

      <h1> </h1>

      <Stack direction="row" spacing={2}>

        {/* ชื่ออาหาร*/}
        <Typography variant="h2" component="h1">
          ชื่ออาหาร :
        </Typography>
        <TextField
          id="name"
          name="Name"
          value={foodinformation.Name}
          onChange={handleInputChange}
          placeholder="กรอกชื่ออาหาร"
        />

        {/* วัตถุดิบหลัก*/}
        <Typography variant="h2" component="h1">
          วัตถุดิบ :
        </Typography>
        <Box
          sx={{
            width: "25%",
          }}
        >
          <Select
            native
            fullWidth
            id="main_ingredient"
            value={foodinformation.MainIngredientID + ""}
            onChange={handleSelectChange}
            inputProps={{
              name: "MainIngredientID",
            }}
          >
            <option aria-label="None" value="">
              เลือกวัตถุดิบหลัก
            </option>
            {mainingredients.map((item: MainIngredientInterface) => (
              <option key={item.ID} value={item.ID}>
                {item.Name}
              </option>
            ))}
          </Select>
        </Box>

        {/* ประเภทอาหาร*/}
        <Typography variant="h2" component="h1">
          ประเภท :
        </Typography>
        <Box
          sx={{
            width: "30%",
          }}
        >
          <Select
            native
            fullWidth
            id="food_type"
            value={foodinformation.FoodTypeID + ""}
            onChange={handleSelectChange}
            inputProps={{
              name: "FoodTypeID",
            }}
          >
            <option aria-label="None" value="">
              เลือกประเภทของอาหาร
            </option>
            {foodtypes.map((item: FoodTypeInterface) => (
              <option key={item.ID} value={item.ID}>
                {item.Name}
              </option>
            ))}
          </Select>
        </Box>

      </Stack>

      <h1> </h1>

      <Stack direction="row" spacing={2}>

        {/* เลือกวันเวลาที่เพิ่ม*/}
        <Typography variant="h2" component="h1">
          วันเวลาที่ทำการเพิ่ม :
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: "2rem",
          }}>
          <Box
            sx={{
              width: "300px"
            }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField
                  required
                  fullWidth
                  {...props} />}
                label="เลือกวันเวลาในการแก้ไขข้อมูลอาหาร"
                readOnly
                value={datetime}
                onChange={(newValue) => {
                  setDatetime(newValue);
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>



        {/* Admin ถูก Lock เป็น Disable*/}
        <Typography variant="h2" component="h1">
          ผู้ดูแลที่ทำการเพิ่ม :
        </Typography>
        <Box sx={{ width: "30%" }}>
          <TextField
            fullWidth
            disabled
            id="admin"
            label="ผู้ดูแล"
            value={admin.Name}
          />
        </Box>

        {/* ปุ่มอัพโหลดรูปภาพ*/}
        <Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              left: "0",
              backgroundColor: "#f2f2f2",
              color: "#252525",
            }}
          >
            อัพโหลดรูปภาพ
            <input
              id="image"
              name="Image"
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleChangeImages}
            />
          </Button>
        </Box>

      </Stack>

      <h1> </h1>

      <Stack direction="row" spacing={2}>

        <Paper>
          <h1> </h1>
          <ImgBox>
            <img src={foodinformation.Image} style={{ width: "100%" }} />
          </ImgBox>
          <h1> </h1>
        </Paper>

      </Stack>

      <Box>
        <h2> </h2>
      </Box>

      <Stack direction="row" spacing={2}>

      </Stack>

      <Box>
        <h2> </h2>
      </Box>

      <Stack direction="row" spacing={2}>

        <Button variant="outlined" color="success" onClick={submit}
          sx={{ borderRadius: 20 }}>
          อัปเดตข้อมูลอาหาร
        </Button>

        <Link
          to="/admin/food-display"
          style={{
            textDecoration: "none",
          }}
        >
          <Button variant="outlined" color="secondary"
            sx={{ borderRadius: 20 }}>
            ย้อนกลับ
          </Button>
        </Link>

      </Stack>
    </Container>
  );
}

export default UpdateFood;