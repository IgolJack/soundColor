import React, { Component } from "react";

class getInfoFromServer extends Component {
  state = {
    event: {},
  };


  componentDidUpdate() {
    console.log("------0------")
  }
  


  componentDidMount() {
    this.getAllStudents()

    // window.setInterval(() => {
    //   this.getAllStudents()
    // }, 5000);
  }

 

  

   getAllStudents = async () => {
    fetch("/api/pipi")
      .then((response) => response.json())
      .then((jsondata) => {
        console.log(this.state.event)
        if (jsondata.event != this.state.event) {
          this.setState({ event:jsondata }); console.log(this.state)
        }
      });
  };



 

  render() {
    return (
      <div className="App">
          
          {this.state.event.description}
      </div>
    );
  }
}
export default getInfoFromServer;
