import React, { useState } from 'react';
import { Checkbox } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const  courses = [
    {
        "_id": 1,
        "name": "Первый курс"
    },
    {
        "_id": 2,
        "name": "Второй курс"
    },
    {
        "_id": 3,
        "name": "Третий курс"
    },
    {
        "_id": 4,
        "name": "Четвертый курс"
    },
    {
        "_id": 5,
        "name": "Пятый курс"
    }
]



function CheckBox(props) {
    
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value)
        const newChecked = [...Checked]

        if(currentIndex === -1){
            newChecked.push(value)
        }  else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    
    
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Курс</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {courses.map((value, index) => (
                            <React.Fragment key={index}>
                                <Checkbox
                                    onChange={()=>handleToggle(value._id)}
                                    type="checkbox"
                                    checked={Checked.indexOf(value._id) === -1 ? false : true}
                                />
                                <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </React.Fragment>
                        ))}
                    </Typography>
                </AccordionDetails>

            </Accordion>
        </div>
    );
}

export default CheckBox;