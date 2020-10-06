import React, {Component} from 'react';
import {db} from '../../../firebase/firebase'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
        this.props.getStudents()
        this.props.outputInfo()
    }

    render() {
        return (
            <div>
                <Tooltip title="Удалить">
                    <IconButton aria-label="delete" onClick={this.handleOpen}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={this.state.open}
                    maxWidth="sm">
                    <DialogContent>
                        Вы точно хотите удалить этого студента?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Отмена</Button>
                        <Button onClick={this.deleteStudent}>Удалить</Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}

export default DeleteStudent;