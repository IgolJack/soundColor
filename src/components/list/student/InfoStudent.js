import React from 'react'
import { db } from '../../firebase/firebase'
import EditDetails from './studentChange/EditDetails'
import BackToHome from "../../UI/backToHome";

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
     <BackToHome/>
    )
  }

  outputInfo(){
    return(
      <div>
          <EditDetails
            name={this.state.name}
            lvl={this.state.lvl}
            missed={this.state.missed}
            id={this.state.id}
            course={this.state.course}
            componentDidMount={this.componentDidMount}
            outputInfo={this.outputInfo}
          />
          <h1>{this.state.name}</h1>
          <p>{this.state.course}</p>
          <p>Уровень - {this.state.lvl}</p>
          <p>Пропусков - {this.state.missed}</p>
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