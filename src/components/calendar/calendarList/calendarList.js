import React, { Component } from 'react';
import EventCard from './eventCard';

class CalendarList extends Component {
    render() {
        console.log(this.props.eventsCal)
        return (
            <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(300px, auto))',
        }}
      >
        {this.props.eventsCal &&
          this.props.eventsCal.map((event) => {
            return <EventCard event={event} />
          })}
      </div>
        );
    }
}

export default CalendarList;