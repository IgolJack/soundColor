import React from 'react'
import { db, auth } from './services/firebase'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'



class InfoStudent extends React.Component {

  state = {
    person: null,
    
  }
  
  componentDidMount() {
    const { match: { params } } = this.props
    const { studentId } = params
    
    var docRef = db.collection('students').doc(studentId)

    docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data())
        return docRef.get()
      }
    })
    .then( doc => {
      const person = []
      person.push(doc.data())               
      this.setState({ person: person })
      console.log(person)
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  outputButton() {
    return (
      <div>
        <div style={{ margin: 12 }}>
          <Button variant="contained">
            <NavLink to="/list">Вернуться к списку студентов</NavLink>
          </Button>
        </div>
        <div style={{ margin: 12 }}>
          <Button variant="contained">
            <NavLink to="/">Вернуться на главную страницу</NavLink>
          </Button>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.props)
    const { match: { params } } = this.props;
    const { studentId } = params
    console.log(studentId) 

    return (
      <div>
        Работает! ({studentId})
        {
          this.state.person &&
          this.state.person.map(person => {
            //console.log(person.name)
            return (
              <div>
                <div>
                  <h4>
                    {person.name}
                  </h4>
                </div>
                <div>
                  <p>Уровень - {person.lvl}</p>
                </div>
                <div>
                  <p>Пропусков - {person.missed}</p>
                </div>
              </div>
            )
          })
        }
        <this.outputButton />
      </div>
    )
  }
}



export default InfoStudent