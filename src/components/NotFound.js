import React from 'react'
import {Button} from "react-bootstrap";
import {NavLink} from 'react-router-dom'

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <p>СТРАНИЦА НЕ НАЙДЕНА</p>
                <h1>404</h1>
                <NavLink to="/">
                    <Button variant="primary" size="lg" block>Вернуться на главную страницу</Button>
                </NavLink>
            </div>
        )
    }
}

export default NotFound