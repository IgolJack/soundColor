import React from "react";
import { db } from "../firebase/firebase";
import PropertyFilter from "./student/filter/PropertyFilter";
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
      course: "",
        lvl: "",
        missed: "",
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
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.id = Number(data.id);
          if (lastId < data.id) {
            lastId = data.id;
          }
          students.push(data);
        });
        this.setState({ students: students, loading: !this.state.loading });
        localStorage.setItem("lastId", lastId);
        console.log(snapshot);
      })
      .catch((error) => console.log(error));
  }
  componentDidMount() {
    this.getStudents();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState(this.props);
    }
    console.log(this.state.searchStudent);
    console.log(this.state.filterName);
  }
  updateData = (name, value) => {
    this.setState({ [name]: value });
    if (name === "searchStudent") {
      const { filterName } = this.state;
      delete filterName.course;
      delete filterName.lvl;
      delete filterName.missed;
      this.setState({ course: "", lvl: "", missed: "" })
    }
    if (name === "filterName") {
      this.setState({ searchStudent: "" });
    }
    console.log(this.state.searchStudent);
    console.log(this.state.filterName);
  };
  render() {
    console.log(localStorage.getItem("lastId"));
    return (
      <div className="App">
        <Navbar>
          <Link
            to={{
              pathname: "/Registration",
              state: { lastId: this.state.lastId },
            }}
            style={{ "text-decoration": "none" }}
          >
            <Button type="link" size="small">
              Регистрация
            </Button>
          </Link>

       
          <SearchFilter search={this.search} searchStudent={this.state.searchStudent} updateData={this.updateData} />
        </Navbar>

        <PropertyFilter
          course={this.state.course}
          lvl={this.state.lvl}
          missed={this.state.missed}
          onInputChange={this.onInputChange}
          updateData={this.updateData}
        />
        <Skeleton
          active
          loading={this.state.loading}
          paragraph={{ rows: 30 }}
          title={false}
        >
          <Tabs defaultActiveKey="1">
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