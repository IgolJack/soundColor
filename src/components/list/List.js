import React from 'react'
import {db} from '../firebase/firebase'
import './List.css';

import Filter from './student/filter/Filter'
import Students from './student/Students'
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import { Button, Skeleton } from 'antd'



class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: null,
            filterName: {},
            searchStudent: "",
            lastId: "",
            loading: true,
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
                if (lastId < data.id) {
                    lastId = data.id
                }
                students.push(data)               
            })             
            this.setState({students: students, loading: !this.state.loading })
            localStorage.setItem('lastId', lastId)
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

        console.log(localStorage.getItem('lastId'))        
        return (
            <div className="App">
                 
                <h2 style={{ textAlign: "center" }}>Студенты</h2>
                
                <Navbar bg="light" >
                    <Link to={{ pathname: "/Registration", state: { lastId: this.state.lastId } }} style={{ width: "100%", 'text-decoration': "none" }} >
                        <Button block size="large" type="primary" >Регистрация</Button>
                    </Link>
                </Navbar>

                <Filter
                    students={this.state.students}
                    filterName={this.state.filterName}
                    searchStudent={this.state.searchStudent}
                    updateData={this.updateData}
                />

                <Skeleton active loading={this.state.loading} paragraph={{rows: 25}} title={false} >
                <Students
                    students={this.state.students}
                    filterName={this.state.filterName}
                    searchStudent={this.state.searchStudent}
                />
                </Skeleton>
                <br/><br/><br/>
            </div>
            

        )
    }
}


export default List