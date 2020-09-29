import React from 'react'
import Calendar from './calendar/calendar'
import {
   Link
} from 'react-router-dom'

 class CalendarPage extends React.Component {
    render() {
        return (
            <div>

                <Calendar/>
            </div>
        )
    }
}

export default CalendarPage