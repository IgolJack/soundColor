import React from 'react'
import {db} from '../services/firebase'
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";

export default class InfoEvent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            title: "",
            start: "",
            end: "",
            members: [],
        }

    this.componentDidMount = this.componentDidMount.bind(this)
}


componentDidMount() {
    const { match: { params } } = this.props
    const { eventId } = params

    this.setState({ id: eventId })
    const docRef = db.collection('eventsCalendar').doc(eventId);
    this.getInfo(docRef)
}

getInfo(docRef){
        docRef
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data())
                    return docRef.get()
                }
            })
            .then( doc => {
                const data=doc.data()
                this.setState({
                    id: data.id,
                    title: data.title,
                    start: data.start,
                    end: data.end,
                    members: data.members,
                })
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }

addUserToEvent(){
    let uid = firebase.auth().currentUser.uid
    console.log('Уникальный идентификатор пользователя - ' + uid)
    
}

    render() {
return(
    <div>
        <NavLink to={'/Calendar'}>
            <p>Назад!</p>
        </NavLink>
        <p>ID = {this.state.id}</p>
        <p>Название мероприятия = {this.state.title}</p>
        <p>Время начала = {this.state.start}</p>
        <p>Время конца = {this.state.end}</p>

        <Button variant="contained" onClick={this.addUserToEvent}>Принять участие</Button>
    </div>
)





    }
}