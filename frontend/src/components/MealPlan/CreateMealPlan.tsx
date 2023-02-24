import React, { useEffect, useState } from 'react'
import { Container, Box } from '@mui/system'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Link } from 'react-router-dom'
import {
	Select,
	SelectChangeEvent,
	Typography,
	TextField,
	Button,
	Snackbar,
} from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

//Interface
import { FoodInformationInterface } from '../../interfaces/IFoodInformation'
import { AdminInterface } from '../../interfaces/IAdmin'
import { MealPlanInterface } from '../../interfaces/IMealPlan'
import { MemberInterface } from '../../interfaces/IMember'
import { MealTypeInterface } from '../../interfaces/IMealType'

//API
import {
	GetFoodInformations,
	GetAdminByID,
	GetMembers,
	CreateMealPlans,
	GetMealTypes,
} from '../../services/HttpClientService'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function CreateMealPlan() {
	const [foodinformation, setFoodInformation] = useState<
		FoodInformationInterface[]
		>([])
	const [mealtype, setMealType] = useState<MealTypeInterface[]>([])
	const [mealplan, setMealPlan] = useState<MealPlanInterface>({})
	const [member, setMember] = useState<MemberInterface[]>([])
	const [date, setDate] = useState<Date | string | null>(new Date())
	const [admin, setAdmin] = useState<AdminInterface>({ Name: '' })
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)
	const [message, setAlertMessage] = React.useState('')

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return
		}
		setSuccess(false)
		setError(false)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name
		console.log(name)
		setMealPlan({ ...mealplan, [name]: e.target.value })
	}

	const handleSelectChange = (event: SelectChangeEvent) => {
		const name = event.target.name as keyof typeof mealplan
		setMealPlan({
			...mealplan,
			[name]: event.target.value,
		})
	}

	const convertType = (data: string | number | undefined) => {
		let val = typeof data === 'string' ? parseInt(data) : data
		return val
	}
	
	//FectAPI
	const fetchFoodInformation = async () => {
		let res = await GetFoodInformations()
		res && setFoodInformation(res)
	}

	const fetchMealType = async () => {
		let res = await GetMealTypes()
		res && setMealType(res)
	}

	const fetchAdminByID = async () => {
		let res = await GetAdminByID()
		mealplan.AdminID = res.ID
		if (res) {
			setAdmin(res)
		}
	}

	const fetchMember = async () => {
		let res = await GetMembers()
		res && setMember(res)
	}


	const submit = async () => {
		let data = {
			TimeToEat: date?.toLocaleString(),
			Description: mealplan.Description,
			AdminID: convertType(mealplan.AdminID),
			MemberID: convertType(mealplan.MemberID),
			MealTypeID: convertType(mealplan.MealTypeID),
			FoodInformationID: convertType(mealplan.FoodInformationID),
		}
		let res = await CreateMealPlans(data)
		if (res.status) {
			setSuccess(true)
			setAlertMessage('บันทึกสารแผนรายการอาหารสำเร็จ')
			window.location.href = '/admin/mealplan-display'
		} else {
			setError(true)
			setAlertMessage(res.message)
		}
		console.log(JSON.stringify(data))
	}
	
	  useEffect(() => {
			fetchAdminByID()
			fetchMember()
			fetchFoodInformation()
			fetchMealType()
		}, [])

    return (
			//! Header
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '50%',
				}}
			>
				<Snackbar
					open={success}
					autoHideDuration={1000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert onClose={handleClose} severity='success'>
						{message}
					</Alert>
				</Snackbar>
				<Snackbar
					open={error}
					autoHideDuration={1000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert onClose={handleClose} severity='error'>
						{message}
					</Alert>
				</Snackbar>

				{/* //!Body */}
				<h1>สร้างแผนรายการอาหาร</h1>
				<Box
					sx={{
						width: '100%',
						justifyContent: 'space-between',
						display: 'flex',
						gap: 2,
						flexDirection: 'column',
					}}
				>
					<Box>
						<Typography>สมาชิก</Typography>
						<Select
							native
							fullWidth
							id='member-name'
							value={mealplan.MemberID + ''}
							onChange={handleSelectChange}
							inputProps={{
								name: 'MemberID',
							}}
						>
							<option aria-label='None' value=''>
								เลือกสมาชิก
							</option>
							{member.map((item: MemberInterface) => (
								<option key={item.ID} value={item.ID}>
									{item.Firstname + ' ' + item.Lastname}
								</option>
							))}
						</Select>
					</Box>

					{/* Food */}
					<Box>
						<Typography>อาหาร</Typography>
						<Select
							native
							fullWidth
							id='food_information'
							value={mealplan.FoodInformationID + ''}
							onChange={handleSelectChange}
							inputProps={{
								name: 'FoodInformationID',
							}}
						>
							<option aria-label='None' value=''>
								เลือกอาหาร
							</option>
							{foodinformation.map((item: FoodInformationInterface) => (
								<option key={item.ID} value={item.ID}>
									{item.Name}
								</option>
							))}
						</Select>
					</Box>

					{/* MealType */}
					<Box>
						<Typography>มื้ออาหาร</Typography>
						<Select
							native
							fullWidth
							id='mealtype'
							value={mealplan.MealTypeID + ''}
							onChange={handleSelectChange}
							inputProps={{
								name: 'MealTypeID',
							}}
						>
							<option aria-label='None' value=''>
								เลือกมื้ออาหาร
							</option>
							{mealtype.map((item: MealTypeInterface) => (
								<option key={item.ID} value={item.ID}>
									{item.Name}
								</option>
							))}
						</Select>
					</Box>


					{/* Admin ถูก Lock เป็น Disable*/}
					<Box>
						<Typography>นักโภชนาการ</Typography>
						<TextField fullWidth disabled id='admin' value={admin.Name} />
					</Box>

					{/* วันเวลาที่ทำการเพิ่ม */}
					<Box>
						<Typography>วันและเวลาที่ต้องรับประทาน</Typography>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								renderInput={props => <TextField fullWidth {...props} />}
								value={date}
								onChange={newValue => {
									setDate(newValue)
								}}
							/>
						</LocalizationProvider>
					</Box>
					{/* Description */}
					<Box>
						<Typography>คำอธิบาย</Typography>
						<TextField
							id='description'
							name='Description'
							value={mealplan.Description}
							onChange={handleInputChange}
							multiline
							placeholder='คำอธิบายเพิ่มเติม'
							minRows={3}
							fullWidth
						/>
					</Box>

					{/* //!Footer */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'right',
							gap: 1,
						}}
					>
						{/* ปุ่มยืนยันและย้อนกลับ */}
						<Button
							sx={{
								backgroundColor: '#6D9886',
								color: '#FFFBF5',
								'&:hover': {
									backgroundColor: '#FFFBF5',
									color: '#393E46',
								},
							}}
							onClick={submit}
						>
							สร้างแผนรายการอาหาร
						</Button>
						<Link
							to='/admin/mealplan-display'
							style={{
								textDecoration: 'none',
							}}
						>
							<Button
								sx={{
									backgroundColor: '#F05454',
									color: '#FFFBF5',
									'&:hover': {
										backgroundColor: '#FFFBF5',
										color: '#393E46',
									},
								}}
							>
								ยกเลิก
							</Button>
						</Link>
					</Box>
				</Box>
			</Container>
		)
}

export default CreateMealPlan
