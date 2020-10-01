
import React from 'react'
import { db } from './services/firebase'
import TextField from '@material-ui/core/TextField';
import './List.css';

import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';





import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import AddStudent from './AddStudent'

import DeleteStudent from './Warnings/DeleteStudent'
import EditDetails from './EditDetails'


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

var colorPick = bgColors.Blue



class List extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            students: null,
            
            searchStudent: "",
            
            lastId: "",
            filter: "",
            filterMissed: 0,
            filterCourse: "",
            filterLevel: ""
        }

        this.getStudents = this.getStudents.bind(this)
        this.outputInfo = this.outputInfo.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

    }
        
    getStudents() {        
        db.collection('students').orderBy('name').get().then(snapshot => {
            const students = []
            var lastId = 0
            snapshot.forEach(doc => {
                const data = doc.data()
                data.id = Number(data.id)
                // console.log("data.id",data.id)
                // console.log("lastId",lastId)
                if (lastId < data.id) {
                    lastId = doc.id
                }
                // console.log(lastId)
                students.push(data)
                //console.log(doc.id)                
            })
            // console.log("lastId: ",lastId)
            //lastId=Number(lastId)                
            this.setState({ students: students, lastId: lastId })
            // console.log("lastId: ", this.state.lastId)
            console.log(snapshot)
        })
            .catch(error => console.log(error))
    }        

    componentDidMount() {
        this.getStudents()
    }

    componentDidUpdate(prevProps) {
        // Популярный пример (не забудьте сравнить пропсы):
        if (this.props !== prevProps) {
          this.fetchData(this.props);
        }
        console.log(this.state.filterMissed)
      }


    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value});
        console.log(this.state.filterCourse)
        console.log(this.state.filterLevel)           
    }
    
    outputInfo = (props) => {
        return (
            <div>
                {
                    props.filteredStudents &&
                    props.filteredStudents.map(student => {
                        colorPick = '#000000'

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
                                <div style={{ float: "right" }}>
                                    <DeleteStudent
                                        id={student.id}
                                        getStudents={this.getStudents}
                                        outputInfo={this.outputInfo}
                                    />
                                </div>
                                <div style={{ float: "right" }}>
                                    <EditDetails
                                        name={student.name}
                                        lvl={student.lvl}
                                        missed={student.missed}
                                        id={student.id}
                                        course={student.course}
                                        componentDidMount={this.getStudents}
                                        outputInfo={this.outputInfo}
                                    />
                                </div>
                                <div className="nameOfStudent" style={{ paddingLeft: 48*2 }}>
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



    render() {

        let searchFilteredStudents = this.state.students && this.state.students.filter(student => {
            if(this.state.searchStudent !== ""){
                return student.name.toLowerCase().includes(this.state.searchStudent.toLowerCase())
            } else if (this.state.filterCourse !== "" || this.state.filterLevel !== "" || this.state.filterMissed >= 0){
                if (this.state.filterCourse !== "" && this.state.filterLevel !== "" && this.state.filterMissed > 0){
                    console.log("filterCourse!= 0 && filterLevel!= 0 && filterMissed != 0")
                    return  student.course.includes(this.state.filterCourse) && student.lvl === this.state.filterLevel && student.missed >= this.state.filterMissed
                }                  
                else if (this.state.filterLevel !== "" && this.state.filterMissed > 0){
                    console.log("filterLevel!= 0 && filterMissed != 0")
                    return student.lvl === this.state.filterLevel && student.missed >= this.state.filterMissed
                } 
                else if (this.state.filterCourse !== "" && this.state.filterMissed > 0){
                    console.log("filterCourse != 0 && filterMissed != 0")
                    return  student.course.includes(this.state.filterCourse) && student.missed >= this.state.filterMissed
                }
                else if (this.state.filterCourse !== "" && this.state.filterLevel !== ""){
                    console.log("filterCourse != 0 && filterLevel != 0")
                    return  student.course.includes(this.state.filterCourse) && student.lvl === this.state.filterLevel
                } 
                else if (this.state.filterLevel !== ""){
                    console.log("this.state.filterLevel")
                    return student.lvl === this.state.filterLevel
                }                
                else if (this.state.filterMissed > 0){
                    console.log("this.state.filterMissed")
                    return student.missed >= this.state.filterMissed
                }
                else {
                    console.log("this.state.filterCourse")
                    return student.course.includes(this.state.filterCourse)
                }              
            }            
            else {
                console.log("this.state.students")
                return this.state.students
            }
            
            
        })


        // console.log(this.state.lastId)        
        return (
            <div className="App">
                <h1>Студенты</h1>
                <div style={{ margin: 12 }}>
                    <Button variant="contained">
                        <NavLink to="/">Вернуться на главную страницу</NavLink>
                    </Button>
                </div>                
                <div style={{ margin: 12 }}>
                    <AddStudent 
                        lastId={this.state.lastId}
                        getStudents={this.getStudents}
                        outputInfo={this.outputInfo}
                        filteredStudents={searchFilteredStudents}
                    />
                </div>
                <div style={{ margin: 12 }}>
                   <TextField
                    id="outlined-basic"
                    name="searchStudent"
                    label="Найти студента"
                    variant="outlined"
                    size="small"
                    onChange={this.onInputChange}
                    />
                </div>

                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Фильтры</Typography>
                        </AccordionSummary>
                        <AccordionDetails>                            
                            <FormControl
                                fullWidth
                                style={{ margin: 8 }}
                            >
                                <InputLabel id="demo-simple-select-label">Курс</InputLabel>
                                <Select

                                    name="filterCourse"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.filterCourse}
                                    onChange={this.onInputChange}
                                >
                                    <MenuItem value="">Все курсы</MenuItem>
                                    <MenuItem value="Первый курс">Первый курс</MenuItem>
                                    <MenuItem value="Второй курс">Второй курс</MenuItem>
                                    <MenuItem value="Третий курс">Третий курс</MenuItem>
                                    <MenuItem value="Четвертый курс">Четвертый курс</MenuItem>
                                    <MenuItem value="Пятый курс">Пятый курс</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl
                                fullWidth
                                style={{ margin: 8 }}
                            >
                                <InputLabel id="demo-simple-select-label">Уровень</InputLabel>
                                <Select

                                    name="filterLevel"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.filterLevel}
                                    onChange={this.onInputChange}
                                >
                                    <MenuItem value="">Все уровни</MenuItem>
                                    <MenuItem value="1">Первый уровень</MenuItem>
                                    <MenuItem value="2">Второй уровень</MenuItem>
                                    <MenuItem value="3">Третий уровень</MenuItem>
                                    <MenuItem value="4">Четвертый уровень</MenuItem>
                                    <MenuItem value="5">Пятый уровень</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl
                                fullWidth
                                style={{ margin: 8 }}
                            >
                                <TextField
                                    id="standard-full-width"
                                    label="Пропуски"
                                    helperText="Значение и более"
                                    type="number"
                                    fullWidth
                                    name="filterMissed"
                                    value={this.filterMissed}
                                    onChange={this.onInputChange}
                                />
                            </FormControl>
                            
                                    
                            
                        </AccordionDetails>
                    </Accordion>
                </div>

                <this.outputInfo filteredStudents={searchFilteredStudents}/>
                
            </div>

        )
    }
}


export default List