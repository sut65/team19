import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Select } from "@mui/material";
import { Box } from "@mui/system";

const category = [
  {
    id: 1,
    name: "การกิน",
  },
  {
    id: 2,
    name: "ออกกำลังกาย",
  },
];

const tag = [
  {
    id: 1,
    name: "มทส",
  },
  {
    id: 2,
    name: "test",
  },
];

function CreateBlog() {
  return (
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
      }}
    >
      {/* Upload file */}
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
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Box>

      {/* Title */}
      <TextField
        sx={{
          marginTop: "1.8rem",
          width: "100%",
          "&.Mui-focused": {
            outline: "none",
          },
        }}
        id="title"
        label="Title"
        variant="standard"
        inputProps={{ style: { fontSize: 40 } }}
        InputLabelProps={{ style: { fontSize: 40 } }}
      />
      {/* Category and Tag */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "2rem",
          flexGrow: 1,
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Select
            required
            native
            fullWidth
            id="category"
            inputProps={{
              name: "CategoryID",
            }}
          >
            <option aria-label="None" value="">
              หมวดหมู่
            </option>
            {category.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>

        {/* Tag */}
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Select
            required
            native
            fullWidth
            id="roomZone"
            inputProps={{
              name: "TagID",
            }}
          >
            <option aria-label="None" value="">
              Tag
            </option>
            {tag.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Content */}
      <TextField
        multiline
        placeholder="Tell your story..."
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
          className="btn-user"
          variant="contained"
          style={{
            width: "120px",
            margin: "0 0 16px 14px",
            color: "#fff",
            borderRadius: 20,
            backgroundColor: "#3b82f6",
            padding: "8px 16px",
            fontSize: "1rem",
          }}
        >
          Publish
        </Button>
        <Link to="/article" style={{ textDecoration: "none" }}>
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
  );
}

export default CreateBlog;
