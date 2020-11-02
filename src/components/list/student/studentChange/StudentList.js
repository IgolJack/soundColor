import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { List } from "antd";
import StudentListCard from "./StudentListCard";

var bgColors = {
  Default: "#81b71a",
  Blue: "#00B1E1",
  Cyan: "#37BC9B",
  Green: "#8CC152",
  Red: "#E9573F",
  Yellow: "#F6BB42",
};

var colorPick = bgColors.Blue;

class StudentList extends Component {
  render() {
    return (
      <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(300px, auto))',
        }}
      >
        {this.props.students &&
          this.props.students.map((student) => {
            colorPick = "#000000";

            // eslint-disable-next-line
            if (student.lvl == 1) {
              colorPick = bgColors.Red;
            }
            // eslint-disable-next-line
            if (student.lvl == 2) {
              colorPick = bgColors.Yellow;
            }
            // eslint-disable-next-line
            if (student.lvl == 3) {
              colorPick = bgColors.Cyan;
            }

            return <StudentListCard student={student} colorPick={colorPick} />;
          })}
      </div>
    );
  }
}

export default StudentList;
