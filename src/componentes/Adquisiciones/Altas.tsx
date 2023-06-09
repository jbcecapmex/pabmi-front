import * as React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Block, Padding, UploadFile } from "@mui/icons-material";
import { Icons } from "../../layout/Icons";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Modal from '@mui/material/Modal';
import { FileUploader } from "react-drag-drop-files";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  boxShadow: 5,
  p: 2,
};

export default function Altas() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [contenido, setContenido]= React.useState();
  const fileTypes = ["pdf","PDF"];
 

    const [file, setFile] = React.useState(null);
    const handleChangeUpload = (file:any) => {
      setFile(file);
    };
    



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'factura', headerName: 'Factura', width: 70,
  renderCell: (value: any ) => {
    return (
      <a href={value.formattedValue.link} onClick={()=>{setContenido(value.formattedValue.icono); handleOpen(); console.log(contenido)}}>
         {Icons(value.formattedValue.icono)}
      </a>
    )
  }

},
  { field: 'activo', headerName: 'No. Activo', width: 100, type:'number' },
  { field: 'tipoAdquisicion', headerName: 'Tipo Adquisición', width: 140 },
  { field: 'descripcion', headerName: 'Descripción', width: 250 },
  { field: 'tipo', headerName: 'Tipo', width: 200 },
  { field: 'areaFisica', headerName: 'Área FÍsica', width: 200 },
  { field: 'fecha', headerName: 'Fecha', width: 110 },
  { field: 'acciones', headerName: 'Acciones', width: 180,
   renderCell: (value) => {
     return (
      <Box
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}>

         <Box sx={{width:'50px',marginLeft:'5px', marginRight:'5px',}} >{Icons(value.formattedValue.icono)}</Box>  
         <Box sx={{fill: '#0072ea'}}>
           {Icons(value.formattedValue.estatus)}
         </Box>
        </Box>
     
       


     )
   }
  }
];

const rows = [
  { id: 1, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:3800, tipoAdquisicion: 'Jon', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Oficina del Secretario', fecha: '13/04/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 2, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:1345, tipoAdquisicion: 'Cersei', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Camiones', areaFisica:'Almacén de Bienes Muebles', fecha: '09/04/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 3, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:7652, tipoAdquisicion: 'Jaime', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección del Archivo', fecha: '08/04/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 4, factura: {icono: "Description", link: "#", "func": handleOpen}, activo:1276, tipoAdquisicion: 'Arya', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Vehículos Menores', areaFisica:'Dirección de Infraestructura', fecha: '07/04/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 5, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:1334, tipoAdquisicion: 'Daenerys', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Camiones', areaFisica:'Almacén de Bienes Muebles', fecha: '05/04/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 6, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:1039, tipoAdquisicion: 'Cersei', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Dirección del Archivo', fecha: '03/04/2023', acciones:{icono: "QueryStats",  estatus:"DoDisturbOn"} },
  { id: 7, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:6545, tipoAdquisicion: 'Ferrara', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Oficina del Secretario', fecha: '02/04/2023', acciones:{icono: "QueryStats", estatus:"DoDisturbOn"} },
  { id: 8, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:7845, tipoAdquisicion: 'Rossini', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección de Infraestructura', fecha: '01/04/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 9, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:8985, tipoAdquisicion: 'Harvey', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Vehículos Menores', areaFisica:'Almacén de Bienes Muebles', fecha: '10/02/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 10, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:8345, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Oficina del Secretario', fecha: '09/03/2023', acciones:{icono: "QueryStats",  estatus:"Error"} },
  { id: 11, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:1305, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Camiones', areaFisica:'Dirección de Infraestructura', fecha: '08/03/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 12, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:1735, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección del Archivo', fecha: '07/03/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 13, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:2475, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Refrigeración', areaFisica:'Oficina del Secretario', fecha: '06/03/2023', acciones:{icono: "QueryStats", estatus:"Error"} },
  { id: 14, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:9876, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Vehículos Menores', areaFisica:'Almacén de Bienes Muebles', fecha: '05/03/2023', acciones:{icono: "QueryStats", estatus:"CheckCircle"} },
  { id: 15, factura: {icono: "UploadFile", link: "#", "func": handleOpen}, activo:1270, tipoAdquisicion: 'Flores', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tipo:'Equipo de Computo', areaFisica:'Dirección del Archivo', fecha: '04/03/2023', acciones:{icono: "QueryStats", estatus:"DoDisturbOn"} },
];




  const [valueDesde, setValueDesde] = React.useState(dayjs(new Date()));
  const handleChangeDesde = (newValue:any) => {
    setValueDesde(newValue);
  };

  const [valueHasta, setValueHasta] = React.useState(dayjs(new Date()));
  const handleChangeHasta = (newValue:any) => {
    setValueHasta(newValue);
  };

  const handleClose = () => setOpen(false);

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
          justifyContent: "left"
        }}
      >
        Listado de altas para Almacen
      </Typography>
      <Box sx={{height:'30px',width:'100%',display:'block'}}></Box>
    </Grid>
    <Grid item xs={6}>
    <InputBase placeholder="Buscar" sx={{width: '400px',height:'45px',border:1,borderRadius:3,borderColor:"#cdcdcd",paddingLeft:'10PX'}}
            id="filled-adornment-weight" 
            startAdornment={<InputAdornment position="start">{Icons("Search")}</InputAdornment>}
            aria-describedby="filled-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
    </Grid>
    <Grid item xs={6}>
    
          <Typography
        variant="subtitle1"
        component="div"
        sx={{
          fontWeight: "normal",
          display: "flex",
          justifyContent: "left"
        }}
      >
        Busqueda por rango de fechas
      </Typography>
      
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Typography
        variant="subtitle1"
        component="div"
        sx={{
          fontWeight: "normal",
          justifyContent: "center"
        }}
      >
        Desde
        </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
              label=""
              inputFormat="DD/MM/YYYY"
              value={valueDesde}
              onChange={handleChangeDesde}
              renderInput={(params) => <TextField
              sx={{"& .MuiInputBase-input": {height: "10px"},marginLeft:'10px',marginRight:'10px'}} {...params}
               />}
            />
            </LocalizationProvider>
            <Typography
        variant="subtitle1"
        component="div"
        sx={{
          fontWeight: "normal",
          justifyContent: "center",
          marginLeft:"10px"
        }}
      >
            Hasta
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker 
              label=""
              inputFormat="DD/MM/YYYY"
              value={valueHasta}
              onChange={handleChangeHasta}
              renderInput={(params) => <TextField sx={{"& .MuiInputBase-input": {height: "10px"},marginLeft:'10px'}}{...params} />}
            />
            </LocalizationProvider>
        </Box>
    </Grid>
    <Grid item sx={{height:'auto'}}xs={12}>
    <Typography
        variant="body1"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "normal",
          display: "flex",
          justifyContent: "justify",
          marginBottom: "20px",
          marginTop:"10px",
          paddingLeft:"20px",
          paddingRight:"20px"
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </Grid>

    

    <Grid item xs={12}>
    <div style={{ height: 700, width: '100%' }}>
    <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </Grid>



    
    <Grid>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {contenido==="UploadFile"?
        <Box sx={style}>

          <Box sx={{
            display: "flex",
            fontFamily: "MontserratBold",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}>
            <Typography sx={{paddingTop:"10px",paddingBottom:"20px"}} variant="h4" component="h2">Cargar la Factura.</Typography>
            <FileUploader multiple={true} label="Cargar aquí la Factura del articulo" width="380px" handleChange={handleChangeUpload} name="file" types={fileTypes} />
            
            <Typography sx={{paddingTop:"30px",paddingBottom:"10px"}} variant="body1">{file ? 'File name: ${file.name}' : 'No se han cargado Facturas.'}</Typography>
          </Box>
          <Box  maxWidth="100%"  paddingTop={2} paddingBottom={2} display="flex" justifyContent="end" >
                <Button  
                  onClick={handleClose}
                  variant="contained" 
                  color="secondary"
                  sx={{margin:"1%"}}>  Cerrar </Button>
              </Box>

        </Box>

        :
          <Box sx={style}>
            <Typography>
              What is Lorem Ipsum?
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley.
            </Typography>
            <iframe src="http://localhost:3008/facturas/Heuristic_Summary1-compressed.pdf" style={{top: 0,left: 0,width: "100%",height: "600px" }} title="Factura">     
            </iframe>
            <Box  maxWidth="100%"  paddingTop={2} paddingBottom={2} display="flex" justifyContent="end" >
              <Button  
                onClick={handleClose}
                variant="contained" 
                color="secondary"
                sx={{margin:"1%"}}>  Cerrar </Button>
            </Box>
          </Box>
        }
      </Modal>
    </Grid>


    </Grid>
  );
}
