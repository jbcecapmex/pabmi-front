import React from 'react'
import DemoApp from './Dialogs/CalendarComponente'
import Grid from '@mui/material/Grid/Grid'
import { Box, Button, FormControlLabel, Typography } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';


export default function Calendario() {
  return (
    <Grid md={12} sx={{ display: "flex", justifyContent: 'center' }}>
      <Grid md={2} sx={{ display: "flex"}}>
      <Box 
       boxShadow={3}
       width="100%"
       sx={{  padding:"6%"}}>
        <Box>

        <Typography variant='h5'  paddingBottom="5%">
          AGENDA
        </Typography>
        <Typography variant='h6'>
        Filtro
        </Typography>
 
        </Box>

        <Box paddingBottom={5}>
          <FormGroup> 
            <FormControlLabel control={<Checkbox defaultChecked />} label="Ver Todo" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Próximas" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="En Curso" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Finalizadas" />
          </FormGroup>
        </Box>

        <Box>

          <Box display={'flex'}>
          <Box sx={{ bgcolor:"green", height:"20px", width:"20px", marginBottom:"5%"}}/>
          <Box sx={{ paddingLeft:"6%" }}> <Typography variant="subtitle2"> Finalizado </Typography> </Box>
          </Box>

          <Box display={'flex'}>
          <Box sx={{ bgcolor:"yellow", height:"20px", width:"20px", marginBottom:"5%" }}/>
          <Box sx={{ paddingLeft:"6%" }} > <Typography variant="subtitle2"> Pendiente </Typography> </Box>
          </Box>

          <Box display={'flex'}>
          <Box sx={{ bgcolor:"red", height:"20px", width:"20px", marginBottom:"5%" }}/>
          <Box sx={{ paddingLeft:"6%" }} > <Typography variant="subtitle2"> No Realizadas </Typography> </Box>
          </Box>

        </Box>

        </Box>
      </Grid>
      <Grid sx={{ display: "flex" }} md={10}>
      <DemoApp/>
      </Grid >
    </Grid>
  )
}
