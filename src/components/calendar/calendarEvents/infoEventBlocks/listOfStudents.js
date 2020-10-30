import React from "react";
import * as firebase from "firebase";
import PropTypes from "prop-types";
import { Collapse, Button, Popover, Select, message } from "antd";
import './lisyOfStudentsInEvent.css';
import { NavLink } from "react-router-dom";
// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component

const { Panel } = Collapse;

const propTypes = {};
const { Option } = Select;
const defaultProps = {};
const openNotification = () => {
  message.info('Пользователь успешно уведомлен!');
};

class listOfStudents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsEnrolList: [],
      allStudentsList: [],
      inMember: false,
      allNamesAndUidOfStudents: [],
      emailer: [],
      changePerson: "",
      
      
      //небходимо передать 
      max: 6,
      members: [
        {
          id: '22',
          email: "igoljack@mail.ru",
          name: "Супер человек-кит",
          uid: "fwe[ofkowekfowekfoko34kfok4o",
          lookForChange: "NDgEDIMDUZWO3eClal5WY8VPwow2",
        },
        {
          id:'27',
          email: "iegolepic@gmail.com",
          name: "Единорог",
          uid: "fwe[ofefefefe3kfoko34kfok4o",
          lookForChange: "aJXFSBn15yf01nFY8G970io5sXJ2",
        },
      ],
    };
  }

  componentDidMount() {
    console.log("=========ОБНОВЛЕНИЕ=========");
    this.getAllNamesAndUidOfStudentsFunc();

    this.listOfEnrolledStudents();
    this.createOptionsForSelect();
    this.inMemberFunc();
  }

  getAllNamesAndUidOfStudentsFunc = async () => {
    fetch("/api/studentsName")
      .then((response) => response.json())
      .then((jsondata) =>
        this.setState({ allNamesAndUidOfStudents: jsondata }, () => {
          this.createOptionsForSelect() ;
        })
      );
  };

  pushEmail = async (email) => {

    fetch(`/api/pushEmail?email=${email}`)
      .then((response) => {
        console.log(response)
        if (response.statusText == 'OK'){
          openNotification()
        }
      })
     
  }

 

  createOptionsForSelect = () => {
    let studentsList = [];
    this.state.allNamesAndUidOfStudents.map((student) => {
      studentsList.push(
        <Option
          value={student.uid + "," + student.email}
          key={student.uid + "," + student.name + "," + student.email}
        >
          {student.name}
        </Option>
      );
    });
    this.setState({ allStudentsList: studentsList }, () => {
      console.log("Подготовка option ", this.state.allStudentsList);
    });
  };

  listOfEnrolledStudents = () => {
    let user = firebase.auth().currentUser;
    let allStudents = [];
    this.state.members.map((member) => {

      //если человека пригласили заменить себя, он увидит
      if (member.lookForChange == user.uid) {
        allStudents.push(
          <p key={member.email}>
            <NavLink to={`/list/${member.id}`} className="navText">
            {member.name}
            </NavLink> 
            <Button type="link" style={{padding:'0px'}} className="Zamena" onClick={(e) => this.changePerson(e, member)}>
              Заменить
            </Button>
          </p>
        );
      } 
      //если человек принимает участие в мероприятии увидит
      else if (user.uid == member.uid) {
        allStudents.push(
          <Popover
            content={
              <Select
                allowClear
                style={{ width: "100%" }}
                showSearch
                size="large"
                onChange={(e) => {
                  let en = e.split(",");
                  en = { uid: en[0], email: en[1] };
                  this.setState({ emailer: en }, () => {
                    console.log(this.state.emailer);
                  });
                }}
              >
                {this.state.allStudentsList}
              </Select>
            }
            title="Выберете себе замену. Этому человеку прийдет email и если он согласится все будет хорошо"
            trigger="click"
            onVisibleChange={(e) => {
              if (e == false && this.state.emailer) {
                this.changeMe();
              }
            }}
          >
            <p key={member.email}>
            <NavLink className="navText" to={`/list/${member.id}` }>
            {member.name}
            </NavLink> 
              <Button type="link" style={{padding:'0px'}} className="OjidZamena" danger>
                Замениться
              </Button>
            </p>
          </Popover>
        );
      } 


      //человек ожидает замены
      else if( member.lookForChange &&  member.lookForChange != user.uid){
          allStudents.push(
            <p key={member.email}>
            <NavLink className="navText" to={`/list/${member.id}`}>
              {member.name}
            </NavLink> 
            <span className="OjidZamena" >Ожидает замены</span>
            </p>
          );
        } 
      
      else {
        allStudents.push(<p key={member.email}>
            <NavLink className="navText" to={`/list/${member.id}`}>
            {member.name}
            </NavLink> 
          </p>);
      }
    });
    this.setState({ studentsEnrolList: allStudents }, () => {
      console.log(allStudents);
    });
  };

  inMemberFunc = () => {
    let user = firebase.auth().currentUser;
    let mem = false;
    this.state.members.map((member) => {
      if (member.uid == user.uid) {
        mem = true;
      }
    });
    this.setState({ inMember: mem }, () => {
      console.log("In member func = ", this.state.inMember);
    });
  };

  changePerson = (e, n) => {
    let user = firebase.auth().currentUser;
    let nowMembers = this.state.members;
    console.log("Замена", n);
    if (user.uid == n.lookForChange) {
      console.log(nowMembers.indexOf(n));

      nowMembers[nowMembers.indexOf(n)] = {
        email: user.email,
        uid: user.uid,
        name: user.displayName,
        lookForChange: "",
      };

      this.setState({ members: nowMembers }, () => {
        console.log("Update ", this.state.members);
      });

      this.componentDidMount();
    }
  };

  changeMe = () => {
    let uid = this.state.emailer.uid;
    let email = this.state.emailer.email;
    let nowMembers = this.state.members;
    let user = firebase.auth().currentUser;
    if (email != undefined){
      nowMembers.map((member) => {
        if (member.uid == user.uid) {
          member.lookForChange = uid;
  
          this.setState({ members: nowMembers }, () => {
            console.log(this.state.members);
          });
  
          this.pushEmail(email);
        }
      });
    }
 
  };

  isPersonInMembers = () => {
    let newMembers = this.state.members;
    const user = firebase.auth().currentUser;
    console.log(user.uid);

    if (this.state.inMember == false) {
      console.log("Запись ", user.uid, "-", user.email, "-", user.displayName);
      newMembers.push({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });
      this.setState(
        { members: newMembers, inMember: true },
        console.log(this.state.members)
      );
      this.listOfEnrolledStudents();
    }
  };

  render() {
    let button;
    if (this.state.members.length < this.state.max){
      if (this.state.inMember) {
        button = (
          <Button
            block
            disabled
            style={{marginBottom:'10px'}}
            shape="round"
            type="link"
            size='small'
            onClick={this.isPersonInMembers}
          >
            Вы уже принимаете участие
          </Button>
        );
      } else {
        button = (
          <Button
            block
            shape="round"
            style={{marginBottom:'10px'}}
            type="primary"
            size='small'
            onClick={this.isPersonInMembers}
          >
            Принять участие
          </Button>
        );
      }
  
    }
    else {
     button = <p style={{textAlign:'center'}}>Больше людей вступить не может</p>
    }
    
    return (
      <div>
        <Collapse
          expandIconPosition="right"
          style={{ borderRadius: "10px" }}
          
        >
          <Panel
            header="Студенты"
            key="2"
            extra={this.state.members.length + " из " + this.state.max}
            style={{ borderRadius: "10px" }}
          >
            {button}
            {this.state.studentsEnrolList}
          </Panel>
        </Collapse>
      </div>
    );
  }
}

listOfStudents.propTypes = propTypes;
listOfStudents.defaultProps = defaultProps;
// #endregion

export default listOfStudents;
