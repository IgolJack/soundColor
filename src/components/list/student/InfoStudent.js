import React from 'react'
import { db } from '../../firebase/firebase'
import EditDetails from './studentChange/EditDetails'
import BackToHome from "../../UI/backToHome";
import { Card, Col, Row, Timeline, Skeleton } from 'antd';

const { Meta } = Card;
const { Grid } = Card;

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
      loading: true
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
        this.setState({ student: data, loading: !this.state.loading })
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
          <Card style={{ borderRadius: '10px' }} >
            <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
              <Meta
                title={this.state.student.name}
                style={{ textAlign: "center" }}
              />
            </Skeleton>
          </Card>
        </div>

        <div style={{ width: '60%', paddingBottom: '10px' }}>
          <Row>
            <Col flex={8}>
              <Card style={{ textAlign: "center", borderRadius: '10px 0px 0px 10px' }}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Уровень
               </Skeleton>
              </Card>
            </Col>
            <Col flex={2}>
              <Card style={{ textAlign: "center", borderRadius: '0px 10px 10px 0px' }}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.lvl}
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ width: '60%', paddingBottom: '10px' }}>
          <Row>
            <Col flex={10}>
              <Card style={{ textAlign: "center", borderRadius: '10px 10px 10px 10px' }}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.course}
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxLeftRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  1
               </Skeleton>
              </Card>
            </Col>
            <Col xs={8} sm={10} md={10} lg={10} xl={10} xll={10}>
              <Card style={centerBoxNotRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Не сданных записей
               </Skeleton>
              </Card>
            </Col>
            <Col xs={8} sm={10} md={10} lg={10} xl={10} xll={10}>
              <Card style={centerBoxNotRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Вовремя сданных
               </Skeleton>
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.count}
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxLeftRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Опозданий
               </Skeleton>
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.lateness}
                </Skeleton>
              </Card>
            </Col>
            <Col xs={{span:4, offset: 2}} sm={{span:2, offset: 2}} md={{span:2, offset: 2}} lg={{span:2, offset: 2}} xl={{span:2, offset: 2}} xxl={{span:2, offset: 2}}>
              <Card style={centerBoxLeftRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.responsible}
                </Skeleton>
              </Card>
            </Col>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxRightRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Ответственнен
               </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxLeftRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Пропусков
               </Skeleton>
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.missed}
                </Skeleton>
              </Card>
            </Col>
            <Col xs={{span:4, offset: 2}} sm={{span:2, offset: 2}} md={{span:2, offset: 2}} lg={{span:2, offset: 2}} xl={{span:2, offset: 2}} xxl={{span:2, offset: 2}}>
              <Card style={centerBoxLeftRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.concert}
                </Skeleton>
              </Card>
            </Col>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxRightRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Концертов
               </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxLeftRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Опозорил
               </Skeleton>
              </Card>
            </Col>
            <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
              <Card style={centerBoxRightRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.disgrace}
                </Skeleton>
              </Card>
            </Col>
            <Col xs={{span:4, offset: 2}} sm={{span:2, offset: 2}} md={{span:2, offset: 2}} lg={{span:2, offset: 2}} xl={{span:2, offset: 2}} xxl={{span:2, offset: 2}}>
              <Card style={centerBoxLeftRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  {this.state.student.equipment}
                </Skeleton>
              </Card>
            </Col>
            <Col xs={7} sm={9} md={9} lg={9} xl={9} xll={9}>
              <Card style={centerBoxRightRound}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Оборудование
               </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Row>
            <Col flex={10}>
              <Card style={{ textAlign: "center", borderRadius: '10px' }}>
                <Skeleton active round loading={this.state.loading} paragraph={{ rows: 1, width: '100%' }} title={false}>
                  Выписываний: {this.state.student.discharges}
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{ paddingBottom: '10px' }}>
          <Card style={{ borderRadius: '10px', padding: '20px' }}>
            <Skeleton active round loading={this.state.loading} paragraph={{ rows: 10, width: '100%' }} title={false}>
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              </Timeline>
            </Skeleton>

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