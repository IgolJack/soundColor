import React from 'react';
import * as firebase from "firebase";

class deletePageTrigger extends React.Component {
constructor(props) {
    super(props);

    this.state = {

    };
}

componentDidMount(){
    var user = firebase.auth().currentUser;
    console.log(user)
    if(this.state.delete){
        user.delete().then(function() {
          // User deleted.
        }).catch(function(error) {
          // An error happened.
        });
    }
}

    render() {
        return <div>Удоление</div>;
    }
}


export default deletePageTrigger;