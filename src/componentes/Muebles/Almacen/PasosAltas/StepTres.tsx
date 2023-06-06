import React,  { useState }  from "react";
import { Grid, Typography, TextField, Box, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material"
import { Divider } from "@mui/material"; 

export default function StepTres(){

	const [selectedFile, setSelectedFile] = useState(null);

	// const handleFileChange = (event) => {
	//   setSelectedFile(event.target.files[0]);
	// };
  
	const handleUpload = () => {
	  // Aquí puedes realizar la lógica para subir el archivo al servidor
	  // utilizando el valor de 'selectedFile'
	  console.log('Selected file:', selectedFile);
	};

	const [nombreArchivoPDF, setNombreArchivoPDF] = useState(
		"Arrastre o de click para seleccionar archivo .pdf"
	  );

	
 

	const [rfc, setRfc] = useState("");
	const [disableValidar, setDisableValidar] = useState(false);

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
		sx={{
			'& > :not(style)': { m: 1.3, width: '100%' },   }}
				display="flex"
		>
		<FormControl fullWidth sx={{bgColor:"#fff"}}>
		<InputLabel  sx={{ marginTop:"-4px"}}>
		Cve. Área
		</InputLabel>
		<Select
		id=" Cve. Área "
		// value={TipoDependencia}
		label=" Cve. Área "
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
	
	<Grid item xs={4}  >
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
		// value={TipoDependencia}
		label="Tipo Act. Fijo"
		size="small"
		displayEmpty
		// onChange = {(v) => { setTipoBien(v.target.value)} }
		>
		        <MenuItem value=""> 1 </MenuItem>  
		</Select>
		</FormControl>
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
	<Grid item xs={8} >
	<Box
	component="form"
	sx={{"& > :not(style)": {width: "100%", marginTop:"1%", },}}
	noValidate
	autoComplete="off"
	display="flex"
	>
		 
		<Typography 
		 sx={{
			backgroundColor:
			disableValidar && rfc !== "" ? "#efefef" : "#E8E8E8",
			paddingLeft:"1%", 
			paddingTop:"1%" ,
			borderRadius: ".8vh" }}
		variant="body2"> {nombreArchivoPDF} </Typography>
		<input
        type="file"
        id="file-input"
        style={{ 
		display: 'none',  
		width: "100%",
		height: "2.5vh",
		cursor: "pointer", }} 
		
      />
	   <label htmlFor="file-input"> 
	   <Button
          variant="contained"
          component="span" 
        >
			<Typography
			sx={{
				color     : "#FFFFFF","&:hover": { color: "#15212f" },
				fontFamily: "MontserratRegular, sans-serif",
				fontSize  : "100%",
			}}>
				 Seleccionar
			</Typography>
        </Button>
		</label>
	</Box>
	</Grid>
	<Grid item xs={2}  ></Grid>
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