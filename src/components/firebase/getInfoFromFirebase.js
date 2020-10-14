import React, { useEffect, useState } from "react";
import {db} from "../firebase/firebase";


const getInfoFromFirebase = () => {
    const [events, setEvents] = useState([])
    const fire = (col) => {
        events.length = 0
        db.collection(String(col))
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                events.push(data)
            })
            setEvents(events)
            console.log(events)
        })
    }
	return {fire, events}
}

export { getInfoFromFirebase }

