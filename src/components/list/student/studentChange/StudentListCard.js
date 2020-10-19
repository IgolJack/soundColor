import React, { Component } from "react";
import { NavLink } from "react-router-dom";



export default class StudentList extends Component {
render() {
    return (
        <div style={{background: this.props.colorPick, display:'block', width: '100%'}}>
                                 
      <NavLink to={`/list/${this.props.student.id}`}>
        {this.props.student.name} -   {this.props.student.lvl} - {this.props.student.course}
      </NavLink>
  </div>
    )
}

}



