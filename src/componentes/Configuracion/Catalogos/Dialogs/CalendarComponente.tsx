import React from 'react' 
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin! 
import interactionPlugin from '@fullcalendar/interaction'; 
import { Calendar } from '@fullcalendar/core';
import '@fullcalendar/core/locales/es';
 



export default class DemoApp extends React.Component {

	handleDateSelect = (arg:any) => {
		// Handle the date selection here
		console.log(arg.start, arg.end); 
	  };

	  capitalizeFirstLetter = (string:any) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	  };


  render() {
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

    // Formato personalizado para los días de la semana
    const dayHeaderContent = (arg: any) => {
		const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
		return days[arg.date.getDay()];
	  };

	  const events = [
		{ title: 'Evento', date: '2023-08-01' },
		{ title: 'event 2', date: '2023-09-02' },
	  ];
 

    return ( 
		<div style={{ width: '95%', margin: '0 auto' }}>

		<FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]} 
        initialView="dayGridMonth"
		events={events}
		dayHeaderContent={dayHeaderContent} 
		selectable={true}
		select={this.handleDateSelect}
		{...options} 
    	/>
	  
	  </div>
    )
  }
}