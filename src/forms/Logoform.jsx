import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logof = ({lnk}) => {
  return (
    <Box>
      <Link to={lnk}>
        <Box component="img" src="/static/hospital.png" alt="logo" width="200px" />
      </Link>
    </Box>
  );
};

export default Logof;
