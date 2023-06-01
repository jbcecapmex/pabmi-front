import React from "react";
import { Grid, Typography, TextField, Box, Button } from "@mui/material"
import { Divider } from "@mui/material"; 

export default function StepUno(){
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
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Tipo"
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
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Tipo Bien"
		size      ="small"
		variant   ="outlined"
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>
	<Grid item xs={6}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Área Física "
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