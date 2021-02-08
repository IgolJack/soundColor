import React from "react";
import { CrownTwoTone } from "@ant-design/icons";
import { Collapse, Button, Input, Checkbox } from "antd";
import "./newListOfStudent.css";
const { Panel } = Collapse;
const { TextArea } = Input;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

class NewListOfStudents extends React.Component {
  state = {
    members: this.props.members,
    membersList: [],
  };

  componentDidMount() {}

  
  createList = () => {
    console.log(this.props.members);
    let VarMemberList = [];
    this.props.members.forEach((member) => {
      var name = (
        <>
          <span style={{ textDecoration: "underline" }}>{member.name}</span>
          {member.senior == true && (
            <>
              <CrownTwoTone
                twoToneColor="#ffc069"
                style={{
                  float: "right",
                  fontSize: "18.7px",
                  verticalAlign: "0px",
                  paddingRight: "3px",
                }}
              />
            </>
          )}
        </>
      );

      VarMemberList.push(
        <>
          <Collapse
            accordion
            ghost
            bordered={false}
            className="site-collapse-custom-collapse"
          >
            <Panel header={name} key="1" >
              {member.senior == true && (
               <><Checkbox onChange={onChange}>Сдал</Checkbox><br/></>
              )}
              <Checkbox onChange={onChange}>Опоздал</Checkbox><br/>
              <Checkbox onChange={onChange}>Опозорил</Checkbox><br/>
              <Checkbox onChange={onChange}>Не пришел</Checkbox><br/>
              <br/>
              Комментарий:
              <TextArea style={{ minHeight: "50px" }} rows={4} />
            </Panel>
          </Collapse>
        </>
      );
    });
    this.setState({ membersList: VarMemberList }, () => {
      console.log("создан");
    });
  };

  render() {
    return (
      <Collapse
        expandIconPosition="right"
        style={{ borderRadius: "10px" }}
        onChange={() => {
          this.createList();
        }}
      >
        <Panel
          header="Студенты"
          key="2"
          //extra={this.state.members.length + " из " + this.state.max}
          style={{ borderRadius: "10px" }}
        >
          {this.state.membersList}


          
        </Panel>
      </Collapse>
    );
  }
}

export default NewListOfStudents;
