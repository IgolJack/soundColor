import React from 'react'
import { auth } from './firebase/firebase'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import {Button} from "react-bootstrap";

class Home extends React.Component{
    
    render(){
        return(            
            <div>
                <Navbar bg="light">
                    <Button variant="primary" size="lg" block onClick={() => auth.signOut()}>Выйти</Button>
                </Navbar>
                <Navbar bg="light">
                    <NavLink to="/list"  style={{ width: "100%", 'text-decoration': "none"}}>
                        <Button variant="primary" size="lg" block>  Список студентов</Button>
                    </NavLink>
                </Navbar>
                <Navbar bg="light" >
                        <NavLink to="/Calendar" style={{ width: "100%",  'text-decoration': "none"}} >
                            <Button variant="primary" size="lg" block>Календарь</Button>
                        </NavLink>
                </Navbar>
            </div>
        )
    }
}


export default Home