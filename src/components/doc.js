import React from "react";
import Nbvr from "./UI/navbar"; 
import { useUser } from "./UserContext";

function PanelPrincipal() {
  const { user } = useUser();
 
  return (
    <>
    <p>{user.sessionId}</p>
    <Nbvr
      linkto="/panel"
      user={user.sessionId} 
      firstlink="/hce" 
      firstlabel="Hce" 
      secondlink="/perfil"   ///cambiar
      secondlabel="Perfil"
      thirdlink="/panel"  ///cambiar
      thirdlabel="Horarios"
      visibility="visible"
    />
    </>
  );
}
export default PanelPrincipal;