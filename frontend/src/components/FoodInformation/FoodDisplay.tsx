import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";


const columns = [

  {
    field: "image",
    headerName: "รูปภาพ",
    width: 400,
    height: 400,
  },

  {
    field: 'name',
    headerName: 'ชื่ออาหาร',
    width: 120,
  },

  {
    field: 'food_type',
    headerName: 'ประเภทของอาหาร',
    width: 170,
  },

  {
    field: 'main_ingredient',
    headerName: 'วัตถุดิบหลัก',
    width: 150,
  },

  {
    field: 'datetime',
    headerName: 'วันที่เพิ่ม',
    width: 100,
  },

  {
    field: 'admin',
    headerName: 'ผู้ดูแลที่เพิ่มอาหาร',
    width: 150,
  },

];

const rows = [
  {
    id: 1,
    image: "https://s359.kapook.com/pagebuilder/1c0a0dac-e4a9-4651-baa0-052a597ab7bf.jpg",
    type: 'image',
    name: 'ไข่เจียว',
    food_type: 'อาหารเพื่อสุขภาพ',
    main_ingredient: 'ไข่',
    datetime: '18/01/23',
    admin: "AdminJa01",
  },
  {
    id: 2,
    image: "https://s359.kapook.com/pagebuilder/1c0a0dac-e4a9-4651-baa0-052a597ab7bf.jpg",
    type: 'image',
    name: 'ผัดคะน้า',
    food_type: 'อาหารเพื่อสุขภาพ',
    main_ingredient: 'ผัก',
    datetime: '19/01/23',
    admin: "AdminJa02",
  },
];

function FoodDisplay( 
) {
  return (
    <Container>
        {/* Header */}
        <Box
            display={"flex"}
            sx={{
            }
            }>
            <h1>ข้อมูลอาหารทั้งหมด</h1>
            <h2> </h2>
        </Box>
        
        
        <Stack direction="row" spacing={2}>

          {/* ปุ่มเพิ่มข้อมูล */}
          <Link
            to="/foodinfo/create-food"
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="contained" color="success">
            เพิ่มข้อมูลอาหาร
            </Button>
          </Link>
        
        {/* ปุ่มลบข้อมูล */} 
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          ลบข้อมูลอาหาร
          </Button>

        </Stack>
        
        {/* เว้นช่องว่าง */}
        <Box
            display={"flex"}
            sx={{
            }
            }>
            <h1> </h1>
        </Box>
        
        {/* ตาราง */}
        <Box sx={{ bgcolor: '#ffffff', height: '100vh' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              checkboxSelection
            />
        </Box>

      </Container>

  );
}

export default FoodDisplay;