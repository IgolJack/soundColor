import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class EventCard extends Component {
  render() {
    return (
      <NavLink to={`/Calendar/${this.props.event.id}`} style={{ color: '#000000' }}>
        <div
          style={{
            padding: "2px 5px 6px 5px",
            borderLeft: `10px solid #00B1E1`,
            borderBottom: `2px solid #00B1E1`,
            margin: "0 5px 5px 0",
          }}
        >
          {this.props.event.title} - {String(this.props.event.eventDate)} - {this.props.event.eventTime}
        </div>
      </NavLink>
    );
  }
}
