import React from 'react'
import {db, auth} from './services/firebase'

class InfoStudent extends React.Component {

    componentDidMount() {
        //scotch
        const {match: {params}} = this.props
        const {studentId} = params


        //javascript сайт какой-то + документация firebase
        var docRef = db.collection('students').doc(studentId);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }


    render() {
        //metanit
        console.log(this.props)
        const {match: {params}} = this.props;
        const {studentId} = params
        console.log(studentId)


        return (
            <div>
                Работает! ({studentId})
            </div>
        )
    }
}


export default InfoStudent