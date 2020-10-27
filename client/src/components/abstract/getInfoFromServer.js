import React, { Component } from "react";

class getInfoFromServer extends Component {
  state = {
    allNamesAndUidOfStudents: [],
    allStudents: [],
    allStudentsWithoutPersons: [],
    name: "",
    emailDe: [],
    calendarEvents: [],
  };

  componentDidMount() {
    let event = {
      cast: ["Рояль"],
      cloth: "Свободная",
      description: "444",
      equipment: [{ group: "Микрофоны", quantity: 3, type: "Крутой" }],
      eventDate: "Tue Oct 13 2020 18:34:15 GMT+0300",
      eventPlace: "4444",
      eventTime: "Thu Oct 15 2020 03:04:03 GMT+0300",
      id: "120",
      meetDate: "Tue Sep 29 2020 18:34:09 GMT+0300",
      meetPlace: "4444",
      meetTime: "Thu Oct 15 2020 03:02:00 GMT+0300",
      title: "34534553454543",
      typeOfEvent: "Третий курс",
    };


    //this.getAllNamesAndUidOfStudentsFunc();
    //this.getNameFromUid('NDgEDIMDUZWO3eClal5WY8VPwow2');
    //this.getAllStudents();
    //this.getAllStudentsWithoutPersons(['Собака Куколдинго'], ['G6K5czYS1HgzBMN5xHJbtSnwzdG3', 'DFxuUpShFU6bzvJrhWFqFd3DoA2', '2K3wvhFALsPIKemqtatZjevLM8J2'])
    //this.pushEmail('iegolepic@gmail.com')
    //this.setCalendarEvent(event);
    this.getAllEvents();
  }

  getAllNamesAndUidOfStudentsFunc = async () => {
    fetch("/api/studentsName")
      .then((response) => response.json())
      .then((jsondata) =>
        this.setState({ allNamesAndUidOfStudents: jsondata })
      );
  };

  getNameFromUid = async (uid) => {
    fetch(`/api/fromUidToName?uid=${uid}`)
      .then((res) => res.json())
      .then((jsondataA) => this.setState({ name: jsondataA }));
  };

  getAllStudents = async () => {
    fetch("/api/getStudents")
      .then((response) => response.json())
      .then((jsondata) => this.setState({ allStudents: jsondata }));
  };

  setCalendarEvent = async (event) => {
    let e = JSON.stringify(event)
    fetch(`/api/createEvent?event=${e}`)
      .then((response) => response.json())
      .then((jsondata) => this.setState({ allStudents: jsondata }));
  };

  // getAllStudentsWithoutPersons = async (names, uids) => {
  //     fetch(`/api/getStudentsOutPersons?names=${names}&uids=${uids}`)
  //       .then((response) => response.json())
  //       .then((jsondata) => this.setState({ allStudentsWithoutPersons: jsondata }));
  //   };

  pushEmail = async (email) => {
    fetch(`/api/pushEmail?email=${email}`)
      .then((response) => response.json())
      .then((jsondata) => this.setState({ emailDe: jsondata }));
  };


  getAllEvents = async () => {
    fetch('/api/getAllEvents')
    .then(response => response.json())
    .then(jsondata => this.setState({ calendarEvents: jsondata }));
};


  console = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.console}>Console</button>
      </div>
    );
  }
}
export default getInfoFromServer;
