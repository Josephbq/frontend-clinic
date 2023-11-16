import React from "react";
import Nbvr from "./UI/navbar";
import { useUser } from "./UserContext";
import { Input } from "@material-tailwind/react";

function Adm() {
  const { user } = useUser();

  return (
    <>
    <Nbvr 
      linkto="/adm"
      user={user.sessionId} 
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
    <Input 
      label="12312"
    />
    
    </>
  );
}

export default Adm;
