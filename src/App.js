import React from 'react'
import { db } from './services/firebase'
import {Button, TextField} from '@material-ui/core/';
import './App.css';
import './cards/Demo'


class App extends React.Component{

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
                this.setState({ students: students })
                console.log(snapshot)
            })
            .catch( error => console.log(error))
    }

    addNewStudent = () => {
        if (this.state.name != null & this.state.lvl != null & this.state.missed != null){
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
    };

    render(){
        return(
            <div className="App">
                <h1>Студенты</h1>
                <div>
                    <form action="" className="inputForm">
                        <p>
                            <TextField
                                id="standard-basic"
                                label="ФИО"
                                className="inputName"
                                required
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange}
                            /></p>
                        <p>
                            <TextField
                                id="standard-basic"
                                label="Уровень"
                                className="inputLvl"
                                placeholder="Уровень"
                                required
                                type="number"
                                name="lvl"
                                min = '0'
                                value={this.state.lvl}
                                onChange={this.onInputChange}
                            /></p>
                        <p>
                            <TextField
                                id="standard-basic"
                                label="Пропусков"
                                className="inputMiss"
                                placeholder="Пропусков"
                                required
                                type="number"
                                min = '0'
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
                        return (
                            <div className="studentBlock">
                                <div className = "nameOfStudent">
                                    <h4>ФИО - {student.name}</h4>
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

export default App