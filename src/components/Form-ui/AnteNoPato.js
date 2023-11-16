import React from "react";
import {
  Card,
  Typography,
  Input,
  List,
} from "@material-tailwind/react";
import CheckboxListItem from "./Form-ui-components/Checkboxlistitem";
import Radiobtnlist from "./Form-ui-components/Radiobuttonlist";

function AnteNoPato() {
  return (
    <Card color="transparent" shadow>
      <Typography variant="h5" color="gray">
        Antecendentes no patologicos
      </Typography>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input label="Apellido Paterno" type="text" />
        <Input label="Apellido Materno" type="text" />
        <Input label="Nombre(s)" type="text" />
        <Input label="Año(s)" type="text" />
        <Input label="Telefono" type="text" />
        <Input label="Ci" type="text" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <Input label="Direccion" type="text" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Sexo
            </Typography>
            <Radiobtnlist
              id="vertical-list-masculino"
              name="vertical-list-sexo"
              label="Masculino"
            />
            <Radiobtnlist
              id="vertical-list-femenino"
              name="vertical-list-sexo"
              label="Femenino"
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Estudios
            </Typography>
            <Radiobtnlist
              id="vertical-list-primario"
              name="vertical-list-estudios"
              label="Primario"
            />
            <Radiobtnlist
              id="vertical-list-secundario"
              name="vertical-list-estudios"
              label="Secundario"
            />
            <Radiobtnlist
              id="vertical-list-tecnico"
              name="vertical-list-estudios"
              label="Tecnico"
            />
            <Radiobtnlist
              id="vertical-list-universitario"
              name="vertical-list-estudios"
              label="Universitario"
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
            />
            <Radiobtnlist
              id="vertical-list-soltero"
              name="vertical-list-estado"
              label="Soltero(a)"
            />
            <Radiobtnlist
              id="vertical-list-concubino"
              name="vertical-list-estado"
              label="Concubino(a)"
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
            />
            <Radiobtnlist
              id="vertical-list-comerciante"
              name="vertical-list-ocupacion"
              label="Comerciante"
            />
            <Radiobtnlist
              id="vertical-list-empleado"
              name="vertical-list-ocupacion"
              label="Empleado(a)"
            />
            <Radiobtnlist
              id="vertical-list-estudiante"
              name="vertical-list-ocupacion"
              label="Estudiante"
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
            />
            <Radiobtnlist
              id="vertical-list-valle"
              name="vertical-list-origen"
              label="Valle"
            />
            <Radiobtnlist
              id="vertical-list-yungas"
              name="vertical-list-origen"
              label="Yungas"
            />
            <Radiobtnlist
              id="vertical-list-llanos"
              name="vertical-list-origen"
              label="llanos"
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
            />
            <Radiobtnlist
              id="vertical-list-inade"
              name="vertical-list-saneamiento"
              label="Inadecuado"
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
            />
            <Radiobtnlist
              id="vertical-list-aliina"
              name="vertical-list-alimentacion"
              label="Inadecuado"
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
            />
            <CheckboxListItem
              id="vertical-list-tabaco"
              name="vertical-list-habitos"
              label="Tabaco"
            />
            <CheckboxListItem
              id="vertical-list-drogas"
              name="vertical-list-habitos"
              label="Drogas"
            />
          </List>
        </Card>
      </div>
    </Card>
  );
}

export default AnteNoPato;
