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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Interface
import { ExerciseInterface } from '../../interfaces/IExercise';
import { TasteInterface } from '../../interfaces/ITatse';
import { MemberInterface } from '../../interfaces/IMember';
import { BehaviorInterface } from '../../interfaces/IBehavior';
import { UpdateBehaviors } from '../../services/HttpClientService';
import { DeleteBehavior } from '../../services/HttpClientService';

//API
import { 
    GetTaste,
    GetExercise,
    GetMemberByID,
    CreateBehavior,
 } from '../../services/HttpClientService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateBehavior() {

    const [behaviors, setBehaviors] = useState<BehaviorInterface>({});
    const [exercises, setExercises] = useState<ExerciseInterface[]>([]);
    const [member, setMember] = useState<MemberInterface[]>([]);
    const [time, setTime] = useState<Date | string | null>(new Date());
    const [tastes, settastes] = useState<TasteInterface[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");
    const { id } = useParams();

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

    const handleClickDelete = async (id : string) => {
      let res = await DeleteBehavior(id);
      if (res) {
        window.location.href = "http://localhost:3000/user/behavior-display";
      }
    }

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
        let res = await GetTaste();
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
        ID: convertType(id),
        ExerciseID: convertType(behaviors.ExerciseID),
        TasteID: convertType(behaviors.TasteID),
        MemberID: convertType(behaviors.MemberID),
        Time: time?.toLocaleString(),
        Meals: behaviors.Meals,
        };
        let res = await UpdateBehaviors(data);
        if (res.status) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/user/behavior-display";
          }, 1000);
        } else {
          setAlertMessage(res.message);
          setError(true);
        }
        
      };
      console.log(behaviors);



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
                    value={behaviors.TasteID + ""}
                    onChange={handleSelectChange}
                    inputProps={{
                    name: "TasteID",
                    }}
                >
                  <option aria-label="None" value="">
                      เลือกรสชาติ
                  </option>
                  {tastes.map((item: TasteInterface) => (
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
                      value={time}
                      onChange={(newValue) => {
                        setTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Box>
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

                <Button variant="outlined" color="error" onClick={() => handleClickDelete(id + "")}
                      sx = {{ borderRadius: 20 }}>
                      Delete
                    </Button>

                <Link
                    to="/user/behavior-display"
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
                  <Snackbar
                  open={success}
                  id = "success"
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert onClose={handleClose} severity="success">
                    {message}
                  </Alert>
                </Snackbar>

                <Snackbar
                  open={error}
                  id = "error"
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert onClose={handleClose} severity="error">
                    {message}
                  </Alert>
                </Snackbar>
                  </Container>
        

    );
}

export default UpdateBehavior;