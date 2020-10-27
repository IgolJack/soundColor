import React from 'react'
import {Button} from 'antd'
import {NavLink} from 'react-router-dom'

class NotFound extends React.Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <p>СТРАНИЦА НЕ НАЙДЕНА</p>
                <h1>404</h1>
                <NavLink to="/">
                    <Button type="primary" size="lg" block>Вернуться на главную страницу</Button>
                </NavLink>
            </div>
        )
    }
}

export default NotFound