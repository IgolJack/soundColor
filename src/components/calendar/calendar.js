import React from 'react'
import ReactDOM from "react-dom";
import {db} from "../services/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";


class Calendar extends React.Component {
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

    EventDetail = ({event, el}) => {
        const content = (
                <a href={`/Calendar/${event.id}`}>{event.title}</a>
        );
        ReactDOM.render(content, el);
        return el;
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained">
                        <NavLink to="/">Вернуться на главную страницу</NavLink>
                    </Button>
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
                <div style={{paddingRight: 10, paddingLeft: 10}}>
                    <form>
                        <TextField
                            id="title"
                            label="Название мероприятия"
                            className="inputLvl"
                            fullWidth
                            placeholder="Практика второго курса в филармонии"
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
                            label="Дата начала"
                            className="inputMiss"
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
                            label="Дата окончания"
                            className="inputMiss"
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
                        <Button variant="contained" onClick={this.addNewEvent}>Добавить мероприятие</Button>
                    </form>
                </div>
            </div>


        )
    }
}

export default Calendar