import React, { Component } from 'react';
import { db } from '../../../firebase/firebase'
import {Button, Form, Modal} from "antd"
import { EditTwoTone } from "@ant-design/icons";
class EditDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            lvl: 0,
            missed: 0,
            id: "",
            course: "Первый курс",
            open: false
        }
    }


    mapUserDetailToState = () => {
        this.setState({
            id: this.props.id ? this.props.id : '',
            name: this.props.name ? this.props.name : '',
            lvl: this.props.lvl ? this.props.lvl : 0,
            missed: this.props.missed ? this.props.missed : 0,
            course: this.props.course ? this.props.course : '',
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailToState()
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    componentDidMount(){
        this.mapUserDetailToState()
    }

    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        db.collection('students')
            .doc(`${this.state.id}`)
            .set({
                id: this.state.id,
                name: this.state.name,
                course: this.state.course,
                lvl: this.state.lvl,
                missed: this.state.missed
            });
        this.handleClose()
    }

    outputTextField = (props) => {
        return(
                <Form.Control
                    id="standard-full-width"
                    label={`${props.label}`}
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
                   <EditTwoTone
            size="large"
            onClick={this.handleOpen}
            
              style={{
                fontSize: "25px",
                width:'100%',
                display: 'inline-block', 
                verticalAlign: 'middle'
              }}
            />
               
                <Modal
                    show={this.state.open}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Редактирование данных</Modal.Title>
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
                        <Button onClick={this.handleSubmit}>Сохранить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default EditDetails;