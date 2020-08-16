import React from 'react'
import Button from "@material-ui/core/Button";
import {
    NavLink
} from 'react-router-dom'

class NotFound extends React.Component {

    render() {
        return (
            <div>
                <p>СТРАНИЦА НЕ НАЙДЕНА</p>
                <Button variant="contained">
                    <NavLink to="/">Вернуться на главную страницу</NavLink>
                </Button>
            </div>

        )
    }
}

export default NotFound