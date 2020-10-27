import {  useState } from "react";
import {db} from "./firebase";


const getInfoFromFirebase = () => {
    const [events, setEvents] = useState([])
    const fire = (col) => {
        events.length = 0
        let lastId = 0
        db.collection(String(col))
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                data.id = Number(data.id)
                if (lastId < data.id) {
                    lastId = data.id
                }
                events.push(data)
            })
            setEvents(events)
            localStorage.setItem('EventLastId', lastId)

            console.log(events)
        })
    }
	return {fire, events}
}

export { getInfoFromFirebase }
