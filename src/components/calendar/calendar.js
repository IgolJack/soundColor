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
        lastId: "",
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

    addNewEvent = () => {
        let id = Number(this.state.lastId) + 1
        let name = String(id)
        db.collection('eventsCalendar')
            .doc(name)
            .set({
                id: id,
                title: this.state.title,
                start: this.state.start,
                end: this.state.end,
            })
        this.componentDidMount()
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
                <div>
                        <form>
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
                            />
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
                            <Button variant="contained" onClick={this.addNewEvent}>Добавить студента</Button>
                        </form>
                </div>
            </div>




        )
    }
}

export default Calendar