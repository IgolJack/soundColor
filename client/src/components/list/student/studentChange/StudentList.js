import React, { Component } from "react";
import StudentListCard from './StudentListCard'

var bgColors = {
    "Default": "#81b71a",
    "Blue": "#00B1E1",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
}

var colorPick = bgColors.Blue

class StudentList extends Component {
          
    render() {
        let filteredStidents
        if (this.props.searchStudent === "") {
            filteredStidents = this.props.students && this.props.students.filter(item => {
                for (var key in this.props.filterName) {
                    if (key === "missed" && this.props.filterName[key] === 0 && item[key] !== this.props.filterName[key]) {
                        return false
                    }
                    if (key === "missed" && item[key] < this.props.filterName[key]) {
                        return false
                    }
                    if (key !== "missed" && (item[key] === undefined || item[key] !== this.props.filterName[key])) {
                        return false
                    }
                }
                return true
            });
        }
        else {
            filteredStidents = this.props.students && this.props.students.filter(student => {
                return student.name.toLowerCase().includes(this.props.searchStudent.toLowerCase())
            })
        }
        
        
        

        
        return (
            <div>
                {
                   filteredStidents &&
                   filteredStidents.map(student => {
                        colorPick = '#000000'

                        // eslint-disable-next-line
                        if (student.lvl == 1) {
                            colorPick = bgColors.Red
                        }
                        // eslint-disable-next-line
                        if (student.lvl == 2) {
                            colorPick = bgColors.Yellow
                        }
                        // eslint-disable-next-line
                        if (student.lvl == 3) {
                            colorPick = bgColors.Cyan
                        }

                        return (
                           
                          
                               <StudentListCard
                               student={student}
                               colorPick={colorPick}
                                /> 
                              
                            
                       )
                   })
                }

            </div>
        );
    }
}



 


export default StudentList;
