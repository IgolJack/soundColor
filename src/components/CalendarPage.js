import React from 'react'
import Calendar from './calendar/calendar'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom'
import Button from "@material-ui/core/Button";

export default class CalendarPage extends React.Component{
    render() {
        return(
            <div className="CalendarPage">
                <Button  variant="contained">
                    <NavLink to="/">Вернуться на главную страницу</NavLink>
                </Button>
                <Calendar/>
            </div>


        )
    }
}