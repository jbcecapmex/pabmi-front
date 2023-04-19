import React from "react";
import { Close as CloseIcon, Token } from "@mui/icons-material";
import {Typography,Button,Dialog,DialogActions,DialogContent,DialogTitle,FormControlLabel,FormGroup,Grid,IconButton,Box,Switch,TextField,} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
//import Swal from "sweetalert2";
import { SecretariaInterface } from "../CatGrid";

//solo para efectos de desarrollo, ya integrado al login, esto se tiene que comentar o quitar
//import {token} from "../CatApps";

export interface EditDialogProps {
	editDialogOpen: boolean;
	handleEditDialogClose: Function;
	cat: number;
	titulo: string;	
	app: SecretariaInterface | any;
}

export const EditDialog = (props: EditDialogProps) => {
	const [Id, setId] = useState("");
	const [Nombre, setNombre] = useState("");
	const [Path, setPath] = useState("");
	const [EstaActivo, setEstaActivo] = useState("");
	// esto creo que es solo para poder prender o apagar el switch
	const [estatus, setEstatus] = useState<boolean>(false);
	const [idusuariomodifica, setIDUsuarioModifica] = useState("");

	useEffect(() => {
		setId(props.app.row.Id);
		setNombre(props.app.row.Nombre);
		setPath(props.app.row.Path);
		//setEstaActivo(props.app.EstaActivo === 1 ? reue : else);
		setEstatus(props.app.row.estatusLabel === "Activo" ? true : false);
	}, [
		props.app.row.Id,
		props.app.row.Nombre,
		props.app.row.Path,
		props.app.row.estatusLabel,
	]);

	const handleUpdateBtn = () => {
		if ((Nombre === "") || (Path === "")) {
			// Swal.fire({
			// 	icon: "error",
			// 	title: "Mensaje",
			// 	text: "Completa todos los campos para continuar",
			// });
		} else {
			const data = {
				//aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual
				IdApp: props.app.row.Id,
				Nombre: Nombre,
				Path: Path,
				EstaActivo: estatus ? 1 : 0,
				IdUsuarioModificador: "c18fc135-3a89-11ed-aed0-040300000000",
			};
			axios({
				method: "put",
				url: process.env.REACT_APP_APPLICATION_BACK+"/api/app",
				headers: {
					"Content-Type": "application/json",
					// Authorization: localStorage.getItem("jwtToken") || "",
					//Authorization: token ,
				},
				data: data,
			})
				.then(function (response) {
					props.handleEditDialogClose(true);
				})
				.catch(function (error) {
					console.log(error);
					// Swal.fire({
					// 	icon: "error",
					// 	title: "Mensaje",
					// 	text:
					// 		"(" +
					// 		error.response.status +
					// 		") " +
					// 		error.response.data.message,
					// });
				});
		}
	};

	return (
		<Dialog
			open={props.editDialogOpen}
			onClose={() => props.handleEditDialogClose()}
			fullWidth={true}
			maxWidth="md"
			aria-labelledby="edit-dialog-title"
			aria-describedby="edit-dialog-description"
		>
			{/* esta es la pantalla modal que se abre al darle editar un registro */}
			<DialogTitle id="edit-dialog-title">
				Editar {props.titulo} {props.app.row.Nombre}
				{/* <IconButton
					aria-label="close"
					onClick={() => props.handleEditDialogClose()}
					sx={{position: "absolute",right: 8,top: 8,color: (theme) => theme.palette.grey[500],}}>
					<CloseIcon />
				</IconButton> */}
				<Box sx={{position: "absolute", right: 8, top: 8,}}>
					<Grid sx={{display: "flex",alignItems: "right",justifyContent: "right",}}>
					<Button
						onClick={() => handleUpdateBtn()}
						sx={{color: "#616161",width: "50%",backgroundColor: "#226599",border: "1px solid #3988DA",borderRadius: "0",borderTopLeftRadius: "5px",borderBottomLeftRadius: "5px",}} variant="contained"
					>
						<Typography
						sx={{color: "#ffffff",fontFamily: "Roboto, sans-serif",fontSize: "100%",}}>
						Guardar
						</Typography>
					</Button>
					<Button
						onClick={() => props.handleEditDialogClose()}
						sx={{color: "#616161",fontFamily: "Roboto, sans-serif",width: "50%",backgroundColor: "#3988DA",border: "1px solid #3988DA",
								borderRadius: "0",borderTopRightRadius: "5px",borderBottomRightRadius: "5px",}}variant="contained"
					>
						<Typography
						sx={{
							color: "#ffffff",fontFamily: "Roboto, sans-serif",fontSize: "100%",}}>
						Cancelar
						</Typography>
					</Button>
					</Grid>

					{/* <CloseIcon /> */}
				</Box>				
			</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={2}>
					{/* campo nombre */}
					<Grid item xs={12} md={6}>
						<TextField
							autoFocus
							margin="dense"
							id="nombre"
							label="Nombre"
							type="text"
							fullWidth
							variant="standard"
							value={Nombre}
							onChange={(v) => setNombre(v.target.value)}
						/>
					</Grid>
					{/* campo path */}
					<Grid item xs={12} md={6}>
						<TextField
							autoFocus
							margin="dense"
							id="path"
							label="Path"
							type="text"
							fullWidth
							variant="standard"
							value={Path}
							onChange={(v) => setPath(v.target.value)}
						/>
					</Grid>
					{/* objeto de estatus */}
					<Grid item xs={12} md={6}>
						<FormGroup>
							<FormControlLabel
								control={<Switch checked={estatus} onChange={(v) => setEstatus(v.target.checked)}/>}
								label={estatus ? "Activo" : "Inactivo"}
							/>
						</FormGroup>
					</Grid>
				</Grid>
			</DialogContent>

			{/* botones que se muestran en el modal */}
			<DialogActions>
				{/* <Button color="error" onClick={() => props.handleEditDialogClose()}>
					Cancelar
				</Button>
				<Button onClick={() => handleUpdateBtn()}>Actualizar</Button> */}
			</DialogActions>

		</Dialog>
	);
};
