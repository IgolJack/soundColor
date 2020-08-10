import React from 'react'

import {
    NavLink
} from 'react-router-dom'


class Home extends React.Component{
    
    render(){
        return(
            <div>
                
                <button>
                    <NavLink to="/list">Список студентов</NavLink>
                </button>
            </div>

        )
    }
}


export default Home