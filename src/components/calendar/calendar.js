import React from "react";
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import NewBookingButton from './NewBookingButton'


import { Button } from 'antd'
import BackToHome from "../UI/backToHome";
import { NavLink } from 'react-router-dom'
import {getInfoFromFirebase} from "../firebase/getInfoFromFirebase"
import 'moment/locale/ru';



const CalendarApp = () => {
  const {events, fire} = getInfoFromFirebase()
  fire("eventsCalendar")
  const localizer = momentLocalizer(moment)

  
    
      
    
      const Event= ({ event }) => {
        return (
              <NavLink style={{textDecoration:'none', color: 'white'}} to={"/Calendar/"+ event.id}> {event.title} </NavLink>
        );
      }
      
        return (
            <div >

                
                <BackToHome/>
                <NavLink to="/Registration/AddEvent" style={{width: "100%", 'text-decoration': "none"}}>
                    <Button block size ="large" type="primary">Создать мероприятие</Button>
                </NavLink>

                <p>Что бы события начали отображаться нужно сменить тууда обратно вид календаря или перейти вперед назад.</p>
                <Calendar 
                    showMultiDayTimes
                    culture='ru-RU'
                    style={{minHeight:'500px'}}
                    localizer = {localizer} 
                    events = {events} 
                    startAccessor = "start" 
                    endAccessor = "end" 
                    defaultDate={moment().toDate()}
                    components={{
                        event: Event

                      }}
                    />  
               
            </div>
        )
    
}

export default CalendarApp