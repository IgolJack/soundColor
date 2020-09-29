import React from 'react'
import Calendar from './calendar/calendar'
import {
    Link
} from 'react-router-dom'
import Button from "@material-ui/core/Button";


 class CalendarPage extends React.Component {
    render() {
        return (
            <div className="CalendarPage">

                <Calendar/>

            </div>
        )
    }
}

export default CalendarPage