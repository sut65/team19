import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/system';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { 
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    InputAdornment,
    TextField,
    Button,
 } from '@mui/material';

 //Interface
import { MostNutrientInterface } from '../../interfaces/IMostNutrient';
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';
import { AdminInterface } from '../../interfaces/IAdmin';
import { NutrientInterface } from '../../interfaces/INutrient';

//API
import { 
    GetFoodInformations,
    GetAdminByID,
    GetMostNutrient,
    CreateNutrient,
 } from '../../services/HttpClientService';


function CreateNutrientUI() {

const [nutrient, setNutrient] = useState<NutrientInterface>({});
const [mostnutrient, setMostNutrient] = useState<MostNutrientInterface[]>([]);
const [foodinformation, setFoodInformation] = useState<FoodInformationInterface[]>([]);
const [date, setDate] = useState<Date | string | null>(new Date());
const [admin, setAdmin] = useState<AdminInterface>({ Name: ""});
const [success, setSuccess] = useState(false);
const [error, setError] = useState(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setNutrient({ ...nutrient, [name]: e.target.value });
};

const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof nutrient;
    setNutrient({
      ...nutrient,
      [name]: event.target.value,
    });
};

const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
};

//FectAPI
const fetchMostNutrients = async () => {
    let res = await GetMostNutrient();
    res && setMostNutrient(res);
};

const fetchFoodInformation = async () => {
    let res = await GetFoodInformations();
    res && setFoodInformation(res);
};

const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    nutrient.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
};

// เพิ่มข้อมูลเข้า Database
const submit = async () => {
    let data = {
      MostNutrienID: convertType(nutrient.MostNutrientID),
      FoodInformationID: convertType(nutrient.FoodInformationID),
      AdminID: convertType(nutrient.AdminID),
      Comment: nutrient.Comment,
      TotalCalorie: nutrient.TotalCalorie,
      Date: date?.toLocaleString(),
      };

      let res = await CreateNutrient(data);
      res ? setSuccess(true) : setError(true);
    //   window.location.href = "/food-display"
      console.log(JSON.stringify(data))
};

useEffect(() => {
    fetchMostNutrients();
    fetchFoodInformation();
    fetchAdminByID();
}, []);


    return(
        <Container>

            <Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                },
                }}
            >
            <Paper elevation={5} sx = {{ p: 2}}>
                <h1>เพิ่มข้อมูลสารอาหาร</h1>
            </Paper>
            </Box>

            <h1> </h1>

            <Stack direction="row" spacing={3}>
            
            {/* ชื่ออาหาร */}
            <Typography variant="h2" component="h1">
            อาหาร :
            </Typography>
            <Box
                sx={{
                    width: "30%",
                }}
            >
                <Select
                    native
                    fullWidth
                    id="food_information"
                    value={nutrient.FoodInformationID + ""}
                    onChange={handleSelectChange}
                    inputProps={{
                    name: "FoodInformationID",
                    }}
                >
                <option aria-label="None" value="">
                    เลือกอาหารที่ต้องการใส่ข้อมูล
                </option>
                {foodinformation.map((item: FoodInformationInterface) => (
                <option key={item.ID} value={item.ID}>
                    {item.Name}
                </option>
                ))}
                </Select>
            </Box>
            
            {/* หมู่อาหารที่พบมาก */}
            <Typography variant="h2" component="h1" mt={2}>
            หมู่อาหารที่พบมากและแคลอรี่ทั้งหมด :
            </Typography>
            <Box
                sx={{
                    width: "18%",
                }}
            >
                <Select
                    native
                    fullWidth
                    id="most_nutrient"
                    value={nutrient.MostNutrientID + ""}
                    onChange={handleSelectChange}
                    inputProps={{
                    name: "MostNutrientID",
                    }}
                >
                <option aria-label="None" value="">
                    ใส่ข้อมูล
                </option>
                {mostnutrient.map((item: MostNutrientInterface) => (
                <option key={item.ID} value={item.ID}>
                    {item.Name}
                </option>
                ))}
                </Select>
            </Box>
            
            {/* แคลอรี่ทั้งหมด */}
            <TextField
                label="แคลอรี่ทั้งหมดของอาหาร"
                id="calorie_per_gram"
                type="number"
                placeholder="กรอกแคลอรี่"
                onChange={handleInputChange}
                value={nutrient.TotalCalorie}
                sx={{ m: 1, width: '15%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    inputProps: {min: 0}
                }}
            />
            
            </Stack>

            <h1> </h1>

            <Stack direction="row" spacing={3}>
            <Typography variant="h2" component="h1">
                ความคิดเห็นเกี่ยวกับอาหาร
            </Typography>
            </Stack>

            <Stack direction="row" spacing={3}>
                {/* ความคิดเห็นเกี่ยวกับอาหาร */}
                <TextField
                    id="comment"
                    name="Comment"
                    value={nutrient.Comment}
                    onChange={handleInputChange}
                    multiline
                    placeholder="กรอกความคิดเห็นเกี่ยวกับอาหาร"
                    minRows={8}
                    sx={{
                        fontSize: "1.5rem",
                        minWidth: "100%",
                        minHeight: 200,
                    }}
                />

            </Stack>

            <h1> </h1>

            <Stack direction="row" spacing={3}>

                {/* วันเวลาที่ทำการเพิ่ม */}
                <Typography variant="h2" component="h1">
                วันเวลาที่ทำการเพิ่ม :
                </Typography>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    // gap: "2rem",
                    mt: 2,
                    }}>
                <Box
                    sx={{
                        width: "255px"
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                        renderInput={(props) => <TextField
                            required
                            fullWidth
                            {...props} />}
                        label="เลือกวันที่และเวลา"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        />
                    </LocalizationProvider>
                    </Box>
                </Box>

                {/* Admin ถูก Lock เป็น Disable*/}
                <Typography variant="h2" component="h1">
                ผู้ดูแลที่ทำการเพิ่มข้อมูล :
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

            </Stack>

            <h2> </h2>

            <Stack direction="row" spacing={3}>

            <Button variant="outlined" color="success" onClick={submit}>
                    เพิ่มสารอาหาร
            </Button>

            </Stack>

            

        </Container>
    );
}

export default CreateNutrientUI;