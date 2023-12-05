import React, { useEffect, useState } from "react";
import { Card, Typography, Textarea, Button } from "@material-tailwind/react";
import axios from "axios";
import { useUser } from "../UserContext";
import Tltop from "../UI/tooltip";
import PreLoader1 from "../PreLoader1";
import { toast } from 'react-hot-toast';

function DiagTra() {
  const { user } = useUser();
  const [pacienteInfo, setPacienteInfo] = useState([]);
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}ml/${user.sessionId}`)
      .then((response) => {
        setPacienteInfo(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos del paciente:", error);
      });
  }, [user.sessionId]);

  if (!pacienteInfo.asd) {
    return <PreLoader1 />
  }  

  const cambios = () => {
    console.log('diagnostico:', diagnostico);
    console.log('tratamiento:', tratamiento);
    console.log('xxx:', pacienteInfo.asd);
  };

  const registerdiagnostico = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}data/gethc`,
        {
          estado: user.sessionId,
        }
      );
      if (response.data.message === "positivo") {
        const respuesta = await axios.post(
          `${process.env.REACT_APP_API_URL}data/getcon`,
          {
            estado: response.data.hcid,
          }
        );
        if (respuesta.data.message === 'positivo') {
          const responseconsulta = await axios.post(
            `${process.env.REACT_APP_API_URL}register_diagnostico`,
            {
              idconsulta: respuesta.data.idconsulta,
              enfermedad_posible: pacienteInfo.asd,
              enfermedad_doctor: diagnostico,
              tratamiento: tratamiento,
            }
          );
          if (responseconsulta.data.message === 'Register successful') {
            const responsechange = await axios.post(
              `${process.env.REACT_APP_API_URL}change_estado`,
              {
                estado: user.sessionId,
              }
            );
            if (responsechange.data.message === 'positivo') {
              toast('Se registro Completamente', {
                icon: '👏',
                duration: 4000,
                position: "top-right",
              });
            }
          }
          if(responseconsulta.data.message === 'Ocurrió un error al registrar el usuario'){
            toast.error('ocurrio un error', {
              position: "top-right",
            });
          }
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
    <Card color="" shadow variant="gradient">
      <div className="flex justify-center gap-4 m-4">
        <Typography variant="h5" color="gray">
          Diagnostico y Tratamiento
        </Typography>
        <Tltop header="Informacion" body="Anotar la patologia/enfermedad/problemas que presenta el paciente, y su tratamiento como posibles medicamentos" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea disabled label="Prediccion" value={"PREDICCION: " + pacienteInfo.asd} />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} label="Diagnostico" />
        <Textarea value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} label="Soluciones/medicamentos" />
        <Button onClick={registerdiagnostico}>Guardar</Button>
      </div>
    </Card>
  );
}
export default DiagTra;
