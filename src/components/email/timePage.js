import { Button } from 'antd';
import { now } from 'moment';
import React from 'react';

class workWithTime extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        id: '3',
        meetTime: 'Wed Nov 11 2020 12:43:33 GMT+0300 (Москва, стандартное время)',
    };
}


    setInterval = () => {
        let nowTime =  Date.now(); 
        let meetTime =  Date.now() + 60000 //Date.parse(this.state.meetTime)
     
        let timeForTime = meetTime - nowTime;
        //минус один день
        //timeForTime = timeForTime - 86400 * 1000
        console.log(meetTime,'---', nowTime, '---', timeForTime, '---', timeForTime /1000 /60 /60 /24)
        
        fetch(`/api/time?id=${timeForTime}`)
    }



    render() {
        return <div>
            <Button type='link' block onClick={this.setInterval}>Time</Button>
        </div>;
    }
}



export default workWithTime;