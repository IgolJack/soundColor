import React from 'react'
import './App.css';
import CalendarPage from './components/CalendarPage'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch, NavLink} from 'react-router-dom'
import InfoEvents from "./components/calendar/infoEvent";
import List from './components/List'
import NotFound from './components/NotFound'
import Home from './components/Home'
import InfoStudent from './components/InfoStudent'


class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/CalendarPage" component={CalendarPage}/>
                        <Route exact path="/list" component={List}/>
                        <Route exact path='/list/:studentId' component={InfoStudent}/>
                        <Route exact path='/CalendarPage/:eventId' component={InfoEvents}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </div>

        )
    }
}


export default App