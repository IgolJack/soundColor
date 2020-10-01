import React, { Component } from 'react';
import { db } from './services/firebase'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core';

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
        this.setState({ open: true })
        this.mapUserDetailToState()
        console.log(this.state.lastId)
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

    addNewStudent = () => {        
        if ((this.state.name !== "" && this.state.lvl !== "") && this.state.missed !== ""){            
            var LastId = Number(this.props.lastId)
            LastId+=1
            LastId=String(LastId)
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
        this.props.getStudents()
        this.props.outputInfo(this.props.filteredStudents)
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
                <Button variant="contained" onClick={this.handleOpen}>Добавить студента</Button>
                <Dialog 
                open={this.state.open}
                
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Добавьте пользователя</DialogTitle>
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
                        <Button variant="contained" onClick={this.handleClose}>Закрыть</Button>
                        <Button variant="contained" onClick={this.addNewStudent}>Добавить</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddStudent;