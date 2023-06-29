import React from "react";
import {Edit as EditIcon, Delete as DeleteIcon,} from "@mui/icons-material";
import { Grid, Typography, TextField, Box, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material"
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

  
export interface MarcasInterface {
	uuid: string;
	Cve: string;
	Nombre: string;
	Descripcion: string; 
  }


  export interface ModelosInterface {
	uuid: string;
	Cve: string;
	Nombre: string;
	Descripcion: string; 
  }

  export interface EstatusResguardosInterface {
	uuid: string;
	Cve: string;
	Nombre: string;
	Descripcion: string;  
  }

  export interface EmpleadosInterface {
	uuid: string;
	Cve: string;
	Nombre: string;
	ApellidoPaterno: string;
	ApellidoMaterno: string;
  }

export default function StepDos( {datosAlta, setDatosAlta}: {datosAlta: any, setDatosAlta: any} ){  

	const navigate                  = useNavigate();
 
	const [rowsMarcas, setRowsMarcas] = useState<Array<MarcasInterface>>([]);
	// aqui es el consumo del endpoint para obtener el listado de Titular de la base de datos
	const getAllMarcas= () => {
	  axios({
		method    : "get",
		url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienemarcas",
		headers   : {
					  "Content-Type": "application/json",
					  Authorization: localStorage.getItem("jwtToken") || "",
		},
	  })
		// aqui se recibe lo del endpoint en response
		.then(({ data }) => {
		  const rowsMarcas = data;
		  setRowsMarcas(rowsMarcas);
		})
		.catch(function (error) {
		  Swal.fire({ 
			icon  : "error",
			title : "Mensaje",
			text  : "("+error.response.status+") "+error.response.data.message,
		  }).then((r) => navigate("/Muebles/Almacen/Altas"));
		});
	};

	const [rowsModelos, setRowsModelos] = useState<Array<ModelosInterface>>([]);
	// aqui es el consumo del endpoint para obtener el listado de Titular de la base de datos
	const getAllModelos= () => {
	  axios({
		method    : "get",
		url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienemodelos",
		headers   : {
					  "Content-Type": "application/json",
					  Authorization: localStorage.getItem("jwtToken") || "",
		},
	  })
		// aqui se recibe lo del endpoint en response
		.then(({ data }) => {
		  const rowsModelos = data;
		  setRowsModelos(rowsModelos);
		})
		.catch(function (error) {
		  Swal.fire({ 
			icon  : "error",
			title : "Mensaje",
			text  : "("+error.response.status+") "+error.response.data.message,
		  }).then((r) => navigate("/Muebles/Almacen/Altas"));
		});
	};

	const [rowsEstatusResguardos, setRowsEstatusResguardos] = useState<Array<EstatusResguardosInterface>>([]);
	// aqui es el consumo del endpoint para obtener el listado de Titular de la base de datos
	const getAllEstatusResguardos= () => {
	  axios({
		method    : "get",
		url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtieneestatusresguardo",
		headers   : {
					  "Content-Type": "application/json",
					  Authorization: localStorage.getItem("jwtToken") || "",
		},
	  })
		// aqui se recibe lo del endpoint en response
		.then(({ data }) => {
		  const rowsEstatusResguardos = data;
		  setRowsEstatusResguardos(rowsEstatusResguardos);
		})
		.catch(function (error) {
		  Swal.fire({ 
			icon  : "error",
			title : "Mensaje",
			text  : "("+error.response.status+") "+error.response.data.message,
		  }).then((r) => navigate("/Muebles/Almacen/Altas"));
		});
	};

	const [rowsEmpleados, setRowsEmpleados] = useState<Array<EmpleadosInterface>>([]);
	// aqui es el consumo del endpoint para obtener el listado de Titular de la base de datos
	const getAllEmpleados= () => {
	  axios({
		method    : "get",
		url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtieneempleados",
		headers   : {
					  "Content-Type": "application/json",
					  Authorization: localStorage.getItem("jwtToken") || "",
		},
	  })
		// aqui se recibe lo del endpoint en response
		.then(({ data }) => {
		  const rowsEmpleados = data;
		  setRowsEmpleados(rowsEmpleados);
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
		getAllMarcas(); 
		getAllModelos(); 
		getAllEstatusResguardos();
		getAllEmpleados();
	  }, []);
	


	return (
	<Grid container spacing={2} paddingTop="3%">
	<Grid item xs={12} md ={12}  display={{ xs: 'flow', md: 'flex' }}>

	<Grid item xs={12} md ={4} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Placas"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.Placas} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, Placas: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="text"
		required
	
	/>
	</Box>
	</Grid>

	<Grid item xs={12} md ={4} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Series"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.Series} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, Series: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="text"
		required
	/>
	</Box>
	</Grid>

	<Grid item xs={12} md ={4} >
		<Box
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
		 Marca
		</InputLabel>
		<Select
		id=" Marca "
		value={datosAlta.uuidMarca}
		label="Marca "
		size="small"
		displayEmpty
		onChange  ={(v) => {setDatosAlta({...datosAlta, uuidMarca: v.target.value}); }}
		>
			 <MenuItem value=""></MenuItem>
             {rowsMarcas.map((Marcas, index) => (
             <MenuItem value={Marcas.uuid}>
             {Marcas.Nombre}
             </MenuItem>
             ))}
		</Select>
		</FormControl>
		</Box>
	</Grid> 
 
	</Grid>

	<Grid item xs={12}  md ={12}  display={{ xs: 'flow', md: 'flex' }}>
	<Grid item xs={12} md ={4} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Año"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.Anio} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, Anio: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="number"
		helperText="*Ejemplo 2023"
		required
	/>
	</Box>
	</Grid>

	<Grid item xs={12}  md ={4}>
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Vida Útil"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.VidaUtil}
		onChange  ={(v) => {setDatosAlta({...datosAlta, VidaUtil: v.target.value}); }}
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
		label     ="%Depreciación"
		size      ="small"
		variant   ="outlined"
		// value     ={datosAlta.PorcentajeDepreciacion} 
		// onChange  ={(v) => {setDatosAlta({...datosAlta, PorcentajeDepreciacion: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="number"
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12}  md ={12}  display={{ xs: 'flow', md: 'flex' }}>
	
	<Grid item xs={12} md ={4}   > 
		<Box
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
		Modelo 
		</InputLabel>
		<Select
		id=" Modelo "
		value={datosAlta.uuidModelo}
		label="Modelo"
		size="small"
		displayEmpty
		onChange  ={(v) => {setDatosAlta({...datosAlta, uuidModelo: v.target.value}); }}
		>
		    <MenuItem value=""></MenuItem>
             {rowsModelos.map((Modelos, index) => (
             <MenuItem value={Modelos.uuid}>
             {Modelos.Nombre}
             </MenuItem>
             ))}
		</Select>
		</FormControl>
		</Box>
	</Grid>  
	</Grid>

	<Grid item xs={12}   md ={12} >
	<Box>
	<Divider/>
	</Box>
	</Grid>
	
	<Grid item xs={12}   md ={12}  display={{ xs: 'flow', md: 'flex' }}>

	<Grid item xs={12} md ={8}   >
		<Box
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
			Personal De Resguardo
		</InputLabel>
		<Select
		id="Personal De Resguardo"
		value={datosAlta.uuidPersonalResguardo}
		label="Personal De Resguardo"
		size="small"
		displayEmpty
		onChange  ={(v) => {setDatosAlta({...datosAlta,  uuidPersonalResguardo: v.target.value}); }}
		>
		      <MenuItem value=""></MenuItem>
			  {rowsEmpleados.map((Empleados, index) => (
             <MenuItem value={Empleados.uuid}>
             {Empleados.Nombre} {Empleados.ApellidoPaterno} {Empleados.ApellidoMaterno}
             </MenuItem>
             ))}

		</Select>
		</FormControl>
		</Box>
	</Grid>  

 
	<Grid item xs={12}  md ={12} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Clave Del Personal "
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.Personal} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, Personal: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="number"
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12}  md ={12}  display={{ xs: 'flow', md: 'flex' }}>
	
	<Grid item xs={12} md ={8}  >
		<Box
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
		Conductor
		</InputLabel>
		<Select
		id="Conductor"
		value={datosAlta.uuidConductor}
		label="Conductor"
		size="small"
		displayEmpty
		onChange  ={(v) => {setDatosAlta({...datosAlta, uuidConductor: v.target.value}); }}
		> 
		     <MenuItem value=""></MenuItem>
             {rowsEmpleados.map((Empleados, index) => (
             <MenuItem value={Empleados.uuid}>
             {Empleados.Nombre} {Empleados.ApellidoPaterno} {Empleados.ApellidoMaterno}
             </MenuItem>
             ))}

		</Select>
		</FormControl>
		</Box>
	</Grid>  
 
	</Grid>

	<Grid item xs={12}  md ={12} >
	<Box>
	<Divider/>
	</Box>
	</Grid>
	
	<Grid item xs={12}   md ={12}  display={{ xs: 'flow', md: 'flex' }}>
	<Grid item xs={12}  md ={2}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     =" CVE. LÍNEA"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.Linea} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, Linea: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="number"
		required
	/>
	</Box>
	</Grid>
	<Grid item xs={12}  md ={10}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Descripción De Línea"
		size      ="small"
		variant   ="outlined"
		value     ={datosAlta.DescripcionLinea} 
		onChange  ={(v) => {setDatosAlta({...datosAlta, DescripcionLinea: v.target.value}); }}
		inputProps={{ maxLength: 10 }}
		type="text"
		required
	/>
	</Box>
	</Grid>
	</Grid>
 
	</Grid>
	);
};