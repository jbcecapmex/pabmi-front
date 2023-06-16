import React,  { useState }  from "react";
import { Grid, Typography, TextField, Box, Button, FormControl, Select, MenuItem, InputLabel } from "@mui/material"
import { Divider } from "@mui/material";   
import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  


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
   


export default function StepTres(){

	const navigate                  = useNavigate();
	const [TipoActivoFijo, setTipoActivoFijo]  = useState('');

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
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Configuracion/Usuarios/Menu"));
      });
  };


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

	useEffect(() => {
		getAllTipoActivoFijo();
	  }, []);

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
		value={TipoActivoFijo}
		label="Tipo Act. Fijo"
		size="small"
		displayEmpty
		onChange = {(v) => { setTipoActivoFijo(v.target.value)} }
		>
		         <MenuItem value=""></MenuItem>
                 {rowsTipoActivoFijo.map((TipoActivoFijo, index) => (
                 <MenuItem value={TipoActivoFijo.uuid}>
                 {TipoActivoFijo.Nombre}
                  </MenuItem>
                 ))}
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