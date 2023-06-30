import * as React from "react";
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {Box,Breadcrumbs,Button,Card,CardContent,Grid,IconButton,Link,TextField,Tooltip,Typography,Divider} from "@mui/material";
import { Block, Padding } from "@mui/icons-material";
import { Icons } from "../../../layout/Icons";
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';

import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Swal from "sweetalert2";
import { queries } from "../../../queries";
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


export interface AltaMueblesInterface {
  uuid:                string;
  Cve:                 string;            
  Nombre:              string;
  Descripcion:         string;  
}





export default function Principal() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [ruta, setRuta]= React.useState();
// Esta pantalla muestra todos los registros de altas de bienes muebles por gasto corriente y adquisición
// Validar el usuario qué esta conectado para ver que listado se debe de mostrar
// La vista puede ser del enlace de la depndencia que solicito el alta de un bien mueble por gasto corriente, de los registros solicitados del ultimo mes.
// La vista de la coordinación de bienes muebles, donde podra confirmar si la factura tiene bien los datos
// La vista de la coordinador
// La vista del enlace de la dependencia
// La vista del analista juridico
// Vista de el jefe de almacén
  const confirmar = (id:any) => {
    
    Swal.fire({
      title               : "Estas Seguro(a)?",
      text                : `Estas a punto de confirmar la factura del registro seleccionado)`,
      icon                : "question",
      showCancelButton    : true,
      confirmButtonText   : "Confirmar",
      confirmButtonColor  : "#0d6efd",
      cancelButtonColor   : "#dc3545",
      cancelButtonText    : "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { uuid: id };
        axios({
          method    : "post",
          url       : process.env.REACT_APP_APPLICATION_ENDPOINT +"/gastocorriente/confirmaFactura",
          headers   : {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("jwtToken") || "",
          },
          data      : data,
        })
          .then(function (response) {
            console.log('Actualizando el rollo ' + response)
            Toast.fire({
              icon  : "success",
              title : "Se confirmo que la factura tiene los datos correctamente",
            });
            getAllMueblesGastoCorriente();
          })
          .catch(function (error) {
            console.log('Error en el rollo ')
            Swal.fire({
              icon  : "error",
              title : "Mensaje",
              text  : "(" + error.response.status + ") " + error.response.data.msg,});
          });
      }
    });
  }

const columns: GridColDef[] = [

  { field: 'RutaFactura', headerName: 'Factura', width: 90, headerAlign: 'center',
  renderCell: (value: any ) => {
    return (
      <a href={"#"} onClick={()=>{setRuta(value.formattedValue); handleOpen();}} >
         {Icons("Description")}
      </a>
    )
  }

  },
  { field: 'NoActivo', headerName: 'No. Activo', width: 130, headerAlign: 'center' },
  { field: 'TipoAdquisicion', headerName: 'Tipo Adquisición', width: 180, headerAlign: 'center' },
  { field: 'Descripcion', headerName: 'Descripción', width: 350 ,  headerAlign: 'center' },
  { field: 'TipoActivoFijoNombre', headerName: 'Tipo', width: 200 ,  headerAlign: 'center'},
  { field: 'AreaFisica', headerName: 'Área FÍsica', width: 230,  headerAlign: 'center'},
  { field: 'FechaCreacion', headerName: 'Fecha', width: 140,  headerAlign: 'center' },
  { field: 'ConfirmacionCoordinacionBM', headerName: 'Acciones', width: 380, headerAlign: 'center',
   renderCell: (value) => {
     return (
      <Box
        sx={{
          flexGrow: 1,
          fontWeight: "normal",
          display: "flex",
          justifyContent: "center",
        }}>
         <Box sx={{width:'100px',marginLeft:'25px', marginRight:'30px'}}>


         {value.formattedValue === null ? (
        <Button onClick={()=>{confirmar(value.id); console.log('ok' + value.formattedValue);}} sx={{fontSize:10,backgroundColor:'#000'}} variant="contained" size="small">Confirmar</Button>
        ) : 'Factura confirmada'}
            
            
         </Box>
         <Box sx={{width:'100px',marginLeft:'15px',}} >{Icons("QueryStats")}</Box>  
         <Box sx={{width:'80px',fill: '#0072ea'}}>
           {Icons("CheckCircle")}
         </Box>
        </Box>
     )
   }
  }
];


const [rowsAltas, setRowsAltas] = useState<Array<AltaMueblesInterface>>([]);
const getAllMueblesGastoCorriente = () => {
  const data = { uuidTipoAdquisicion: "996d3134-605f-4674-8134-5a9bca5c019e" };

axios({
  method    : "post",
  url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/gastocorriente/obtienegastocorriente",
  headers   : {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("jwtToken") || "",
  },
  data    : data,
})
  .then(({ data }) => {
    if (data) {
      console.log('data',data)
      setRowsAltas(data);
    } else {
      setRowsAltas([])
    }
  })
  .catch(function (error) {
    Swal.fire({
      icon  : "error",
      title : "Mensaje",
      text  : "("+error.response.status+") "+error.response.data.message,
    });
  });
};
  const fechaActual = dayjs()
  const fechaMenosUnMes = fechaActual.add(-1, 'month')
  const [valueDesde, setValueDesde] = React.useState(dayjs(fechaMenosUnMes));

  const handleChangeDesde = (newValue:any) => {
    setValueDesde(newValue);
  };

  const [valueHasta, setValueHasta] = React.useState(dayjs(new Date()));
  const handleChangeHasta = (newValue:any) => {
    setValueHasta(newValue);
  };



  useEffect(()=>{
    getAllMueblesGastoCorriente()
  },[])

  const handleClose = () => setOpen(false);


  const getAllBuscadorMuebles = () => {
    const data = { parametroBusqueda: inputValueBuscador };
  axios({
    method    : "post",
    url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/gastocorriente/buscadorMuebles",
    headers   : {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("jwtToken") || "",
    },
    data    : data,
  })
    .then(({ data }) => {
      if (data) {
        console.log('data',data)
        setRowsAltas(data);
      } else {
        setRowsAltas([])
      }
    })
    .catch(function (error) {
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "("+error.response.status+") "+error.response.data.message,
      });
    });
  };

  const [inputValueBuscador, setInputValueBuscador] = React.useState('');

  const handleChangeBuscador = (event: any) => {
    setInputValueBuscador(event.target.value);
    if(event.target.value===''){
      getAllMueblesGastoCorriente()
    }
  };

  const handleKeyDownBuscador = (event:any) => {
    if (event.key === 'Enter') {
      setInputValueBuscador(event.target.value);
      getAllBuscadorMuebles();
    }
  };

  const buscarPorFechas = () => {
    // obtener las fechas y ponerla en formato date para enviarlas formateadas
    const tDesde:any = valueDesde;
    var nDesde       = new Date(tDesde);
    const diaDesde   = nDesde.getDate();
    let   mesDesde   = nDesde.getMonth()+1;
    const anoDesde   = nDesde.getFullYear();
    let mesCompletoDesde;

    if(mesDesde <= 9){
      mesCompletoDesde = '0' + mesDesde;
    }else{
      mesCompletoDesde = mesDesde;
    }
    
    const fechaDesdeFormateada = anoDesde + '-' + mesCompletoDesde + '-'+ diaDesde;

    const tHasta:any = valueHasta;
    var nHasta       = new Date(tHasta);
    const diaHasta   = nHasta.getDate();
    let   mesHasta   = nHasta.getMonth()+1;
    const anoHasta   = nHasta.getFullYear();
    let mesCompletoHasta;

    if(mesHasta <= 9){
      mesCompletoHasta = '0' + mesHasta;
    }else{
      mesCompletoHasta = mesHasta;
    }
    



    const fechaHastaFormateada = anoHasta + '-' + mesCompletoHasta + '-'+ diaHasta;
    const data = { fechaDesde: fechaDesdeFormateada, fechaHasta: fechaHastaFormateada };
    //alert('Fecha desde:' + fechaDesdeFormateada + ' Hasta: ' + fechaHastaFormateada);
    // obtener las fecha y setearlas en paramnetros para enviarlos al backend
    axios({
      method    : "post",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/gastocorriente/buscadorMuebles",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
      data    : data,
    })
      .then(({ data }) => {
        if (data) {
          console.log('datos ok',data)
          setRowsAltas(data);
        } else {
          setRowsAltas([])
          console.log('datos nok',data)
        }
      })
      .catch(function (error) {
        console.log('Error')
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        });
      });
  }


  const limpiarFechas = () => {
    const fechaActual = dayjs()
    const fechaMenosUnMes = fechaActual.add(-1, 'month')
    setValueDesde(dayjs(fechaMenosUnMes));

    setValueHasta(dayjs(new Date()));
    getAllMueblesGastoCorriente();
    setInputValueBuscador('');
  }

  return (
    <Grid container sx={{}}>
      <Grid sx={{}} item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/Inicio">
          Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/Configuracion/Catalogos/Catalogos">
          Muebles
        </Link>
        <Link underline="hover" color="inherit" href="/Configuracion/Catalogos/Catalogos">
          Almacen
        </Link>
          <Typography color="text.primary">Altas de Bienes Muebles</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container xs={12} >
      <Grid item xs={12} md={12} mt={2}>
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
          Listado de altas por Gasto Corriente
        </Typography>
        <Box sx={{height:'30px',width:'100%',display:'block'}}></Box>
      </Grid>
      </Grid>







      {/* Input del buscador */}
      <Grid container xs={12}>
      {/*<Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>*/}
        <Grid item xs={12} md={12} lg={4} mt={2}>
        <InputBase placeholder="Buscar" sx={queries.inputBuscador}
          id="filled-adornment-weight" 
          value={inputValueBuscador}
          onChange={handleChangeBuscador}
          onKeyDown={handleKeyDownBuscador}
          startAdornment={<InputAdornment position="start">{Icons("Search")}</InputAdornment>}
          aria-describedby="filled-weight-helper-text"
          inputProps={{
          'aria-label': 'weight',
          }}
        />
        </Grid>


        <Grid item sx={queries.calendario_botones} xs={12} md={12} lg={6} mt={2} >
          <Typography
          variant="subtitle1"
          component="div"
          sx={{

          fontWeight: "normal"
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
      
      </Grid>

    <Grid item xs={12} md={12} lg={2} mt={2}>
      <Button  onClick={buscarPorFechas} sx={{marginLeft:"5px"}} variant="contained" size="small">
        Buscar 
      </Button>
      <Button  onClick={limpiarFechas} sx={{marginLeft:"5px"}} variant="contained" size="small">
        Limpiar 
      </Button>
    </Grid>
    {/*</Box>*/}
  












      {/* Este es el boton de Nuevo para agregar un nuevo registro por Gasto corriente */}

    <Grid sx={{justifyContent:'center',paddingTop:'10px', height:'50px'}} item xs={12} md={12} mt={2}>
      <Box sx={{display:'flex',justifyContent: 'right',width:'100%',height:'auto', alignItems:'left'}}>
        <Link underline="hover" href="/Muebles/Almacen/Altas/DatosAltas">
        {Icons("AddBox")}     
        </Link>
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontWeight: "bold",
            display: "inline",
            justifyContent: "center",
            marginBottom: "5px",
            marginTop:"5px",
            paddingLeft:"10px",
            paddingRight:"10px"
          }}
        >
          NUEVO
        </Typography>
      </Box>
    </Grid>
    

    {/** Este es el grid que contiene el Datagrid del listado de registros que se obtienen de la base de datos */}
    <Grid item xs={12}>
      <div style={{ height: 700, width: '100%' }}>
      <DataGrid
          sx={{type:"number",
          align:"left" }}
          rows={rowsAltas}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row: any) =>  row.uuid}
        />
      </div>
    </Grid>


    {/* Este Grid es el del modal para poder ver la Factura */}
    <Grid>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <Typography>
            What is Lorem Ipsum?
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Typography>
      <iframe 
      src={ruta} 
      style={{top: 0,left: 0,width: "100%",height: "600px" }} 
      title="Factura">         
      </iframe>
          <Box  maxWidth="100%"  paddingTop={2} paddingBottom={2} display="flex" justifyContent="end" >
            <Button  
              onClick={handleClose}
              variant="contained" 
              color="secondary"
              sx={{margin:"1%"}}>  Cerrar </Button>
          </Box>
          </Box>
      </Modal>
    </Grid>


    </Grid>
    </Grid>

  );
}
