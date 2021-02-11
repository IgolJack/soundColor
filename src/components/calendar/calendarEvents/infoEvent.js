import React from "react";
import { db } from "../../firebase/firebase";
import ListOfStudents from "./infoEventBlocks/listOfStudents";
import MeetTimeAndDate from "./infoEventBlocks/meetTimeAndDate";
import Cloth from "./infoEventBlocks/cloth";
import CloseEvent from "./infoEventBlocks/closeEvent"
import { Skeleton, Tag, Button } from "antd";
import Description from "./infoEventBlocks/description";
import EventTimeAndDate from "./infoEventBlocks/eventTimeAndDate";
import Equipment from "./equipment/equipment";
import NewListOfStudents from "./infoEventBlocks/newListOfStudent";




export default class InfoEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      loading: true,
      cast: [],
      equipment: [],
      equipGroup: [],
      allStudents: [],
      allStudentsNamesAndUids: [],
      allNamesAndUidOfStudents: [],
      studentsEnrol: [],
      nowMember: [],
      id: "",
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { eventId } = params;

    //сервер
    this.setState({ id: eventId });
    const docRef = db.collection("eventsCalendar").doc(eventId);
    this.getInfo(docRef);
  }

  getInfo(docRef) {
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return docRef.get();
        }
      })
      .then((doc) => {
        const data = doc.data();

        let strings = [];
        let resultGroup = [];
        if (data.equipment !== undefined) {
          for (let index = 0; index < data.equipment.length; index++) {
            strings.push(data.equipment[index]["group"]);
          }
          for (let str of strings) {
            if (!resultGroup.includes(str)) {
              resultGroup.push(str);
            }
          }
        }

        this.setState({
          event: data,
          loading: !this.state.loading,
          cast: data.cast,
          equipGroup: resultGroup,
          equipment: data.equipment,
        });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }


  render() {
    return (
      <>
        <Skeleton
          active
          loading={this.state.loading}
          paragraph={{ rows: 25 }}
          title={false}
        >
          <span style={{ fontSize: '18px', verticalAlign: 'center' }}> <Tag color="red" >{this.state.event.typeOfEvent}</Tag>{this.state.event.title}</span>

          <span style={{ textAlign: 'right' }}>{this.state.cast.map((cast) => (
            <Tag color="cyan" key={cast + new Date()} style={{ fontWeight: 200 }}>{cast}</Tag>
          ))} </span>

          <Cloth cloth={this.state.event.cloth} />

          <MeetTimeAndDate
            meetTime={this.state.event.meetTime}
            meetDate={this.state.event.meetDate}
          />

          <>
            <span style={{ textAlign: 'right' }}>
              <span style={{ float: 'left' }}>Место сбора</span>
              <Tag color="red" style={{ textAlign: 'center' }}> {this.state.event.meetPlace}</Tag>
            </span>
          </>

          <EventTimeAndDate
            eventTime={this.state.event.eventTime}
            eventDate={this.state.event.eventDate}
          />

          <>
            <span style={{ textAlign: 'right' }}>
              <span style={{ float: 'left' }}>Место мероприятия</span>
              <Tag color="cyan" style={{ textAlign: 'center' }}> {this.state.event.eventPlace}</Tag>
            </span>
          </>

          <Description description={this.state.event.description} />

          <div style={{ paddingBottom: "10px" }}>
            <ListOfStudents
              members={this.state.event.members}
              max={this.state.event.max}
              id={this.state.id}
            />
          </div>

          <div style={{ paddingBottom: "10px" }}>
            <Equipment
              equipment={this.state.equipment}
              equipGroup={this.state.equipGroup}
              id={this.state.id}
            />
          </div>
        </Skeleton>



        <CloseEvent members={this.state.event.members} />

        <NewListOfStudents members={this.state.event.members} />
        <br/><br/>
      </>
    );
  }
}
