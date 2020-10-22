import { Button } from "antd";
import React from "react";

import { GetInformation, students } from "../abstract/universalFirebase";

class deletePageTrigger extends React.Component {
  Get = () => {
    GetInformation();
    console.log(students);
    
  };
 
  

  render() {
  
    return (
      <div>
        <Button onClick={this.Get}>Click</Button>

      </div>
    );
  }
}

export default deletePageTrigger;
