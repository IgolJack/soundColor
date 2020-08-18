import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {db} from "../services/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function clickEvent() {
}

class Calendar extends React.Component{
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
                end: this.state.end
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
                console.log(this.state.events)
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            //React https://fullcalendar.io/docs/react
            //Документация - https://fullcalendar.io/docs#toc.
            //Важно - https://fullcalendar.io/docs/event-source-object
            <div>
            <FullCalendar plugins={[dayGridPlugin]} eventClick={clickEvent} initialView="dayGridMonth" events={this.state.events} color='yellow'/>
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


export default Calendar