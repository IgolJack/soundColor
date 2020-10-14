import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import InfoEvent from "./components/calendar/calendarEvents/infoEvent";
import List from './components/list/List'
import NotFound from './components/NotFound'
import Home from './components/Home'
import InfoStudent from './components/list/student/InfoStudent'
import LoginPage from './components/login/LoginPage'
import Calendar from './components/calendar/calendar'
import { AuthProvider } from "./components/login/Auth";
import PrivateRoute from "./components/login/PrivateRoute";
import SignUpPage from "./components/registration/signUpPage"
import HomeTeam from "./components/firebase/get"
import CalendarNewEvent from './components/calendar/calendarEvents/calendarNewEvent'
import deletePageTrigger from "./components/delete/deletePageTrigger"
import BackToHome from './components/UI/backToHome';
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
                            <PrivateRoute exact path="/Registration/AddEvent" component={CalendarNewEvent} />
                            <PrivateRoute exact path="/Registration" component={SignUpPage} />
                            <PrivateRoute exact path="/Get" component={HomeTeam} />
                            <PrivateRoute exact path="/DeleteByLife" component={deletePageTrigger} />
                            <Route component={NotFound} />
                        </Switch>
                        <div style={{ position: "fixed",
    left: "0",
    bottom: "0",
    height: "50px",
    width: "100%",}}><BackToHome/></div>
                    </Router>
                </AuthProvider>
            </div>

        )
    
}


export default App