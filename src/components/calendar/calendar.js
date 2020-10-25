import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
import {
  calendarEvents,
  getInfoToCalendar,
} from "../abstract/universalFirebase";
import moment from "moment";
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
  );
};

export default CalendarApp;
