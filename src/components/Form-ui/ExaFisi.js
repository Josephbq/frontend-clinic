import React, {useState} from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import Tltop from "../UI/tooltip";
import { toast } from 'react-hot-toast';
import { useUser } from "../UserContext";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


function ExaFisi() {
  const { user } = useUser();
  const [talla, setTalla] = useState("");
  const [peso, setPeso] = useState("");
  const [preart, setPreart] = useState("");
  const [frecar, setFrecar] = useState("");
  const [freres, setFreres] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [saturacion, setSaturacion] = useState("");
  const [otras, setOtras] = useState("");

 const corregir = (fecha) =>{
  const fechabd = new Date(fecha);
  const fechacorregida = format(fechabd, "yyyy-MM-dd");
  return fechacorregida;
 };
  const register_exafisi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}data/session`,
        {
          estado: user.sessionId,
        }
      );
      if (response.data.message === "positivo") {
        toast.error(corregir(response.data.fechanac), {
          position: "top-right",
        });
        const respuesta = await axios.post(
          `${process.env.REACT_APP_API_URL}register_exafisi`,
          {
            paciente: response.data.paciente,
            fechanac: corregir(response.data.fechanac),
            talla: talla,
            peso: peso,
            presiona: preart,
            frecuenciac: frecar,
            frecuenciar: freres,
            temperatura: temperatura,
            saturacion: saturacion,
            otras: otras,
            estado: user.sessionId,
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
          Examen Fisico
        </Typography>
        <Tltop
          header="Informacion"
          body="Anotar la informacion de los campos con su formato correcto"
        />
      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input
          value={talla}
          onChange={(e) => setTalla(e.target.value)}
          label="Talla"
          type="text"
          color="black"
        />
        <Input
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          label="Peso"
          type="text"
          color="indigo"
        />
      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input
          value={preart}
          onChange={(e) => setPreart(e.target.value)}
          label="Presion arterial"
          type="text"
          color="black"
        />
        <Input
          value={frecar}
          onChange={(e) => setFrecar(e.target.value)}
          label="Frecuencia cardiaca"
          type="text"
          color="black"
        />
        <Input
          value={freres}
          onChange={(e) => setFreres(e.target.value)}
          label="Frecuencia respiratoria"
          type="text"
          color="black"
        />
        <Input
          value={temperatura}
          onChange={(e) => setTemperatura(e.target.value)}
          label="Temperatura Actual"
          type="text"
          color="black"
        />
        <Input
          value={saturacion}
          onChange={(e) => setSaturacion(e.target.value)}
          label="Saturacion de oxigeno"
          type="text"
          color="black"
        />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea
          value={otras}
          onChange={(e) => setOtras(e.target.value)}
          label="Otras alteraciones"
        />
      </div>
      <Button onClick={register_exafisi} className="gap-4">Guardar</Button>
    </Card>
  );
}
export default ExaFisi;
