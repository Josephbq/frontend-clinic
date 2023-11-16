import React from "react";
import Nbvr from "./UI/navbar"; 
import { useUser } from "./UserContext";

function PanelPrincipal() {
  const { user } = useUser();
 
  return (
    <Nbvr
      linkto="/panel"
      user={user.sessionId} 
      firstlink="/hce" 
      firstlabel="Hce" 
      secondlink="/panel"   ///cambiar
      secondlabel="Perfil"
      thirdlink="/panel"  ///cambiar
      thirdlabel="Horarios"
      visibility="visible"
    />
  );
}
export default PanelPrincipal;