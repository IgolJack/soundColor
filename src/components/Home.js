import React from 'react'
import { auth } from './services/firebase'

import Button from '@material-ui/core/Button';

import {
    NavLink
} from 'react-router-dom'


class Home extends React.Component{
    
    render(){
        return(            
            <div>              
                <h1>           
                    <div><Button onClick={() => auth.signOut()}>Выйти</Button></div>          
                    <Button variant="contained">
                        <NavLink to="/Calendar">Регистрация (если не зареган ничего не отображается!)</NavLink>
                    </Button>
                    <br/>
                    <Button variant="contained">
                        <NavLink to="/Calendar">Вход (в зависимости от типа профиля отображаются те или иные блоки)</NavLink>
                    </Button>
                    <br/>
                    <Button variant="contained">
                        <NavLink to="/list">Список студентов</NavLink>
                    </Button>
                    <br/>
                    <Button variant="contained">
                        <NavLink to="/Calendar">Календарь</NavLink>
                    </Button>      
                </h1>
            </div>

        )
    }
}


export default Home