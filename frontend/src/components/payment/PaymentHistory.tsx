import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Select } from "@mui/material";
import { Divider } from "@mui/material";
import "../../App.css";
import { PaymentInterface } from "../../interfaces/IPayment";
import { GetPaymentByID, GetPaymentByUID, GetCourseDetailByID } from "../../services/HttpClientService";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import CardMedia from "@mui/material/CardMedia";
import BG from "../../images/bg-payment-history.jpg";
import { Typography } from "@mui/joy";

function PaymentHistory() {
  const [Payment, setPayment] = useState<PaymentInterface[]>([])
  const [PaymentByID, setPaymentByID] = useState<PaymentInterface>()
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>({})
  const [ID, setID] = useState<string>()
  const [ShowDurationPercentage, setShowDurationPercentage] = useState<number>(0);
  const [ShowCodePercentage, setShowCodePercentage] = useState<number>(0);
  let TempDate, TempTimeAndZone: any, TempSecondAndZone,  TempHour, TempMinute, TempSecond
  const [PDate, setPDate] = useState<string>()
  const [Hour, setHour] = useState<string>()
  const [Minute, setMinute] = useState<string>()
  const [Second, setSecond] = useState<string>()
  const [Balance, setBalance] = useState<number>(0);
  const [NumberOfDays, setNumberOfDays] = useState<number>(0);
  let SumaryBalance = 0;
  let CourseDuration: string | undefined;
  const uid = localStorage.getItem("uid")
  const UFirstName = localStorage.getItem("firstname") + ""
  const ULastName = localStorage.getItem("lastname") + ""
  const UserName = UFirstName + " " + ULastName

  // function formatDate(date: string){
  //   var options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   return new Date(date).toLocaleDateString([],options);
  // }

  const getPaymentByUID = async () => {
    let res = await GetPaymentByUID();
    if (res) {
      setPayment(res);
    }
  };

  const getPaymentByID = async () => {
    let res = await GetPaymentByID(ID);
    if (res) {
      setPaymentByID(res);
      setShowCodePercentage(res.Discount.DiscountPercentage)
      setShowDurationPercentage(res.Duration.DurationPercentage)
      setNumberOfDays(res.Duration.NumberOfDays);
    }
  };

  const getCourseDetailByID = async () => {
    let res = await GetCourseDetailByID(PaymentByID?.CourseService?.CourseDetailID);
    if (res) {
      setCourseDetail(res);
    }
  };

  useEffect(() => {
    getPaymentByUID();
  }, [uid]);

  useEffect(() => {
    getPaymentByID();
  }, [ID]);

  useEffect(() => {
    getCourseDetailByID();
  }, [PaymentByID]);

  useEffect(() => {
    CourseDuration = convertType(CourseDetail.Price?.Duration) + "";
    CalBalance(
      Number(CourseDetail?.Price?.Price),
      parseInt(CourseDuration),
      ShowCodePercentage,
      ShowDurationPercentage,
      NumberOfDays
    );
  }, [CourseDetail]);

  useEffect(() => {
    [TempDate, TempTimeAndZone] = (PaymentByID?.PaymentDate + "").split("T")
    setPDate(TempDate)
    if (TempTimeAndZone !== undefined) {
      [TempHour, TempMinute, TempSecondAndZone] = TempTimeAndZone.split(":")
      TempSecond = TempSecondAndZone.split(".")
      setHour(TempHour)
      setMinute(TempMinute)
      setSecond(TempSecond[0])
    }
  }, [PaymentByID?.ID]);

  function CalBalance(
    Price: number,
    Duration: number,
    ShowCodePercentage: number,
    ShowDurationPercentage: number,
    NumberOfDays: number
  ) {
    SumaryBalance =
      (Price / Duration) *
      NumberOfDays *
      (1 - (ShowCodePercentage + ShowDurationPercentage) / 100);
    SumaryBalance = parseInt((Math.ceil(SumaryBalance * 100) / 100).toFixed(2));
    if (Number.isNaN(Balance)) {
      setBalance(Number(CourseDetail?.Price?.Price));
    } else {
      setBalance(SumaryBalance);
    }
  }

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  return (
    <Box sx={{
        flexDirection: "column",
        flexFlow: "",
        overflow: "auto",
        height: "92.7vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(256, 256, 256, 0.2), rgba(256, 256, 256, 0.5)), url(${BG})`,
      }}
    >
      <Box 
        style={{
          margin: "3rem 10% 0 10%",
        }}
      >
        <Grid item xs={12} style={{textAlign: "center", marginBottom: "50px"}}>
          <Button 
            variant="contained"
            style={{
              color: "#fff",
              borderRadius: 40,
              backgroundColor: "#384648",
              padding: "10px 40px",
              fontSize: "2rem",
            }}>
            Payment History
          </Button>
        </Grid>

        <Grid container spacing={4} style={{textAlign: "center"}}>
          <Grid item xs={4}>
            <Grid container item xs={12}>
              <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="contained"
                    style={{
                      color: "#fff",
                      borderRadius: 40,
                      backgroundColor: "#576F72",
                      padding: "10px 40px",
                      fontSize: "1.2rem",
                      marginBottom: "10px",
                      }}
                    >
                      Bill ID
                  </Button>
                </Grid>
            </Grid>
            
            
            <Grid container item xs={12}>
              <Grid item xs={6}></Grid>
                <Grid item xs={6} >
                  <Select
                    native
                    value={ID}
                    onChange={(event) => {setID(event.target.value)}}
                    inputProps={{
                      name: "ID",
                    }}
                    color="success"
                    style={{color: "white"}}
                  >
                    <option aria-label="None" value="" style={{color: "grey"}}>
                      Please select payment
                    </option>
                    {Payment.map((item: PaymentInterface) => (
                      <option value={item.ID} key={item.ID} style={{color: "black"}}>
                        {item.ID}
                      </option>
                    ))}
                  </Select>
                </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={4} style={{display: "flex", justifyContent: "center"}}>
            <Box 
              sx={{
                width: 360,
                height: 600,
                borderRadius: 10,
                backgroundColor: '#E5ECE9',
                boxShadow: 20,
                fontSize: "1rem",
                textAlign: "left",
                display: "table",
              }}
            >
              <Box style={{padding: "48px 24px 48px 24px"}}>
                <Grid item xs={12} style={{fontWeight: "bold"}}>
                  payment bill
                </Grid>

                <Grid item xs={12} style={{display: "flex"}}>
                  <Grid item xs={4} >
                    bill: {PaymentByID?.ID}
                  </Grid>
                  <Grid item xs={8} style={{textAlign: "right"}}>
                    date: {PDate}, {Hour}:{Minute}:{Second}
                  </Grid>
                </Grid>
                <Divider />
                <br></br>
                <Grid item xs={12}>
                  member: {UserName} <br></br>
                  course name: {CourseDetail?.CourseName} <br></br>
                  - category: {CourseDetail?.Description?.CourseType} <br></br>
                </Grid>
                <br></br>
                <Divider />
                <br></br>
                <Grid item xs={12}>
                  balance
                </Grid>
                <Grid container item xs={12} sx={{ display: "flex" }}>
                  <Grid item xs={6}>
                    - course:
                  </Grid>
                  <Grid item xs={6}>
                    {CourseDetail?.Price?.Price} บาท
                  </Grid>
                  
                  <Grid item xs={6}>
                    - course duration:
                  </Grid>
                  <Grid item xs={6}>
                    {CourseDetail?.Price?.Duration}
                  </Grid>

                  <Grid item xs={6}>
                    - service duration:
                  </Grid>
                  <Grid item xs={6}>
                    {PaymentByID?.Duration?.NumberOfDays} วัน
                  </Grid>

                  <Grid item xs={6}>
                    - discount:
                  </Grid>
                  <Grid item xs={6}>
                    {ShowCodePercentage + ShowDurationPercentage} %
                  </Grid>
                </Grid>
                <Divider />
                <Grid container item xs={12} sx={{ display: "flex", fontStyle: "italic", fontWeight: "bold" }}>
                  <Grid item xs={6}>
                    amount paid:
                  </Grid>
                  <Grid item xs={6}>
                    {Balance} บาท
                  </Grid>
                </Grid>

              </Box>

              <Box style={{ textAlign: "center", display: "table-row" }}>
                thank you for choosing us
                <p style={{fontSize: "0.8rem", margin: "-4px -4px 0 -4px"}}>se65-sec2-g19-nutrition.co</p>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4} style={{justifySelf: "center"}}>
            <CardMedia
              component="img"
              width="360"
              height="100%"
              image={PaymentByID?.Slip}
              alt="img"
              sx={{width: "auto", height: "auto", maxWidth: "360px", maxHeight: "600px", display: "block", boxShadow: 20, borderRadius: 10}}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
    
    
  );
}

export default PaymentHistory;
