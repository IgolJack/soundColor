import React from 'react'
import {db} from '../firebase/firebase'
import './List.css';
import AddStudent from './student/studentChange/AddStudent'
import Filter from './student/filter/Filter'
import Students from './student/Students'
import BackToHome from "../UI/backToHome";

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: null,
            filterName: {},
            searchStudent: "",
            lastId: "",
        }

        this.getStudents = this.getStudents.bind(this)
        this.updateData = this.updateData.bind(this)

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
            this.setState({students: students, lastId: lastId})
            // console.log("lastId: ", this.state.lastId)
            console.log(snapshot)
        })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getStudents()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.fetchData(this.props);
        }
        console.log(this.state.searchStudent)
        console.log(this.state.filterName)
    }

    updateData = (name, value) => {
        this.setState({[name]: value})
        console.log(this.state.searchStudent)
        console.log(this.state.filterName)
    }

    render() {

        // console.log(this.state.lastId)        
        return (
            <div className="App">
                <h1>Студенты</h1>
                <div>
                    <BackToHome/>
                </div>
                <div>
                    <AddStudent
                        lastId={this.state.lastId}
                    />
                </div>

                <Filter
                    students={this.state.students}
                    filterName={this.state.filterName}
                    searchStudent={this.state.searchStudent}
                    updateData={this.updateData}
                />

                <Students
                    students={this.state.students}
                    filterName={this.state.filterName}
                    searchStudent={this.state.searchStudent}
                />

            </div>

        )
    }
}


export default List