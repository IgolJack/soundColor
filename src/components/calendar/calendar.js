import React from 'react'
import ReactDOM from "react-dom";
import {db} from "../firebase/firebase";
import CalendarNewEvent from "./calendarEvents/calendarNewEvent"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import BackToHome from "../UI/backToHome";

class Calendar extends React.Component {
    state = {
        lastId: "",
    }

    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }

    componentDidMount() {
        db.collection('eventsCalendar')
            .get()
            .then(snapshot => {
                const events = []
                let lastId = 0
                snapshot.forEach(doc => {
                    const data = doc.data()
                    data.id = Number(data.id)
                    if (lastId < data.id) {
                        lastId = doc.id
                    }
                    events.push(data)
                })
                this.setState({events: events, lastId: lastId})
            })
            .catch(error => console.log(error))

    }

    EventDetail = ({event, el}) => {
        const content = (
            <a style={{ 'text-decoration': "none", color:'white'}} href={`/Calendar/${event.id}`}>{event.title}</a>
        );
        ReactDOM.render(content, el);
        return el;
    }

    render() {
        return (
            <div>
                <BackToHome/>
                <CalendarNewEvent lastId={this.state.lastId}/>
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