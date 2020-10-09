import React from "react";

import {db} from "../firebase/firebase";
import CalendarNewEvent from "./calendarEvents/calendarNewEvent"

import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import { Button } from 'antd'

import BackToHome from "../UI/backToHome";
import { NavLink, Redirect, Link } from 'react-router-dom'


class Calendar extends React.Component {
    
    calendarRef = React.createRef();
 
    handleClickNextButton = () => {
      const calendarInstance = this.calendarRef.current.getInstance();
      calendarInstance.next();
    };

    state = {
        lastId: "",
        eventsNum: [],
    }
     



    componentDidMount() {
        db.collection('eventsCalendar')
            .get()
            .then(snapshot => {
                let events = []
                let lastId = 0
                snapshot.forEach(doc => {
                    const data = doc.data()
                    data.id = Number(data.id)
                    if (lastId < data.id) {
                        lastId = doc.id
                    }
                    events.push(data)
                })
                this.setState({eventsNum: events, lastId: lastId})
            })
            .catch(error => console.log(error))
       
    }

 

    render() {
      
        return (
            <div>
                
                <BackToHome/>
                <NavLink to="/Registration/AddEvent" style={{width: "100%", 'text-decoration': "none"}}>
                    <Button block size ="large" type="primary">Создать мероприятие</Button>
                </NavLink>
                <CalendarNewEvent lastId={this.state.lastId}/>
                <TUICalendar
                    ref={this.calendarRef}
                    height="500px"
                    onClickSchedule = {this.clickSchedule}
                    view="month"
                    useCreationPopup={false}
                    useDetailPopup={false}
                    disableDblClick={true}
                    disableClick={true}
                    calendars={[
                        {
                            id: "1",
                            name: "My Calendar",
                            color: "#ffffff",
                            bgColor: "#9e5fff",
                            dragBgColor: "#9e5fff",
                            borderColor: "#9e5fff"
                          }
                    ]}
                    schedules={this.state.eventsNum}
                    template={{
                        time(schedule) {
                            let content = [];
                            content.push(<NavLink to="/Calendar/${schedule.id}"> ${schedule.title} </NavLink>);
                            console.log(content);
                            return (
                                `<a href="/Calendar/${schedule.id}"> ${schedule.title} </a>`
                            )
                            //<NavLink to="/Calendar/${schedule.id}"> ${schedule.title} </NavLink>
                            //`<a href="/Calendar/${schedule.id}"> ${schedule.title} </a>`
                        },
                        milestoneTitle() {
                          return 'Milestone';
                        },
                        allday(schedule) {
                          return `${schedule.title}<i class="fa fa-refresh"></i>`;
                        },
                        alldayTitle() {
                          return 'All Day';
                        }
                      }}
                      
                      

                />
                <br/>
                <Button block size ="large" type="primary" onClick={this.handleClickNextButton}>Go next!</Button>
            </div>
        )
    }
}

export default Calendar