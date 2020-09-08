import React from 'react'
import {db, auth} from '../services/firebase'
import {NavLink} from "react-router-dom";

export default class InfoEvent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            title: "",
            start: "",
            end: "",
        }

    this.componentDidMount = this.componentDidMount.bind(this)
}


componentDidMount() {
    const { match: { params } } = this.props
    const { eventId } = params

    this.setState({ id: eventId })
    console.log(this.props.match.params.id);
    console.log(eventId);
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
            })
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
}

    render() {
return(
    <div>
        <NavLink to={'/Calendar'}>
            <p>Назад!</p>
        </NavLink>
        <p>{this.state.id}</p>
        <p>{this.state.title}</p>
        <p>{this.state.start}</p>
        <p>{this.state.end}</p>


    </div>
)





    }
}