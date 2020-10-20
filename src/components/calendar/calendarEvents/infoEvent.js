import React from 'react'
import {db} from '../../firebase/firebase'
import {Button} from "react-bootstrap";
import * as firebase from "firebase";
import { Card, Col, Row, Skeleton, Collapse, Tag, Divider } from 'antd';


const { Meta } = Card;
const { Panel } = Collapse;

export default class InfoEvent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            event: {},
            loading: true,
            cast: [],
            equipment: [],
            equipGroup: [],
            
        }
    this.addUserToEvent = this.addUserToEvent.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
}


componentDidMount() {
    const { match: { params } } = this.props
    const { eventId } = params

    this.setState({ id: eventId })
    const docRef = db.collection('eventsCalendar').doc(eventId);
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
                const data = doc.data()

                let strings = []
                let resultGroup = []
                let equip = []
                if (data.equipment !== undefined) {
                    
                    for (let index = 0; index < data.equipment.length; index++) {
                        strings.push(data.equipment[index]['equipGroup'])
                    }
                    for (let str of strings) {
                        if (!resultGroup.includes(str)) {
                            resultGroup.push(str);
                        }
                    }

                    for (let index = 0; index < resultGroup.length; index++) {
                        equip[index] = {
                            equipGroup: resultGroup[index],
                            groupChildren: []
                        }
                        for (let i = 0; i < data.equipment.length; i++) {
                            if (data.equipment[i]['equipGroup'] === resultGroup[index]) {
                                equip[index]['groupChildren'].push({
                                    equipType: data.equipment[i]['equipType'],
                                    quantity: data.equipment[i]['quantity'],
                                })
                            }
                        }
                    }
                }
                
                this.setState({
                    event: data,
                    loading: !this.state.loading,
                    cast: data.cast,
                    equipGroup: resultGroup,
                    equipment: equip,
                })
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }

addUserToEvent(){

    let uid = firebase.auth().currentUser.uid 
    let nowMember = this.state.event.members
    let someDupl = false;
    
    nowMember.forEach(function(entry) {
    if(uid == entry){
        console.log(entry, '=', uid)
        someDupl = true
    }
});


    nowMember.push(uid)
    console.log('Nowmember', nowMember)
    console.log('Уникальный идентификатор пользователя - ' + uid)
    
    if(someDupl == false) {
        db.collection('eventsCalendar')
        .doc(this.state.event.id)
        .update({
            members: nowMember
        })
    }else {console.log('Одинаковые')}

 }



    render() {
        return (
            <div style={{ padding: '15px' }}>
                <Skeleton active loading={this.state.loading} paragraph={{ rows: 25 }} title={false}>

                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Card style={{ borderRadius: '10px' }} >
                            <Meta
                                title={`${this.state.event.typeOfEvent}: ${this.state.event.title}`}
                                style={{ textAlign: "center" }}
                            />
                        </Card>
                    </div>

                    <div style={{ paddingBottom: '10px' }}>
                        <Row>
                            <Col xs={9} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Card style={{ borderRadius: '10px', textAlign: "center" }}>
                                    Стейдж-план: опвопшвыщацушк
                </Card>
                            </Col>
                            <Col xs={{ span: 9, offset: 6 }} sm={{ span: 10, offset: 4 }} md={{ span: 10, offset: 4 }} lg={{ span: 10, offset: 4 }} xl={{ span: 10, offset: 4 }} xll={{ span: 10, offset: 4 }}>
                                <Card style={{ borderRadius: '10px', textAlign: "center" }}>
                                    Форма одежды: {this.state.event.cloth}
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <div style={{ paddingBottom: '10px' }}>
                        <Collapse expandIconPosition='right' style={{ borderRadius: '10px' }}>
                            <Panel header="Состав исполнителей" key="1" style={{ borderRadius: '10px' }}>
                                {this.state.cast.map(cast => (
                                    <Tag color="magenta">{cast}</Tag>
                                ))}
                            </Panel>
                        </Collapse>
                    </div>

                    <div style={{ paddingBottom: '10px' }}>
                        <Card style={{ borderRadius: '10px' }}>
                            <Card style={{ borderRadius: '10px', marginBottom: '10px' }}>
                                <Row>
                                    <Col xs={9} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                        <Card title="Дата/время сбора" style={{ borderRadius: '10px', marginBottom: '10px' }}>
                                            {this.state.event.meetDate}, {this.state.event.meetTime}
                                        </Card>
                                    </Col>
                                    <Col xs={{ span: 14, offset: 1 }} sm={{ span: 12, offset: 2 }} md={{ span: 12, offset: 2 }} lg={{ span: 12, offset: 2 }} xl={{ span: 12, offset: 2 }} xxl={{ span: 12, offset: 2 }}>
                                        <Card title="Место сбора" style={{ borderRadius: '10px', marginBottom: '10px' }}>
                                            {this.state.event.meetPlace}
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                            <Card style={{ borderRadius: '10px' }}>
                                <Row>
                                    <Col xs={9} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                        <Card title="Дата/время начала мероприятия" style={{ borderRadius: '10px', marginBottom: '10px' }}>
                                            {this.state.event.eventDate}, {this.state.event.eventTime}
                                        </Card>
                                    </Col>
                                    <Col xs={{ span: 14, offset: 1 }} sm={{ span: 12, offset: 2 }} md={{ span: 12, offset: 2 }} lg={{ span: 12, offset: 2 }} xl={{ span: 12, offset: 2 }} xxl={{ span: 12, offset: 2 }}>
                                        <Card title="Место проведения мероприятия" style={{ borderRadius: '10px', marginBottom: '10px' }}>
                                            {this.state.event.eventPlace}
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                    </div>

                    <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Card style={{ borderRadius: '10px' }} >
                            Описание: {this.state.event.description}
                        </Card>
                    </div>

                    <div style={{ paddingBottom: '10px' }}>
                        <Collapse expandIconPosition='right' style={{ borderRadius: '10px' }}>
                            <Panel header="Студенты" key="2" extra={'2/5'} style={{ borderRadius: '10px' }}>
                                <Button block shape="round" type="primary" onClick={this.addUserToEvent}>Принять участие</Button>
                            </Panel>
                        </Collapse>
                    </div>

                    <div style={{ paddingBottom: '10px' }}>
                        <Collapse expandIconPosition='right' style={{ borderRadius: '10px' }}>
                            <Panel header="Оборудование" key="3" style={{ borderRadius: '10px' }}>
                                {this.state.equipment && this.state.equipment.map(equip => {
                                    return (
                                        <div>
                                            <Divider orientation="left">{equip.equipGroup}</Divider>
                                            {equip.groupChildren && equip.groupChildren.map(child => (
                                                <p>{child.equipType}: {child.quantity}</p>
                                            ))}
                                        </div>
                                    )
                                })}
                            </Panel>
                        </Collapse>
                    </div>
                </Skeleton>
            </div>
        )
    }
}