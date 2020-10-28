import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
import moment from "moment";
import ToPageButton from "../UI/toPageButton";
import './calendar.css'
const TabPane = Tabs.TabPane;

moment.updateLocale("ru", {
  weekdaysShort : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months : [
    "Январь", "Февраль", "Март", "Апрель", "May", "Июнь", "Июль",
    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
],
  week: {
    dow: 1,
    doy: 1,
  },
 
});
const localizer = momentLocalizer(moment);

const CalendarApp = () => {
  const [eventsCal, setEventsCal] = useState([]);

  useEffect(() => {
    fetch("/api/getAllEvents")
      .then((response) => response.json())
      .then((jsondata) => setEventsCal(jsondata));
  }, []);

  console.log(eventsCal);

  const Event = ({ event }) => {
    if (eventsCal)
      return (
        <NavLink
        style={{ textDecoration: "none", color: "white" }}
        to={"/Calendar/" + event.id}
      >
        <div style={{boxSizing:'border-box'}}>
      
          {event.title}
        </div>
        </NavLink>
        
      );
  };

  return (
    <div>
      <ToPageButton
        toPage="/Registration/AddEvent"
        Label="Создать мероприятие"
      />

      <Calendar
        popup
        views={["month"]}
        style={{ height: "calc(100vh - 110px)" }}
        localizer={localizer}
        events={eventsCal}
        startAccessor="meetDate"
        endAccessor="meetTime"
        components={{
          event: Event,
        }}
        messages={{
          month: 'My month word',
          day: 'My day word',
          today: 'Сегодня',
          previous: '<',
          next: '>',
        }}
      />
    </div>
  );
};

export default CalendarApp;
