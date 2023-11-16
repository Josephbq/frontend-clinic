import React from "react";
import {
  Card,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import Tltop from "../UI/tooltip";

function ExaFisi() {
  return (
    <Card shadow variant="gradient">
      <div className="flex justify-center gap-4 m-4">
      <Typography variant="h5" color="gray">
        Examen Fisico
      </Typography>
      <Tltop header="Informacion" body="Anotar la informacion de los campos con su formato correcto" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input label="Talla" type="text" />
        <Input label="Peso" type="text" />
        <Input label="IMC" type="text" />

      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input label="Presion arterial" type="text" color="black" variant="outlined" />
        <Input label="Frecuencia cardiaca" type="text" />
        <Input label="Frecuencia respiratoria" type="text" />
        <Input label="Temperatura Actual" type="text" />
        <Input label="Saturacion de oxigeno" type="text" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea label="Otras alteraciones" />
      </div>
    </Card>
  );
}
export default ExaFisi;
