import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Field } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Stack, Box, TextField, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import { Input } from "@material-tailwind/react";
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
  { value: "monday", label: "Lunes" },
  { value: "tuesday", label: "Martes" },
  { value: "wednesday", label: "Miercoles" },
  { value: "thrusday", label: "Jueves" },
  { value: "friday", label: "Viernes" },
  { value: "saturday", label: "Sabado" },
  { value: "sunday", label: "Domingo" },
];

const HoursForm = ({ setAuth }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/getdocs`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const SignupSchema = Yup.object().shape({
    doc: Yup.string().required("Medico Requerido"),
    dia: Yup.string().required("Dia requerido"),
  });

  const formik = useFormik({
    initialValues: {
      doc: "",
      dia: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      setTimeout(() => {}, 2000);
    },
  });

  const { errors, touched, isSubmitting, getFieldProps, values } = formik;

  const registerlog = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}hour`,
        { doc: values.doc, dia: values.dia, horae: value, horas: value2 }
      );
      if (response.data.message === "register_successful") {
        toast("Registrado Correctamente ", {
          icon: "👏",
          duration: 4000,
          position: "top-right",
        });
      }
      if (response.data.message === "problem") {
        toast.error("Ocurrio un problema", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
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
            spacing={2}
          >
            <Field name="doc">
              {({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Doctor"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("doc")}
                  error={Boolean(touched.doc && errors.doc)}
                  helperText={touched.doc && errors.doc}
                >
                  {data.map((record) => (
                    <MenuItem key={record.id} value={record.idDoctor}>
                      {record.nombres}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Field>
            <Field name="dia">
              {({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Dia"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("dia")}
                  error={Boolean(touched.dia && errors.dia)}
                  helperText={touched.dia && errors.dia}
                >
                  {opciones.map((opcion) => (
                    <MenuItem key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Field>
            <Stack
              spacing={3}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={animate}
              direction={{ xs: "column", sm: "row" }}
            ></Stack>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              label="Hora de entrada"
              type="time"
              color="indigo"
            />
          </Stack>
          <Stack>
            <Input
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              label="Hora de salida"
              type="time"
              color="indigo"
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
              Registrar Horario
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default HoursForm;
