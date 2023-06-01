import React from "react";
import { Grid, Typography, TextField, Box, Button } from "@mui/material"
import { Divider } from "@mui/material"; 

export default function StepTres(){
	return (
	<Grid container spacing={2} paddingTop="3%">
	<Grid item xs={12} display="flex" >

	<Grid item xs={3} >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Código Contable "
		size      ="small"
		variant   ="outlined"
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>


	<Grid item xs={3}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="FECHA DE USO"
		size      ="small"
		variant   ="outlined"
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>

	<Grid item xs={3}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Clave Int."
		size      ="small"
		variant   ="outlined"
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>

	<Grid item xs={3}  >
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Cog."
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
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="DESCRIPCIÓN"
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
		label     ="Cve. Área"
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
	<Grid item xs={4}>
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Tipo Act. Fijo"
		size      ="small"
		variant   ="outlined"
		// value     ={cve}
		// disabled  = {uuid!=="" ? true:false}
		// onChange  ={(v) => {setCve(v.target.value); }}
		inputProps={{ maxLength: 10 }}
	/>
	</Box>
	</Grid>

	<Grid item xs={8}>
	<Box
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	<TextField
		label     ="Descripción De Tipo Act. Fijo"
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
	component="form"
	sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
	 
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
		label     ="No. Factura"
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