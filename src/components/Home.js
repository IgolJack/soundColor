import React from 'react'
import { auth } from './firebase/firebase'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'antd'


class Home extends React.Component{

    render(){
        return(            
            <div style={{margin: '20px'}}>
                <h1 style={{textAlign:'center'}}>Меню</h1>
                <Navbar bg="light">
                    <NavLink to="/list"  style={{ width: "100%", 'text-decoration': "none"}}>
                        <Button block size ="large" type="primary"> Список студентов</Button>
                    </NavLink>
                </Navbar>
                <Navbar bg="light" >
                        <NavLink to="/Calendar" style={{ width: "100%",  'text-decoration': "none"}} >
                            <Button block size ="large" type="primary" >Календарь</Button>
                        </NavLink>
                </Navbar>
                <Navbar bg="light" >
                        <NavLink to="/DeleteByLife" style={{ width: "100%",  'text-decoration': "none"}} >
                            <Button block size ="large" type="primary" >Удоли</Button>
                        </NavLink>
                </Navbar>
                <Navbar bg="light">
                    <Button type="danger" block size ="large" onClick={() => auth.signOut()}>Выйти</Button>
                </Navbar>
            </div>
        )
    }
}


export default Home