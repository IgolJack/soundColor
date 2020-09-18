import React from 'react'

import Button from '@material-ui/core/Button';

import {
    NavLink
} from 'react-router-dom'


class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                
                <h1>
                    <NavLink to="/list">Список студентов</NavLink>
                    <div><Button onClick={this.props.handleLogout}>Выйти</Button></div>
                </h1>
            </div>

        )
    }
}


export default Home