import React from "react";
import { Grid, Typography, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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

  
export default function StepUno(){

	const navigate                  = useNavigate();
	const [TipoBien, setTipoBien]  = useState('');
	const [Area, setArea]  = useState('');
 

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
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Configuracion/Usuarios/Menu"));
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
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Configuracion/Usuarios/Menu"));
      });
  };


  useEffect(() => {
	getAllArea();
    getAllTipoBien();
  }, []);


	return (
	<Grid container spacing={2} paddingTop="3%">
	<Grid item xs={12} display="flex" >

	<Grid item xs={6} >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>

	<Grid item xs={4}  ></Grid>

	<Grid item xs={2}  >
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
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
		label     ="No. Activo"
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
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
		 Tipo 
		</InputLabel>
		<Select
		id=" Tipo "
		// value={TipoDependencia}
		label=" Tipo "
		size="small"
		displayEmpty
		// onChange = {(v) => { setTipoBien(v.target.value)} }
		>
		        <MenuItem value=""> 1 </MenuItem>  
		</Select>
		</FormControl>
		</Box>
	</Grid> 
	</Grid>

	<Grid item xs={12} display="flex">
	<Grid item xs={12}>
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
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
	</Grid>

	<Grid item xs={12} display="flex">
	<Grid item xs={6}  >
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
		value={TipoBien}
		label="Tipo Bien"
		size="small"
		displayEmpty
		onChange = {(v) => { setTipoBien(v.target.value); }}
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
	<Grid item xs={6}  >
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
		value={Area}
		label="AreaFisica"
		size="small"
		displayEmpty
		onChange = {(v) => { setArea(v.target.value)} }
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
  
	<Grid item xs={12} display="flow">
	<Box>
	<Divider/>
	</Box>
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
		label     ="Costo Sin Iva"
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
		label     ="Costo Con Iva"
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
		label     ="Depreciación Acumulada"
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
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Fecha De Entrada "
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
		label     ="Fecha Última Actualización"
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