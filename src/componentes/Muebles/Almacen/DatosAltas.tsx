import * as React from "react";
import { Typography, Box, Button, } from "@mui/material";    
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
 
		uuidTipoAdquisicion : "c72b6fb8-1062-11ee-be56-0242ac120002",

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
		
		"uuidModelo": "9975797a-ae87-48d4-be98-224e73a59c6c",
		"CvePersonal": "1234",
		"CveLinea": "1233",
		"DescripcionTipoActivoFijo": "dfdfdf",
    })


	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true); 

	const navigate = useNavigate();


	// CONST DE LOS PASOS
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set<number>());

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
			let newSkipped = skipped;
			if (isStepSkipped(activeStep)){
				newSkipped = new Set(newSkipped.values());
				newSkipped.delete(activeStep);				
			}

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
		}
		
	};


	
 
	
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

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("No puedes saltarte un paso");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	//nuevo



	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Typography
					variant="h5"
					component="div"
					sx={{
						flexGrow: 1,
						fontWeight: "bold",
						display: "flex",
						justifyContent: "left",
					}}
				>
					Datos para Alta
				</Typography>
			</Grid>
			<Grid item xs={12} padding={2}>
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
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
