import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Padding } from "@mui/icons-material";
import { Icons } from "../../../layout/Icons";
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'factura', headerName: 'Factura', width: 70,
  renderCell: (value: any ) => {
    return (
      <a href={value.formattedValue.link}>
         {Icons(value.formattedValue.icono)}
      </a>
    )
  }

},
  { field: 'activo', headerName: 'No. Activo', width: 100, type:'number' },
  { field: 'tipoAdquisicion', headerName: 'Tipo Adquisición', width: 140 },
  { field: 'descripcion', headerName: 'Descripción', width: 220 },
  { field: 'tipo', headerName: 'Tipo', width: 200 },
  { field: 'areaFisica', headerName: 'Área FÍsica', width: 200 },
  { field: 'fecha', headerName: 'Fecha', width: 110 },
  { field: 'acciones', headerName: 'Acciones', width: 280,
   renderCell: (value) => {
     return (
      <Box
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}>
         <Box sx={{width:'90px',marginLeft:'5px', marginRight:'5px'}}>
            <Button sx={{fontSize:10,backgroundColor:'#000'}} variant="contained" size="small">{value.formattedValue.boton}</Button>
         </Box>
         <Box sx={{width:'50px',marginLeft:'5px', marginRight:'5px',}} >{Icons(value.formattedValue.icono)}</Box>  
         <Box sx={{fill: '#0072ea'}}>
           {Icons(value.formattedValue.estatus)}
         </Box>
        </Box>
     
       


     )
   }
  }
];

const rows = [
  { id: 1, factura: {icono: "Description", link: "#"}, activo:3800, tipoAdquisicion: 'Jon', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Oficina del Secretario', fecha: '13/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 2, factura: {icono: "Description", link: "#"}, activo:1345, tipoAdquisicion: 'Cersei', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Camiones', areaFisica:'Almacén de Bienes Muebles', fecha: '09/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 3, factura: {icono: "Description", link: "#"}, activo:7652, tipoAdquisicion: 'Jaime', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección del Archivo', fecha: '08/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 4, factura: {icono: "Description", link: "#"}, activo:1276, tipoAdquisicion: 'Arya', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Vehículos Menores', areaFisica:'Dirección de Infraestructura', fecha: '07/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 5, factura: {icono: "Description", link: "#"}, activo:1334, tipoAdquisicion: 'Daenerys', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Camiones', areaFisica:'Almacén de Bienes Muebles', fecha: '05/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 6, factura: {icono: "Description", link: "#"}, activo:1039, tipoAdquisicion: 'Cersei', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Dirección del Archivo', fecha: '03/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"DoDisturbOn"} },
  { id: 7, factura: {icono: "Description", link: "#"}, activo:6545, tipoAdquisicion: 'Ferrara', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Oficina del Secretario', fecha: '02/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"DoDisturbOn"} },
  { id: 8, factura: {icono: "Description", link: "#"}, activo:7845, tipoAdquisicion: 'Rossini', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección de Infraestructura', fecha: '01/04/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 9, factura: {icono: "Description", link: "#"}, activo:8985, tipoAdquisicion: 'Harvey', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Vehículos Menores', areaFisica:'Almacén de Bienes Muebles', fecha: '10/02/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 10, factura: {icono: "Description", link: "#"}, activo:8345, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Oficina del Secretario', fecha: '09/03/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"Error"} },
  { id: 11, factura: {icono: "Description", link: "#"}, activo:1305, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Camiones', areaFisica:'Dirección de Infraestructura', fecha: '08/03/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 12, factura: {icono: "Description", link: "#"}, activo:1735, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección del Archivo', fecha: '07/03/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 13, factura: {icono: "Description", link: "#"}, activo:2475, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Oficina del Secretario', fecha: '06/03/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"Error"} },
  { id: 14, factura: {icono: "Description", link: "#"}, activo:9876, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Vehículos Menores', areaFisica:'Almacén de Bienes Muebles', fecha: '05/03/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"CheckCircle"} },
  { id: 15, factura: {icono: "Description", link: "#"}, activo:1270, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección del Archivo', fecha: '04/03/2023', acciones:{icono: "QueryStats", boton: "Confirmar", estatus:"DoDisturbOn"} },
];



export default function Principal() {
  return (
    <Box>

       <TextField fullWidth label="fullWidth" id="fullWidth" />

  

      <Box sx={{ display: "flex", justifyContent: "justify" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "left"
        }}
      >
        Listado de altas para Almacen

      </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "justify" }}>
      <Typography
        variant="body1"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "normal",
          display: "flex",
          justifyContent: "justify",
          marginBottom: "30px",
          marginTop:"30px",
          paddingLeft:"20px",
          paddingRight:"20px"

        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      </Box>
      <Box>

      <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      </div>
      
      </Box>
    </Box>
  );
}
