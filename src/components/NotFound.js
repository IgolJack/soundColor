import React from 'react'

import {
    NavLink
} from 'react-router-dom'

class NotFound extends React.Component{
    
    render(){
        return(
            <div>
                <p>СТРАНИЦА НЕ НАЙДЕНА</p>
                <button>
                    <NavLink to="/">Вернуться на главную страницу</NavLink>
                </button>
            </div>

        )
    }
}

export default NotFound