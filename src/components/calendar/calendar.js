import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavLink } from "react-router-dom";
import moment from "moment";
import ToPageButton from "../UI/toPageButton";
import { Tabs, Button } from "antd";

import "./calendar.css";
import CalendarList from "./calendarList/calendarList";
const TabPane = Tabs.TabPane;

moment.updateLocale("ru", {
  weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "May",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
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
      .then((jsondata) => {
        setEventsCal(jsondata);
        console.log(jsondata);
      });
  }, []);

  const Event = ({ event }) => {
    let statusColor;
    if (eventsCal) {
      // if (event.status == "Подготовка") {
      //   statusColor = "green";
      // }
      // if (event.status == "Проведен") {
      //   statusColor = "black";
      // }
      // if (event.status == "Готовность") {
      //   statusColor = "yellow";
      // }
      // if (event.status == "Проведен") {
      //   statusColor = "blue";
      // }
      // if (event.status == "Отменен") {
      //   statusColor = "red";
      // }
      // console.log(statusColor)
      return (
        <NavLink
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to={"/Calendar/" + String(event.id)}
        >
          <div
            style={{
              boxSizing: "border-box",
              //backgroundColor: { statusColor },
            }}
          >
            {event.title}
          </div>
        </NavLink>
      );
    }
  };

  const operations = (
    <ToPageButton
      size="small"
      type="link"
      toPage="/Registration/AddEvent"
      Label="Создать меропр."
    />
  );

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate("next");
    };

    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate("current");
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span>
          
            <b>{date.format("MMMM")}</b> {date.format("YYYY")}
          

          <Button
            style={{ float: "right" }}
            type="link"
            size="small"
            onClick={goToNext}
          >
            &#8250;
          </Button>
          <Button
            style={{ float: "right" }}
            type="link"
            size="small"
            onClick={goToCurrent}
          >
            Сегодня
          </Button>
          <Button
            style={{ float: "right" }}
            type="link"
            size="small"
            onClick={goToBack}
          >
            &#8249;
          </Button>
        </span>
      );
    };

    return label();
  };

  return (
    <div>
      <Tabs size="small" defaultActiveKey="1" tabBarExtraContent={operations}>
        <TabPane  tab="Календарь" key="1">
          {" "}
          <Calendar
            popup
            views={["month"]}
            style={{ height: "calc(100vh - 110px)" }}
            localizer={localizer}
            events={eventsCal}
            startAccessor="meetDateAndTime"
            endAccessor="eventDateAndTime"
            components={{
              toolbar: CustomToolbar,
              event: Event,
            }}

          />
        </TabPane>
        <TabPane tab="Список" key="2">
          <CalendarList eventsCal={eventsCal} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CalendarApp;
