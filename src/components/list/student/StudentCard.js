import React, { Component } from 'react';
import DeleteStudent from './studentChange/DeleteStudent'
import {
    NavLink
} from 'react-router-dom'

class StudentCard extends Component {
    
    render() {
        return (
            <div className="studentBlock" style={{ borderColor: this.props.colorPick }}>
                <div style={{ float: "right" }}>
                    <DeleteStudent
                        id={this.props.student.id}
                        
                    />
                </div>
                <div style={{ float: "right" }}>
                    
                </div>
                <div className="nameOfStudent" style={{ paddingLeft: 48 * 2 }}>
                    <h4 key={this.props.student.id}>
                        <NavLink to={`/list/${this.props.student.id}`}>

                            {this.props.student.name}
                        </NavLink>
                    </h4>
                </div>
                <div>
                    <p>Курс - {this.props.student.course}</p>
                </div>
                <div>
                    <p>Уровень - {this.props.student.lvl}</p>
                </div>
                <div>
                    <p>Пропусков - {this.props.student.missed}</p>
                </div>
            </div>
        );
    }
}

export default StudentCard;