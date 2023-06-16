import React from "react";
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

export default function StepDos(){  

	const navigate                  = useNavigate();
	const [Marcas, setMarcas]       = useState('');
	const [Modelos, setModelos]     = useState('');
	const [EstatusResguardos, setEstatusResguardos]  = useState('');
	const [Empleados, setEmpleados]  = useState('');

	
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
			text  : "("+error.response.status+") "+error.response.data.message,
		  }).then((r) => navigate("/Configuracion/Usuarios/Menu"));
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
			text  : "("+error.response.status+") "+error.response.data.message,
		  }).then((r) => navigate("/Configuracion/Usuarios/Menu"));
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
			text  : "("+error.response.status+") "+error.response.data.message,
		  }).then((r) => navigate("/Configuracion/Usuarios/Menu"));
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
			text  : "("+error.response.status+") "+error.response.data.message,
		  }).then((r) => navigate("/Configuracion/Usuarios/Menu"));
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
	<Grid item xs={12} display="flex" >

	<Grid item xs={4} >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>

	<Grid item xs={4}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>

	<Grid item xs={4}  >
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
		value={Marcas}
		label="Marca "
		size="small"
		displayEmpty
		onChange = {(v) => { setMarcas(v.target.value)} }
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

	<Grid item xs={12} display="flex">
	<Grid item xs={4}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>

	<Grid item xs={4}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
	

	<Grid item xs={4}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12} display="flex">
	
	<Grid item xs={4}  >
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
		// value={Modelos}
		label="Modelo"
		size="small"
		displayEmpty
		// onChange = {(v) => { setModelos(v.target.value)} }
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

	<Grid item xs={12} display="flow">
	<Box>
	<Divider/>
	</Box>
	</Grid>
	
	<Grid item xs={12} display="flex">

	<Grid item xs={8}  >
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
		value={EstatusResguardos}
		label="Personal De Resguardo"
		size="small"
		displayEmpty
		onChange = {(v) => { setEstatusResguardos(v.target.value); }}
		>
		      <MenuItem value=""></MenuItem>
             {rowsEstatusResguardos.map((EstatusResguardos, index) => (
             <MenuItem value={EstatusResguardos.uuid}>
             {EstatusResguardos.Nombre}
             </MenuItem>
             ))}

		</Select>
		</FormControl>
		</Box>
	</Grid>  

 
	<Grid item xs={4}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12} display="flex">
	
	<Grid item xs={8}  >
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
		value={Empleados}
		label="Conductor"
		size="small"
		displayEmpty
		onChange = {(v) => { setEmpleados(v.target.value)} }
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

	<Grid item xs={12} display="flow">
	<Box>
	<Divider/>
	</Box>
	</Grid>
	
	<Grid item xs={12} display="flex">
	<Grid item xs={2}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
	<Grid item xs={10}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
	</Grid>
 
	</Grid>
	);
};