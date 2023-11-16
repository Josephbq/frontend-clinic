import React, { useEffect, useState } from "react";
import axios from "axios";
import Nbvr from "./UI/navbar";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useUser } from "./UserContext";

const TABLE_HEAD = ["Doctor(a)", "Dia - Hora", "Estado"];

function Registrosaudi() {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/data`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Ingresos recientes", 10, 10);

    doc.autoTable({
      head: [["Doctor(a)", "Hora - Dia", "Estado"]],
      body: data.map((record) => [
        record.nombre_doc,
        record.hora_inicio,
        record.estado,
      ]),
    });

    doc.save("ingresos_recientes.pdf");
  };

  return (
    <>
      <Nbvr
        linkto="/adm"
        user={user.username}
        firstlink="/Signup"
        firstlabel="Registrar"
        secondlink="/hour"
        secondlabel="Horarios"
        thirdlink="/raudi"
        thirdlabel="Inicios"
        fourthlink="/"
        fourtlabel="Acciones"
        visibility="hidden"
      />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Ingresos recientes
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Detalles sobre los ingresos recientes al sistema
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Buscar"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button
                className="flex items-center gap-3"
                onClick={handleDownloadPDF}
                size="sm"
              >
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{" "}
                Descargar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleData.map((record) => {
                const isLast = record === visibleData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={record.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {record.nombre_doc}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {record.hora_inicio}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip size="sm" variant="ghost" value={record.estado}
                          color={
                            record.estado === "exitoso"
                              ? "green"
                              : record.estado === "sin horario"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previo
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <IconButton
                key={index}
                variant={page === index + 1 ? "outlined" : "text"}
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
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Siguiente
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Registrosaudi;
