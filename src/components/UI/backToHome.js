import React from "react";
import {NavLink} from "react-router-dom";
import { Button } from 'antd'


class BackToHome extends React.Component{
    render() {
        return (
            <NavLink to="/" style={{width: "100%", 'text-decoration': "none"}}>
               <Button block size ="large" type="primary">Вернуться на главную страницу</Button>
            </NavLink>
        )
    }
}

export default BackToHome