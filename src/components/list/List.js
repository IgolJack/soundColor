import React from "react";
import { db } from "../firebase/firebase";
import PropertyFilter from "./student/filter/PropertyFilter";
import Students from "./student/Students";
import { Link } from "react-router-dom";
import { Button, Skeleton, PageHeader } from "antd";
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
  }
  updateData = (name, value) => {
    this.setState({ [name]: value });
    if (name === "searchStudent") {
      const { filterName } = this.state;
      delete filterName.course;
      delete filterName.lvl;
      delete filterName.missed;
      this.setState({ course: "", lvl: "", missed: "" });
    }
    if (name === "filterName") {
      this.setState({ searchStudent: "" });
    }
  };
  render() {
    let filteredStidents;
    if (this.state.searchStudent === "") {
      filteredStidents =
        this.state.students &&
        this.state.students.filter((item) => {
          for (var key in this.state.filterName) {
            if (
              key === "missed" &&
              this.state.filterName[key] === 0 &&
              item[key] !== this.state.filterName[key]
            ) {
              return false;
            }
            if (key === "missed" && item[key] < this.state.filterName[key]) {
              return false;
            }
            if (
              key !== "missed" &&
              (item[key] === undefined ||
                item[key] !== this.state.filterName[key])
            ) {
              return false;
            }
          }
          return true;
        });
    } else {
      filteredStidents =
        this.state.students &&
        this.state.students.filter((student) => {
          return student.name
            .toLowerCase()
            .includes(this.state.searchStudent.toLowerCase());
        });
    }

    return (
      <div className="App">
        <PageHeader
        className="site-page-header-responsive"
          ghost={false}
          onBack={() => window.history.back()}
          title="Title"
          extra={[
             <SearchFilter
             key="2"
             search={this.search}
             searchStudent={this.state.searchStudent}
             updateData={this.updateData}></SearchFilter>
          ]}
        ></PageHeader>

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
              <Students students={filteredStidents} />
            </TabPane>
            <TabPane tab="Компактный вид" key="2">
              {" "}
              <StudentList students={filteredStidents} />
            </TabPane>
          </Tabs>
          <br /> <br />
        </Skeleton>
      </div>
    );
  }
}
export default List;
