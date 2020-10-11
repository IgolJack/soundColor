
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
           
            console.log('Там >',events)
        })
        
    }

	return {fire, events}
}

export { getInfoFromFirebase }