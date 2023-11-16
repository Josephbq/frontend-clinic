import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Input,
  List,
  Button,
} from "@material-tailwind/react";
import CheckboxListItem from "./Form-ui-components/Checkboxlistitem";
import Radiobtnlist from "./Form-ui-components/Radiobuttonlist";
import { toast } from 'react-hot-toast';
import { useUser } from "../UserContext";

function AnteNoPato() {
  const { user } = useUser();
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [nombres, setNombres] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ci, setCi] = useState("");
  const [direccion, setDireccion] = useState("");
  const [sexo, setSexo] = useState("");
  const [nivelEstudios, setNivelEstudios] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [origen, setOrigen] = useState('');
  const [sanamiento, setSanamiento] = useState('');
  const [alimentacion, setAlimentacion] = useState('');
  const [habitos, setHabitos] = useState([]);



  const manejarCambioNivelEstudios = (valor) => {
    setNivelEstudios(valor);
  };
  const manejarCambioCivil = (valor) => {
    setEstadoCivil(valor);
  };
  const manejarCambioOcupacion = (valor) => {
    setOcupacion(valor);
  };
  const manejarCambioOrigen = (valor) => {
    setOrigen(valor);
  };
  const manejarCambioSanamiento = (valor) => {
    setSanamiento(valor);
  };
  const manejarCambioAlimentacion = (valor) => {
    setAlimentacion(valor);
  };
  const manejarCambioHabitos = (valor, isChecked) => {
    if (isChecked) {
      setHabitos([...habitos, valor]);
    } else {
      setHabitos(habitos.filter(habito => habito !== valor));
    }
  };

  const manejarGuardar = () => {
    console.log('Apellido Paterno:', apellidoPaterno);
    console.log('Apellido Materno:', apellidoMaterno);
    console.log('Nombres:', nombres);
    console.log('Fecha de Nacimiento:', fechaNacimiento);
    console.log('Telefono:', telefono);
    console.log('Ci:', ci);
    console.log('Direccion:', direccion);
    console.log('Sexo:', sexo);
    console.log(user.sessionId);
    console.log('nivel:', nivelEstudios);
  };
  const registerPaciente = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}register_paciente`, { fechanac: fechaNacimiento, telefono: telefono, nombres: nombres, apellidop: apellidoPaterno, apellidom: apellidoMaterno, sexo: sexo, ci: ci, domicilio: direccion, estado: user.sessionId });
      if (response.data.message === 'Register successful') {
        toast('Registrado Parcialmente', {
          icon: '👏',
          duration: 4000,
          position: "top-right",
        });
      }
      if(response.data.message === 'Ocurrió un error al registrar el usuario'){
        toast.error('ocurrio un error', {
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
    const registerantecedentes = async (e) => {
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
            `${process.env.REACT_APP_API_URL}register_antecedentes`,
            {
              paciente: response.data.paciente,
              estudios: nivelEstudios,
              estado_civil: estadoCivil,
              ocupacion: ocupacion,
              origen: origen,
              sanamiento: sanamiento,
              alimentacion: alimentacion,
              habitos: habitos.join(', ')
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
    <Card color="transparent" shadow>
      <Typography variant="h5" color="gray">
        Antecendentes no patologicos
      </Typography>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} label="Apellido Paterno" type="text" />
        <Input value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)}label="Apellido Materno" type="text" />
        <Input value={nombres} onChange={(e) => setNombres(e.target.value)}label="Nombre(s)" type="text" />
        <Input value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} label="Fecha de Nacimiento" type="text" />
        <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} label="Telefono" type="text" />
        <Input value={ci} onChange={(e) => setCi(e.target.value)} label="Ci" type="text" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} label="Direccion" type="text" />
        <Input  value={sexo} onChange={(e) => setSexo(e.target.value)} label="Sexo" type="text" />
        <Button  onClick={registerPaciente}>Guardar</Button>
      </div>

      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Estudios
            </Typography>
            <Radiobtnlist
              id="vertical-list-primario"
              name="vertical-list-estudios"
              label="Primario"
              onChange={() => manejarCambioNivelEstudios('Primario')}
            />
            <Radiobtnlist
              id="vertical-list-secundario"
              name="vertical-list-estudios"
              label="Secundario"
              onChange={() => manejarCambioNivelEstudios('Secundario')}
            />
            <Radiobtnlist
              id="vertical-list-tecnico"
              name="vertical-list-estudios"
              label="Tecnico"
              onChange={() => manejarCambioNivelEstudios('Tecnico')}
            />
            <Radiobtnlist
              id="vertical-list-universitario"
              name="vertical-list-estudios"
              label="Universitario"
              onChange={() => manejarCambioNivelEstudios('Universitario')}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Estado Civil
            </Typography>
            <Radiobtnlist
              id="vertical-list-casado"
              name="vertical-list-estado"
              label="Casado(a)"
              onChange={() => manejarCambioCivil('Casado(a)')}
            />
            <Radiobtnlist
              id="vertical-list-soltero"
              name="vertical-list-estado"
              label="Soltero(a)"
              onChange={() => manejarCambioCivil('Soltero(a)')}
            />
            <Radiobtnlist
              id="vertical-list-concubino"
              name="vertical-list-estado"
              label="Concubino(a)"
              onChange={() => manejarCambioCivil('Concubino(a)')}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Ocupacion
            </Typography>
            <Radiobtnlist
              id="vertical-list-casa"
              name="vertical-list-ocupacion"
              label="Lab. de casa"
              onChange={() => manejarCambioOcupacion('Lab. de casa')}
            />
            <Radiobtnlist
              id="vertical-list-comerciante"
              name="vertical-list-ocupacion"
              label="Comerciante"
              onChange={() => manejarCambioCivil('Comerciante')}
            />
            <Radiobtnlist
              id="vertical-list-empleado"
              name="vertical-list-ocupacion"
              label="Empleado(a)"
              onChange={() => manejarCambioCivil('Empleado(a)')}
            />
            <Radiobtnlist
              id="vertical-list-estudiante"
              name="vertical-list-ocupacion"
              label="Estudiante"
              onChange={() => manejarCambioCivil('Estudiante')}
            />
          </List>
        </Card>
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Origen
            </Typography>
            <Radiobtnlist
              id="vertical-list-altiplano"
              name="vertical-list-origen"
              label="Altiplano"
              onChange={() => manejarCambioOrigen('Altiplano')}
            />
            <Radiobtnlist
              id="vertical-list-valle"
              name="vertical-list-origen"
              label="Valle"
              onChange={() => manejarCambioOrigen('Valle')}
            />
            <Radiobtnlist
              id="vertical-list-yungas"
              name="vertical-list-origen"
              label="Yungas"
              onChange={() => manejarCambioOrigen('Yungas')}
            />
            <Radiobtnlist
              id="vertical-list-llanos"
              name="vertical-list-origen"
              label="llanos"
              onChange={() => manejarCambioOrigen('llanos')}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Sanamiento Ambiental
            </Typography>
            <Radiobtnlist
              id="vertical-list-adecuado"
              name="vertical-list-saneamiento"
              label="Adecuado"
              onChange={() => manejarCambioSanamiento('Adecuado')}
            />
            <Radiobtnlist
              id="vertical-list-inade"
              name="vertical-list-saneamiento"
              label="Inadecuado"
              onChange={() => manejarCambioSanamiento('Inadecuado')}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Alimentacion
            </Typography>
            <Radiobtnlist
              id="vertical-list-aliade"
              name="vertical-list-alimentacion"
              label="Adecuado"
              onChange={() => manejarCambioAlimentacion('Adecuado')}
            />
            <Radiobtnlist
              id="vertical-list-aliina"
              name="vertical-list-alimentacion"
              label="Inadecuado"
              onChange={() => manejarCambioAlimentacion('Inadecuado')}
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Habitos
            </Typography>
            <CheckboxListItem
              id="vertical-list-alcohol"
              name="vertical-list-habitos"
              label="Alcohol"
              onChange={(valor, isChecked) => manejarCambioHabitos(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-tabaco"
              name="vertical-list-habitos"
              label="Tabaco"
              onChange={(valor, isChecked) => manejarCambioHabitos(valor, isChecked)}
            />
            <CheckboxListItem
              id="vertical-list-drogas"
              name="vertical-list-habitos"
              label="Drogas"
              onChange={(valor, isChecked) => manejarCambioHabitos(valor, isChecked)}
            />
          </List>
        </Card>
      </div>
      <Button onClick={registerantecedentes} className="gap-4">Guardar</Button>
    </Card>
  );
}

export default AnteNoPato;
