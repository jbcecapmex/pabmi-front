import React from 'react' 
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin! 
import interactionPlugin from '@fullcalendar/interaction'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import '@fullcalendar/core/locales/es'; 
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
 


export default class DemoApp extends React.Component {

	state = {
		openModal: false,
		selectedEvent: null,
	  };
	  


	  handleEventClick = (arg:any) => {
		this.setState({
		  openModal: true,
		  selectedEvent: arg.event,
		});
	  };

	  handleModalClose = () => {
		this.setState({
		  openModal: false,
		  selectedEvent: null,
		});
	  };

	handleDateSelect = (arg:any) => {
		// Handle the date selection here
		console.log(arg.start, arg.end,  arg.allDay , arg.resourceId ); 
	  };

	  capitalizeFirstLetter = (string:any) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	  };   


  render() {

	const { openModal, selectedEvent } = this.state;


    // Opciones de idioma personalizadas
	const options = {
		locale: 'es',
		buttonText: {
		  today: 'Hoy',
		  month: 'Mes',
		  week: 'Semana',
		  day: 'Día',
		  list: 'Lista',
		},
		weekText: 'Sem.',
		allDayText: 'Todo el día',
		moreLinkText: 'más',
		noEventsText: 'No hay eventos para mostrar',
		eventContent: (arg:any) => {
			// Modificar el título del evento para que los meses estén en mayúsculas
			const title = this.capitalizeFirstLetter(arg.event.title.toLowerCase());
			return (
			  <div>
				<div>{title}</div>
				<div>{arg.timeText}</div>
			  </div>
			);
		  },
	  };

	  
 
	  const events = [
		{ title: 'Evento', date: '2023-08-01' },
		{ title: 'Evento 2', date: '2023-09-02' },
	  ];
 

    return ( 
		<div style={{ width: '90%', margin: '0 auto' }}>

		<FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
        initialView="dayGridMonth"
		headerToolbar={{ 
			start:"today prev,next",
			center:"title",
			end:"dayGridMonth,timeGridWeek,timeGridDay",
		 }}
		events={events} 
		selectable={true}
		height={"90vh"}
		select={this.handleDateSelect}
		{...options} 
		eventClick={this.handleEventClick}
    	/>

		<Dialog maxWidth={'md'}  open={openModal} onClose={this.handleModalClose}>
			<DialogTitle sx={{ width:600 }}>  Eventos  </DialogTitle>
			<DialogContent>
				<Box display={'flex'}>
				<Typography variant='h6' paddingRight={2}>Asunto: </Typography>
				<Typography variant='h6'>  Asunto </Typography>
				</Box>
				<Box display={'flex'}  >
				<Typography variant='h6' paddingRight={2}>Dependencia: </Typography>
				<Typography variant='h6'>  Asunto </Typography>
				</Box>
				<Box display={'flex'} >
				<Typography variant='h6'  paddingRight={2} >Numero de Resguardante:</Typography>
				<Typography variant='h6'>  Asunto </Typography>
				</Box>
				<Box display={'flex'} >
				<Typography variant='h6'  paddingRight={2}>Nombre del Resguardante: </Typography>
				<Typography variant='h6'>  Asunto </Typography>
				</Box>
				<Box display={'flex'}  >
				<Typography variant='h6' paddingRight={2} >Descripción: </Typography>
				<Typography variant='h6'>  Asunto </Typography>
				</Box>
				
			</DialogContent>
			<DialogActions>
			<Button color="primary"> Reagendar </Button>
				<Button onClick={this.handleModalClose} color="secondary"> Cerrar </Button>
			</DialogActions>
		</Dialog>
	  
	  </div>
    )
  }
}   