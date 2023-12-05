import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nbvr from "./UI/navbar";
import { useUser } from "./UserContext";
import { Cardinfodemo } from "./UI/ui-detalles/cardid";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import PreLoader1 from "./PreLoader1";

export function Detalles() {
  const { user } = useUser();
  const { pacienteId } = useParams();
  const [pacienteInfo, setPacienteInfo] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}pacientes/${pacienteId}`)
      .then((response) => {
        setPacienteInfo(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos del paciente:", error);
      });
  }, [pacienteId]);

  if (!pacienteInfo) {
    return(
      <PreLoader1 />
    )
  }

  const historialesPorFecha = {};
  pacienteInfo.historiales_clinicos.forEach((historial) => {
    const fecha = historial.fecha;
    if (!historialesPorFecha[fecha]) {
      historialesPorFecha[fecha] = [];
    }
    historialesPorFecha[fecha].push(historial);
  });

  return (
    <>
      <Nbvr
        linkto="/panel"
        user={user.username}
        firstlink="/hce"
        firstlabel="Hce"
        secondlink="/perfil" ///cambiar
        secondlabel="Perfil"
        thirdlink="/panel" ///cambiar
        thirdlabel="Horarios"
        sexs="visible"
      />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Historial Clinico
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Historia clinica del paciente {pacienteInfo.nombre}{" "}
                {pacienteInfo.apellidoM}
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Button className="flex items-center gap-3" size="sm">
                <Link to="/hceEvo" className="flex items-center gap-3">
                  <PlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar
                  Seccion Evolucion
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <h2>Detalles del Paciente</h2>
            <p>Nombre: {pacienteInfo.nombre}</p>
            <p>Sexo: {pacienteInfo.sexo}</p>
            <p>Celular: {pacienteInfo.celular}</p>
            <p>ApelldioM: {pacienteInfo.apellidoM}</p>
          </div>
          <h3>Historiales Clínicos:</h3>
          {Object.keys(historialesPorFecha).map((fecha) => (
            <div key={fecha}>
              <ul>
                {historialesPorFecha[fecha].map((historial, index) => (
                  <li key={index}>
                    <Cardinfodemo 
                      fecha={fecha}
                      talla={historial.talla}
                      peso={historial.peso}
                      imc={historial.imc}
                      fr={historial.frecuenciar}
                      fc={historial.frecuenciac}
                      pa={historial.presiona}
                      so={historial.saturacion}
                      temp={historial.temperatura}
                      otr={historial.otros}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
