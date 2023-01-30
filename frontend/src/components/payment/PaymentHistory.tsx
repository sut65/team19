import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Button, FormControl, Grid, Select, SelectChangeEvent } from "@mui/material";
import { fontSize, textAlign } from "@mui/system";
import { Divider } from "@mui/material";
import "../../App.css";
import { PaymentInterface } from "../../interfaces/IPayment";
import { MemberInterface } from "../../interfaces/IMember";
import { GetPaymentByID, GetPaymentByUID, GetMemberByID } from "../../services/HttpClientService";

function PaymentHistory() {
  const [Payment, setPayment] = useState<PaymentInterface[]>([])
  const [PaymentByID, setPaymentByID] = useState<PaymentInterface>()
  const [ID, setID] = useState<string>()
  const [PTime, setPTime] = useState<string>()
  let TempDate, TempTimeAndZone: any, TempSecondAndZone,  TempHour, TempMinute, TempSecond
  const [PDate, setPDate] = useState<string>()
  const [Hour, setHour] = useState<string>()
  const [Minute, setMinute] = useState<string>()
  const [Second, setSecond] = useState<string>()
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
    }
  };

  useEffect(() => {
    getPaymentByUID();
    console.log(PaymentByID)
  }, [uid]);

  useEffect(() => {
    getPaymentByID();
  }, [ID]);

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

  // useEffect(() => {
  //   console.log(TempTimeAndZone)
  //   if (TempTimeAndZone !== undefined) {
  //     [TempHour, TempMinute, TempSecond] = TempTimeAndZone.split(":")
  //     console.log(Hour)
  //   }
  // }, [PaymentByID?.ID]);

  return (
    <Box style={{margin: "0 10% 0 10%"}}>
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
        <Grid item xs={6}>
          <Button 
            variant="contained"
            style={{
              color: "#fff",
              borderRadius: 40,
              backgroundColor: "#576F72",
              padding: "10px 40px",
              fontSize: "1.2rem",
              marginBottom: "10px"
            }}>
            Bill ID
          </Button>
          <Grid item xs={12}>
            <Select
              native
              value={ID}
              onChange={(event) => {setID(event.target.value)}}
              inputProps={{
                name: "ID",
              }}
              color="success"
            >
              <option aria-label="None" value="" style={{color: "grey"}}>
                Please select payment
              </option>
              {Payment.map((item: PaymentInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.ID}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box 
            sx={{
              width: 400,
              height: 600,
              borderRadius: 10,
              borderStyle: "20px",
              backgroundColor: '#E5ECE9',
              boxShadow: 16,
              fontSize: "1rem",
              textAlign: "left"
          }}
            >
              <Box style={{padding: "48px 24px 48px 24px"}}>
                <Grid item xs={12} style={{fontWeight: "bold"}}>
                  Payment Bill
                </Grid>

                <Grid item xs={12} style={{display: "flex"}}>
                  <Grid item xs={4} >
                    bill ID: {PaymentByID?.ID}
                  </Grid>
                  <Grid item xs={8} style={{textAlign: "right"}}>
                    date: {PDate}, {Hour}:{Minute}:{Second}
                  </Grid>
                </Grid>
                <Divider />
                <br></br>
                <Grid item xs={12}>
                  {UserName}
                </Grid>
                
              </Box>
              
             
          </Box>
        </Grid>
      </Grid>
    </Box>
    
  );
}

export default PaymentHistory;
