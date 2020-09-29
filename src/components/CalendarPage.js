import React from 'react'
import Calendar from './calendar/calendar'
import {
    Link
} from 'react-router-dom'
import Button from "@material-ui/core/Button";


export default class CalendarPage extends React.Component {
    render() {
        return (
            <div className="CalendarPage">

                <Calendar/>

            </div>
        )
    }
}