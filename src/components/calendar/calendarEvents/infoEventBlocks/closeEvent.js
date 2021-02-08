import React from "react";
import { Skeleton, Select, Tag, Button } from "antd";
class CloseEvent extends React.Component {
 state = {
      members: this.props.members,
      ne: [],
    };
  
createPe = () => {
    var ne = []
    this.props.members.forEach(member => {
        if(member.senior == true){
            ne.push(
            <p>{member.name} - ответственный</p>, <Button type="text" size='small'>Default</Button>  )
        }
        else {
            ne.push(<p>{member.name}</p> )
        }
    });
    this.setState({ne: ne})
}



  render() {
   

    
    return (
      <>
        <Button
              onClick={() => {
                console.log(this.props.members);
                this.createPe()
              }}
            >
              Завершить!
        </Button>

        {this.state.ne}
      </>
    );
  }
}

export default CloseEvent;
