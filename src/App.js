import React from 'react'
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import InfoEvent from "./components/calendar/infoEvent";
import List from './components/List'
import NotFound from './components/NotFound'
import Home from './components/Home'
import InfoStudent from './components/InfoStudent'
import LoginPage from './components/registration/LoginPage'
import Calendar from './components/calendar/calendar'
import { AuthProvider } from "./components/registration/Auth";
import PrivateRoute from "./components/registration/PrivateRoute";


const App = () => {

    
        return (
            <div>
                <AuthProvider>
                    <Router>
                        <Switch>

                            <Route exact path="/login" component={LoginPage} />
                            <PrivateRoute exact path="/" component={Home} />
                            <PrivateRoute exact path="/list" component={List} />
                            <PrivateRoute exact path='/list/:studentId' component={InfoStudent} />
                            <PrivateRoute exact path="/Calendar" component={Calendar} />
                            <PrivateRoute exact path='/Calendar/:eventId' component={InfoEvent} />
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </AuthProvider>
            </div>

        )
    
}


export default App