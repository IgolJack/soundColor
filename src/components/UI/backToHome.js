import React from "react";
import {NavLink} from "react-router-dom";
import { Button, Affix, Row, Col } from 'antd'
import { HomeTwoTone } from '@ant-design/icons';


class BackToHome extends React.Component{
    render() {
        return (
            <div>
                <Affix offsetBottom={0}>
                    <div style={{ height: '50px' }}>
                        <Row>
                            <Col xs={10} sm={11} md={11} lg={11} xl={11} xll={11}>
                                <NavLink to="/list" style={{ 'text-decoration': "none" }}>
                                    <Button size="large" type="primary" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Список студентов</Button>
                                </NavLink>
                            </Col>
                            
                            <Col xs={4} sm={2} md={2} lg={2} xl={2} xll={2}>
                                <NavLink to="/" style={{ 'text-decoration': "none" }}>
                                    <Button size="large" shape="circle" type="primary" icon={<HomeTwoTone style={{ fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />} style={{ height: '100%', width: '100%' }} />
                                </NavLink>
                            </Col>
                            
                            <Col xs={10} sm={11} md={11} lg={11} xl={11} xll={11}>
                                <NavLink to="/Calendar" style={{ 'text-decoration': "none" }}>
                                    <Button size="large" type="primary" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Календарь мероприятий</Button>
                                </NavLink>
                            </Col>
                        </Row>
                    </div>
                </Affix>
            </div>
        )
    }
}



export default BackToHome