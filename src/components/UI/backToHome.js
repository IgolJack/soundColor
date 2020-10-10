import React from "react";
import {NavLink} from "react-router-dom";
import { Button, Affix } from 'antd'


class BackToHome extends React.Component{
    render() {
        return (
            <NavLink to="/" style={{width: "100%", 'text-decoration': "none"}}>
                <Affix offsetBottom={0}>
                    <Button block size ="large" type="primary">Вернуться на главную страницу</Button>
                </Affix>               
            </NavLink>
        )
    }
}

export default BackToHome