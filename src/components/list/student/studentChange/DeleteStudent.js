import React, {Component} from 'react';
import {db} from '../../../firebase/firebase'
import Modal from 'react-bootstrap/Modal'
import {Button} from "react-bootstrap";

class DeleteStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            id: ""
        }
    }

    mapUserDetailToState = () => {
        this.setState({
            id: this.props.id ? this.props.id : '',

        })

    }

    handleOpen = () => {
        this.setState({open: true})
        this.mapUserDetailToState()
        console.log(this.state.id)
    }

    handleClose = () => {
        this.setState({open: false})
    }

    deleteStudent = () => {
        db.collection('students').doc(`${this.state.id}`).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
        this.handleClose()
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen}> Удалить</Button>

                <Modal
                    show={this.state.open}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        Вы точно хотите удалить этого студента?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Отмена</Button>
                        <Button onClick={this.deleteStudent}>Удалить</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DeleteStudent;