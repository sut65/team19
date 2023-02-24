import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Avatar,
	Button,
	IconButton,
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'

import '../../App.css'

//Image Import
import MealPlanIcon from '../../images/MealPlans/MealPlanIcon3.png'
import AddIcon from '../../images/AddIcon.png'
import homeBg from '../../images/MealPlans/MealPlansBackground8.jpg'

//Interface
import { MealPlanInterface } from '../../interfaces/IMealPlan'
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';
import { NutrientInterface } from '../../interfaces/INutrient'
//API
import {
	GetFoodInformations,
	GetAdminByID,
	DeleteMealPlan,
	GetNutrients,
	GetNutrientByID,
} from '../../services/HttpClientService'


interface RowProps {
	row: MealPlanInterface
}


function MealPlanDisplay() {
	const [foodinformation, setFoodInformation] = useState<FoodInformationInterface[]>([])
	const [nutrient, setNutrient] = useState<NutrientInterface[]>([])

	let navigate = useNavigate()
		
	const [mealplan, setMealplan] = useState<MealPlanInterface[]>([])

	const DeleteMealPlans = async (id: string) => {
		let res = await DeleteMealPlan(id)
		if (res) {
			window.location.href = '/admin/mealplan-display'
		}
	}


	//Fetch API
	const fetchMealPlans = async () => {
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		}
		fetch(`http://localhost:8080/mealplans`, requestOptions)
			.then(response => response.json())
			.then(res => {
				console.log('Api', res.data)
				res.data && setMealplan(res.data)
			})
	}
		const fetchFoodInformation = async () => {
			let res = await GetFoodInformations()
			res && setFoodInformation(res)
	}

	const fetchNutrient = async () => {
		let res = await GetNutrients()
		res && setNutrient(res)
	}

	useEffect(() => {
		fetchMealPlans()
		fetchFoodInformation()
		fetchNutrient()
	}, [])

const Row = ({ row }: RowProps) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						size='small'
						onClick={() => setOpen(!open)}
						aria-label={open ? 'Collapse' : 'Expand'}
					>
						{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				</TableCell>

				{/* mealplan.map(row => (
								<Row row={row} />
							)) */}
				<TableCell align='center'>{row.ID}</TableCell>
				<TableCell align='center'>
					{row.Member?.Firstname + ' ' + row.Member?.Lastname}
				</TableCell>
				<TableCell align='center'>{row.FoodInformation?.Name}</TableCell>
				{/* <Box sx={{ mt: 1 }}>
					<Avatar
						src={row.FoodInformation?.Image}
						sx={{ width: 50, height: 50 }}
					/>
				</Box> */}
				<TableCell align='center'>{row.MealType?.Name}</TableCell>
				<TableCell align='center'>{row.Description}</TableCell>
				<TableCell align='center'>{row.TimeToEat}</TableCell>
				<TableCell
					align='center'
					sx={{
						display: 'flex',
						height: '40px',
					}}
				>
					{/* ปุ่มแก้ไขข้อมูล */}
					<IconButton
						aria-label='delete'
						size='large'
						onClick={() => navigate(`update-mealplan/${row.ID}`)}
						color='info'
					>
						<EditIcon fontSize='inherit' />
					</IconButton>
					{/* ปุ่มลบข้อมูล */}
					<IconButton
						aria-label='delete'
						size='large'
						onClick={() => DeleteMealPlans(row.ID + '')}
						color='error'
					>
						<DeleteIcon fontSize='inherit' />
					</IconButton>
				</TableCell>
				{/* <TableCell>{row.Nutrient?.MostNutrient}</TableCell> */}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Table size='small' aria-label='purchases'>
							<TableBody>
								{/* <Box sx={{ margin: 5 }}>
									<Typography variant='h6' gutterBottom component='div'>
										พลังงานทั้งหมด
									</Typography>

									<TableRow>
										<TableCell>
											{nutrient.map((item: NutrientInterface) => (
												<TableCell>{item.TotalCalorie}</TableCell>
											))}
										</TableCell>
									</TableRow>
								</Box> */}
								<Box
									sx={{
										m:10,
										gap:5,
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<Typography variant='h6'>รูปภาพอาหาร</Typography>
									<Box sx={{ mt: 1 }}>
										<Avatar
											src={row.FoodInformation?.Image}
											sx={{ width: 200, height: 200 }}
										/>
									</Box>
								</Box>
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flexFlow: '',
				overflow: 'auto',
				alignItems: 'center',
				// gap: 1,
				height: '100vh',
				width: '100%',
				backgroundSize: 'cover',
				color: '#f5f5f5',
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
			}}
		>
			<Box mb={'10rem'}>
				{/* Header */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<Avatar src={MealPlanIcon} />
					<h1>ข้อมูลแผนรายการอาหารทั้งหมด</h1>
				</Box>
				<Box mb={5}>
					{/* ปุ่มเพิ่มข้อมูล */}
					<Link
						to='/admin/mealplan-display/create-mealplan'
						style={{
							textDecoration: 'none',
						}}
					>
						{/* <Button
							variant='contained'
							color='success'
							sx={{ borderRadius: 20 }}
						>
							<Avatar src={AddIcon} />
							เพิ่มข้อมูลแผนรายการอาหาร
						</Button> */}
						<Button
							sx={{
								backgroundColor: '#6D9886',
								color: '#FFFBF5',
								'&:hover': {
									backgroundColor: '#FFFBF5',
									color: '#393E46',
								},
							}}
						>
							เพิ่มข้อมูลแผนรายการอาหาร
						</Button>
					</Link>
				</Box>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell align='center'>ไอดี</TableCell>
								<TableCell align='center'>สมาชิก</TableCell>
								<TableCell align='center'>อาหาร</TableCell>
								<TableCell align='center'>มื้ออาหาร</TableCell>
								<TableCell align='center'>คำอธิบาย</TableCell>
								<TableCell align='center'>วันและเวลาที่ต้องรับประทาน</TableCell>
								<TableCell align='center'> </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{mealplan.map(row => (
								<Row row={row} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}

export default MealPlanDisplay
