import React, { Component } from 'react';
import { db } from './services/firebase'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

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
        this.props.componentDidMount()
        this.props.outputInfo()
    }

    outputTextField = (props) => {
        return(
            <p>
                            <TextField
                                id="standard-full-width"
                                label={`${props.label}`}
                                style={{ margin: 8 }}
                                placeholder={`${props.placeholder}`}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={`input${props.className}`}
                                required
                                type={`${props.type}`}
                                name={`${props.name}`}
                                value={props.value}
                                onChange={this.onInputChange}
                            /></p>
        )
    }
    
    render() {
        return (
            <div>
                <Tooltip title="Редактировать">
                    <IconButton aria-label="edit"  onClick={this.handleOpen}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Dialog 
                open={this.state.open}
                
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Редактирование данных</DialogTitle>
                    <DialogContent>
                        <form>
                        <p>
                                <FormControl
                                    required
                                    fullWidth
                                    style={{ margin: 8 }}
                                >
                                    <InputLabel id="demo-simple-select-label">Курс</InputLabel>
                                    <Select
                                        name="course"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.course}
                                        onChange={this.onInputChange}
                                    >
                                        <MenuItem value="Первый курс">Первый курс</MenuItem>
                                        <MenuItem value="Второй курс">Второй курс</MenuItem>
                                        <MenuItem value="Третий курс">Третий курс</MenuItem>
                                        <MenuItem value="Четвертый курс">Четвертый курс</MenuItem>
                                        <MenuItem value="Пятый курс">Пятый курс</MenuItem>
                                    </Select>
                                </FormControl>
                            </p>
                        
                        <this.outputTextField                             
                            label="ФИО"
                            placeholder="Иванов Иван Иванович"
                            className="Name"
                            type="text"
                            name="name"
                            value={this.state.name}
                        />

                        <this.outputTextField
                            label="Уровень"
                            placeholder="Уровень"
                            className="Lvl"
                            type="number"
                            name="lvl"
                            value={this.state.lvl}
                        />

                        <this.outputTextField
                            label="Пропусков"
                            placeholder="Пропусков"
                            className="inputMiss"
                            type="number"
                            name="missed"
                            value={this.state.missed}
                        />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Закрыть</Button>
                        <Button onClick={this.handleSubmit}>Сохранить</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditDetails;