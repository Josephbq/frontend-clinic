import React, { useState } from "react";
import axios from "axios";
import { Card, Typography, List, Textarea, Button, } from "@material-tailwind/react";
import CheckboxListItem from "./Form-ui-components/Checkboxlistitem";
import Tltop from "../UI/tooltip";
import { toast } from 'react-hot-toast';
import { useUser } from "../UserContext";

function AntePato() {
  const { user } = useUser();
  const [enfermedad, setEnfermedad] = useState([]);
  const [familiar, setFamiiiar] = useState([]);
  const [detalles, setDetalles] = useState("");
  const [resumen, setResumen] = useState("");

  const manejarCambioEnfermedad = (valor, isChecked) => {
    if (isChecked) {
      setEnfermedad([...enfermedad, valor]);
    } else {
      setEnfermedad(enfermedad.filter(enfermedad => enfermedad !== valor));
    }
  };
  const manejarCambioFamiliar = (valor, isChecked) => {
    if (isChecked) {
      setFamiiiar([...familiar, valor]);
    } else {
      setFamiiiar(familiar.filter(familiar => familiar !== valor));
    }
  };
  const manejarGuardar = () =>{
    console.log('enfer: ', enfermedad);
    console.log('familair: ', familiar);
    console.log('details: ', detalles);
    console.log('resumen: ', resumen);
    console.log('sese: ', user.sessionId);
  }

  const registerpatologias = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}data/session`,
        {
          estado: user.sessionId,
        }
      );
      if (response.data.message === "positivo") {
        toast.error('xxx'+ response.data.paciente, {
          position: "top-right",
        });
        const respuesta = await axios.post(
          `${process.env.REACT_APP_API_URL}register_patologias`,
          {
            paciente: response.data.paciente,
            patologia: enfermedad.join(', '),
            familiar: familiar.join(', '),
            detalles: detalles,
            resumen: resumen
          }
        );
        if (respuesta.data.message === 'Register successful') {
          toast('Registrado Parcialmente', {
            icon: '👏',
            duration: 4000,
            position: "top-right",
          });
        }
        if(respuesta.data.message === 'Ocurrió un error al registrar el usuario'){
          toast.error('ocurrio un error', {
            position: "top-right",
          });
        }
      }

    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
    }
  };

  return (
    <Card variant="gradient">
      <div className="flex justify-center gap-4 m-4">
        <Typography variant="h5" color="gray">
          Antecendentes Patologicos
        </Typography>
        <Tltop
          header="Informacion"
          body="Anotar las patologias/explicar los detalles de su patologia o demas enfermedades"
        />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Patologias
            </Typography>
            <CheckboxListItem
              id="vertical-list-alergia"
              name="vertical-list-patologia"
              label="Alergia"
              onChange={(valor, isChecked) => manejarCambioEnfermedad(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-tuber"
              name="vertical-list-patologia"
              label="Tuberculosis"
              onChange={(valor, isChecked) => manejarCambioEnfermedad(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-diabetes"
              name="vertical-list-patologia"
              label="Diabetes"
              onChange={(valor, isChecked) => manejarCambioEnfermedad(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-Hiper"
              name="vertical-list-patologia"
              label="Hipertension"
              onChange={(valor, isChecked) => manejarCambioEnfermedad(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-cancer"
              name="vertical-list-patologia"
              label="Cancer"
              onChange={(valor, isChecked) => manejarCambioEnfermedad(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-cirugias"
              name="vertical-list-patologia"
              label="Cirugia(s)"
              onChange={(valor, isChecked) => manejarCambioEnfermedad(valor, isChecked)}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Familiares Parentesco
            </Typography>
            <CheckboxListItem
              id="vertical-list-falergia"
              name="vertical-list-parentesco"
              label="Si"
              onChange={(valor, isChecked) => manejarCambioFamiliar(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-ftuber"
              name="vertical-list-parentesco"
              label="Si"
              onChange={(valor, isChecked) => manejarCambioFamiliar(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-fdiabetes"
              name="vertical-list-parentesco"
              label="Si"
              onChange={(valor, isChecked) => manejarCambioFamiliar(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-fHiper"
              name="vertical-list-parentesco"
              label="Si"
              onChange={(valor, isChecked) => manejarCambioFamiliar(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-fcancer"
              name="vertical-list-parentesco"
              label="Si"
              onChange={(valor, isChecked) => manejarCambioFamiliar(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-fcirugias"
              name="vertical-list-parentesco"
              label="Si"
              onChange={(valor, isChecked) => manejarCambioFamiliar(valor, isChecked)}
            />
          </List>
        </Card>
        <Textarea value={detalles} onChange={(e) => setDetalles(e.target.value)} label="Detalles" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea value={resumen} onChange={(e) => setResumen(e.target.value)} label="Resumen de la enfermedad actual" />
        <Button onClick={registerpatologias}>Guardar</Button>
      </div>
    </Card>
  );
}

export default AntePato;
