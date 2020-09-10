import React from 'react'

import {
    NavLink
} from 'react-router-dom'
import Button from "@material-ui/core/Button";

class Home extends React.Component{
    
    render(){
        return(
            <div>
                <h1>
                    <Button variant="contained">
                        <NavLink to="/list">Список студентов</NavLink>
                    </Button>
                    <br/>
                    <Button  variant="contained">
                    <NavLink to="/CalendarPage">Календарь </NavLink>
                    </Button>
                </h1>
            </div>

        )
    }
}


export default Home