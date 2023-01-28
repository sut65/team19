import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { Avatar } from "@mui/material";
import Typography from "@mui/material";
import Box from "@mui/system";

function ProfileMember() {
    return(
        <Container>
            <h1>Profile Member</h1>
            <Avatar
            src="/static/images/avatar/1.jpg" 
            sx={{ width: 100, height: 100 }}/>
        </Container>
        
    );
}

export default ProfileMember;