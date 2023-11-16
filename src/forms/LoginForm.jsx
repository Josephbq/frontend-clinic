import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";
import { useUser } from "../components/UserContext";

import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const LoginForm = ({ setAuth }) => {
  const { setUser } = useUser();

  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingresa un correo valido")
      .required("Correo es requerido"),
    password: Yup.string().required("Password es requerido"),
  });

  const sublog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}login`,
        { username: values.email, password: values.password }
      );
      switch (response.data.message) {
        case "Adm Log":
          toast.success("Admin: " + response.data.username, {
            duration: 4000,
            position: "top-right",
          });
          setUser({
            username: response.data.username,
            sessionId: response.data.session_id,
          });
          history.push({
            pathname: "/adm",
          });
          break;
        case "Login successful":
          toast("Bienvenido " + response.data.username, {
            icon: "👏",
            duration: 4000,
            position: "top-right",
          });
          setUser({
            username: response.data.username,
            sessionId: response.data.session_id,
          });
          history.push({
            pathname: "/panel",
          });
          break;
        case "Login failed":
          toast.error("Credenciales inválidas", {
            position: "top-right",
          });
          break;
        case "Fuera de horario laboral":
          toast.error("Ingrese en Horario laboral", {
            position: "top-right",
          });
          break;
        case "El doctor no tiene horario laboral hoy":
          toast.error("No tiene horario asignado por favor contactese con el administrador",{
              position: "top-right",
          });
          break;
        case "An error occurred":
          toast.error("Ocurrió un problema, inténtalo más tarde", {
            position: "top-right",
          });
          break;
        default:
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
  });

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={sublog}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Correo electronico"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Icon icon="eva:eye-fill" />
                      ) : (
                        <Icon icon="eva:eye-off-fill" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link
                component={RouterLink}
                variant="subtitle4"
                to="#"
                underline="hover"
              >
                ¿Olvidaste tu password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Login"}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
