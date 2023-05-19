import React from "react";
import BarraLateral from "../Componentes/BarraLateral";
import ChatSolo from "../Componentes/ChatSolo";
import Chats from "../Componentes/Chats";

const Inicio = () => {
    return (
        <div className = "Inicio">
            <div className = "Contenedor2">
                <BarraLateral/>
                <ChatSolo/>
            </div>
        </div>
    )
}

export default Inicio