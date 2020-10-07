import React, {Component} from 'react';
import {db} from '../../../firebase/firebase'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";

class AddStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            lvl: 0,
            missed: 0,
            id: "",
            course: "Первый курс",
            open: false,
            lastId: ""
        }
    }

    mapUserDetailToState = () => {
        this.setState({
            lastId: this.props.lastId ? this.props.lastId : ''
        })
    }

    handleOpen = () => {
        this.setState({open: true})
        this.mapUserDetailToState()
        console.log(this.state.lastId)
    }

    handleClose = () => {
        this.setState({open: false})
    }

    componentDidMount() {
        this.mapUserDetailToState()
    }

    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    addNewStudent = () => {
        if ((this.state.name !== "" && this.state.lvl !== "") && this.state.missed !== "") {
            var LastId = Number(this.props.lastId)
            LastId += 1
            LastId = String(LastId)
            db.collection('students')
                .doc(LastId)
                .set({
                    id: LastId,
                    name: this.state.name,
                    course: this.state.course,
                    lvl: this.state.lvl,
                    missed: this.state.missed
                });
            this.props.getStudents()
            this.setState({
                name: "",
                course: "Первый курс",
                lvl: 0,
                missed: 0
            })
        } else {
            console.log("Введите значение!!")
        }
        this.handleClose()
    }

    outputTextField = (props) => {
        return (
                <Form.Control
                    id="standard-full-width"
                    label={`${props.label}`}
                    style={{margin: 8}}
                    placeholder={`${props.placeholder}`}
                    className={`input${props.className}`}
                    required
                    type={`${props.type}`}
                    name={`${props.name}`}
                    value={props.value}
                    onChange={this.onInputChange}
                />
        )
    }

    render() {
        return (
            <div>
                <Button  variant="primary" onClick={this.handleOpen}>Добавить студента</Button>

                <Modal show={this.state.open}>
                    <Modal.Header>
                        <Modal.Title>Добавить пользователя</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Курс</Form.Label>

                                <Form.Control as="select"
                                              name="course"
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              value={this.state.course}
                                              onChange={this.onInputChange}
                                >
                                    <option value="Первый курс">Первый курс</option>
                                    <option value="Второй курс">Второй курс</option>
                                    <option value="Третий курс">Третий курс</option>
                                    <option value="Четвертый курс">Четвертый курс</option>
                                    <option value="Пятый курс">Пятый курс</option>
                                </Form.Control>
                                <Form.Label>ФИО</Form.Label>
                                <this.outputTextField
                                    label="ФИО"
                                    placeholder="Иванов Иван Иванович"
                                    className="Name"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                />
                                <Form.Label>Уровень</Form.Label>
                                <this.outputTextField
                                    label="Уровень"
                                    placeholder="Уровень"
                                    className="Lvl"
                                    type="number"
                                    name="lvl"
                                    value={this.state.lvl}
                                />
                                <Form.Label>Пропуски</Form.Label>
                                <this.outputTextField
                                    label="Пропусков"
                                    placeholder="Пропусков"
                                    className="inputMiss"
                                    type="number"
                                    name="missed"
                                    value={this.state.missed}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Закрыть</Button>
                        <Button onClick={this.addNewStudent}>Добавить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddStudent;