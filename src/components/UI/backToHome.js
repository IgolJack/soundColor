import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Affix } from "antd";
import { CustomerServiceTwoTone } from "@ant-design/icons";

class BackToHome extends React.Component {
  render() {
    return (
      <Affix
        offsetBottom={0}
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          zIndex:'1000',
        }}
      >
        <div>
          <NavLink to="/list">
            <Button
              size="large"
              type="primary"
              style={{ width: `calc(50% - 30px)` }}
            >
              Студенты
            </Button>
          </NavLink>

          <NavLink to="/">
            <Button
              size="large"
              shape="circle"
              icon={
                <CustomerServiceTwoTone
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              }
              style={{
                height: "50px",
                width: "50px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            />
          </NavLink>

          <NavLink to="/Calendar">
            <Button
              size="large"
              type="primary"
              style={{ width: `calc(50% - 30px)` }}
            >
              Календарь
            </Button>
          </NavLink>
        </div>
      </Affix>
    );
  }
}

export default BackToHome;
