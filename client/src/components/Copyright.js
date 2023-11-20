import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright © Team - 76{" "}
      <Link to="/" color="inherit">
      (E)Gam-Zon
      </Link>
    </Typography>
  );
};

export default Copyright;
