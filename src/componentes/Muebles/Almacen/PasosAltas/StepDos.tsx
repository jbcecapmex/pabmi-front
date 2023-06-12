import React from "react";
import { Grid, Typography, TextField, Box, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material"
import { Divider } from "@mui/material"; 

export default function StepDos(){
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
		// value={TipoDependencia}
		label="Marca "
		size="small"
		displayEmpty
		// onChange = {(v) => { setTipoBien(v.target.value)} }
		>
		        <MenuItem value="">  </MenuItem>  
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
		// value={TipoDependencia}
		label="Modelo"
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
		// value={TipoDependencia}
		label="Personal De Resguardo"
		size="small"
		displayEmpty
		// onChange = {(v) => { setTipoBien(v.target.value)} }
		>
		        <MenuItem value=""> 1 </MenuItem>  
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
		// value={TipoDependencia}
		label="Conductor"
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