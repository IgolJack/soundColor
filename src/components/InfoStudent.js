import React from 'react'

import { db, auth } from './services/firebase'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import EditDetails from './EditDetails'

class InfoStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      lvl: 0,
      missed: 0,
      id: "",
      course: "Первый курс"
    }



    this.componentDidMount = this.componentDidMount.bind(this)
    this.outputInfo = this.outputInfo.bind(this)
  }
  
  
  componentDidMount() {
    const { match: { params } } = this.props
    const { studentId } = params
    
    this.setState({ id: studentId })
    var docRef = db.collection('students').doc(studentId)

    this.getInfo(docRef)    
  }

  getInfo(docRef){
    docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data())
        return docRef.get()
      }
    })
    .then( doc => {
      const data=doc.data()
      this.setState({
        name: data.name,
        lvl: data.lvl,
        missed: data.missed,
        course: data.course,
      })
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

  outputInfo(){
    return(
      <div>
        <div style={{ float: "right" }}>
          <EditDetails
            name={this.state.name}
            lvl={this.state.lvl}
            missed={this.state.missed}
            id={this.state.id}
            course={this.state.course}
            componentDidMount={this.componentDidMount}
            outputInfo={this.outputInfo}
          />
        </div>
        <div style={{ paddingLeft: 48, marginTop: 21, marginBottom: 10 }}>
          <h4 >
            {this.state.name}

          </h4>
        </div>
        <div>
          <p>{this.state.course}</p>
        </div>
        <div>
          <p>Уровень - {this.state.lvl}</p>
        </div>
        <div>
          <p>Пропусков - {this.state.missed}</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <this.outputInfo />
        <this.outputButton />
      </div>
    )
  }

}

export default InfoStudent