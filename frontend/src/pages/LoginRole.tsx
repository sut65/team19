import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function LoginRole() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80)`,
        }}
      >
        <Typography
          className="animation"
          variant="h1"
          style={{ textTransform: "uppercase", color: "#fff" }}
        >
          Team 19
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          {/* User */}
          <Link
            to="user"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className="btn-user"
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ color: "#333" }} />}
              style={{
                color: "#333",
                borderRadius: 20,
                backgroundColor: "#fff",
                padding: "18px 36px",
                fontSize: "18px",
              }}
            >
              User
            </Button>
          </Link>
          
          {/* Trainer */}
          <Link
            to="trainer"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className="btn-user"
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ color: "#333" }} />}
              style={{
                color: "#333",
                borderRadius: 20,
                backgroundColor: "#fff",
                padding: "18px 36px",
                fontSize: "18px",
              }}
            >
              Trainer
            </Button>
          </Link>

          <Link
            to="admin"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className="btn-admin"
              variant="contained"
              startIcon={<AdminPanelSettingsIcon />}
              style={{
                color: "#fff",
                borderRadius: 20,
                backgroundColor: "#393a3c",
                padding: "18px 36px",
                fontSize: "18px",
              }}
            >
              Admin
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default LoginRole