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
import { NavLink } from 'react-router-dom'
import {getInfoFromFirebase} from "../firebase/getInfoFromFirebase"

const Calendar = () => {
    
    const calendarRef = React.createRef();
    const handleClickNextButton = () => {
      const calendarInstance = this.calendarRef.current.getInstance();
      calendarInstance.next();
    };
    var eventsNum
    const { fire} = getInfoFromFirebase()
    fire("eventsCalendar")

    

 
      
        return (
            <div>
                
                <BackToHome/>
                <NavLink to="/Registration/AddEvent" style={{width: "100%", 'text-decoration': "none"}}>
                    <Button block size ="large" type="primary">Создать мероприятие</Button>
                </NavLink>
                <TUICalendar
                    ref={calendarRef}
                    height="500px"
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
                    schedules={eventsNum}
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
                        }
                      }}
                      
                      

                />
                <br/>
                <Button block size ="large" type="primary" onClick={handleClickNextButton}>Go next!</Button>
            </div>
        )
    
}

export default Calendar