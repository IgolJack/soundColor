import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavLink } from "react-router-dom";
import { Divider, Tabs } from "antd";
import {
  calendarEvents,
  getInfoToCalendar,
} from "../abstract/universalFirebase";
import moment from "moment";
import ToPageButton from '../UI/toPageButton'
getInfoToCalendar();
const TabPane = Tabs.TabPane;

const localizer = momentLocalizer(moment);

const CalendarApp = () => {
  var events = calendarEvents;

  const Event = ({ event }) => {
    if (events)
      return (
        <NavLink
          style={{ textDecoration: "none", color: "white" }}
          to={"/Calendar/" + event.id}
        >
          {event.title}
        </NavLink>
      );
  };

  return (
    <div>
    
    <ToPageButton toPage='/Registration/AddEvent' Label='Создать мероприятие'/>
    if (events){
      <Calendar
        style={{ height: 'calc(100vh - 30px)', }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          event: Event,
        }}
      />  
    }
    </div>
  
  );
};

export default CalendarApp;
