import * as React from 'react';
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

const MockUpType = [
    { label: 'อาหารเพื่อสุขภาพ', id: 1 },
    { label: 'อาหาร Fast Food', id: 2 },
]

const MockUpIngre = [
    { label: 'ไข่', id: 1 },
    { label: 'ผัก', id: 2 },
]

const MockUpAdmin = [
    { label: 'AdminJa001', id: 1 },
]

function CreateFood() {

    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

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

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={MockUpType}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="ประเภทของอาหาร" />}
            />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={MockUpIngre}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="วัตถุดิบหลัก" />}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="วันที่ทำการเพิ่ม"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
            </LocalizationProvider>

            
            </Stack>

            <Box>
                <h2> </h2>
            </Box>

            <Stack direction="row" spacing={2}>

            <Autocomplete
                id="disabled"
                options={MockUpAdmin}
                disabled
                sx={{ width: 250 }}
                renderInput={(params) => (
                <TextField {...params} label="ผู้ดูแลที่ทำการเพิ่มข้อมูล" variant="standard" />
                )}
            />

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