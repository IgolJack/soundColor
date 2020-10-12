
import {db} from "../firebase/firebase";

const getInfoFromFirebase = () => {
    const events = []
    const fire = (col) => {
        events.length = 0
        db.collection(String(col))
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                events.push(data)
            })
        })

        events.map(event => { 
            events.push ({ 
              id: event.id,
              start: new Date(event.start),
              end:new Date(event.end), 
              title: event.title, 
              }) 
            })
            
    }

	return {fire, events}
}

export { getInfoFromFirebase }