import React from 'react';
import { Card, CardHeader , Grid, Breadcrumbs, Link, Typography, Box, TextField, CardContent, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
 

export default function Menuc() { 
  return (
    <Grid container sx={{ fontFamily: "MontserratSemiBold" }}>
      <Grid item xs={12} paddingLeft={3}>
      <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/inicio">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/configuracion/catalogos">
            Configuración
          </Link>
          <Link underline="hover" color="inherit" href="/configuracion/catalogos">
            Catálogos
          </Link>
          <Link underline="hover" color="inherit">
            titulo
          </Link>
          <Typography color="text.primary">Catálogo de titulo </Typography>
        </Breadcrumbs>
      </Grid> 
      <Grid container justifyContent={"center"} item xs={12} paddingLeft={3}>
      <Grid item xs={12} paddingRight={3} paddingTop={5}>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '41%' }, 
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
       id="nombre" 
       label="Nombre"
       variant="outlined" />

      <TextField
       id="descripcion" 
       label="Descripción"
       variant="outlined" />

    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20%' },
      }}
      noValidate
      autoComplete="off"
    >
     
      <TextField
       id="icono" 
       label="Icono"
       variant="outlined" />

      <TextField
       id="path" 
       label="path"
       variant="outlined" />

      <TextField
       id="nivel" 
       label="nivel" 
       variant="outlined" />
       
       <TextField
       id="ordenamiento" 
       label="Ordenamiento"
       variant="outlined" />

    </Box>
      </Grid>
      </Grid>
      <Grid container justifyContent={"center"} item xs={10} paddingLeft={3} paddingTop={5}>
      <Grid item xs={12} md={12} mt={2}>
      <Card sx={{ p: 1, boxShadow: 4 }}>
      <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold"}} />
      <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}> Catálogo de titulo </Typography>  
      <CardContent>
      <Box display="flex" justifyContent="flex-end">
      <Grid sx={{display: "flex", alignItems: "right", justifyContent: "right", paddingBottom:"2%", paddingRight:"1%"}}>
                    <Button
                      // onClick={(event) => handleNewBtnClick(event)}
                      variant="contained"
                      sx={{margin:"1%"}}
                      startIcon={<AddIcon sx={{color:"#FFFFFF"}} /> }>
                      <Typography
                        sx={{color: "#FFFFFF",fontFamily: "MontserratRegular, sans-serif",fontSize: "100%",}}>
                        Agregar
                      </Typography>
                    </Button>
                    <Button 
                    // onClick={() => regresa()} 
                    // sx={{color: "#616161",fontFamily: "Roboto, sans-serif",width: "50%",backgroundColor: "#3988DA",border: "1px solid #3988DA", borderRadius: "0",borderTopRightRadius: "5px",borderBottomRightRadius: "5px",}}
                        color="secondary"
                        sx={{margin:"1%"}}
                        variant="contained">
                      <Typography
                        sx={{color: "#ffffff",fontFamily: "MontserratRegular, sans-serif",fontSize: "100%",}}>
                        Cancelar
                      </Typography>
                    </Button>
                  </Grid>
      </Box>

      

      </CardContent>
      </Card>
      </Grid>
      </Grid>
    </Grid>
  );
}