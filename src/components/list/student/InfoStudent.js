import React from 'react'
import { db } from '../../firebase/firebase'
import EditDetails from './studentChange/EditDetails'
import BackToHome from "../../UI/backToHome";
import { Card, Col, Row, Timeline, Spin } from 'antd';
import { SmileTwoTone} from '@ant-design/icons';


const { Meta } = Card;
const antIcon = <SmileTwoTone style={{ fontSize: 50 }} spin />;

const centerBoxNotRound = {
  textAlign: "center",
  height: '100px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
const centerBoxLeftRound = {
  textAlign: "center",
  borderRadius: '10px 0px 0px 10px',
  height: '100px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
const centerBoxRightRound = {
  borderRadius: '0px 10px 10px 0px',
  height: '100px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}





class InfoStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      student: {},
      loading: "hidden",
      icon: "visible",
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

  getInfo(docRef) {
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data())
          return docRef.get()
        }
      })
      .then(doc => {
        const data = doc.data()
        this.setState({ student: data, loading: "visible", icon: "hidden" })
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  outputButton() {
    return (
      <BackToHome />
    )
  }

  outputInfo() {
    return (
      <div style={{ padding: '15px', visibility: `${this.state.loading}` }}>
        
        <div style={{visibility: `${this.state.icon}`, width:'100%', height: '100%', position: 'fixed', top: '0', left: '0', display:'flex', alignItems: 'center', alignContent: "center", justifyContent:'center', overflow: 'auto'}}><div><Spin indicator={antIcon} /></div></div>
        
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
          <Card style={{ borderRadius: '10px' }} >
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
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxLeftRound}>
                  <div style={centerBoxLeftRound}>1</div>
              </Card>
            </Col>
            <Col xs={8} sm={10} md={10} lg={10} xl={10} xll={10}>
              <Card style={centerBoxNotRound}>
                  Не сданных записей
              </Card>
            </Col>
            <Col xs={8} sm={10} md={10} lg={10} xl={10} xll={10}>
              <Card style={centerBoxNotRound}>
                  Вовремя сданных
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                  {this.state.student.count}
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxLeftRound}>
                  Опозданий
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                  {this.state.student.lateness}
              </Card>
            </Col>
            <Col xs={{span:4, offset: 2}} sm={{span:2, offset: 2}} md={{span:2, offset: 2}} lg={{span:2, offset: 2}} xl={{span:2, offset: 2}} xxl={{span:2, offset: 2}}>
              <Card style={centerBoxLeftRound}>
                  {this.state.student.responsible}
              </Card>
            </Col>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxRightRound}>
                  Ответственнен
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxLeftRound}>
                  Пропусков
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                  {this.state.student.missed}
              </Card>
            </Col>
            <Col xs={{span:4, offset: 2}} sm={{span:2, offset: 2}} md={{span:2, offset: 2}} lg={{span:2, offset: 2}} xl={{span:2, offset: 2}} xxl={{span:2, offset: 2}}>
              <Card style={centerBoxLeftRound}>
                  {this.state.student.concert}
              </Card>
            </Col>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxRightRound}>
                  Концертов
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxLeftRound}>
                  Опозорил
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                  {this.state.student.disgrace}
              </Card>
            </Col>
            <Col xs={{span:4, offset: 2}} sm={{span:2, offset: 2}} md={{span:2, offset: 2}} lg={{span:2, offset: 2}} xl={{span:2, offset: 2}} xxl={{span:2, offset: 2}}>
              <Card style={centerBoxLeftRound}>
                  {this.state.student.equipment}
              </Card>
            </Col>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxRightRound}>
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
          <Card style={{ borderRadius: '10px', padding: '20px' }}>
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