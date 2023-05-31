import * as React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Block, Padding } from "@mui/icons-material";
import { Icons } from "../../../layout/Icons";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "@mui/material/Modal";
import StepUno from "./PasosAltas/StepUno";
import StepDos from "./PasosAltas/StepDos";
import StepTres from "./PasosAltas/StepTres";

const steps = ["Paso1", "Paso2", "Paso3"];

export default function DatosAltas() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);

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
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
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
								labelProps.optional = (
									<Typography variant="caption">Opcional</Typography>
								);
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
								<Button onClick={handleReset}>Reiniciar</Button>
							</Box>
						</React.Fragment>
					) : (
						<React.Fragment>
							{
								{
									0:  <StepUno/> ,
									1:  <StepDos/> ,
									2:  <StepTres/>  ,
								}[activeStep]
							}
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
								<Button
									color="inherit"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
								>
									Atrás
								</Button>
								<Box sx={{ flex: "1 1 auto" }} />
								{isStepOptional(activeStep) && (
									<Button
										color="inherit"
										onClick={handleSkip}
										sx={{ mr: 1 }}
									>
										Saltar
									</Button>
								)}
								<Button onClick={handleNext}>
									{activeStep === steps.length - 1
										? "Terminado"
										: "Siguiente"}
								</Button>
							</Box>
						</React.Fragment>
					)}
				</Box>
			</Grid>
		</Grid>
	);
}