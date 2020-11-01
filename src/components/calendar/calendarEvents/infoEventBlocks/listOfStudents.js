import React from "react";
import * as firebase from "firebase";
import PropTypes from "prop-types";
import { Collapse, Button, Popover, Select, message } from "antd";
import "./lisyOfStudentsInEvent.css";
import { NavLink } from "react-router-dom";
import { CrownTwoTone } from "@ant-design/icons";
const { Panel } = Collapse;
const { Option } = Select;

const openNotification = () => {
  message.info("Пользователь успешно уведомлен!");
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
      user: {},

      //небходимо передать
      max: 6,
      members: [
        {
          id: "18",
          email: "igoljack@mail.ru",
          name: "Супер человек-кит",
          uid: "fwe[ofkowekfowekfoko34kfok4o",
          lookForChange: " ",
          senior: false,
        },
        {
          id: "27",
          email: "iegolepic@8788.tu",
          name: "Собака Куколдинго",
          uid: "G6K5czYS1HgzBMN5xHJbtSnwzdG3",
          lookForChange: "pCJ8AJihdnbDUB5XTHrzeoAvb0D2",
          senior: true,
        },
      ],
    };
  }

  componentDidMount() {
    console.log("=========ОБНОВЛЕНИЕ=========");
    this.getUser();
    this.getAllNamesAndUidOfStudentsFunc();
    this.inMemberFunc();
    this.createOptionsForSelect();
    this.listOfEnrolledStudents();
  }

  getUser = () => {
    let user = {
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid,
    };
    this.setState({ user: user }, () => {
      console.log("User info > ", this.state.user);
    });
  };

  getAllNamesAndUidOfStudentsFunc = async () => {
    fetch("/api/studentsName")
      .then((response) => response.json())
      .then((jsondata) =>
        this.setState({ allNamesAndUidOfStudents: jsondata }, () => {
          console.log("======", this.state.allNamesAndUidOfStudents);
          this.createOptionsForSelect();
        })
      );
  };

  pushEmail = async (email) => {
    fetch(`/api/pushEmail?email=${email}`).then((response) => {
      console.log(response);
      if (response.statusText == "OK") {
        openNotification();
      }
    });
  };

  createOptionsForSelect = () => {
    let studentsList = [];
    let uids = [];
    this.state.members.map((e) => uids.push(e.uid));
    this.state.allNamesAndUidOfStudents.some((student) => {
      if (uids.indexOf(student.uid) <= 0) {
        studentsList.push(
          <Option
            value={student.uid + "," + student.email}
            key={student.uid + "," + student.name + "," + student.email}
          >
            {student.name}
          </Option>
        );
      }
    });
    this.setState({ allStudentsList: studentsList }, () => {
      console.log("Подготовка option ", this.state.allStudentsList);
    });
  };

  listOfEnrolledStudents = () => {
    let allStudents = [];
    console.log(this.state.user.uid, "Жопа");
    this.state.members.map((member) => {
      //ЗАМЕНИТЬ
      if (member.lookForChange == this.state.user.uid) {
        allStudents.push(
          <p key={member.email}>
            <NavLink className="navText" to={`/list/${member.id}`}>
              {member.senior == true && (
                <CrownTwoTone
                  twoToneColor="#ffc069"
                  style={{
                    fontSize: "18.7px",
                    verticalAlign: "0px",
                    paddingRight: "3px",
                  }}
                />
              )}
              {member.name}
            </NavLink>
            <span
              style={{ float: "right", cursor: "pointer", color: "red" }}
              onClick={(e) => this.changePerson(e, member)}
            >
              Заменить
            </span>
          </p>
        );
      }
      //ОЖИДАЕМ ОТВЕТА
      else if (member.uid == this.state.user.uid && member.lookForChange) {
        allStudents.push(
          <p key={member.email}>
            <NavLink className="navText" to={`/list/${member.id}`}>
              {member.name}
            </NavLink>
            <span style={{ float: "right", color: "blue" }}>
              Ожидаем ответа
            </span>
          </p>
        );
      }
      //ЗАМЕНИТЬСЯ
      else if (this.state.user.uid == member.uid && !member.lookForChange) {
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
              <NavLink className="navText" to={`/list/${member.id}`}>
                {member.senior == true && (
                  <CrownTwoTone
                    twoToneColor="#ffc069"
                    style={{
                      fontSize: "18.7px",
                      verticalAlign: "0px",
                      paddingRight: "3px",
                    }}
                  />
                )}
                {member.name}
              </NavLink>

              <span
                style={{
                  float: "right",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "14px",
                }}
              >
                Замениться
              </span>
            </p>
          </Popover>
        );
      } else {
        allStudents.push(
          <p key={member.email}>
            {member.senior == true && (
              <CrownTwoTone
                twoToneColor="#ffc069"
                style={{
                  fontSize: "18.7px",
                  verticalAlign: "0px",
                  paddingRight: "3px",
                }}
              />
            )}

            <NavLink className="navText" to={`/list/${member.id}`}>
              {member.name}
            </NavLink>
          </p>
        );
      }
    });

    this.setState({ studentsEnrolList: allStudents }, () => {
      console.log(allStudents);
    });
  };

  inMemberFunc = () => {
    let mem = false;
    this.state.members.map((member) => {
      if (member.uid == this.state.user.uid) {
        mem = true;
      }
    });
    this.setState({ inMember: mem }, () => {
      console.log("In member func = ", this.state.inMember);
    });
    this.createOptionsForSelect();
    this.listOfEnrolledStudents();
  };

  changePerson = (e, n) => {
    let nowMembers = this.state.members;
    console.log(nowMembers);
    console.log(n.senior, this.state.user.uid, n.lookForChange);
    if ((n.senior = true)) {
      if (this.state.user.uid == n.lookForChange) {
        nowMembers[nowMembers.indexOf(n)] = {
          email: this.state.user.email,
          uid: this.state.user.uid,
          name: this.state.user.name,
          senior: true,
        };
      }
    } else {
      nowMembers[nowMembers.indexOf(n)] = {
        email: this.state.user.email,
        uid: this.state.user.uid,
        name: this.state.user.name,
        senior: false,
      };
    }
    console.log(nowMembers);

    this.setState({ members: nowMembers }, () => {
      console.log("Update ", this.state.members);
    });
    this.createOptionsForSelect();
    this.listOfEnrolledStudents();
    this.inMemberFunc();
  };

  changeMe = () => {
    let uid = this.state.emailer.uid;
    let email = this.state.emailer.email;
    let nowMembers = this.state.members;

    if (email != undefined) {
      nowMembers.map((member) => {
        if (member.uid == this.state.user.uid) {
          member.lookForChange = uid;

          this.setState({ members: nowMembers }, () => {
            console.log(this.state.members);
          });
          this.pushEmail(email);
        }
      });
    }
    this.createOptionsForSelect();
    this.listOfEnrolledStudents();
    this.inMemberFunc();
  };

  isPersonInMembers = () => {
    let newMembers = this.state.members;
    let id = 0;

    this.state.allNamesAndUidOfStudents.map((student) => {
      if (this.state.user.uid == student.uid) {
        id = student.id;
      }
    });
    console.log(id);
    if (this.state.inMember == false) {
      console.log(
        "Запись ",
        this.state.user.uid,
        "-",
        this.state.user.email,
        "-",
        this.state.user.displayName
      );
      newMembers.push({
        uid: this.state.user.uid,
        email: this.state.user.email,
        name: this.state.user.name,
        id: id,
        senior: false,
      });
      this.setState(
        { members: newMembers, inMember: true },
        console.log(this.state.members)
      );
      this.createOptionsForSelect();
      this.listOfEnrolledStudents();
      this.inMemberFunc();
    }
  };

  setSenior = () => {
    console.log("Возвышен");

    let uid = this.state.user.uid;
    let nowMembers = this.state.members;

    nowMembers.map((member) => {
      if (member.uid == uid) {
        member.senior = true;
        this.setState({ members: nowMembers }, () =>
          console.log(this.state.members)
        );
      }
    });

    this.createOptionsForSelect();
    this.listOfEnrolledStudents();
    this.inMemberFunc();
  };

  render() {
    let button;
    let seniorButton;
    let isSenior = false;
    this.state.members.map((member) => {
      if (member.senior == true) {
        isSenior = true;
      }
    });

    if (!isSenior && this.state.inMember) {
      seniorButton = (
        <Button
          style={{ marginBottom: "10px" }}
          shape="round"
          block
          type="link"
          size="small"
          onClick={this.setSenior}
        >
          Возвысится
        </Button>
      );
    }

    if (this.state.members.length < this.state.max) {
      if (this.state.inMember) {
        button = (
          <p style={{ textAlign: "center" }}>Вы уже принимаете участие</p>
        );
      } else {
        button = (
          <Button
            block
            shape="round"
            style={{ marginBottom: "10px" }}
            type="primary"
            size="small"
            onClick={this.isPersonInMembers}
          >
            Принять участие
          </Button>
        );
      }
    } else {
      button = (
        <p style={{ textAlign: "center" }}>Больше людей вступить не может</p>
      );
    }

    return (
      <div>
        <Collapse
          expandIconPosition="right"
          style={{ borderRadius: "10px" }}
          onChange={() => {
            this.createOptionsForSelect();
            this.listOfEnrolledStudents();
          }}
        >
          <Panel
            header="Студенты"
            key="2"
            extra={this.state.members.length + " из " + this.state.max}
            style={{ borderRadius: "10px" }}
          >
            {button}
            {seniorButton}
            {this.state.studentsEnrolList}
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default listOfStudents;
