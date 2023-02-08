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
    Avatar,
} from '@mui/material';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link } from "react-router-dom";

// Interface
import { ExerciseInterface } from '../../interfaces/IExercise';
import { TatseInterface } from '../../interfaces/ITatse';
import { MemberInterface } from '../../interfaces/IMember';
import { BehaviorInterface } from '../../interfaces/IBehavior';


//API
import { 
    GetTatse,
    GetExercise,
    GetMemberByID,
    CreateBehavior,
 } from '../../services/HttpClientService';
import { time } from 'console';


const ImgBox = styled(Box)({
    width: "280px",
});

function CreateBehaviors() {

    const [behaviors, setBehaviors] = useState<BehaviorInterface>({});
    const [exercises, setExercises] = useState<ExerciseInterface[]>([]);
    const [member, setMember] = useState<MemberInterface[]>([]);
    const [datetime, setDatetime] = useState<Date | string | null>(new Date());
    const [tastes, settastes] = useState<TatseInterface[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");

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
      const meals = e.target.name;
      console.log(meals);
      setBehaviors({ ...behaviors, [meals]: e.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof behaviors;
        setBehaviors({
          ...behaviors,
          [name]: event.target.value,
        });
      };


    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    //FetchAPI
    const fetchExercise = async () => {
        let res = await GetExercise();
        res && setExercises(res);
    };

    const fetchTaste = async () => {
        let res = await GetTatse();
        res && settastes(res);
    };

    const fetchMember = async () => {
      let res = await GetMemberByID();
      behaviors.MemberID = res.ID;
      if (res) {
        setMember(res);
      }
    };
    
    // เพิ่มข้อมูลเข้า Database
    const submit = async () => {
      let data = {
        ExerciseID: convertType(behaviors.ExerciseID),
        TasteID: convertType(behaviors.TatseID),
        MemberID: convertType(behaviors.MemberID),
        Time: datetime?.toLocaleString(),
        Meals: behaviors.Meals,
        };
        let res = await CreateBehavior(data);
        if (res.status) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/user/Behaviors";
          }, 1000);
        } else {
          setAlertMessage(res.message);
          setError(true);
        }
        
      };

    useEffect(() => {
        fetchExercise();
        fetchMember();
        fetchTaste();
    }, []);

    return(

        <Container>

        <h1>สำรวจพฤติกรรมก่อนเข้าเทรน</h1>

        <h1> </h1>
    
        <Stack direction="column" spacing={1}>
            
            {/* มื้ออาหาร*/}
            <Typography variant="h2" component="h1">
              มื้ออาหารที่คุณกิน :
            </Typography>
            <TextField
                id="meals"
                name="Meals"
                value={behaviors.Meals}
                onChange={handleInputChange}
                placeholder="กรอกจำนวนมื้ออาหาร"
                label="มื้อ"
                sx={{ width: "20%" }}
            />

            {/* รสอาหาร*/}
            <Typography variant="h2" component="h1">
              รสอาหารที่
              คุณชอบกิน :
            </Typography>
            <Box
                sx={{
                    width: "20%",
                }}
            >
                <Select
                    native
                    fullWidth
                    id="tatse"
                    value={behaviors.TatseID + ""}
                    onChange={handleSelectChange}
                    inputProps={{
                    name: "TatseID",
                    }}
                >
                  <option aria-label="None" value="">
                      เลือกรสชาติ
                  </option>
                  {tastes.map((item: TatseInterface) => (
                  <option key={item.ID} value={item.ID}>
                      {item.Name}
                  </option>
                  ))}
                </Select>
            </Box>
            
            {/* จำนวนครั้งการออกกำลังกาย*/}
            <Typography variant="h2" component="h1">
              จำนวนครั้งการออกกำลังกาย :
            </Typography>
            <Box
                sx={{
                    width: "20%",
                }}
            >
                <Select
                    native
                    fullWidth
                    id="exercise"
                    value={behaviors.ExerciseID + ""}
                    onChange={handleSelectChange}
                    inputProps={{
                    name: "ExerciseID",
                    }}
                >
                  <option aria-label="None" value="">
                      เลือกจำนวนครั้งการออกำลังกาย
                  </option>
                  {exercises.map((item: ExerciseInterface) => (
                  <option key={item.ID} value={item.ID}>
                      {item.Name}
                  </option>
                  ))}
                </Select>
            </Box>
            
            </Stack>

            <h1> </h1>

            <Stack direction="row" spacing={1}>

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
                    width: "200px"
                  }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField
                        required
                        fullWidth
                        {...props} />}
                      label="เลือกวันเวลาในการเพิ่มอาหาร"
                      value={datetime}
                      onChange={(newValue) => {
                        setDatetime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

        

            {/* Member ถูก Lock เป็น Disable*/}
            <Typography variant="h2" component="h1">
              ผู้ใช้ที่ทำการเพิ่ม :
            </Typography>
            <Box sx={{ width: "30%"  }}>
              <TextField
                fullWidth
                disabled
                id="member"
                label="ผู้ใช้"
                value={member}
              />
            </Box>
            
           

            </Stack>

            <h1> </h1>

            <Stack direction="row" spacing={2}>
            
         
            
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
                sx = {{ borderRadius: 20 }}>
                    เพิ่มการสำรวจ
                </Button>

                <Link
                    to="/food-display"
                    style={{
                    textDecoration: "none",
                    }}
                >
                    <Button variant="outlined" color="secondary"
                      sx = {{ borderRadius: 20 }}>
                      ย้อนกลับ
                    </Button>
                 </Link>

            </Stack>
        </Container>

    );
}

export default CreateBehaviors;