import React from 'react'

import {
    NavLink
} from 'react-router-dom'


class Home extends React.Component{
    
    render(){
        return(
            <div>
                
                <h1>
                    <NavLink to="/list">Список студентов</NavLink>
                </h1>
            </div>

        )
    }
}


export default Home