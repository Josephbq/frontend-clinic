import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function Cardp({ nombre, apellido, fecha, dom, idp }) {
  const fechabd = new Date(fecha);
  const fechacorregida = format(fechabd, "dd MMMM yyyy", { locale: es });
  return (
    <Card color="teal" shadow={true} className="w-full max-w-[26rem] m-4" >
      <CardHeader
        color="transparent"
        floated={true}
        shadow={false}
        className="m-4 flex items-center gap-4 pt-0 "
      >

        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="white">
              {nombre} {apellido}
            </Typography>
            <div className="5 flex items-center gap-0">
              <Link to={`/detalles/${idp}`}>
                <Button color="indigo">Ver</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="m-4">
        <Typography>Fecha de N: {fechacorregida}</Typography>
        <Typography>Domicilio: {dom}</Typography>
      </CardBody>
    </Card>
  );
}
