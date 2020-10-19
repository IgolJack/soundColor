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
            marginBottom: "10px",
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
                  <div style={{ textAlign: "center", margin: "0", fontSize: '5vw' }}>
                    {this.props.student.name}
                  </div>
                </Divider>
              }
              description={
                <div>
                  <div
                    style={{
                      width: "8vw",
                      height: "4vw",
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
                    <span style={{ color: "white", fontSize:'3vw', display: 'block'}}>{this.props.student.lvl}</span>
                  </div>
                  <h6>{this.props.student.course}</h6>
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
