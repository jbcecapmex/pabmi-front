import React from 'react';
import { useLayoutEffect } from "react";
import { continueSession, sessionValid } from "./services/validation";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
// import "./Fonts.css";

import Inicio from './componentes/Inicio/fondoinicial';
import Almacen from './componentes/muebles/almacen';
import Comprobantes from './componentes/muebles/comprobantes';
import Articulos from './componentes/muebles/articulos';
import Resguardos from './componentes/muebles/resguardos';
import Transferencias from './componentes/muebles/transferencias';
import Bajas from './componentes/muebles/bajas';
import Adjudicaciones from './componentes/muebles/adjudicaciones';
import ListaMuebles from './componentes/muebles/listamuebles';
import Catalogos from './componentes/configuracion/catalogos/catalogos';
import Menuc from './componentes/configuracion/catalogos/menuc';
import TicketsDashboard from './componentes/tickets/ticketsdashboard';
import Opcion1 from './componentes/muebles/vehiculos/opcion1'
import NavBar from './layout/NavBar';

import UsuariosGrid from './componentes/configuracion/usuarios/usuariosgrid';

function App() {

  // const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jt = params.get("jwt") || null;
  const rf = params.get("rf") || null;
  const IdApp = params.get("IdApp");  
  // console.log(jt);
  // console.log(rf);
  // console.log(IdApp);

    useLayoutEffect(() => {
    if (jt !== null) {
      sessionValid().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN!);
        } else if ((r as boolean) === true) {
          setTimeout(() => {
            localStorage.setItem("IdApp", IdApp as string);
            // navigate("../home");
          }, 2000);
        }
      });
    } else {
      continueSession().then((r) => {
        if ((r as boolean) === false) {
          window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN!);
        } else {
          // navigate("../home");
        }
      });
    }
  }, [IdApp,jt]);


  return (
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route index path="/" element={<Inicio/>}/>
          <Route path="/muebles/listamuebles" element={<ListaMuebles/>} />
          <Route path="/muebles/almacen" element={<Almacen/>} />
          <Route path="/muebles/comprobantes" element={<Comprobantes/>}/>
          <Route path="/muebles/articulos" element={<Articulos/>}/>
          <Route path="/muebles/resguardos" element={<Resguardos/>}/>
          <Route path="/muebles/transferencias" element={<Transferencias/>}/>
          <Route path="/muebles/bajas" element={<Bajas/>}/>
          <Route path="/muebles/adjudicaciones" element={<Adjudicaciones/>}/>
          <Route path="/configuracion/catalogos" element={<Catalogos />} />
          <Route path="/configuracion/menu" element={<Menuc/>} />
          <Route path="/tickets/ticketsdashboard" element={<TicketsDashboard />} />

          <Route path="/vehiculos/opcion1" element={<Opcion1/>} />
        </Routes>
      </NavBar>
    </BrowserRouter>
  );
}

export default App;
