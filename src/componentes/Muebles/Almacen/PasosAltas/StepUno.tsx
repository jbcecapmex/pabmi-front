import React from "react";
import {Edit as EditIcon, Delete as DeleteIcon,} from "@mui/icons-material";
import { Grid, Typography, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem, useMediaQuery} from "@mui/material";
import { Divider } from "@mui/material"; 
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  

// componente de sweetalert2 para el uso de los mensajes de alertas 
const Toast = Swal.mixin({
	toast: true,
	position: "center",
	showConfirmButton: false,
	timer: 4000,
	timerProgressBar: false,
	//background: '#2e7d32',
	//color: '#fff',     
	didOpen: (toast) => {
	  toast.addEventListener("mouseenter", Swal.stopTimer);
	  toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
  });

  export interface TipoActivoFijoInterface {
	uuid: string;
	Cve: string; 
	Nombre: string;
	Descripcion: string;   
  }
   
export interface TipoBienInterface {
    uuid:                string;
    Cve:                 string;            
    Nombre:              string;
  }

  export interface AreaInterface {
	uuid: string;
	Cve: string;
	Nombre: string;
	Descripcion: string; 
  }

  
export default function StepUno( {datosAlta, setDatosAlta}: {datosAlta: any, setDatosAlta: any} ) {

	const navigate   = useNavigate(); 

  
	const [rowsTipoActivoFijo, setRowsTipoActivoFijo] = useState<Array<TipoActivoFijoInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de Titular de la base de datos
  const getAllTipoActivoFijo= () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienetipoactivofijo",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      // aqui se recibe lo del endpoint en response
      .then(({ data }) => {
        const rowsTipoActivoFijo = data; 
        setRowsTipoActivoFijo(rowsTipoActivoFijo); 
      })
      .catch(function (error) {
        Swal.fire({ 
			icon  : "error",
			title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Muebles/Almacen/Altas"));
      });
  };


  const [rowsTipoBien, setRowsTipoBien] = useState<Array<TipoBienInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de Titular de la base de datos
  const getAllTipoBien= () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienetiposbien",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      // aqui se recibe lo del endpoint en response
      .then(({ data }) => {
        const rowsTipoBien = data;
        setRowsTipoBien(rowsTipoBien);
      })
      .catch(function (error) {
        Swal.fire({ 
		  icon  : "error",
		  title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Muebles/Almacen/Altas"));
      });
  };

  const [rowsArea, setRowsArea] = useState<Array<AreaInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de Titular de la base de datos
  const getAllArea= () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienearea",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      // aqui se recibe lo del endpoint en response
      .then(({ data }) => {
        const rowsArea = data;
        setRowsArea(rowsArea);
      })
      .catch(function (error) {
        Swal.fire({ 
		  icon  : "error",
		  title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Muebles/Almacen/Altas"));
      });
  };


  useEffect(() => {
	getAllTipoActivoFijo();
	getAllArea();
    getAllTipoBien();
  }, []);


	return (
	<Grid container spacing={2} paddingTop="3%">
	<Grid item xs={12} md ={12}  display={{ xs: 'flow', md: 'flex' }} >

	<Grid item xs={12} md ={6} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="No. Inventario"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.NoInventario} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, NoInventario: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		required
		// helperText="*Campo requerido"
		type="number"
		 
		
	/>
	</Box>
	</Grid>

	<Grid item xs={0} md ={4} ></Grid>

	<Grid item xs={12} md ={2} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Cantidad"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.Cantidad}
		onChange  ={(v) => {setDatosAlta({...datosAlta, Cantidad: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		required
		type="number"
		required
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12} md ={12} display={{ xs: 'flow', md: 'flex' }}>
	<Grid item xs={12} md ={2}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="No. Activo"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.NoActivo} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, NoActivo: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		required
		type="number"
		required
	/>
	</Box>
	</Grid>

	<Grid item xs={12} md ={10}  >
	<Box
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}> 
		Tipo Act. Fijo
		</InputLabel>
		<Select
		id="Tipo Act. Fijo "
		value={datosAlta.uuidTipoActivoFijo}
		label="Tipo Act. Fijo"
		size="small"
		displayEmpty
		onChange  ={(v) => {setDatosAlta({...datosAlta, uuidTipoActivoFijo: v.target.value}); }}
		>
		         <MenuItem value=""></MenuItem>
                 {rowsTipoActivoFijo.map((TipoActivoFijo, index) => (
                 <MenuItem value={TipoActivoFijo.uuid}>
                 {TipoActivoFijo.Cve} - {TipoActivoFijo.Nombre}
                  </MenuItem>
                 ))}
		</Select>
		</FormControl>
		</Box>
	</Grid> 
	</Grid>

	<Grid item xs={12} md ={12} display="flex">
	<Grid item xs={12} md ={12} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Descripción"
		size      ="small"
		variant   ="outlined"
		required
		value     ={datosAlta.Descripcion} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, Descripcion: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="text"
		required
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12} md ={12}  display={{ xs: 'flow', md: 'flex' }}>
	<Grid item xs={12} md ={6}  >
		<Box
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
		 Tipo Bien
		</InputLabel> 
		<Select
		id="Tipo Bien"
		value={datosAlta.uuidTipoBien}
		label="Tipo Bien"
		size="small"
		displayEmpty
		onChange  ={(v) => {setDatosAlta({...datosAlta, uuidTipoBien: v.target.value}); }}
		>
		        <MenuItem value=""></MenuItem>
                 {rowsTipoBien.map((TipoBien, index) => (
                 <MenuItem value={TipoBien.uuid}>
                 {TipoBien.Nombre}
                  </MenuItem>
                 ))}
				 
		</Select>
		</FormControl>
		</Box>
	</Grid>
	<Grid item xs={12} md ={6}  >
		<Box
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
		 Área Física
		</InputLabel>
		<Select
		id="AreaFisica"
		value={datosAlta.uuidArea}
		label="AreaFisica"
		size="small"
		displayEmpty
		onChange  ={(v) => {setDatosAlta({...datosAlta, uuidArea: v.target.value}); }}
		>
		  <MenuItem value=""></MenuItem>
            {rowsArea.map((Area, index) => (
            <MenuItem value={Area.uuid}>
             {Area.Nombre}
             </MenuItem>
           ))}

		</Select>
		</FormControl>
		</Box>
	</Grid>
	</Grid>
  
	<Grid item xs={12} md ={12} display="flow">
	<Box>
	<Divider/>
	</Box>
	</Grid>

	<Grid item xs={12} md ={12} display={{ xs: 'flow', md: 'flex' }}>
	<Grid item xs={12} md ={4}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Costo Sin Iva"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.CostoSinIva} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, CostoSinIva: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="number"
		required
	/>
	</Box>
	</Grid>
	<Grid item xs={12} md ={4}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Costo Con Iva"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.CostoConIva} 
		required
		onChange  ={(v) => {setDatosAlta({...datosAlta, CostoConIva: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="number"
		required
	/>
	</Box>
	</Grid>
	<Grid item xs={12} md ={4}   >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Depreciación Acumulada"
		size      ="small"
		variant   ="outlined"
		required
		value     ={datosAlta.DepreciacionAcumulada} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, DepreciacionAcumulada: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		required
		
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12}  md ={12} display={{ xs: 'flow', md: 'flex' }}>
	<Grid item xs={12}  md ={4}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		
		label     ="Fecha De Entrada" 
		size      ="small"
		required
		variant   ="outlined"
		value     ={datosAlta.FechaEntrada} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, FechaEntrada: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="date"
	/>
	</Box>
	</Grid>
	<Grid item xs={12}   md ={4} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
	 
	 	label     ="Fecha Última Actualización" 	 
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.FechaUltimaActualizacion} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, FechaUltimaActualizacion: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		InputLabelProps={{shrink: true,}}
		type="date"
		InputLabelProps={{ shrink: true, }}
		required
	/>
	</Box>
	</Grid>
	</Grid>
 
	</Grid>
	);
};