import React from 'react';
import { useLayoutEffect } from "react";
import { continueSession, sessionValid } from "./services/Validation";
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
