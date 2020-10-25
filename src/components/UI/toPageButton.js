import React from 'react';
import {Button} from 'antd'
import { NavLink } from "react-router-dom";


const ToPageButton = (props) => {
const page = props.toPage
const label = props.Label
 
        return  (  
        <NavLink to={page}>
        <Button
          size="large"
          type="primary"
          block
        >
       {label}
        </Button>
      </NavLink>
      
      )
    
}


export default ToPageButton;