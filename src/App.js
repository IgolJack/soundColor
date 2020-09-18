import React from 'react'
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import List from './components/List'
import NotFound from './components/NotFound'
import Home from './components/Home'
import InfoStudent from './components/InfoStudent'
import Login from './components/registration/Login'
import LoginPage from './components/registration/LoginPage'


class App extends React.Component{
    
    render(){
        return(
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/list" component={List} />
                        <Route exact path='/list/:studentId' component={InfoStudent} />
                        <Route exact path="/login" component={LoginPage} />

                        <Route component={NotFound} />
                        
                    </Switch>
                </Router>
            </div>

        )
    }
}


export default App