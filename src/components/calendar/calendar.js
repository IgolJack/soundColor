import React from 'react'
import ReactDOM from "react-dom";
import {db} from "../services/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";



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
                })
                this.setState({events: events})
            })
            .catch(error => console.log(error))
    }

    EventDetail = ({ event, el }) => {
        const content = (

                <div>
                    <a href={`/Calendar/${event.id}`}>
                        <span>
                            {event.title}
                        </span>
                    </a>
                <div>{event.extendedProps.description}</div>
                </div>

        );
        ReactDOM.render(content, el);
        return el;
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={'/'}>Назад</Link>
                </div>
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[interactionPlugin, dayGridPlugin]}
                    themeSystem='standard'
                    weekends={false}
                    displayEventTime={true}
                    events={this.state.events}
                    eventRender={this.EventDetail}
                />
            </div>






        )
    }
}

export default Calendar