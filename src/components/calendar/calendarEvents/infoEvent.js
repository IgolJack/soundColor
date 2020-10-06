import React from 'react'
import {db} from '../../firebase/firebase'
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
    this.addUserToEvent = this.addUserToEvent.bind(this)
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
    let uid = firebase.auth().currentUser.uid //или email


    //нужно предотвротить попадекние уже сущ. uid/email в массив members (для отладки)
    // в последствии просто не будет кнопки если человек записался (хотя можно для безопасности)
    console.log('Уникальный идентификатор пользователя - ' + uid)


    this.state.members.push(uid)
    db.collection('eventsCalendar')
        .doc(String(this.state.id))
        .set({
            members: this.state.members,
            id: this.state.id,
            title: this.state.title,
            start:this.state.start,
            end: this.state.end,
        })
    this.componentDidMount()
}

    render() {
return(
    <div>
        <Button variant="contained">
            <NavLink to="/Calendar">Вернуться к каледарю</NavLink>
        </Button>
        <Button variant="contained">
            <NavLink to="/">Вернуться на глвную страницу</NavLink>
        </Button>

        <p>ID = {this.state.id}</p>
        <p>Название мероприятия = {this.state.title}</p>
        <p>Время начала = {this.state.start}</p>
        <p>Время конца = {this.state.end}</p>

        <Button variant="contained" onClick={this.addUserToEvent}>Принять участие</Button>
    </div>
)





    }
}