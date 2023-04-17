import React from 'react';
import { useLayoutEffect } from "react";
import { continueSession, sessionValid } from "./services/Validation";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
// import "./Fonts.css";

import Inicio from './componentes/Inicio/FondoInicial';
import MueblesAlmacen from './componentes/Muebles/Almacen/Altas';
import MueblesAdjudicaciones from './componentes/Muebles/Almacen/Adjudicaciones';
import MueblesArrendamientos from './componentes/Muebles/Almacen/Arrendamientos';
import MueblesBajas from './componentes/Muebles/Almacen/Bajas';
import MueblesComodato from './componentes/Muebles/Almacen/Comodato';
import MueblesDonaciones from './componentes/Muebles/Almacen/Donaciones';
import MueblesInventarios from './componentes/Muebles/Almacen/Inventarios';
import MueblesTransferencias from './componentes/Muebles/Almacen/Transferencias';
import MueblesResguardos from './componentes/Muebles/Almacen/Resguardos';

import VehiculosAltas from './componentes/Muebles/Vehiculos/Altas';
import VehiculosBajas from './componentes/Muebles/Vehiculos/Bajas';
import VehiculosVentas from './componentes/Muebles/Vehiculos/Ventas';
import VehiculosComodato from './componentes/Muebles/Vehiculos/Comodato';
import VehiculosModificaciones from './componentes/Muebles/Vehiculos/Modificaciones';
import VehiculosTransferencias from './componentes/Muebles/Vehiculos/Transferencias';
import VehiculosSeguros from './componentes/Muebles/Vehiculos/Seguros';

import InmueblesAltas from './componentes/Inmuebles/Altas';
import InmueblesBajas from './componentes/Inmuebles/Bajas';
import InmueblesPermutas from './componentes/Inmuebles/Permutas';
import InmueblesModificaciones from './componentes/Inmuebles/Modificaciones';
import InmueblesLevantamientosTopograficos from './componentes/Inmuebles/LevantamientosTopograficos';
import InmueblesArrendamientos from './componentes/Inmuebles/Arrendamientos';
import InmueblesComodato from './componentes/Inmuebles/Comodato';
import InmueblesGeneracionTarjetas from './componentes/Inmuebles/GeneracionTarjetas';


import TicketsAltas from './componentes/Tickets/Altas';
import TicketsModificaciones from './componentes/Tickets/Modificaciones';

import DashboardsReportesDashboards from './componentes/DashboardsReportes/Dashboards/Dashboards';
import DashboardsReportesReportes from './componentes/DashboardsReportes/Reportes/Reportes';

import AdministracionAyuda from './componentes/Administracion/Ayuda';
import AdministracionBackups from './componentes/Administracion/Backups';
import AdministracionCronJobs from './componentes/Administracion/CronJobs';
import AdministracionNotificaciones from './componentes/Administracion/Notificaciones';
import AdministracionSemaforizacion from './componentes/Administracion/Semaforizacion';
import AdministracionValoresGlobales from './componentes/Administracion/ValoresGlobales';
import AdministracionValoresSistema from './componentes/Administracion/ValoresSistema';


import ConfiguracionCatalogos from './componentes/Configuracion/Catalogos/Catalogos';
import ConfiguracionUsuarios from './componentes/Configuracion/Usuarios/Usuarios';
import ConfiguracionRoles from './componentes/Configuracion/Roles/Roles';

import NavBar from './layout/NavBar';


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

          <Route path="/Muebles/Almacen/Altas" element={<MueblesAlmacen/>} />
          <Route path="/Muebles/Almacen/Adjudicaciones" element={<MueblesAdjudicaciones/>}/>
          <Route path="/Muebles/Almacen/Arrendamientos" element={<MueblesArrendamientos/>}/>
          <Route path="/Muebles/Almacen/Bajas" element={<MueblesBajas/>}/>
          <Route path="/Muebles/Almacen/Comodato" element={<MueblesComodato/>}/>
          <Route path="/Muebles/Almacen/Donaciones" element={<MueblesDonaciones/>}/>
          <Route path="/Muebles/Almacen/Inventarios" element={<MueblesInventarios/>}/>
          <Route path="/Muebles/Almacen/resguardos" element={<MueblesResguardos/>}/>
          <Route path="/Muebles/Almacen/Transferencias" element={<MueblesTransferencias/>}/>

          <Route path="/Muebles/Vehiculos/Altas" element={<VehiculosAltas/>} />
          <Route path="/Muebles/Vehiculos/Bajas" element={<VehiculosBajas/>} />
          <Route path="/Muebles/Vehiculos/Ventas" element={<VehiculosVentas/>} />
          <Route path="/Muebles/Vehiculos/Comodato" element={<VehiculosComodato/>} />
          <Route path="/Muebles/Vehiculos/Modificaciones" element={<VehiculosModificaciones/>} />
          <Route path="/Muebles/Vehiculos/Transferencias" element={<VehiculosTransferencias/>} />
          <Route path="/Muebles/Vehiculos/Seguros" element={<VehiculosSeguros/>} />

          

          <Route path="/DashboardsReportes/Dashboards/Dashboards" element={<DashboardsReportesDashboards/>} />
          <Route path="/DashboardsReportes/Reportes/Reportes" element={<DashboardsReportesReportes/>} />

          <Route path="/Administracion/Ayuda" element={<AdministracionAyuda/>} />
          <Route path="/Administracion/Backups" element={<AdministracionBackups/>} />
          <Route path="/Administracion/CronJobs" element={<AdministracionCronJobs/>} />
          <Route path="/Administracion/Notificaciones" element={<AdministracionNotificaciones/>} />
          <Route path="/Administracion/Semaforizacion" element={<AdministracionSemaforizacion/>} />
          <Route path="/Administracion/ValoresGlobales" element={<AdministracionValoresGlobales/>} />
          <Route path="/Administracion/ValoresSistema" element={<AdministracionValoresSistema/>} />

          <Route path="/Inmuebles/Altas" element={<InmueblesAltas/>} />
          <Route path="/Inmuebles/Bajas" element={<InmueblesBajas/>} />
          <Route path="/Inmuebles/Permutas" element={<InmueblesPermutas/>} />
          <Route path="/Inmuebles/Modificaciones" element={<InmueblesModificaciones/>} />
          <Route path="/Inmuebles/LevantamientosTopograficos" element={<InmueblesLevantamientosTopograficos/>} />
          <Route path="/Inmuebles/Arrendamientos" element={<InmueblesArrendamientos/>} />
          <Route path="/Inmuebles/Comodato" element={<InmueblesComodato/>} />
          <Route path="/Inmuebles/GeneracionTarjetas" element={<InmueblesGeneracionTarjetas/>} />

          <Route path="/Tickets/Altas" element={<TicketsAltas />} />
          <Route path="/Tickets/Modificaciones" element={<TicketsModificaciones />} />


          <Route path="/Configuracion/Catalogos/Catalogos" element={<ConfiguracionCatalogos />} />
          <Route path="/Configuracion/Usuarios/Usuarios" element={<ConfiguracionUsuarios />} />
          <Route path="/Configuracion/Roles/Roles" element={<ConfiguracionRoles />} />


        </Routes>
      </NavBar>
    </BrowserRouter>
  );
}

export default App;
