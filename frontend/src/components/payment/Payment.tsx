import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { PaymentInterface } from "../../interfaces/IPayment";
import { GetPayment, CreatePayment, GetCourseServiceBYUID, GetCourseDetailByID, GetDuration, GetDiscountByCode, GetDurationByID } from "../../services/HttpClientService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CourseServiceInterface } from "../../interfaces/ICourseService";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { DurationInterface } from "../../interfaces/IDuration";
import { DiscountInterface } from "../../interfaces/IDiscount";
import Clock from "react-live-clock";
import QRCode from "../../images/qr-code.png";

const apiUrl = `http://localhost:8080`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Payment() {
  const [Payment, setPayment] = useState<PaymentInterface>({
    PaymentDate: new Date(),
  });
  const [CourseService, setCourseService] = useState<CourseServiceInterface>();
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>({});
  const [Duration, setDuration] = useState<DurationInterface[]>([]);
  const [Discount, setDiscount] = useState<DiscountInterface>();
  const [ShowDurationPercentage, setShowDurationPercentage] = useState<number>(0);
  const [NumberOfDays, setNumberOfDays] = useState<number>(0);
  const [Balance, setBalance] = useState<number>(0);
  let SumaryBalance = 0;
  let CourseDuration: string;
  const [Code, setCode] = useState<string>();
  const [ShowCodePercentage, setShowCodePercentage] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({ name: "", src: "" });
  const [message, setAlertMessage] = React.useState("");
  // const [DisButton, setDisButton] = useState(false);

  const UFirstName = localStorage.getItem("firstname") + "";
  const ULastName = localStorage.getItem("lastname") + "";
  const UserName = UFirstName + " " + ULastName;
  const NowDate = Date.now()

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Payment;
    setPayment({
      ...Payment,
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

    if (success === true) {
      navigate(`/user`);
    }
  };

  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof Payment;

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "Slip") {
        setPayment({ ...Payment, [name]: dataURL?.toString() });
      }
    };

    if (Payment.Slip !== "") {
      // setDisButton(true);
    }
  };

  const getCourseServiceBYUID = async () => {
    let res = await GetCourseServiceBYUID();
    if (res) {
      setCourseService(res);
    }
  };

  const getCourseDetailByID = async () => {
    let res = await GetCourseDetailByID(CourseService?.CourseDetailID);
    if (res) {
      setCourseDetail(res);
    }
  };

  const getDuration = async () => {
    let res = await GetDuration();
    if (res) {
      setDuration(res);
    }
  };

  const getDurationByID = async () => {
    let res = await GetDurationByID(Payment.DurationID);
    if (res) {
      setShowDurationPercentage(res.DurationPercentage);
      setNumberOfDays(res.NumberOfDays);
    }
  };

  const getDiscountCode = async () => {
    let res = await GetDiscountByCode(Code);
    if (res) {
      setDiscount(res);
      if (res.DiscountCode === Code) {
        setShowCodePercentage(res.DiscountPercentage);
      } else {
        setShowCodePercentage(0);
      }
      // Validation if not has code in database > it will set to NOCODE
    } else {
      setCode("NOCODE");
    }
  };

  useEffect(() => {
    getCourseServiceBYUID();
    getDuration();
  }, []);

  useEffect(() => {
    getCourseDetailByID();
  }, [CourseService]);

  useEffect(() => {
    getDurationByID();
  }, [Payment.DurationID]);

  useEffect(() => {
    getDiscountCode();
  }, [Code]);

  useEffect(() => {
    CourseDuration = convertType(CourseDetail.Price?.Duration) + "";
    CalBalance(
      Number(CourseDetail.Price?.Price),
      parseInt(CourseDuration),
      ShowCodePercentage,
      ShowDurationPercentage,
      NumberOfDays
    );
  }, [Payment.DurationID, NumberOfDays, CourseDetail.Price?.Price, ShowCodePercentage]);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function CalBalance(
    Price: number,
    Duration: number,
    ShowCodePercentage: number,
    ShowDurationPercentage: number,
    NumberOfDays: number
  ) {
    SumaryBalance = ((Price / Duration) * NumberOfDays) * (1 - (ShowCodePercentage + ShowDurationPercentage) / 100);
    SumaryBalance = parseInt((Math.ceil(SumaryBalance * 100) / 100).toFixed(2));
    if (Number.isNaN(Balance)) {
      setBalance(Number(CourseDetail.Price?.Price));
    } else {
      setBalance(SumaryBalance);
    }
  }

  async function Submit() {
    let data = {
      PaymentDate: Payment.PaymentDate,
      Slip: Payment.Slip,
      Balance: Balance,
      CourseServiceID: convertType(CourseService?.ID),
      DurationID: convertType(Payment.DurationID),
      DiscountID: convertType(Discount?.ID),
    };
    let res = await CreatePayment(data);
    if (res.status) {
      setSuccess(true);
      setAlertMessage("Paid successful");
    } else {
      setError(true);
      setAlertMessage(res.message);
    }
    console.log(Payment.Slip)
  }

  return (
    <div>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          margin: "3rem 16% 0 10%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            height: "100%",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={CourseService?.CourseDetail?.CoverPage}
            alt="green iguana"
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "0.5rem",
              }}
            >
              <Typography
                mb={2}
                gutterBottom
                variant="h3"
                component="div"
                // color={"#3b82f6"}
                style={{ textTransform: "capitalize", fontSize: "1.6rem" }}
              >
                <b>{CourseService?.CourseDetail?.CourseName}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Category: {CourseDetail?.Description?.CourseType}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              style={{ marginBottom: "3rem", marginTop: "0.5rem" }}
            >
              {CourseDetail.Description?.Description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
                {CourseDetail.Price?.Price} บาท
              </Typography>
              <Typography
                sx={{
                  pl: "16px",
                  fontSize: "0.9rem",
                }}
              >
                ระยะเวลาคอร์ส {CourseDetail.Price?.Duration}
              </Typography>
            </Box>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "16px 14px 16px 14px",
            }}
          >
            <Link
              to={`/articles`} // รอแก้เป็นรีวิว
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                className="btn-user"
                variant="contained"
                style={{
                  color: "#fff",
                  borderRadius: 20,
                  backgroundColor: "#576F72",
                  padding: "6px 28px",
                  fontSize: "16px",
                }}
              >
                Read review
              </Button>
            </Link>
          </Box>
        </Card>

        <Box sx={{ fontSize: "1.5rem", width: "55%" }}>
          <Grid
            container
            spacing={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              sx={{ marginLeft: "20%", fontWeight: "bold", display: "flex" }}
            >
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  style={{
                    color: "#fff",
                    borderRadius: 40,
                    backgroundColor: "#384648",
                    padding: "10px 40px",
                    fontSize: "2rem",
                  }}
                >
                  Payment
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ textAlign: "right", alignSelf: "flex-end" }}
              >
                <Clock
                  format={"ddd, MM-DD-YYYY HH:mm:ss"}
                  ticking={true}
                  timezone={"Asia/bangkok"}
                  style={{ fontWeight: "normal", fontSize: "1rem" }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ marginLeft: "10%", marginRight: "-10%" }}>
              <Divider></Divider>
            </Grid>

            <Grid item xs={6} sx={{ textAlign: "right", fontWeight: "bold" }}>
              Member
            </Grid>
            <Grid item xs={6}>
              {UserName}
            </Grid>

            <Grid item xs={6} sx={{ textAlign: "right", fontWeight: "bold" }}>
              Date
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={Payment.PaymentDate}
                    onChange={(newValue) => {
                      setPayment({
                        ...CourseService,
                        PaymentDate: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={new Date(NowDate)}
                    maxDate={new Date(NowDate)}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ textAlign: "right", fontWeight: "bold" }}>
              Duration
            </Grid>
            <Grid item xs={4.5}>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={Payment.DurationID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "DurationID",
                  }}
                  color="success"
                >
                  <option aria-label="None" value="" style={{color: "grey"}}>
                    Please select duration
                  </option>
                  {Duration.map((item: DurationInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.NumberOfDays}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              Days
            </Grid>

            <Grid item xs={6} sx={{ textAlign: "right", fontWeight: "bold" }}>
              Discount Code
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="Warter_Bill"
                defaultValue=""
                type="string"
                variant="outlined"
                autoComplete="off"
                color="success"
                onChange={(event) => setCode(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <img style={{ width: "50%" }} src={QRCode} alt="logo" />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ fontSize: "1rem" }}>
              <Divider></Divider>
              <Grid item xs={12}>
                Course {">"} {CourseDetail.Price?.Price} baht
              </Grid>

              <Grid item xs={12}>
                Discount {">"} Duration {ShowDurationPercentage} % + Code{" "}
                {ShowCodePercentage} % ={" "}
                {ShowDurationPercentage + ShowCodePercentage} %
              </Grid>

              <Grid
                item
                xs={12}
                style={{ fontWeight: "bold", fontSize: "1.4rem" }}
              >
                <Button
                  variant="contained"
                  component="label"
                  className="btn-user"
                  style={{
                    color: "#fff",
                    borderRadius: 20,
                    backgroundColor: "#384648",
                    padding: "6px 28px",
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                >
                  Balance {">"} {Balance} baht
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <br></br>
              <Grid item xs={12} sx={{ fontWeight: "bold" }}>
                <Grid item xs={12} sx={{ paddingBottom: "10px" }}>
                  <u style={{ fontStyle: "italic", paddingLeft: "12px" }}>
                    {image.name}
                  </u>
                </Grid>
                <Box>
                  <Button
                    variant="contained"
                    component="label"
                    className="btn-user"
                    style={{
                      color: "#384648",
                      borderRadius: 20,
                      backgroundColor: "#D3E4CD",
                      padding: "6px 28px",
                    }}
                  >
                    Upload
                    <input
                      id="Slip"
                      name="Slip"
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleChangeImages}
                    />
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={11}></Grid>
            <Grid item xs={1} sx={{ alignItems: "center" }}>
              <Button
                className="btn-user"
                variant="contained"
                style={{
                  color: "#384648",
                  borderRadius: 20,
                  backgroundColor: "#D3E4CD",
                  padding: "6px 28px",
                }}
                onClick={Submit}
                // disabled={!DisButton}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Payment;
