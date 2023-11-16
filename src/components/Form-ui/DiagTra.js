import React from "react";
import { Card, Typography, Textarea } from "@material-tailwind/react";
import Tltop from "../UI/tooltip";

function DiagTra() {
  return (
    <Card color="yellow" shadow variant="gradient">
      <div className="flex justify-center gap-4 m-4">
        <Typography variant="h5" color="gray">
          Diagnostico y Tratamiento
        </Typography>
        <Tltop header="Informacion" body="Anotar la patologia/enfermedad/problemas que presenta el paciente, y su tratamiento como posibles medicamentos" />
      </div>

      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea label="Diagnostico" />
        <Textarea label="Soluciones/medicamentos" />
      </div>
    </Card>
  );
}
export default DiagTra;
