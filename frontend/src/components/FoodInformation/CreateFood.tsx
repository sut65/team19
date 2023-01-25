import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import { FoodTypeInterface } from '../../interfaces/IFoodType';
import { MainIngredientInterface } from '../../interfaces/IMainIngredient';
import { AdminInterface } from '../../interfaces/IAdmin';
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';

import { 
    GetFoodTypes,
    GetMainIngredients,
    CreateFoodInformation,
    GetAdminByID,
 } from '../../services/HttpClientService';

function CreateFood() {

    const [foodinformation, setFoodInformation] = useState<FoodInformationInterface>({});
    const [foodtypes, setFoodTypes] = useState<FoodTypeInterface[]>([]);
    const [mainingredients, setMainIngredients] = useState<MainIngredientInterface[]>([]);
    const [datetime, setDatetime] = useState<Date | string | null>(new Date());
    const [admin, setAdmin] = useState<AdminInterface>({ Name: ""});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [image, setImage] = useState({ name: "", src: "" });

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

    console.log("image", image)

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
        setAdmin(res);
      }
    };
    
    // เพิ่มข้อมูลเข้า Database
    const submit = async () => {
      let data = {
        FoodTypeID: convertType(foodinformation.FoodTypeID),
        MainIngredientID: convertType(foodinformation.MainIngredientID),
        AdminID: convertType(foodinformation.AdminID),
        Image: foodinformation.Image,
        Name: foodinformation.Name,
        Datetime: datetime?.toLocaleString(),
        };

        console.log(data.Image)
    
        let res = await CreateFoodInformation(data);
        res ? setSuccess(true) : setError(true);
        // window.location.href = "/food-display"
        console.log(JSON.stringify(data))
      };

    useEffect(() => {
        fetchFoodTypes();
        fetchMainIngredients();
        fetchAdminByID();
    }, []);

    return(
        <Container>
            <Box
                display={"flex"}
                sx={{
                }
                }>
                <h1>เพิ่มข้อมูลอาหาร</h1>
                <h2> </h2>
            </Box>
            
            <Stack direction="row" spacing={2}>

            <TextField
                id="outlined-required"
                label="ชื่ออาหาร"
            />

            

            

              {/* เลือกวันเวลาที่เพิ่ม*/}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // gap: "2rem",
                  mt: 2,
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
                      label="เลือกวันเวลาในการเพิ่มอาหาร"
                      value={datetime}
                      onChange={(newValue) => {
                        setDatetime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

            </Stack>

            <Box>
                <h2> </h2>
            </Box>

            <Stack direction="row" spacing={2}>

            {/* Admin ถูก Lock เป็น Disable*/}
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
                  id="Image"
                  name="Image"
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleChangeImages}
                />
            </LocalizationProvider>

            
            </Stack>

            <Box>
                <h2> </h2>
            </Box>

            <Stack direction="row" spacing={2}>

            

            <Button variant="contained" component="label">
                อัพโหลดรูปภาพ
                <input hidden accept="image/*" multiple type="file" />
            </Button>

            </Stack>

            <Box>
                <h2> </h2>
            </Box>
            
            <Stack direction="row" spacing={2}>

                <Button variant="outlined" color="success">
                    เพิ่มอาหาร
                </Button>

                <Link
                    to="/foodinfo"
                    style={{
                    textDecoration: "none",
                    }}
                >
                    <Button variant="outlined" color="secondary">
                    ย้อนกลับ
                    </Button>
                 </Link>

            </Stack>

           


        </Container>
    
    );
}

export default CreateFood;