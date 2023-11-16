import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/static/hospital.png" alt="logo" width="400px" class="align-items-center"/>
      </Link>
    </Box>
  );
};

export default Logo;
