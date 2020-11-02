import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class StudentList extends Component {
  render() {
    return (
      <NavLink to={`/list/${this.props.student.id}`} style={{ color: '#000000' }}>
        <div
          style={{
            padding: "2px 5px 6px 5px",
            borderLeft: `10px solid ${this.props.colorPick}`,
            borderBottom: `2px solid ${this.props.colorPick}`,
            margin: "0 5px 5px 0",
          }}
        >
          {this.props.student.name}
        </div>
      </NavLink>
    );
  }
}
