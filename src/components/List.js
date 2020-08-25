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
var lastId


class List extends React.Component{
    
        
    state = {
        students: null,
        name: "",
        lvl: 0,
        missed: 0,
        id: "",
        course: "Первый курс"
    }



    
    
    sortStudents(students) {
        students.sort(function(a, b){
                    var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                    if (nameA < nameB) //сортируем строки по возрастанию
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0 // Никакой сортировки
                })
    }   
    

    componentDidMount(){        
        db.collection('students')
        .get()
        .then( snapshot =>{
            const students = []
            snapshot.forEach( doc => {
                const data = doc.data()                                   
                lastId=doc.id                    
                console.log(lastId)
                students.push(data)
                //console.log(doc.id)
                
            })                
            console.log("lastId: ",lastId)
            //lastId=Number(lastId)                
            this.sortStudents(students)
            this.setState({ students: students })
            console.log(snapshot)
        })
        .catch( error => console.log(error))        
    }

    addNewStudent = () => {
        if ((this.state.name != null & this.state.lvl != null) & this.state.missed != null){
            //console.log(lastId)
            lastId=Number(lastId)
            lastId+=1
            lastId=String(lastId)
            db.collection('students')
                .doc(lastId)
                .set({
                    id: lastId,
                    name: this.state.name,
                    course: this.state.course,
                    lvl: this.state.lvl,
                    missed: this.state.missed
                });
            this.componentDidMount()
            this.setState({ name: "" })
            this.setState({ course: "Первый курс" })
            this.setState({ lvl: 0 })
            this.setState({ missed: 0 })
        }

    }

    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({ [name]: value });
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
        console.log(this.state.course)
        return (
            <div className="App">
                <h1>Студенты</h1>
                <Button variant="contained">
                    <NavLink to="/">Вернуться на главную страницу</NavLink>
                </Button>
                <div>
                    <form action="" className="inputForm">
                        
                        <p>
                            Выберите курс:
                            <select name="course" value={this.state.course} onChange={this.onInputChange}>
                                <option value="Первый курс">Первый курс</option>
                                <option value="Второй курс">Второй курс</option>
                                <option value="Третий курс">Третий курс</option>
                                <option value="Четвертый курс">Четвертый курс</option>
                                <option value="Пятый курс">Пятый курс</option>
                            </select>                            
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
                       
                        <Button variant="contained" onClick={this.addNewStudent}>Добавить студента</Button>
                    </form>

                </div>

                

                {
                    this.state.students &&
                    this.state.students.map(student => {
                        // eslint-disable-next-line
                        if (student.lvl == 1) {
                            colorPick = bgColors.Red
                        }
                        // eslint-disable-next-line
                        if (student.lvl == 2) {
                            colorPick = bgColors.Yellow
                        }
                        // eslint-disable-next-line
                        if (student.lvl == 3) {
                            colorPick = bgColors.Cyan
                        }
                        return (
                            <div className="studentBlock" style={{ borderColor: colorPick }}>
                                <div className="nameOfStudent" >
                                    <h4 key={student.id}>
                                        <NavLink to={`/list/${student.id}`}>
                                            {student.name}
                                        </NavLink>
                                    </h4>
                                </div>
                                <div>
                                    <p>Курс - {student.course}</p>
                                </div>
                                <div>
                                    <p>Уровень - {student.lvl}</p>
                                </div>
                                <div>
                                    <p>Пропусков - {student.missed}</p>
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