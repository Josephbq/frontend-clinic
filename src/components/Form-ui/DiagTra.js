import React, { useEffect, useState } from "react";
import { Card, Typography, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useUser } from "../UserContext";
import Tltop from "../UI/tooltip";

function DiagTra() {
  const { user } = useUser();
  const [pacienteInfo, setPacienteInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}ml/${user.sessionId}`)
      .then((response) => {
        setPacienteInfo(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos del paciente:", error);
      });
  }, []);
    if (!pacienteInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <Card color="" shadow variant="gradient">
      <div>
            <h2>Detalles del Paciente</h2>
            <p>genero: {pacienteInfo.predicciones}</p>
            <p>edad: {pacienteInfo.edad}</p>
            <p>talla: {pacienteInfo.talla}</p>
            <p>peso: {pacienteInfo.peso}</p>
            <p>antecedentes_familiares: {pacienteInfo.antecedentes_familiares}</p>
            <p>tos_cronica: {pacienteInfo.tos_cronica}</p>
            <p>dificultad_respirar: {pacienteInfo.dificultad_respirar}</p>
            <p>sibilancias: {pacienteInfo.sibilancias}</p>
            <p>habitos: {pacienteInfo.habitos}</p>
            <p>exposicion_sustancias_irritantes: {pacienteInfo.exposicion_sustancias_irritantes}</p>
            <p>ocupacion: {pacienteInfo.ocupacion}</p>
            <p>otros_diagnosticos: {pacienteInfo.otros_diagnosticos}</p>
            <p>nivel_actividad_fisica: {pacienteInfo.nivel_actividad_fisica}</p>
            <p>enfermedad_posible: {pacienteInfo.enfermedad_posible}</p>
          </div>
      <div className="flex justify-center gap-4 m-4">
        <Typography variant="h5" color="gray">
          Diagnostico y Tratamiento
        </Typography>
        <Tltop header="Informacion" body="Anotar la patologia/enfermedad/problemas que presenta el paciente, y su tratamiento como posibles medicamentos" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea label="Prediccion" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea label="Diagnostico" />
        <Textarea label="Soluciones/medicamentos" />
      </div>
    </Card>
  );
}
export default DiagTra;
