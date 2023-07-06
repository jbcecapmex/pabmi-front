import React from 'react' 
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Grid } from '@mui/material'
 
export default class DemoApp extends React.Component {
  render() {
    return ( 
		<div style={{ width: '95%', margin: '0 auto' }}>

		<FullCalendar
        plugins={[ dayGridPlugin ]} 
        initialView="dayGridMonth"
		events={[
			{ title: 'event 1', date: '2023-08-01' },
			{ title: 'event 2', date: '2023-09-02' }
		  ]}
    	/>
	  
	  </div>
    )
  }
}