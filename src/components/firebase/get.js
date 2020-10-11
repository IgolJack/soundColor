import React from 'react'
import {getInfoFromFirebase} from './getInfoFromFirebase'

const HomeTeam = () => {
    const {fire, events} = getInfoFromFirebase()
   
   
   



    const fe = () => {
         fire("eventsCalendar")
         console.log('Туть >',events)
    }


	return (
    <div>
     <p>Получить данные <button onClick={fe}>ДАААААААААААААААААААААА</button></p>
    </div>
    )

}

export default HomeTeam