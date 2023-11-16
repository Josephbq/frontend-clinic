import React from "react";
import { Card, Typography, List, Textarea } from "@material-tailwind/react";
import CheckboxListItem from "./Form-ui-components/Checkboxlistitem";
import Tltop from "../UI/tooltip";

function AntePato() {
  return (
    <Card color="green" variant="gradient">
      <div className="flex justify-center gap-4 m-4">
        <Typography variant="h5" color="gray">
          Antecendentes Patologicos
        </Typography>
        <Tltop
          header="Informacion"
          body="Anotar las patologias/explicar los detalles de su patologia o demas enfermedades"
        />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Patologias
            </Typography>
            <CheckboxListItem
              id="vertical-list-alergia"
              name="vertical-list-patologia"
              label="Alergia"
            />
            <CheckboxListItem
              id="vertical-list-tuber"
              name="vertical-list-patologia"
              label="Tuberculosis"
            />
            <CheckboxListItem
              id="vertical-list-diabetes"
              name="vertical-list-patologia"
              label="Diabetes"
            />
            <CheckboxListItem
              id="vertical-list-Hiper"
              name="vertical-list-patologia"
              label="Hipertension"
            />
            <CheckboxListItem
              id="vertical-list-cancer"
              name="vertical-list-patologia"
              label="Cancer"
            />
            <CheckboxListItem
              id="vertical-list-cirugias"
              name="vertical-list-patologia"
              label="Cirugia(s)"
            />
          </List>
        </Card>
        <Card color="indigo" className="flex-1">
          <List>
            <Typography variant="h5" color="white">
              Familiares Parentesco
            </Typography>
            <CheckboxListItem
              id="vertical-list-falergia"
              name="vertical-list-parentesco"
              label="Si"
            />
            <CheckboxListItem
              id="vertical-list-ftuber"
              name="vertical-list-parentesco"
              label="Si"
            />
            <CheckboxListItem
              id="vertical-list-fdiabetes"
              name="vertical-list-parentesco"
              label="Si"
            />
            <CheckboxListItem
              id="vertical-list-fHiper"
              name="vertical-list-parentesco"
              label="Si"
            />
            <CheckboxListItem
              id="vertical-list-fcancer"
              name="vertical-list-parentesco"
              label="Si"
            />
            <CheckboxListItem
              id="vertical-list-fcirugias"
              name="vertical-list-parentesco"
              label="Si"
            />
          </List>
        </Card>
        <Textarea label="Detalles" />
      </div>
      <div className="m-4 flex flex-col lg:flex-row gap-4">
        <Textarea label="Resumen de la enfermedad actual" />
      </div>
    </Card>
  );
}

export default AntePato;
