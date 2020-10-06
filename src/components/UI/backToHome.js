import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";

class BackToHome extends React.Component{
    render() {
        return (
            <NavLink to="/" style={{width: "100%", 'text-decoration': "none"}}>
                <Button variant="primary" size="lg" block>Вернуться на главную страницу </Button>
            </NavLink>
        )
    }
}

export default BackToHome