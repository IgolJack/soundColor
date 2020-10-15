import React, { Component } from "react";
import DeleteStudent from "./studentChange/DeleteStudent";
import EditDetails from "./studentChange/EditDetails";
import { NavLink } from "react-router-dom";
import { Card } from "antd";
import { Divider } from "antd";
const { Meta } = Card;
class StudentCard extends Component {
  render() {
    return (
      <div key={this.props.student.id}>
 
        <Card
          style={{
            borderColor: this.props.colorPick,
            borderWidth: "4px",
            marginLeft: "15px",
            marginRight: "15px",
            marginBottom:'10px',
          }}
          hoverable
          actions={[
            <DeleteStudent id={this.props.student.id} />,
            <EditDetails
              type="setting"
              name={this.props.student.name}
              lvl={this.props.student.lvl}
              missed={this.props.student.missed}
              id={this.props.student.id}
              course={this.props.student.course}
            />,
          ]}
        >
          <NavLink to={`/list/${this.props.student.id}`}>
            <Meta
              title={
                <Divider
                  dashed="true"
                  style={{ color: this.props.colorPick, borderTop: "3px" }}
                >
                  <div style={{ textAlign: "center", margin: "0" }}>
                    {" "}
                    <h2> {this.props.student.name}</h2>
                  </div>
                </Divider>
              }
              description={
                <div>
                  <div
                    style={{
                      width: "8em",
                      height: "4em",
                      border: "2px",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,

                      position: "absolute",
                      borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                      background: this.props.colorPick,
                      textAlign: "center",
                    }}
                  >
                    <h1 style={{ color: "white" }}>{this.props.student.lvl}</h1>
                  </div>
                  <h5>{this.props.student.course}</h5>
                  <h5> Пропусков - {this.props.student.missed}</h5>
                </div>
              }
            />
          </NavLink>
        </Card>
      
      </div>
    );
  }
}

export default StudentCard;
