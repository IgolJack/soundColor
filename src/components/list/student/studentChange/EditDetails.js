import React, { Component } from 'react';
import { db } from '../../../firebase/firebase'
import { Card, Col, Row, Skeleton, Input, Select, Form, Button, message, Popconfirm } from 'antd';

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 0 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
};
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
const { Option } = Select

const EditDetails = (props) => {
    const [form] = Form.useForm()

    let name = ''
    let lateness = '0'
    let lvl = '0'
    let missed = '0'
    let disgrace = '0'
    let responsible = '0'
    let concert = '0'
    let equipment = '0'
    let discharges = '0'
    let count = '0'
    let course = 'Первый курс'

    let student = props.student
    console.log(student.name)

    const handleSubmit = () => {
        db.collection('students')
            .doc(`${student.id}`)
            .set({
                name: (form.getFieldValue("name")),
                lateness: (form.getFieldValue("lateness")),
                lvl: (form.getFieldValue("lvl")),
                missed: (form.getFieldValue("missed")),
                disgrace: (form.getFieldValue("disgrace")),
                responsible: (form.getFieldValue("responsible")),
                concert: (form.getFieldValue("concert")),
                equipment: (form.getFieldValue("equipment")),
                count: (form.getFieldValue("count")),
                course: (form.getFieldValue("course")),
                discharges: (form.getFieldValue("discharges")),
                uid: student.uid,
                id: student.id,
            })
            .then(function () {
                succes()
            }
            )
            .catch(function (error) {
                errorRed(error)
            })
        props.updateOpen()
    }

    const succes = () => {
        message.success('Данные обновлены!', 2);
    };
    const errorRed = (error) => {
        message.error(String(error));
    };

    function confirm() {
        props.updateOpen()
      }
      

    return (
        <div style={{ padding: '15px' }}>

            <Popconfirm
                title="Вы действительно хотите сейчас выйти?"
                onConfirm={confirm}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" block>Назад</Button>
            </Popconfirm>

            <Form
                form={form}
                layout="auto"
                size="large"
                {...layout}
                name="basic"
                onFinish={handleSubmit}
            >

                <Form.Item>
                    <Button type="primary" block htmlType="submit">Сохранить</Button>
                </Form.Item>

                <div style={{ paddingTop: '10px', paddingBottom: '10px',  }}>
                    <Card style={{ borderRadius: '10px', textAlign: "center", display: "flex",
                            alignItems: "center",
                            justifyContent: "center"}} >
                        <Form.Item
                            type="text"
                            name="name"
                            value={name}
                            style={{ display: "flex",
                            alignItems: "center",
                            justifyContent: "center",}}
                        >
                            
                                <Input name="name" defaultValue={student.name} size="default"/>
                            
                            
                        </Form.Item>
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
                                <Form.Item
                                    type="number"
                                    name="lvl"
                                    value={lvl}
                                >
                                    <Input name="lvl" defaultValue={student.lvl} />
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div style={{ width: '60%', paddingBottom: '10px' }}>
                    <Row>
                        <Col flex={10}>
                            <Card style={{ textAlign: "center", borderRadius: '10px 10px 10px 10px' }}>
                                <Form.Item
                                    type="text"
                                    name="course"
                                    value={course}
                                >
                                    <Select
                                        name="course"
                                        defaultValue={student.course}
                                    >
                                        <Option value="Первый курс">Первый курс</Option>
                                        <Option value="Второй курс">Второй курс</Option>
                                        <Option value="Третий курс">Третий курс</Option>
                                        <Option value="Четвертый курс">Четвертый курс</Option>
                                        <Option value="Пятый курс">Пятый курс</Option>

                                    </Select>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div style={{ paddingBottom: '10px' }}>
                    <Row>
                        <Col xs={4} sm={2} md={2} lg={2} xl={2} xxl={2}>
                            <Card style={centerBoxLeftRound}>
                                <div style={centerBoxLeftRound}>
                                    <Form.Item
                                        type="number"
                                        name="course"
                                    >
                                        1
            </Form.Item>
                                </div>
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
                                <Form.Item
                                    type="number"
                                    name="count"
                                    value={count}
                                >
                                    <Input name="count" defaultValue={student.count} />
                                </Form.Item>
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
                                <Form.Item
                                    type="number"
                                    name="lateness"
                                    value={lateness}
                                >
                                    <Input name="lateness" defaultValue={student.lateness} />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col xs={{ span: 4, offset: 2 }} sm={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }} lg={{ span: 2, offset: 2 }} xl={{ span: 2, offset: 2 }} xxl={{ span: 2, offset: 2 }}>
                            <Card style={centerBoxLeftRound}>
                                <Form.Item
                                    type="number"
                                    name="responsible"
                                    value={responsible}
                                >
                                    <Input name="responsible" defaultValue={student.responsible} />
                                </Form.Item>
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
                                <Form.Item
                                    type="number"
                                    name="missed"
                                    value={missed}
                                >
                                    <Input name="missed" defaultValue={student.missed} />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col xs={{ span: 4, offset: 2 }} sm={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }} lg={{ span: 2, offset: 2 }} xl={{ span: 2, offset: 2 }} xxl={{ span: 2, offset: 2 }}>
                            <Card style={centerBoxLeftRound}>
                                <Form.Item
                                    type="number"
                                    name="concert"
                                    value={concert}
                                >
                                    <Input name="concert" defaultValue={student.concert} />
                                </Form.Item>
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
                                <Form.Item
                                    type="number"
                                    name="disgrace"
                                    value={disgrace}
                                >
                                    <Input name="disgrace" defaultValue={student.disgrace} />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col xs={{ span: 4, offset: 2 }} sm={{ span: 2, offset: 2 }} md={{ span: 2, offset: 2 }} lg={{ span: 2, offset: 2 }} xl={{ span: 2, offset: 2 }} xxl={{ span: 2, offset: 2 }}>
                            <Card style={centerBoxLeftRound}>
                                <Form.Item
                                    type="number"
                                    name="equipment"
                                    value={equipment}
                                >
                                    <Input name="equipment" defaultValue={student.equipment} />
                                </Form.Item>
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
                                Выписываний:
                    <Form.Item
                                    type="number"
                                    name="discharges"
                                    value={discharges}
                                >
                                    <Input name="discharges" defaultValue={student.discharges} />
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </Form>
        </div>
    );
}

export default EditDetails;