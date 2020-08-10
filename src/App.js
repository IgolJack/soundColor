import React from 'react'
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom'


import List from './components/List'
import NotFound from './components/NotFound'
import Home from './components/Home'


class App extends React.Component{
    
    render(){
        return(
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/list" component={List} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>

        )
    }
}


export default App