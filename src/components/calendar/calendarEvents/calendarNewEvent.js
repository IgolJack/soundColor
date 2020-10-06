import React from "react";
import TextField from "@material-ui/core/TextField";
import {Button} from "react-bootstrap";
import {db} from "../../firebase/firebase";
import Form from 'react-bootstrap/Form'

class CalendarNewEvent extends React.Component{
    state = {
        id: "",
        title: "",
        start: "",
        end: "",
    }

    addNewEvent = () => {
        let id = Number(this.props.lastId) + 1
        console.log(this.props.lastId, id)
        let name = String(id)
        db.collection('eventsCalendar')
            .doc(name)
            .set({
                id: id,
                title: this.state.title,
                start: this.state.start,
                end: this.state.end,
            })
    }

    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }


    render() {
        return (
            <div style={{paddingRight: 10, paddingLeft: 10}}>
                <Form.Group>
                    <Form.Control type="text"
                        label="Название мероприятия"
                        placeholder="Практика второго курса в филармонии"
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
                    <Button variant="primary" size="lg" block onClick={this.addNewEvent}>Добавить
                        мероприятие</Button>
                </Form.Group>
            </div>
        )
    }
}

export default CalendarNewEvent