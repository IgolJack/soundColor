import React from 'react'
import ReactDOM from "react-dom";
import {db} from "../services/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/bootstrap/main.css";

class Calendar extends React.Component{
    state = {
        id: "",
        title: "",
        start: "",
        end: "",
        url: ""
    }
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }
    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }
    addNewEvent = () => {
        db.collection('eventsCalendar')
            .add({
                id: this.state.id,
                title: this.state.title,
                start: this.state.start,
                end: this.state.end,
                url: this.state.url
            })
        this.componentDidMount()
    }
    componentDidMount() {
        db.collection('eventsCalendar')
            .get()
            .then(snapshot => {
                const events = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    events.push(data)
                    console.log(doc.id)
                })
                this.setState({events: events})
            })
            .catch(error => console.log(error))
    }

    EventDetail = ({ event, el }) => {
        // extendedProps is used to access additional event properties.
        const content = (
            <a href={`/Calendar/${event.id}`}>
                <div>
                {event.title}
                <div>{event.extendedProps.description}</div>
                </div>
            </a>
        );
        ReactDOM.render(content, el);
        return el;
    }

    render() {
        return (
            //Документация - https://fullcalendar.io/docs#toc.
            <div id="calendar" className="container" ref="calendar">
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[interactionPlugin, dayGridPlugin, bootstrapPlugin]}
                    themeSystem="bootstrap"
                    weekends={false}
                    displayEventTime={true}
                    events={this.state.events}
                    eventRender={this.EventDetail}
                />
                <div>
                    <form action="" className="inputForm">
                        <p>
                            <TextField
                                id="id"
                                label="id"
                                style={{margin: 8}}
                                placeholder="d"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="inputName"
                                name="id"
                                value={this.state.id}
                                onChange={this.onInputChange}
                            /></p>
                        <p>
                            <TextField
                                id="title"
                                label="title"
                                className="inputLvl"
                                style={{margin: 8}}
                                placeholder="Event 3"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="title"
                                value={this.state.title}
                                onChange={this.onInputChange}
                            /></p>
                        <p>
                            <TextField
                                id="start"
                                label="start"
                                className="inputMiss"
                                style={{margin: 8}}
                                fullWidth
                                name="start"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="2020-08-01"
                                value={this.state.start}
                                onChange={this.onInputChange}
                            />
                        </p>
                        <p>
                            <TextField
                                id="end"
                                label="end"
                                className="inputMiss"
                                style={{margin: 8}}
                                fullWidth
                                name="end"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="2020-08-12"
                                value={this.state.end}
                                onChange={this.onInputChange}
                            />
                        </p>
                        <Button variant="contained" onClick={this.addNewEvent}>Добавить студента</Button>
                    </form>
                </div>
            </div>
        )
    }



}

//<NavLink to={`/CalendarPage/${Calendar.id}`}> </NavLink>



export default Calendar