import React from 'react'
import { db } from './services/firebase'
import TextField from '@material-ui/core/TextField';
import './List.css';
import Button from '@material-ui/core/Button';

import {
    NavLink
} from 'react-router-dom'

var bgColors = {
    "Default": "#81b71a",
    "Blue": "#00B1E1",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
}

var colorPick

class List extends React.Component{
    state = {
        students: null,
        name: "",
        lvl: 0,
        missed: 0
    }

    componentDidMount(){

        db.collection('students')
            .get()
            .then( snapshot =>{
                const students = []
                snapshot.forEach( doc => {
                    const data = doc.data()
                    students.push(data)
                })
                students.sort(function(a, b){
                    var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                    if (nameA < nameB) //сортируем строки по возрастанию
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0 // Никакой сортировки
                })
                this.setState({ students: students })
                console.log(snapshot)
            })
            .catch( error => console.log(error))

    }

    addNewStudent = () => {
        if ((this.state.name != null & this.state.lvl != null) & this.state.missed != null){
            db.collection('students')
                .add({
                    name: this.state.name,
                    lvl: this.state.lvl,
                    missed: this.state.missed
                });
            this.componentDidMount()
        }

    }

    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    render(){
        return(
            <div className="App">
                <h1>Студенты</h1>
                <button>
                    <NavLink to="/">Вернуться на главную страницу</NavLink>
                </button>
                <div>
                    <form action="" className="inputForm">
                        <p>
                            <TextField
                                id="standard-full-width"
                                label="ФИО"
                                style={{ margin: 8 }}
                                placeholder="Иванов Иван Иванович"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="inputName"
                                required
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange}
                            /></p>
                        <p>
                            <TextField
                                id="standard-full-width"
                                label="Уровень"
                                className="inputLvl"
                                style={{ margin: 8 }}
                                placeholder="Уровень"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                type="number"
                                name="lvl"
                                value={this.state.lvl}
                                onChange={this.onInputChange}
                            /></p>
                        <p>
                            <TextField
                                id="standard-full-width"
                                label="Пропусков"
                                className="inputMiss"
                                style={{ margin: 8 }}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="Пропусков"
                                required
                                type="number"
                                name="missed"
                                value={this.state.missed}
                                onChange={this.onInputChange}
                            />
                        </p>

                <Button variant="contained" onClick={this.addNewStudent}>Добавить студента</Button>
                </form>

                </div>
                {
                    this.state.students &&
                    this.state.students.map( student => {
                        // eslint-disable-next-line
                        if (student.lvl == 1 ){
                            colorPick = bgColors.Red
                        }
                        // eslint-disable-next-line
                        if (student.lvl == 2){
                            colorPick = bgColors.Yellow
                        }
                        // eslint-disable-next-line
                        if (student.lvl == 3){
                            colorPick = bgColors.Cyan
                        }
                        return (
                            <div className="studentBlock" style={{borderColor: colorPick}}>
                                <div className = "nameOfStudent" >
                                    <h4>{student.name}</h4>
                                </div>
                                <div>
                                    <p>Уровень - {student.lvl}</p>
                                </div>
                                <div>
                                    <p>Пропусков- {student.missed}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>


        )
    }
}


export default List