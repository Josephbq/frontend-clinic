import React, {useState} from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Textarea,
  Button,
  List,
} from "@material-tailwind/react";
import Radiobtnlist from "./Form-ui-components/Radiobuttonlist";
import Tltop from "../UI/tooltip";
import { toast } from 'react-hot-toast';
import { useUser } from "../UserContext";

function Consulta() {
  const { user } = useUser();
  const [nivelTos, setNivelTos] = useState('');
  const [nivelRespirar, setNivelRespirar] = useState('');
  const [nivelSibilancias, SetNivelSibilancias] = useState('');
  const [nivelExposicion, setNivelExposicion] = useState('');
  const [nivelActividad, setActividad] = useState('');
  const [enfermedades, setEnfermedades] = useState('');

  const manejarCambioTos = (valor) => {
    setNivelTos(valor);
  };

  const manejarcambioRespirar = (valor) => {
    setNivelRespirar(valor);
  };

  const manejarCambioSibilancias = (valor) => {
    SetNivelSibilancias(valor);
  };

  const manejarCambioExposicion = (valor) => {
    setNivelExposicion(valor);
  };

  const manejarCambioActividad = (valor) => {
    setActividad(valor);
  };


  const registerconsulta = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}data/gethc`,
        {
          estado: user.sessionId,
        }
      );
      if (response.data.message === "positivo") {
        toast.error('xxx'+ response.data.hcid, {
          position: "top-right",
        });
        const respuesta = await axios.post(
          `${process.env.REACT_APP_API_URL}register_consulta`,
          {
            hc: response.data.hcid,
            iddoctor: user.id,
            tos: nivelTos,
            respiracion: nivelRespirar,
            sibilancias: nivelSibilancias,
            exposicion: nivelExposicion,
            fisica: nivelActividad,
            otras_enfer: enfermedades
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
    <Card shadow variant="gradient">
      <div className="flex justify-center gap-4 m-4">
        <Typography variant="h5" color="gray">
          Examen Neumologia
        </Typography>
        <Tltop
          header="Informacion"
          body="Anotar la informacion de los campos con su formato correcto"
        />
      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
      <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Tos
            </Typography>
            <Radiobtnlist
              id="vertical-list-Normaltos"
              name="vertical-list-tos"
              label="Normal"
              onChange={() => manejarCambioTos("Normal")}
            />
            <Radiobtnlist
              id="vertical-list-Moderadatos"
              name="vertical-list-tos"
              label="Moderada"
              onChange={() => manejarCambioTos("Moderada")}
            />
            <Radiobtnlist
              id="vertical-list-Gravetos"
              name="vertical-list-tos"
              label="Grave"
              onChange={() => manejarCambioTos("Grave")}
            />
            <Radiobtnlist
              id="vertical-list-Cronicatos"
              name="vertical-list-tos"
              label="Cronica"
              onChange={() => manejarCambioTos("Cronica")}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Dificultad Respiracion
            </Typography>
            <Radiobtnlist
              id="vertical-list-Ningunares"
              name="vertical-list-respiracion"
              label="Ninguna"
              onChange={() => manejarcambioRespirar("Ninguna")}
            />
            <Radiobtnlist
              id="vertical-list-Leveres"
              name="vertical-list-respiracion"
              label="Leve"
              onChange={() => manejarcambioRespirar("Leve")}
            />
            <Radiobtnlist
              id="vertical-list-Moderada"
              name="vertical-list-respiracion"
              label="Moderada"
              onChange={() => manejarcambioRespirar("Moderada")}
            />
            <Radiobtnlist
              id="vertical-list-Graveres"
              name="vertical-list-respiracion"
              label="Grave"
              onChange={() => manejarcambioRespirar("Grave")}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Sibilancias
            </Typography>
            <Radiobtnlist
              id="vertical-list-Ningunasibi"
              name="vertical-list-sibilan"
              label="Ninguna"
              onChange={() => manejarCambioSibilancias("Ninguna")}
            />
            <Radiobtnlist
              id="vertical-list-Levesibi"
              name="vertical-list-sibilan"
              label="Leve"
              onChange={() => manejarCambioSibilancias("Leve")}
            />
            <Radiobtnlist
              id="vertical-list-Moderadasibi"
              name="vertical-list-sibilan"
              label="Moderada"
              onChange={() => manejarCambioSibilancias("Moderada")}
            />
            <Radiobtnlist
              id="vertical-list-Gravesibi"
              name="vertical-list-sibilan"
              label="Grave"
              onChange={() => manejarCambioSibilancias("Grave")}
            />
          </List>
        </Card>
      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
      <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Exposicion Sustancias
            </Typography>
            <Radiobtnlist
              id="vertical-list-Ningunasus"
              name="vertical-list-sustancias"
              label="Ninguna"
              onChange={() => manejarCambioExposicion("Ninguna")}
            />
            <Radiobtnlist
              id="vertical-list-Ocasionalsus"
              name="vertical-list-sustancias"
              label="Ocasional"
              onChange={() => manejarCambioExposicion("Ocasional")}
            />
            <Radiobtnlist
              id="vertical-list-Frecuentesus"
              name="vertical-list-sustancias"
              label="Frecuente"
              onChange={() => manejarCambioExposicion("Frecuente")}
            />
            <Radiobtnlist
              id="vertical-list-Cronicasus"
              name="vertical-list-sustancias"
              label="Cronica"
              onChange={() => manejarCambioExposicion("Cronica")}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Actividad Fisica
            </Typography>
            <Radiobtnlist
              id="vertical-list-Ningunafisi"
              name="vertical-list-actividad"
              label="Ninguna"
              onChange={() => manejarCambioActividad("Ninguna")}
            />
            <Radiobtnlist
              id="vertical-list-Pocafisi"
              name="vertical-list-actividad"
              label="Poca"
              onChange={() => manejarCambioActividad("Poca")}
            />
            <Radiobtnlist
              id="vertical-list-Normalfisi"
              name="vertical-list-actividad"
              label="Normal"
              onChange={() => manejarCambioActividad("Normal")}
            />
            <Radiobtnlist
              id="vertical-list-Intensafisi"
              name="vertical-list-actividad"
              label="Intensa"
              onChange={() => manejarCambioActividad("Intensa")}
            />
          </List>
        </Card>

        <Textarea
          value={enfermedades}
          onChange={(e) => setEnfermedades(e.target.value)}
          label="Otras Enfermedades"
        />
      </div>
      <Button onClick={registerconsulta} className="gap-4">Guardar</Button>
    </Card>
  );
}
export default Consulta;
