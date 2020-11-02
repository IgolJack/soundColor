import React from "react";
import moment from "moment";
import { Tag, Divider } from 'antd';

class MeetTimeAndDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.meetTime,
      date: props.meetDate,
      meetTimeWord: props.meetTimeWord || ' ',
      meetDateWord: props.meetDateWord || '',
    };
  }

  

  render() {
    let time = moment(this.state.time).format("HH:mm");
    let date = moment(this.state.date).format("DD MMMM YYYY");
    let meetTimeWord = "";
    let meetDateWord = ""
    

    if (this.state.meetTimeWord == true){
        meetTimeWord = "Время:";
    }
    else if (this.state.meetTimeWord){
        meetTimeWord = this.state.meetTimeWord;
    }
    
    if(this.state.meetDateWord == true){
        meetDateWord = "Дата: ";
    }
    else if (this.state.meetDateWord){
        meetDateWord = this.state.meetDateWord;
    }
    return (
      <>
            <span style={{textAlign:'right'}}>  
            <span style={{float:'left'}}>Время сбора</span> 
            <Tag color="red" style={{textAlign:'center'}}> {meetDateWord} {date}</Tag>
            <Tag color="red">{meetTimeWord} {time}</Tag>
            </span>
       
        
      </>
    );
  }
}

export default MeetTimeAndDate;
