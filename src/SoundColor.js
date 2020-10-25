import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InfoEvent from "./components/calendar/calendarEvents/infoEvent";
import List from "./components/list/List";
import NotFound from "./components/404/NotFound";
import Home from "./components/Home";
import InfoStudent from "./components/list/student/InfoStudent";
import LoginPage from "./components/login/LoginPage";
import Calendar from "./components/calendar/calendar";
import { AuthProvider } from "./components/login/Auth";
import PrivateRoute from "./components/login/PrivateRoute";
import SignUpPage from "./components/registration/signUpPage";
import HomeTeam from "./components/firebase/get";
import CalendarNewEvent from "./components/calendar/calendarEvents/calendarNewEvent";
import BackToHome from "./components/UI/backToHome";
import EmailPage from "./components/email/emailPage";
import './SoundColor.css'
const SoundColor = () => {
  return (
    <div className='background'>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/list" component={List} />
            <PrivateRoute
              exact
              path="/list/:studentId"
              component={InfoStudent}
            />
            <PrivateRoute exact path="/Calendar" component={Calendar} />
            <PrivateRoute
              exact
              path="/Calendar/:eventId"
              component={InfoEvent}
            />
            <PrivateRoute
              exact
              path="/Registration/AddEvent"
              component={CalendarNewEvent}
            />
            <PrivateRoute exact path="/Registration" component={SignUpPage} />
            <PrivateRoute exact path="/Get" component={HomeTeam} />
           
            <PrivateRoute exact path="/Email" component={EmailPage} />
            <Route component={NotFound} />
          </Switch>
          <BackToHome />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default SoundColor;
