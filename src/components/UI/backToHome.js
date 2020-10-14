import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Affix } from "antd";
import { CustomerServiceTwoTone } from "@ant-design/icons";

class BackToHome extends React.Component {
  render() {
    return (
      <Affix offsetBottom={0} style={{ bottom: "0" }}>
        <div>
          <NavLink to="/list">
            <Button
              size="large"
              type="primary"
              style={{ width: `calc(50% - 30px)` }}
            >
              Список студентов
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
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              }
              style={{ height: "50px", width: "50px", marginLeft: '5px', marginRight:'5px'}}
            />
          </NavLink>

          <NavLink to="/Calendar">
            <Button
              size="large"
              type="primary"
              style={{ width: `calc(50% - 30px)` }}
            >
              Календарь мероприятий
            </Button>
          </NavLink>
        </div>
      </Affix>
    );
  }
}

export default BackToHome;
