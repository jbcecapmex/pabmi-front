import * as React from "react";
import { Typography, Box, Button,FormControl,InputLabel, Select, MenuItem} from "@mui/material";   
import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";    
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel"; 
import StepUno from "./PasosAltas/StepUno";
import StepDos from "./PasosAltas/StepDos";
import StepTres from "./PasosAltas/StepTres";
import axios from 'axios';
import Swal from "sweetalert2";
import {catalogoSave, catalogoDelete, catalogoUpdate} from "../../../services/CatalogoServices";


export interface TiposAdquisicionInterface {
	uuid: string;
	Cve: string;
	Nombre: string;
	Descripcion: string;
	creadopor:          string;
	modificadopor:      string;
	eliminadopor:       string;    
  }

const steps = ["Paso1", "Paso2", "Paso3"];

// Mnesajes de exito o error
const Toast = Swal.mixin({
	toast: true,
	position: "center",
	showConfirmButton: false,
	timer: 4000,
	timerProgressBar: false,
	didOpen: (toast:any) => {
	toast.addEventListener("mouseenter", Swal.stopTimer);
	toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
	});
	

export default function DatosAltas() {

	const [datosAlta, setDatosAlta] = React.useState({
 
		uuidTipoAdquisicion : "",

		NoInventario: "",
        Cantidad: "",
		NoActivo : "", 
		uuidTipoActivoFijo: "",
		Descripcion: "", 
		uuidTipoBien: "", 
		uuidArea: "",
		CostoSinIva: "",
		CostoConIva: "",
		DepreciacionAcumulada: "",
		FechaEntrada: "",
		FechaUltimaActualizacion: "",

		// Paso2
		Placas: "",
		Series: "", 
		uuidMarca: "",
		Anio: "",
		VidaUtil: "",
		// PorcentajeDepreciacion:"", 
		uuidModelo: " ",
		uuidPersonalResguardo: "",
		Personal: "", 
		uuidConductor: "",
		Linea: "",
		DescripcionLinea: "",

		// Paso3

		CodigoContable: "",
		FechaDeUso: "",
		ClaveInterior: "",
		Cog: "",
		DescripcionDetalle: "",

		// CvaArea: "",
		// Factura: "",
		
		
		"CvePersonal": "012340",
		"CveLinea": "012330",
		"DescripcionTipoActivoFijo": "Odfdfdf",

    })
  
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true); 

	const navigate = useNavigate();
	const [TiposAdquisicion, setTiposAdquisicion]               = useState("");

	 // declaracion de la variable de estado "hook" que recibira la informacion del endpoint    
	 const [rowsTiposAdquisicion, setRowsTiposAdquisicion] = useState<Array<TiposAdquisicionInterface>>([]);
	 // aqui es el consumo del endpoint para obtener el listado de tipos de tickets de la base de datos
	 const getAllTiposAdquisicion = () => {
	   axios({
		 method    : "get",
		 url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienetiposadquisicion",
		 headers   : {
					   "Content-Type": "application/json",
					   Authorization: localStorage.getItem("jwtToken") || "",
		 },
	   })
		 .then(({ data }) => {
		   const rowsTiposAdquisicion = data.data.data;
		   setRowsTiposAdquisicion(rowsTiposAdquisicion);
		 })
		 .catch(function (error) {
		   Swal.fire({
			 icon  : "error",
			 title : "Existen campos pendientes de completar.",
			 text  : "("+error.response.status+") "+error.response.data.message,
		   });
		 });
	 };

	 useEffect(() => {
		getAllTiposAdquisicion();
	  }, []);


	// CONST DE LOS PASOS
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set<number>());
	const [mensajeError, setMensajeError] = React.useState("Error");

	const isStepOptional = (step: number) => {
		return step === 1;
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};
 
	const handleNext = () => {
		if (activeStep === steps.length - 1){
			submitData();
		}else {
			validate().then((res) =>{
				if(res){
					let newSkipped = skipped;
			if (isStepSkipped(activeStep)){
				newSkipped = new Set(newSkipped.values());
				newSkipped.delete(activeStep);				
			}

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
				} else {
					Swal.fire({
						icon  : "error",
						title : "Existen campos pendientes de completar.",
						text  : mensajeError,
					  })
				}
			})
			
		}
		
	};

	const validate = async () => {
		
		if(activeStep===0){
			// if(datosAlta.Cantidad==="") {await setMensajeError("Falta Cantidad"); return false;}
		}
		return true;
	}
	
	const submitData = () => {
		const url = "/gastocorriente/guardagastocorriente";
		console.log(datosAlta);
		catalogoSave(datosAlta,url).then((response) =>{
			console.log("datosAlta", datosAlta);
		})

    };

 

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	//nuevo



	return (
		<Grid container spacing={1}>
			<Grid item xs={12}  md ={12} >
				<Typography
					variant="h5"
					component="div"
					justifyContent={{ xs: 'center', md: 'left' }}
					sx={{
						flexGrow: 1,
						fontWeight: "bold",
						display: "flex",
					}}
				>
					Datos para Alta
				</Typography>
			</Grid>
			
			<Grid xs={12} >
			<Grid item xs={12} md ={4} padding={3}>
			<Box 
			sx={{
				'& > :not(style)': { m: 1.3, width: '100%' },   }}
					display="flex">
			<FormControl fullWidth sx={{bgColor:"#fff"}}>
			<InputLabel  sx={{ marginTop:"-4px"}}> 
			Tipo Adquisición
			</InputLabel>
			<Select
			id="Tipo Adquisición"
			// value={TiposAdquisicion}
			label="Tipo Adquisición"
			size="small"
			displayEmpty
			value     ={datosAlta.uuidTipoAdquisicion} 
			onChange  ={(v) => {setDatosAlta({...datosAlta, uuidTipoAdquisicion: v.target.value}); console.log(datosAlta)}}
			>

            <MenuItem value=""></MenuItem>
            {rowsTiposAdquisicion.map((TiposAdquisicion, idex) => (
            <MenuItem value={TiposAdquisicion.uuid}>
            {TiposAdquisicion.Cve}
             </MenuItem>
              ))}

			</Select> 
			</FormControl>
			</Box>
			</Grid>
			</Grid>
			
			<Grid item xs={12} md ={12} padding={2} >
				<Box sx={{ width: "95%", padding: "2%" }}>
					<Stepper activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							const labelProps: {
								optional?: React.ReactNode;
							} = {};
							if (isStepOptional(index)) {
								labelProps.optional = false;
							}
							if (isStepSkipped(index)) {
								stepProps.completed = false;
							}
							return (
								<Step key={label} {...stepProps}>
									<StepLabel {...labelProps}>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Typography sx={{ mt: 2, mb: 1 }}>
								Completado  
							</Typography>
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
								<Box sx={{ flex: "1 1 auto" }} />
								<Button  variant="contained" sx={{ margin: "1%", color: "#FFFFFF" }} onClick={handleReset}>
									<Typography 
									sx={{
										color     : "#FFFFFF","&:hover": { color: "#15212f" },
										fontFamily: "MontserratRegular, sans-serif",
										fontSize  : "100%",
									}}
									> Reiniciar </Typography>	
								</Button>
							</Box>
						</React.Fragment>
					) : (
						<React.Fragment>
							{
								{
									0:  <StepUno datosAlta={datosAlta} setDatosAlta={setDatosAlta} /> ,
									1:  <StepDos datosAlta={datosAlta} setDatosAlta={setDatosAlta} /> ,
									2:  <StepTres datosAlta={datosAlta} setDatosAlta={setDatosAlta} />  ,
								}[activeStep]
							}
							<Box  display={{ xs: 'flow', md: 'flex' }} flexDirection={{  xs:"column", md:"row"}}>
								<Button
									color="secondary"
									variant="contained"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{margin:"1%"}}
								>
								<Typography
								sx={{color: "#ffffff",
								"&:hover":{
								  color:"#15212f",
								  },
								fontFamily: "MontserratRegular, sans-serif",
								fontSize: "100%",}}
								> Atrás </Typography>
								</Button>
								<Box sx={{ flex: "1 1 auto" }} />
								<Button
									 onClick={() => navigate(-1)}
									variant="contained" 
									color="secondary"
									sx={{margin:"1%",
									color:"white",
									"&:hover":{
									color:"#15212f",
									},
									}}>  Cancelar </Button>
								
								<Button variant="contained" sx={{ margin: "1%", color: "#FFFFFF" }} onClick={handleNext}>
								<Typography
								sx={{
									color     : "#FFFFFF","&:hover": { color: "#15212f" },
									fontFamily: "MontserratRegular, sans-serif",
									fontSize  : "100%",
								}}
								>
									{activeStep === steps.length - 1
										? "Terminado"
										: "Siguiente"}
								</Typography>
								</Button>
							</Box>
						</React.Fragment>
					)}
				</Box>
			</Grid>
		</Grid>
	);
}
