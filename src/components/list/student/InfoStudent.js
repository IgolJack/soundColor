import React from 'react'
import { db } from '../../firebase/firebase'
import EditDetails from './studentChange/EditDetails'
import { Card, Timeline, Skeleton, Popover, Input, Select, message } from 'antd';
import { EditTwoTone } from "@ant-design/icons";





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
    <Input type="number" style={{width:'100%'}} min={1} max={10} defaultValue={this.state.student.lvl} />
    </div>
  );
  const contentName = (
    <div>
    <Input style={{width:'100%'}} defaultValue={this.state.student.name} />
    </div>
  );
  const contentCourse = (
    <div>
       <Select style={{width:'100%'}} defaultValue={this.state.student.course}>  
          <option value="Первый курс">Первый курс</option>
          <option value="Второй курс">Второй курс</option>
          <option value="Третий курс">Третий курс</option>
          <option value="Четвертый курс">Четвертый курс</option>
          <option value="Пятый курс">Пятый курс</option>
          </Select>
    </div>
  )
  const contentLateness = (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.lateness} />
    </div>
  )
  const contentMissed = (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.missed} />
    </div>
  )
  const contentDisgrace = (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.disgrace} />
    </div>
  )
  const contentResponsible = (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.responsible} />
    </div>
  )
  const contentConcert= (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.concert} />
    </div>
  )
  
    const contentEquipment= (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.equipment} />
    </div>
  )
  const contentDischarges= (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.discharges} />
    </div>
  )
   const contentСount= (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.count} />
    </div>
  )
    const contentExchange = (
    <div>
      <Input type="number" style={{width:'100%'}} min={0} defaultValue={this.state.student.exchange} onChange={this.Edit}/>
    </div>
   
  )

//   const Edit = (par) => {
//     let nameOfValue =  par.replace('this.state.student.', '')
//     console.log(nameOfValue)
//     db.collection('students')
//         .doc(`${this.state.student.id}`)
//         .set(
//         `${nameOfValue}: ${par}`
//         )
//         .then(function () {
//           message.success('Значение записано!');
//         })
//         .catch(function (error) {
//           console.log("Error getting document:", error);
//         })  
// }


  
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
          <Popover content={contentCourse} title="Задайте курс" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             {this.state.student.course}
            </span>
            <EditTwoTone />
          </Popover>
          <br/>
          <Popover content={contentLateness} title="Задайте количество опазданий" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Опазданий - {this.state.student.lateness}
            </span>
            <EditTwoTone />
          </Popover>
          <br/>
          <Popover content={contentMissed} title="Задайте количество пропусков" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Пропусков - {this.state.student.missed}
            </span>
            <EditTwoTone />
          </Popover>
          <br/>
          <Popover content={contentDisgrace} title="Задайте количество позора" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Опозорил - {this.state.student.disgrace}
            </span>
            <EditTwoTone />
          </Popover>
          <br/>
          <Popover content={contentResponsible} title="Задайте количество ответсвтенности" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Ответсвтенн - {this.state.student.responsible}
            </span>
            <EditTwoTone />
          </Popover>
          <br/>
          <Popover content={contentConcert} title="Задайте кол-во песещённых мероприятий" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Мероприятий - {this.state.student.concert}
            </span>
            <EditTwoTone />
          </Popover>
          <br/>
          <Popover content={contentEquipment} title="Раз принесено свое оборудование" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Оборудование - {this.state.student.equipment}
            </span>
            <EditTwoTone />
          </Popover>
          <br/>
          <Popover content={contentDischarges} title="Выписывания" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Выписываний - {this.state.student.discharges}
            </span>
            <EditTwoTone />
          </Popover>
        <br/>
          <Popover content={contentСount} title="Выписывания" trigger="click">
            <span style={{ fontSize: "calc(1em + 3vw)"}}>
            Записей сдано - {this.state.student.count}
            </span>
            <EditTwoTone />
          </Popover>

      <br/>
            <Popover content={contentExchange} title="Замен" trigger="click">
              <span style={{ fontSize: "calc(1em + 3vw)"}}>
             Замен - {this.state.student.exchange}
              </span>
              <EditTwoTone />
            </Popover>

        
    
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