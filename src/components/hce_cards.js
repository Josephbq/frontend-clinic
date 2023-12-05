import React, { useEffect, useState } from "react";
import axios from "axios";
import Nbvr from "./UI/navbar";
import { useUser } from "./UserContext";
import { Cardp } from "./UI/cardsp";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import PreLoader1 from "./PreLoader1";


export function HceC() {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const cardsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}data/pacientes`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(data.length / cardsPerPage);
  
  if(!currentCards){
    return <PreLoader1 />
  }

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
                Historiales Clinicos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Detalles sobre los hce
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Buscar"
                  color="indigo"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <Link to="/hcenew" className="flex items-center gap-3">
                  <PlusIcon strokeWidth={2} className="h-4 w-4" /> Nuevo
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="m-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {currentCards.map((record) => (
                <Cardp
                  className="flex-1"
                  key={record.id}
                  nombre={record.nombres}
                  apellido={record.apellidop}
                  fecha={record.fechanac}
                  dom={record.domicilio}
                  idp={record.idpaciente}
                />
              ))}
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previo
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <IconButton
                key={index}
                variant={currentPage === index + 1 ? "outlined" : "text"}
                size="sm"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
