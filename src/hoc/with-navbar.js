import React, { memo } from "react";
import { Text, Box, Image, Icon } from "goods-core";
import Navbar from "../components/navbar";

const withNavbar = ({ title, withBackButton }) => (Component) =>
  memo((props) => {
    return (
      <Box w as="main" fAlign="center" overflow="hidden">
        <Navbar title={title} withBackButton={withBackButton} />
        <Component {...props} />
      </Box>
    );
  });

export default withNavbar;
