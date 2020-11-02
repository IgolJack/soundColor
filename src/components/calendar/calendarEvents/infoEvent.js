import React from "react";
import { db } from "../../firebase/firebase";
import * as firebase from "firebase";
import ListOfStudents from "./infoEventBlocks/listOfStudents";
import MeetTimeAndDate from "./infoEventBlocks/meetTimeAndDate";
import Cloth from "./infoEventBlocks/cloth"
import { Skeleton, Select, Tag, Button } from "antd";
import {
  studentsWithPass,
  GetInformationWithPass,
} from "../../abstract/universalFirebase";
import Description from "./infoEventBlocks/description";
import EventTimeAndDate from "./infoEventBlocks/eventTimeAndDate";
import Equipment from "./equipment/equipment";

GetInformationWithPass();

const { Option } = Select;

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
    };
    this.addUserToEvent = this.addUserToEvent.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { eventId } = params;

    //сервер
    this.getAllNamesAndUidOfStudentsFunc();
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
        let equip = [];
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

  addUserToEvent() {
    let uid = firebase.auth().currentUser.uid;
    let nowMember = this.state.event.members;
    let someDupl = false;
    console.log("Уникальный идентификатор пользователя - " + uid);

    nowMember.forEach(function (entry) {
      if (uid == entry) {
        console.log(entry, "=", uid);
        someDupl = true;
      }
    });

    if (someDupl == false) {
      nowMember.push(uid);
      console.log("Новый список", nowMember);
      db.collection("eventsCalendar").doc(this.state.event.id).update({
        members: nowMember,
      });
    } else {
      console.log("Список не обновился.");
      console.log("Список", nowMember);
    }
  }

  getAllNamesAndUidOfStudentsFunc = async () => {
    fetch("/api/studentsName")
      .then((response) => response.json())
      .then((jsondata) =>
        this.setState(
          { allNamesAndUidOfStudents: jsondata },
          console.log(this.state.allNamesAndUidOfStudents)
        )
      );
  };

  studentsStats = () => {
    var allStudentsList = [];
    this.state.allNamesAndUidOfStudents.map((e) => {
      allStudentsList.push(<Option key={e.uid}>{e.name}</Option>);
      this.setState(
        { allStudents: allStudentsList },
        console.log(this.state.allStudents)
      );
    });
  };

  enrolStudents = () => {
    let nowMember = this.state.event.members;
    let studentsWhoWorks = [];
    console.log(studentsWithPass);
    studentsWithPass.forEach((element) => {
      nowMember.forEach((ep) => {
        if (ep == element.uid) {
          studentsWhoWorks.push({
            name: element.name,
            uid: element.uid,
          });
        }
      });
    });

    console.log("Обновленный список ", studentsWhoWorks);
    const studentsWhoEnrol = [];
    studentsWhoWorks.map((index) => {
      studentsWhoEnrol.push(
        <p key={index.uid}>
          {index.name}

          {index.uid != firebase.auth().currentUser.uid && (
            <Button
              type="link"
              onClick={() => {
                console.log(index.name, "-", index.uid);
              }}
            >
              Заменить
            </Button>
          )}
        </p>
      );
    });
    console.log(studentsWhoEnrol);

    this.setState({ studentsEnrol: studentsWhoEnrol });
  };

  render() {
    return (
      <>
        <Skeleton
          active
          loading={this.state.loading}
          paragraph={{ rows: 25 }}
          title={false}
        >

         
          
          
          <span style={{fontSize:'18px', verticalAlign:'center'}}> <Tag color="red" >{this.state.event.typeOfEvent}</Tag>{this.state.event.title}</span>


          <span style={{textAlign:'right'}}>{this.state.cast.map((cast) => (
              <Tag color="cyan" style={{fontWeight:200}}>{cast}</Tag>
            ))} </span>
        
          <Cloth cloth={this.state.event.cloth} />

          <MeetTimeAndDate
            meetTime={this.state.event.meetTime}
            meetDate={this.state.event.meetDate}
          />

            
<>
            <span style={{textAlign:'right'}}>  
            <span style={{float:'left'}}>Место сбора</span> 
            <Tag color="red" style={{textAlign:'center'}}> {this.state.event.meetPlace}</Tag>
            </span>
       
        
      </>

          <EventTimeAndDate
            eventTime={this.state.event.eventTime}
            eventDate={this.state.event.eventDate}
          />
          
          <>
            <span style={{textAlign:'right'}}>  
            <span style={{float:'left'}}>Место мероприятия</span> 
            <Tag color="cyan" style={{textAlign:'center'}}> {this.state.event.eventPlace}</Tag>
            </span>
       
        
      </>


        
           <Description description={this.state.event.description}/>
           

          <div style={{ paddingBottom: "10px" }}>
            <ListOfStudents
              members={this.state.event.members}
              max={this.state.event.max}
            />

            <Equipment
              equipment={this.state.equipment}
              equipGroup={this.state.equipGroup}
            />
          </div>
        </Skeleton>
      </>
    );
  }
}
