import React from "react";
import { Container, Box } from "@mui/material";
import styled from "@emotion/styled";
import HoursForm from "../forms/HoursForm";
import Logo from "../forms/Logo";
import { motion } from "framer-motion";
import Nbvr from "./UI/navbar";
import { useUser } from "./UserContext";


//////////////////////////////////
const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  maxWidth: 500,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Hours = ({ setAuth }) => {
  const { user } = useUser();
  return (
    <>
    <Nbvr
      linkto="/adm"
      user={user.username} 
      firstlink="/Signup" 
      firstlabel="Registrar" 
      secondlink="/hour" 
      secondlabel="Horarios"
      thirdlink="/raudi"
      thirdlabel="Inicios"
      fourthlink="/"
      fourtlabel="Acciones"
      visibility="hidden"
    />
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />
          </HeadingStyle>
          <HoursForm setAuth={setAuth} />
        </ContentStyle>
      </Container>
    </RootStyle>
    </>
  );
};

export default Hours;
