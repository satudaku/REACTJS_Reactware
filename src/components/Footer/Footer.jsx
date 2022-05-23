import React from "react";
import { Typography, Box, Container } from "@material-ui/core";
import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Container className={classes.footer}>
        <Box textAlign="center" pt={3}>
          <Typography style={{ color: "white" }}>
            ©{new Date().getFullYear()} Daiki Sato Reactware. All Right Reserved
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
