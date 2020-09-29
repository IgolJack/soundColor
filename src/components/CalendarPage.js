import React from 'react'
import Calendar from './calendar/calendar'
import {
    NavLink
} from 'react-router-dom'

 class CalendarPage extends React.Component {
    render() {
        return (
            <div> <NavLink to={'/'}>Назад</NavLink></div>
                <Calendar/>
        )
    }
}

export default CalendarPage