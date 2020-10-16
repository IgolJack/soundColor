import React from 'react'
import { db } from '../../firebase/firebase'
import EditDetails from './studentChange/EditDetails'
import { Card, Timeline, Skeleton, Typography, Popover, InputNumber, Input } from 'antd';
import { EditTwoTone } from "@ant-design/icons";
const { Paragraph } = Typography;




class InfoStudent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      student: {},
      loading: true,
      icon: true,
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

 

  outputInfo() {
    
  const contentLvl = (
    <div>
    <InputNumber style={{width:'100%'}} min={1} max={10} defaultValue={this.state.student.lvl} />
    </div>
  );
  const contentName = (
    <div>
    <Input style={{width:'100%'}} defaultValue={this.state.student.name} />
    </div>
  );
    return (
      <div>
        <Skeleton
          active
          loading={this.state.loading}
          paragraph={{ rows: 25 }}
          title={false}
        >
         
         
          <Popover content={contentName} title="Задайте имя" trigger="click">
            <span style={{ fontSize: "calc(1em + 4vw)"}}>
              {this.state.student.name}
            </span>
            <EditTwoTone />
          </Popover>
         <br/>
          <Popover content={contentLvl} title="Задайте уровень" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Уровень - {this.state.student.lvl}
            </span>
            <EditTwoTone />
          </Popover>

          <br/>
          {this.state.student.course}
          Не сданных записей Вовремя сданных
          {this.state.student.count}
          Опозданий
          {this.state.student.lateness}
          {this.state.student.responsible}
          Ответственнен Пропусков
          {this.state.student.missed}
          {this.state.student.concert}
          Концертов Опозорил
          {this.state.student.disgrace}
          {this.state.student.equipment}
          Оборудование Выписываний: {this.state.student.discharges}
          <div style={{ paddingBottom: "10px" }}>
            <Card style={{ borderRadius: "10px", padding: "20px" }}>
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>
                  Solve initial network problems 2015-09-01
                </Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>
                  Network problems being solved 2015-09-01
                </Timeline.Item>
              </Timeline>
            </Card>
          </div>
        </Skeleton>
      </div>
    );
  }

  render() {
    return (
      <div>
        <this.outputInfo />
      </div>
    )
  }
}

export default InfoStudent