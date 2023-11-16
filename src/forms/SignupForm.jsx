import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider, Field } from "formik";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Stack,
  Box,
  TextField,
  IconButton,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

/////////////////////////////////////////////////////////////
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

const opciones = [
  { value: 'Cardiologia', label: 'Cardiologia' },
  { value: 'Nefrologia', label: 'Nefrologia' },
  { value: 'Dermatologia', label: 'Dermatologia' },
  { value: 'Pediatria', label: 'Pediatria' },
  { value: 'Neumologia', label: 'Neumologia' },
];

const SignupForm = ({ setAuth }) => {
  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Muy Corto!")
      .max(50, "Muy Largo!")
      .required("Nombre requerido"),
    lastName: Yup.string()
      .min(2, "Muy Corto")
      .max(50, "Muy Largo!")
      .required("Apellido requerido"),
    email: Yup.string()
      .email("Ingresa un Correo Valido")
      .required("Correo es requerido"),
    password: Yup.string().required("Contraseña es requerida"),
    passwordtwo: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirmación de contraseña es requerida'),
    lastnametwo: Yup.string()
      .min(2, "Muy Corto")
      .max(50, "Muy Largo!")
      .required("Apellido requerido"),
    sexo: Yup.string()
      .required("Este campo es obligatorio"),
    opcionSeleccionada: Yup.string()
      .required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      lastnametwo: "",
      email: "",
      password: "",
      passwordtwo: "",
      opcionSeleccionada: "",
      sexo: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      setTimeout(() => {
      }, 2000);
    },
  });

  const { errors, touched, isSubmitting, getFieldProps, values } = formik;

  const registerlog = async (e) => {
    e.preventDefault();

    const trimmedFirstName = values.firstName.trim();
    const trimmedLastName = values.lastName.trim();
    const trimmedLastNameM = values.lastnametwo.trim();
    const trimmedsexo = values.sexo.trim();
    const trimmedOption = values.opcionSeleccionada.trim();
    const trimmedEmail = values.email.trim();
    const trimmedPassword = values.passwordtwo.trim();
    
  
    // Validar que los campos no estén vacíos
    if (trimmedFirstName === "" || trimmedLastName === "" || trimmedLastNameM === "" || trimmedsexo === "" || trimmedOption === "" || trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Por favor, complete todos los campos.", {
        position: "top-right",
      });
      return;
    }
  
    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@agramont\.com$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("El correo debe ser institucional (@agramont.com).", {
        position: "top-right",
      });
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}register`, { username: trimmedFirstName, lastname: trimmedLastName, lastnamem: trimmedLastNameM, sexo: trimmedsexo, option: trimmedOption, email: trimmedEmail, password: trimmedPassword });
      if (response.data.message === 'Register successful') {
        toast('Registrado Correctamente ' + trimmedFirstName, {
          icon: '👏',
          duration: 4000,
          position: "top-right",
        });
      }
      if(response.data.message === 'Email Dupli'){
        toast.error('Correo ya registrado', {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={registerlog}>
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Nombre"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Apellido Paterno"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          
          </Stack>

          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Apellido Materno"
              {...getFieldProps("lastnametwo")}
              error={Boolean(touched.lastnametwo && errors.lastnametwo)}
              helperText={touched.lastnametwo && errors.lastnametwo}
            />

            <TextField
              fullWidth
              label="Sexo"
              {...getFieldProps("sexo")}
              error={Boolean(touched.sexo && errors.sexo)}
              helperText={touched.sexo && errors.sexo}
            />
          
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Correo"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          <Field name="opcionSeleccionada">
            {({ field }) => (
              <TextField
                {...field}
                select
                label="Area"
                variant="outlined"
                fullWidth
                {...getFieldProps("opcionSeleccionada")}
                error={Boolean(touched.opcionSeleccionada && errors.opcionSeleccionada)}
              helperText={touched.opcionSeleccionada && errors.opcionSeleccionada}
              >
                {opciones.map((opcion) => (
                  <MenuItem key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>
            
          </Stack>
          <Stack
          spacing={3}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Repite la Contraseña"
              {...getFieldProps("passwordtwo")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.passwordtwo && errors.passwordtwo)}
              helperText={touched.passwordtwo && errors.passwordtwo}
            />

          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Registrarse
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
