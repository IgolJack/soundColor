import React from "react";
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import NewBookingButton from './NewBookingButton'


import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import {getInfoFromFirebase} from "../firebase/getInfoFromFirebase"
import 'moment/locale/ru';



const CalendarApp = () => {
  
  const localizer = momentLocalizer(moment)
  const {fire, events} =  getInfoFromFirebase()
  fire("eventsCalendar")
  




    
  
      const Event = ({ event }) => {
        
        return (
              <NavLink style={{textDecoration:'none', color: 'white'}} to={"/Calendar/"+ event.id}> {event.title} </NavLink>
        );
      }
      
        return (
            <div >
                <NavLink to="/Registration/AddEvent" style={{width: "100%", 'text-decoration': "none"}}>
                    <Button block size ="large" type="primary">Создать мероприятие</Button>
                </NavLink>

                
                <Calendar 
                    style={{minHeight:'800px'}}
                    localizer = {localizer} 
                    events = {events} 
                    startAccessor = "start" 
                    endAccessor = "end" 
                    components={{
                        event: Event

                      }}
                    />  
               
            </div>
        )
    
}

export default CalendarApp