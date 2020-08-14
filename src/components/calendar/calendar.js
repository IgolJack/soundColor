import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function clickEvent(info) {
    let eventObj = info.event;
    if (eventObj.url) {
        alert(
            'Clicked ' + eventObj.title + '.\n' +
            'Will open ' + eventObj.url + ' in a new tab'
        );
        window.open(eventObj.url);
        info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
    } else {
        alert('Clicked ' + eventObj.title);
    }
}

class Calendar extends React.Component {
    render() {

        return (

            //React https://fullcalendar.io/docs/react
            //Документация - https://fullcalendar.io/docs#toc.
            //Важно - https://fullcalendar.io/docs/event-source-object

            <FullCalendar
                plugins={[ dayGridPlugin ]}
                eventClick={clickEvent}
                initialView="dayGridMonth"
                events={[
                    {
                        id: 'a',
                        title: 'event 1',
                        date: '2020-08-16',
                        backgroundColor: 'red',
                        borderColor: 'white'

                    },
                    {
                        id: 'b',
                        title: 'event 2',
                        date: '2020-08-17'

                    },
                    {
                        id: 'c',
                        title: 'event 3',
                        date: '2020-08-17',
                        backgroundColor: 'yellow',
                        textColor: "black"

                    },
                    {
                        id: 'c',
                        title: 'event 3',
                        date: '2020-08-17',
                        backgroundColor: 'black',
                        textColor: "white"
                    },
                ]
                }
                color='yellow'
            />
        )
    }
}

export default Calendar