import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Affix, Row, Col } from "antd";
import { CustomerServiceTwoTone } from "@ant-design/icons";
import { Spin } from 'antd';

const antIcon = <CustomerServiceTwoTone style={{ fontSize: 35 }} spin />;
class BackToHome extends React.Component {
  render() {
    return (
      <div>
        <Affix offsetBottom={0}>
          <div srtyle={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', alignContent: 'center', alignItems: 'stretch', margin: 'auto', flex: 'auto'}}>
           
            
                <NavLink to="/list">
                  <Button
                    size="large"
                    type="primary"
                    style={{width:  `calc(50% - 30px)`}}
                  >
                    Список студентов
                  </Button>
                </NavLink>
              

             
                <NavLink to="/" >
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
                    style={{ height: "50px", width: "50px", margin:'5px' }}
                  />
                </NavLink>
              

              
                <NavLink to="/Calendar">
                  <Button
                    size="large"
                    type="primary"
                    style={{width:  `calc(50% - 30px)`}}
                  >
                    Календарь мероприятий
                  </Button>
                </NavLink>
             
          
          </div>
        </Affix>
      </div>
    );
  }
}

export default BackToHome;
