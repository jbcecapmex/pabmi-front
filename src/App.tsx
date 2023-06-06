import React from 'react';
import { useLayoutEffect } from "react";
import { continueSession, logoutapp } from "./services/Validation";
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


import TicketsDashboard from './componentes/Tickets/TicketsDashboard';

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

import DomiciliosC from './componentes/Configuracion/Catalogos/DomiciliosC';
import MenuC from './componentes/Configuracion/Catalogos/MenuC';
import PermisosC from './componentes/Configuracion/Catalogos/Permisos';
import TipoClasificacion from './componentes/Configuracion/Catalogos/TipoClasificacion';
import NavBar from './layout/NavBarNew';
import EmpleadosC from './componentes/Configuracion/Catalogos/EmpleadosC';
import UsuariosC from './componentes/Configuracion/Catalogos/UsuariosC';
import TipoUsuariosC from './componentes/Configuracion/Catalogos/TipoUsuariosC';
import PerfilesC from './componentes/Configuracion/Catalogos/PerfilesC';
import RolesC from './componentes/Configuracion/Catalogos/RolesC';
import TiposAdquisicion from './componentes/Configuracion/Catalogos/TipoAdquisicion';
import TipoBien from './componentes/Configuracion/Catalogos/TipoBien';
import TipoComprobante from './componentes/Configuracion/Catalogos/TipoComprobante';
import TipoProceso from './componentes/Configuracion/Catalogos/TipoProceso';
import TipoProveedor from './componentes/Configuracion/Catalogos/TipoProveedores';
import TipoReporte from './componentes/Configuracion/Catalogos/TipoReporte';
import TipoTransaccion from './componentes/Configuracion/Catalogos/TipoTransaccion';
import ReportesC from './componentes/Configuracion/Catalogos/ReportesC';

import Activos from './componentes/Configuracion/Catalogos/Activo';
import MotivosBaja from './componentes/Configuracion/Catalogos/MotivosBaja';
import Marcas from './componentes/Configuracion/Catalogos/Marcas';
import Modelos from './componentes/Configuracion/Catalogos/Modelos';
import PresentacionMuebles from './componentes/Configuracion/Catalogos/PresentacionMuebles';
import EstatusResguardos from './componentes/Configuracion/Catalogos/EstatusResguardos';
import NivelReportes from './componentes/Configuracion/Catalogos/NivelReportes';
import Transacciones from './componentes/Configuracion/Catalogos/Transacciones';
import Titular from './componentes/Configuracion/Catalogos/Titular';

import Secretarias from './componentes/Configuracion/Catalogos/Secretarias';
import Dependencias from './componentes/Configuracion/Catalogos/Dependencias';
import TipoDependencias from './componentes/Configuracion/Catalogos/TipoDependencias';
import EntidadesFederativas from './componentes/Configuracion/Catalogos/EntidadesFederativas';
import Municipios from './componentes/Configuracion/Catalogos/Municipios';
import Puestos from './componentes/Configuracion/Catalogos/Puestos';
import {getUserDetails} from './services/Validation';
import moment from 'moment';

import AdquisicionesAltas from './componentes/Adquisiciones/Altas';
import Notificaciones from './componentes/Configuracion/Catalogos/Notificaciones';
import Procesos from './componentes/Configuracion/Catalogos/Procesos';






function App() {

  // const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const jwtToken = params.get("jwt") || null;
  const refreshToken = params.get("rf") || null;
  const IdApp = params.get("IdApp");

  useLayoutEffect(() => {
    if (jwtToken !== null) {
      localStorage.setItem("jwtToken", jwtToken!);
      localStorage.setItem("refreshToken", refreshToken!);
      localStorage.setItem("IdApp", IdApp!);
      continueSession()
    }
    continueSession()
  }, [IdApp, jwtToken]);

  const validarSession = () => {
    setInterval(() => {
      continueSession()
    }, 54321);
  };

  useLayoutEffect(() => {
    continueSession();
    if(localStorage.getItem("LastActivity")){
      localStorage.setItem("LastActivity", moment().format('YYYY-MM-DDTHH:mm:ss'));
    }else{
      localStorage.setItem("LastActivity", moment().format('YYYY-MM-DDTHH:mm:ss'));
      validarSession();
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route index path="/" element={<Inicio />} />

          <Route path="/Muebles/Almacen/Altas" element={<MueblesAlmacen />} />
          <Route path="/Muebles/Almacen/Adjudicaciones" element={<MueblesAdjudicaciones />} />
          <Route path="/Muebles/Almacen/Arrendamientos" element={<MueblesArrendamientos />} />
          <Route path="/Muebles/Almacen/Bajas" element={<MueblesBajas />} />
          <Route path="/Muebles/Almacen/Comodato" element={<MueblesComodato />} />
          <Route path="/Muebles/Almacen/Donaciones" element={<MueblesDonaciones />} />
          <Route path="/Muebles/Almacen/Inventarios" element={<MueblesInventarios />} />
          <Route path="/Muebles/Almacen/resguardos" element={<MueblesResguardos />} />
          <Route path="/Muebles/Almacen/Transferencias" element={<MueblesTransferencias />} />

          <Route path="/Muebles/Vehiculos/Altas" element={<VehiculosAltas />} />
          <Route path="/Muebles/Vehiculos/Bajas" element={<VehiculosBajas />} />
          <Route path="/Muebles/Vehiculos/Ventas" element={<VehiculosVentas />} />
          <Route path="/Muebles/Vehiculos/Comodato" element={<VehiculosComodato />} />
          <Route path="/Muebles/Vehiculos/Modificaciones" element={<VehiculosModificaciones />} />
          <Route path="/Muebles/Vehiculos/Transferencias" element={<VehiculosTransferencias />} />
          <Route path="/Muebles/Vehiculos/Seguros" element={<VehiculosSeguros />} />



          <Route path="/DashboardsReportes/Dashboards/Dashboards" element={<DashboardsReportesDashboards />} />
          <Route path="/DashboardsReportes/Reportes/Reportes" element={<DashboardsReportesReportes />} />

          <Route path="/Administracion/Ayuda" element={<AdministracionAyuda />} />
          <Route path="/Administracion/Backups" element={<AdministracionBackups />} />
          <Route path="/Administracion/CronJobs" element={<AdministracionCronJobs />} />
          <Route path="/Administracion/Notificaciones" element={<AdministracionNotificaciones />} />
          <Route path="/Administracion/Semaforizacion" element={<AdministracionSemaforizacion />} />
          <Route path="/Administracion/ValoresGlobales" element={<AdministracionValoresGlobales />} />
          <Route path="/Administracion/ValoresSistema" element={<AdministracionValoresSistema />} />

          <Route path="/Inmuebles/Altas" element={<InmueblesAltas />} />
          <Route path="/Inmuebles/Bajas" element={<InmueblesBajas />} />
          <Route path="/Inmuebles/Permutas" element={<InmueblesPermutas />} />
          <Route path="/Inmuebles/Modificaciones" element={<InmueblesModificaciones />} />
          <Route path="/Inmuebles/LevantamientosTopograficos" element={<InmueblesLevantamientosTopograficos />} />
          <Route path="/Inmuebles/Arrendamientos" element={<InmueblesArrendamientos />} />
          <Route path="/Inmuebles/Comodato" element={<InmueblesComodato />} />
          <Route path="/Inmuebles/GeneracionTarjetas" element={<InmueblesGeneracionTarjetas />} />

          
          <Route path="/Tickets" element={<TicketsDashboard />} />

          <Route path="/Configuracion/Catalogos/Catalogos" element={<ConfiguracionCatalogos />} />
          <Route path="/Configuracion/Catalogos/Empleados" element={<EmpleadosC />} />
          <Route path="/Configuracion/Catalogos/Domicilios" element={<DomiciliosC />} />
          <Route path="/Configuracion/Usuarios/Usuarios" element={<ConfiguracionUsuarios />} />
          <Route path="/Configuracion/Roles/Roles" element={<ConfiguracionRoles />} />
          <Route path="/Configuracion/Catalogos/Permisos" element={<PermisosC/>} />
          <Route path="/Configuracion/Catalogos/Secretarias" element={<Secretarias/>} />
          <Route path="/Configuracion/Catalogos/Dependencias" element={<Dependencias/>} />
          <Route path="/Configuracion/Catalogos/TipoDependencias" element={<TipoDependencias/>} />
          <Route path="/Configuracion/Catalogos/EntidadesFederativas" element={<EntidadesFederativas/>} />
          <Route path="/Configuracion/Catalogos/Municipios" element={<Municipios/>} />
          <Route path="/Configuracion/Catalogos/Puestos" element={<Puestos/>} />
          <Route path="/Configuracion/Catalogos/TipodeClasificacion" element={<TipoClasificacion/>} />
          <Route path="/Configuracion/Catalogos/Notificaciones" element={<Notificaciones/>} />
          <Route path="/Configuracion/Catalogos/Procesos" element={<Procesos/>} />
          <Route path="/Configuracion/Catalogos/TiposAdquisicion" element={<TiposAdquisicion/>} />
          <Route path="/Configuracion/Catalogos/TipoBien" element={<TipoBien/>} />
          <Route path="/Configuracion/Catalogos/TipoComprobante" element={<TipoComprobante/>} />
          <Route path="/Configuracion/Catalogos/TipoProceso" element={<TipoProceso/>} />
          <Route path="/Configuracion/Catalogos/TipoProveedor" element={<TipoProveedor/>} />
          <Route path="/Configuracion/Catalogos/TipoReporte" element={<TipoReporte/>} />
          <Route path="/Configuracion/Catalogos/TipoTransaccion" element={<TipoTransaccion/>} />
          <Route path="/Configuracion/Catalogos/ReportesC" element={<ReportesC/>} />
          <Route path="/Configuracion/Catalogos/Activo" element={<Activos/>} />
          <Route path="/Configuracion/Catalogos/MotivosBaja" element={<MotivosBaja/>} />
          <Route path="/Configuracion/Catalogos/Marcas" element={<Marcas/>} />
          <Route path="/Configuracion/Catalogos/Modelos" element={<Modelos/>} />
          <Route path="/Configuracion/Catalogos/PresentacionMuebles" element={<PresentacionMuebles/>} />
          <Route path="/Configuracion/Catalogos/EstatusResguardos" element={<EstatusResguardos/>} />
          <Route path="/Configuracion/Catalogos/NivelReportes" element={<NivelReportes/>} />
          <Route path="/Configuracion/Catalogos/Transacciones" element={<Transacciones/>} />
          <Route path="/Configuracion/Catalogos/Titular" element={<Titular/>} />
          <Route path="/Configuracion/Usuarios/Usuario" element={<UsuariosC/>} />
          <Route path="/Configuracion/Usuarios/TipodeUsuarios" element={<TipoUsuariosC/>}/>
          <Route path="/Configuracion/Usuarios/Perfiles" element={<PerfilesC/>}/>
          <Route path="/Configuracion/Usuarios/Roles" element={<RolesC/>}/>
          <Route path="/Configuracion/Usuarios/Menu" element={<MenuC/>} />

          <Route path="Adquisiciones/Altas" element={<AdquisicionesAltas />}/>
          

        </Routes>
      </NavBar>
    </BrowserRouter>
  );
}

export default App;
