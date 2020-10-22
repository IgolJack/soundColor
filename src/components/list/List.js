import React from "react";
import { db } from "../firebase/firebase";

import PropertyFilter from './student/filter/PropertyFilter'
import Students from "./student/Students";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Button, Skeleton } from "antd";
import StudentList from "./student/studentChange/StudentList";
import { Tabs } from "antd";
import SearchFilter from "./student/filter/SearchFilter";
const TabPane = Tabs.TabPane;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: null,
      filterName: {},
      searchStudent: "",
      lastId: "",
      loading: true,
      
    };

    this.getStudents = this.getStudents.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  getStudents() {
    db.collection("students")
      .orderBy("name")
      .get()
      .then((snapshot) => {
        const students = [];
        var lastId = 0;
        var namesOfStudents = []
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.id = Number(data.id);
          if (lastId < data.id) {
            lastId = data.id;
          }
          namesOfStudents.push(data.name)
          students.push(data);
        });
        this.setState({ students: students, loading: !this.state.loading });
        localStorage.setItem("lastId", lastId);
        localStorage.setItem("namesOfStudents", namesOfStudents);
        console.log(snapshot);
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getStudents();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchData(this.props);
    }
    console.log(this.state.searchStudent);
    console.log(this.state.filterName);
  }

  updateData = (name, value) => {
    this.setState({[name]: value})
    if (name === "searchStudent") {
        const { filterName } = this.state;
        delete filterName.course;
        delete filterName.lvl;
        delete filterName.missed;
    }
    if (name === "filterName") {
        this.setState({searchStudent: ""})
    }
    console.log(this.state.searchStudent)
    console.log(this.state.filterName)
}

  render() {
    console.log(localStorage.getItem("lastId"));
    return (
      <div className="App">
        <Navbar bg="light">
          <h2 style={{ textAlign: "center" }}>Студенты</h2>
          <Link
            to={{
              pathname: "/Registration",
              state: { lastId: this.state.lastId },
            }}
            style={{ "text-decoration": "none" }}
          >
            <Button type="link">Регистрация</Button>
          </Link>

          <SearchFilter search={this.search} updateData={this.updateData} />
        </Navbar>

        <PropertyFilter
                    onInputChange={this.onInputChange}
                    updateData={this.updateData}
                />


        <Skeleton
          active
          loading={this.state.loading}
          paragraph={{ rows: 30 }}
          title={false}
        >
          <Tabs
            defaultActiveKey="1"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          >
            <TabPane tab="Карточки" key="1">
              {" "}
              <Students
                students={this.state.students}
                filterName={this.state.filterName}
                searchStudent={this.state.searchStudent}
              />
            </TabPane>
            <TabPane tab="Компактный вид" key="2">
              {" "}
              <StudentList
                students={this.state.students}
                filterName={this.state.filterName}
                searchStudent={this.state.searchStudent}
              />
            </TabPane>
          </Tabs>
        </Skeleton>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default List;
