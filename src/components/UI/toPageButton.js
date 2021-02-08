import React from 'react';
import {Button} from 'antd'
import { NavLink } from "react-router-dom";


const ToPageButton = (props) => {
const page = props.toPage
const label = props.Label
const size = props.size || "large"
const type = props.type || "primary"
        return  (  
        <NavLink to={page}>
        <Button
          size={size}
          type={type}
          block

        >
       {label}
        </Button>
      </NavLink>
      
      )
    
}


export default ToPageButton;