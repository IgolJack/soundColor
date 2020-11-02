import React from "react";
import moment from "moment";
import { Tag, Divider } from 'antd';

class EventTimeAndDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.eventTime,
      date: props.eventDate,
      eventTimeWord: props.eventTimeWord || ' ',
      eventDateWord: props.eventDateWord || '',
    };
  }

  

  render() {
    let time = moment(this.state.time).format("HH:mm");
    let date = moment(this.state.date).format("DD MMMM YYYY");
    let eventTimeWord = "";
    let eventDateWord = ""
    

    if (this.state.eventTimeWord == true){
        eventTimeWord = "Время:";
    }
    else if (this.state.eventTimeWord){
       eventTimeWord = this.state.eventTimeWord;
    }
    
    if(this.state.eventDateWord == true){
       eventDateWord = "Дата: ";
    }
    else if (this.state.eventDateWord){
        eventDateWord = this.state.eventDateWord;
    }
    return (
      <>
            <span style={{textAlign:'right'}}>  
            <span style={{float:'left'}}>Время мероприятия</span> 
            <Tag color="cyan" style={{textAlign:'center'}}> {eventDateWord} {date}</Tag>
            <Tag color="cyan">{eventTimeWord} {time}</Tag>
            </span>
       
        
      </>
    );
  }
}

export default EventTimeAndDate;
