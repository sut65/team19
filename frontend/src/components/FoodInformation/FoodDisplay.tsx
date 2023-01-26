import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

import { FoodInformationInterface } from '../../interfaces/IFoodInformation';
import { GetFoodInformations } from '../../services/HttpClientService';

function FoodDisplay( 
) {
  const apiUrl = "http://localhost:8080";
  const [foodinformations, setFoodInformations] = useState<FoodInformationInterface[]>([]);

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 100 },
    { field: "Name", headerName: "ชื่ออาหาร", width: 100 },
    { field: "DateTime", headerName: "เวลา", width: 100 },
    { field: "Image", headerName: "รูปภาพ", width: 100 },
    { field: "AdminID", headerName: "เวลา", width: 100 },
    { field: "MainIngredientID", headerName: "เวลา", width: 100 },
    { field: "FoodTypeID", headerName: "เวลา", width: 100 },
  ];

  const fetchFoodInformation = async () => {
    fetch(`${apiUrl}/food_informations`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        setFoodInformations(res.data);
      });
  };

  useEffect(() => {
    fetchFoodInformation();
  }, []);

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
            to="/food-display/create-food"
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
        
        <Box
            display={"flex"}
            sx={{
            }
            }>
            <h1> </h1>
        </Box>
        
        {/* ตาราง */}
        <Box sx={{ bgcolor: '#ffffff', height: '100vh' }}>
          {/* <DataGrid
            rows={foodinformations}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          /> */}
        </Box>

      </Container>
  );
}

export default FoodDisplay;