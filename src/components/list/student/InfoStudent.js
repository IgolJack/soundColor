import React from 'react'
import { db } from '../../firebase/firebase'
import EditDetails from './studentChange/EditDetails'
import BackToHome from "../../UI/backToHome";
import { Card, Col, Row, Timeline } from 'antd';

const { Meta } = Card;
const { Grid } = Card;



class InfoStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      student: {},
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
      this.setState({ student: data })
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
      <div style={{ padding: '15px' }}>
          <EditDetails
            name={this.state.name}
            lvl={this.state.lvl}
            missed={this.state.missed}
            id={this.state.id}
            course={this.state.course}
            componentDidMount={this.componentDidMount}
            outputInfo={this.outputInfo}
          />

        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <Card style={{ borderRadius: '10px' }}>
            <Meta
              title={this.state.student.name}
              style={{ textAlign: "center" }}
            />
          </Card>
        </div>

        <div style={{ width: '60%', paddingBottom: '10px' }}>
          <Row>
            <Col flex={8}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                Уровень
            </Card>
            </Col>
            <Col flex={2}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                {this.state.student.lvl}
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ width: '60%', paddingBottom: '10px' }}>
          <Row>
            <Col flex={10}>
              <Card style={{ textAlign: "center", borderRadius: '10px 10px 10px 10px' }}>
                {this.state.student.course}
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col flex={1}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                1
            </Card>
            </Col>
            <Col flex={4}>
              <Card style={{ textAlign: "center" }}>
                Не сданных записей
              </Card>
            </Col>
            <Col flex={4}>
              <Card style={{ textAlign: "center" }}>
                Вовремя сданных
              </Card>
            </Col>
            <Col flex={1}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                {this.state.student.count}
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col flex={4}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                Опозданий
            </Card>
            </Col>
            <Col flex={1}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                {this.state.student.lateness}
              </Card>
            </Col>
            <Col flex={1} offset={1}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                {this.state.student.responsible}
              </Card>
            </Col>
            <Col flex={4}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                Ответственнен
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col flex={4}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                Пропусков
            </Card>
            </Col>
            <Col flex={1}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                {this.state.student.missed}
              </Card>
            </Col>
            <Col flex={1} offset={1}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                {this.state.student.concert}
              </Card>
            </Col>
            <Col flex={4}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                Концертов
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col flex={4}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                Опозорил
            </Card>
            </Col>
            <Col flex={1}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                {this.state.student.disgrace}
              </Card>
            </Col>
            <Col flex={1} offset={1}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                {this.state.student.equipment}
              </Card>
            </Col>
            <Col flex={4}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                Оборудование
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col flex={10}>
              <Card style={{ textAlign: "center", borderRadius: '10px' }}>
                Выписываний: {this.state.student.discharges}
            </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Card style={{ borderRadius: '10px' }}>
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
          </Card>
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