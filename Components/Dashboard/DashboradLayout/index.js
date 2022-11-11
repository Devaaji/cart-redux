import { Box } from "@chakra-ui/react";
import React from "react";
import DashboardNavbar from "../DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <React.Fragment>
      <DashboardNavbar />
      <Box p="5">{children}</Box>
    </React.Fragment>
  );
};

export default DashboardLayout;
