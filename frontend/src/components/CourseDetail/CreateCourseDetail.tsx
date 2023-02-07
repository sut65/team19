import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button, TextField, Select, styled, SelectChangeEvent, Box, Snackbar,
} from "@mui/material";
//import { Box } from "@mui/system";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdminInterface } from "../../interfaces/IAdmin";
import { DescriptionInterface } from "../../interfaces/IDescription";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { PriceInterface } from "../../interfaces/IPrice";

// api
import {
  GetAdminByID,
  GetDescription,
  GetPrice,
  createCourseDetail,
} from "../../services/HttpClientService";
import Admin from "../../pages/login/Admin";

// Style
const ImgBox = styled(Box)({
  width: "280px",
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateCourseDetail() {
  //const date = new Date();
  const [courseDetail, setCourseDetail] = useState<CourseDetailInterface>({});
  const [description, setDescription] = useState<DescriptionInterface[]>([]);
  const [price, setPrice] = useState<PriceInterface[]>([]);
  const [admin, setAdmin] = useState<AdminInterface>({ Name: "" });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({ name: "", src: "" });

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

  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof courseDetail;

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "CoverPage") {
        setCourseDetail({ ...courseDetail, [name]: dataURL?.toString() });
      }
    };
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof courseDetail;
    setCourseDetail({
      ...courseDetail,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setCourseDetail({ ...courseDetail, [name]: e.target.value });
  };

  const fetchDescription = async () => {
    let res = await GetDescription();
    res && setDescription(res);
  };

  const fetchPrice = async () => {
    let res = await GetPrice();
    res && setPrice(res);
  };

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    courseDetail.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  // insert data to db
  const submit = async () => {
    let data = {
      DescriptionID: convertType(courseDetail.DescriptionID),
      PriceID: convertType(courseDetail.PriceID),
      AdminID: convertType(courseDetail.AdminID),
      CoverPage: courseDetail.CoverPage,
      CourseName: courseDetail.CourseName,
    };

    let res = await createCourseDetail(data);
    res ? setSuccess(true) : setError(true);
    window.location.href = "/admin/course"
  };

  useEffect(() => {
    fetchDescription();
    fetchPrice();
    fetchAdminByID();
  }, []);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      flexFlow: "",
      overflow: "auto",
      alignItems: "center",
      gap: 6,
      height: "100vh",
      width: "100%",
      backgroundSize: "cover",
      color: "#f5f5f5",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)))`,
    }}>
      <Box
        sx={{
          position: "relative",
          width: "50%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // mt: "6rem",
          gap: "1rem",
          mb: "10rem",
        }}
      >
        {/* Alert */}
        <Snackbar
          open={success}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            บันทึกข้อมูลสำเร็จ
          </Alert>
        </Snackbar>

        <Snackbar
          open={error}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ
          </Alert>
        </Snackbar>
        {/* Upload Cover Page */}
        <Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              position: "absolute",
              left: "0",
              backgroundColor: "#f2f2f2",
              color: "#252525",
            }}
          >
            Upload Cover Page
            <input
              id="coverImage"
              name="CoverImage"
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleChangeImages}
            />
          </Button>
        </Box>

        <ImgBox>
          <img src={image.src} alt={image.name} style={{ width: "100%" }} />
        </ImgBox>

        {/* CourseName */}
        <TextField
          sx={{
            "& fieldset": { border: "none" },
            marginTop: "1.8rem",
            width: "100%",
          }}
          id="course_name"
          name="CourseName"
          value={courseDetail.CourseName}
          onChange={handleInputChange}
          placeholder="ชื่อคอร์ส"
          variant="outlined"
          inputProps={{ style: { fontSize: 36 } }}
          InputLabelProps={{ style: { fontSize: 40 } }}
        />

        {/* Course Type and admin*/}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "2rem",
            flexGrow: 1,
            mt: 2,
          }}
        >
          {/* course type */}
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Select
              native
              fullWidth
              id="course_type"
              value={courseDetail.DescriptionID + ""}
              onChange={handleSelectChange}
              inputProps={{
                name: "DescriptionID",
              }}
            >
              <option aria-label="None" value="">
                ประเภทคอร์ส
              </option>
              {description.map((item: DescriptionInterface) => (
                <option key={item.ID} value={item.ID}>
                  {item.CourseType}
                </option>
              ))}
            </Select>
          </Box>

          {/* Admin */}
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Select
              native
              fullWidth
              id="admin"
              value={courseDetail.AdminID + ""}
              onChange={handleSelectChange}
              disabled
              inputProps={{
                name: "AdminID",
              }}
            >
              <option value={admin?.ID} key={admin?.ID}>
                {admin?.Name}
              </option>
            </Select>
          </Box>
        </Box>

        {/*price and duration*/}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "2rem",
            flexGrow: 1,
            mt: 2,
          }}
        >
          {/* price */}
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Select
              native
              fullWidth
              id="price"
              value={courseDetail.PriceID + ""}
              onChange={handleSelectChange}
              inputProps={{
                name: "PriceID",
              }}
            >
              <option aria-label="None" value="">
                ราคา
              </option>
              {price.map((item: PriceInterface) => (
                <option key={item.ID} value={item.ID}>
                  {item.Price}
                </option>
              ))}
            </Select>
          </Box>

          {/* duration */}
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Select
              native
              fullWidth
              id="duration"
              value={courseDetail.PriceID + ""}
              onChange={handleSelectChange}
              inputProps={{
                name: "PriceID",
              }}
            >
              <option aria-label="None" value="">
                ระยะเวลาคอร์ส
              </option>
              {price.map((item: PriceInterface) => (
                <option key={item.ID} value={item.ID}>
                  {item.Duration}
                </option>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Goal */}
        <TextField
          id="goal"
          name="Goal"
          value={courseDetail.Description?.Goal}
          onChange={handleInputChange}
          multiline
          placeholder="เป้าหมายคอร์ส"
          minRows={2}
          sx={{
            fontSize: "1.5rem",
            minWidth: "100%",
            minHeight: 80,
          }}
        />

        {/* Description */}
        <TextField
          id="description"
          name="Description"
          value={courseDetail.Description?.Description}
          onChange={handleInputChange}
          multiline
          placeholder="คำอธิบายคอร์ส"
          minRows={8}
          sx={{
            fontSize: "1.5rem",
            minWidth: "100%",
            minHeight: 200,
          }}
        />

        {/* Button */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="success"
            sx={{
              width: "120px",
              margin: "0 0 16px 14px",
              color: "#fff",
              borderRadius: 20,
              padding: "8px 16px",
              fontSize: "1rem",
            }}
            onClick={submit}
            className="btn-user"
            variant="contained"
          >
            Publish
          </Button>
          <Link to="/admin/course" style={{ textDecoration: "none" }}>
            <Button
              className="btn-user"
              variant="contained"
              style={{
                width: "120px",
                margin: "0 0 16px 14px",
                color: "#fff",
                borderRadius: 20,
                backgroundColor: "#333",
                padding: "8px 16px",
                fontSize: "1rem",
              }}
            >
              Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateCourseDetail;
