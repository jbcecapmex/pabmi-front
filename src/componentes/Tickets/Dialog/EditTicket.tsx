import React from 'react'

import {TicketsInterface} from "../TicketsDashboard";

export interface EditDialogTicketProps {
	EditDialogTicketOpen: boolean;
	handleEditDialogTicketClose: Function;
	idTicket: TicketsInterface | any;
}

export const EditDialogTicket = (props: EditDialogTicketProps) => {
  return(
    <>
    edit
    </>
    )
}

// export const editTicket = () => {
//   return (
//     <div>editTicket</div>
//   )
// }
