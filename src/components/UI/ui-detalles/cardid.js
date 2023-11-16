import React from "react";
import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function Cardinfodemo({fecha,talla,peso,imc,fc,fr,pa,so,temp,otr}){
    const fechabd = new Date(fecha);
    const fechacorregida = format(fechabd, "dd MMMM yyyy", { locale: es });
    return (
        <Card className="m-4" color="teal">
          <CardBody className="flex gap-4 items-left">
            <div className="grid">
            <Typography variant="h5" color="blue-gray" className="items-left">
                Fecha de consulta : {fechacorregida}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="items-left">
                Talla : {talla}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="items-left">
                Peso : {peso}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="items-left">
                Imc : {imc}
            </Typography>
            </div>
            <div className="grid">
            <Typography variant="h5" color="blue-gray" className="items-left">
                Frecuencia Cardiaca : {fc}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="items-left">
                Frecuencia Respiratoria : {fr}
            </Typography>
            <Typography variant="h5" color="white" className="items-left">
                Presion Arterial : {pa}
            </Typography>
            <Typography variant="h5" color="white" className="items-left">
                Saturacion de Oxigeno : {so}
            </Typography>
            </div>
            <Typography variant="h5" color="white" className="items-left">
                Temperatura : {temp}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="items-left">
                Otros : {otr}
            </Typography>
          </CardBody>
        </Card>
      ); 
}
