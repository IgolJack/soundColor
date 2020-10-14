import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Form, Input, Button, DatePicker, Row, Col, Select, TimePicker, Radio } from 'antd';
import Equipment from "./equipment";
import StagePlan from "./stagePlan";



const { TextArea } = Input;
const { Option } = Select;
const { Group } = Radio;
const OptionSel = Select.Option;

const radio = [
    { label: 'Свободная', value: 'Свободная' },
    { label: 'Парадная', value: 'Парадная' },
]


function useEquipment() {
    const [equip, setEquip] = useState([])
    useEffect(() => {
        db.collection('equipment').doc('equip')
            .get()
            .then(doc => {
                const data = doc.data()
                setEquip(data) 
                console.log(equip)
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }, [])

    return equip
}

const CalendarNewEvent = () => {
    const [form] = Form.useForm()

    let title = ''
    let meetDate = ''
    let meetTime = ''
    let meetPlace = ''
    let description = ''
    let lastId = localStorage.getItem('EventLastId')
    let typeOfEvent = ''
    
    let eventDate = ''
    let eventTime = ''
    let eventPlace = ''
    let cast = []
    let equipment = useEquipment()
    let equipGroup = []

    const [cloth, setCloth] = useState('Свободная')
    console.log(cloth)
    let children = []
    for (let i = 10; i < 36; i++) {
        children.push(<OptionSel key={i.toString(36) + i}>{i.toString(36) + i}</OptionSel>);
    }

    const addNewEvent = () => {
        localStorage.setItem('lastId', Number(lastId) + 1)
        let id = localStorage.getItem('lastId')
        let name = id
        db.collection('eventsCalendar')
            .doc(name)
            .set({
                id: id,
                title: form.getFieldValue("title"),
                meetDate: form.getFieldValue("meetDate"),
                meetTime: form.getFieldValue("meetTime"),
                meetPlace: form.getFieldValue("meetPlace"),
                description: form.getFieldValue("description"),
                typeOfEvent: form.getFieldValue("typeOfEvent"),
                cloth: form.getFieldValue("cloth"),
                eventDate: form.getFieldValue("eventDate"),
                eventTime: form.getFieldValue("eventTime"),
                eventPlace: form.getFieldValue("eventPlace"),
                cast: form.getFieldValue("cast"),
            })
    };

    const onFinish = (values) => {
        console.log(values)
    }


    const onChange4 = e => {
        console.log('radio4 checked', e.target.value);
        setCloth( e.target.value );
      };


    if (equipment !== null) {
        equipGroup = Object.getOwnPropertyNames(equipment)
        console.log(equipGroup)
    }
    console.log(lastId)
    console.log(equipment)
    return (

        <div style={{ padding: '15px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '15px' }}>Добавить мероприятие</h2>

            
            

            <Form
                form={form}
                layout="auto"
                size="large"
                name="basic"
                onFinish={onFinish}

            >

                <Form.Item
                    name="title"
                    value={title}
                    rules={[{ required: true, message: 'Введите значение!' }]}
                >

                    <Input addonBefore="Название" name="title" />
                </Form.Item>

                <Row>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div style={{ padding: '0px 5px' }}>
                            <Form.Item
                                type="text"
                                name="meetDate"
                                value={meetDate}
                                placeholder="2020-08-01"
                                rules={[{ required: true, message: 'Введите значение!' }]}
                                label="Дата сбора"
                            >
                                <DatePicker name="meetDate" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div style={{ padding: '0px 5px' }}>
                            <Form.Item
                                label="Время сбора"
                                type="text"
                                name="meetTime"
                                value={meetTime}
                                rules={[{ required: true, message: 'Введите значение!' }]}
                            >
                                <TimePicker />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col flex={8}>
                        <div style={{ padding: '0px 5px' }}>
                            <Form.Item
                                name="meetPlace"
                                value={meetPlace}
                                label="Место сбора"
                                rules={[{ required: true, message: 'Введите значение!' }]}
                            >
                                <Input name="meetPlace" />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col flex={12}>
                        <div style={{ padding: '0px 5px' }}>
                            <Form.Item
                                type="text"
                                name="typeOfEvent"
                                label="Тип мероприятия"
                                value={typeOfEvent}
                                rules={[{ required: true, message: 'Введите значение!' }]}
                            >
                                <Select
                                    name="typeOfEvent"
                                    value={typeOfEvent}


                                >
                                    <Option value="Концерт">Концерт</Option>
                                    <Option value="Запись">Запись</Option>
                                    <Option value="Третий курс">Третий курс</Option>
                                    <Option value="Четвертый курс">Четвертый курс</Option>
                                    <Option value="Пятый курс">Пятый курс</Option>

                                </Select>
                            </Form.Item>
                        </div>
                    </Col>
                    <Col flex={12}>
                        <div style={{ padding: '0px 20px' }}>
                            <Form.Item
                                label="Форма одежды"
                                name="cloth"
                                value={cloth}
                            >

                                <Group
                                    options={radio}
                                    onChange={onChange4}
                                    value={cloth}
                                    optionType="button"
                                    buttonStyle="solid"
                                />

                            </Form.Item>
                        </div>
                    </Col>
                </Row>



                <Row>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div style={{ padding: '0px 5px' }}>
                            <Form.Item
                                type="text"
                                name="eventDate"
                                placeholder="2020-08-01"
                                value={eventDate}
                                label="Дата проведения"
                                rules={[{ required: true, message: 'Введите значение!' }]}
                            >
                                <DatePicker name="eventDate" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div style={{ padding: '0px 5px' }}>
                            <Form.Item
                                type="text"
                                name="eventTime"
                                value={eventTime}
                                label="Время проведения"
                                placeholder="Время проведения"
                                rules={[{ required: true, message: 'Введите значение!' }]}
                            >
                                <TimePicker />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col flex={8}>
                        <div style={{ padding: '0px 5px' }}>
                            <Form.Item
                                name="eventPlace"
                                label="Место проведения"
                                value={eventPlace}
                                rules={[{ required: true, message: 'Введите значение!' }]}
                            >
                                <Input name="eventPlace" />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>



                <Form.Item
                    type="text"
                    label="Описание"
                    name="description"
                    value={description}
                >
                    <TextArea name="description" rows={4} />
                </Form.Item>




                <Form.Item label="Состав исполнителей" name="cast" value={cast}>
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Tags Mode"
                        name="cast"
                    >
                        <OptionSel key={'Рояль'}>Рояль</OptionSel>
                        <OptionSel key={'Скрипка'}>Скрипка</OptionSel>
                        <OptionSel key={'Гитара'}>Гитара</OptionSel>
                    </Select>
                </Form.Item>

                <Equipment equipment={equipment} equipGroup={equipGroup} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '15px' }}>
                    <StagePlan />
                </div>




                <Form.Item>
                    <Button style={{ width: '100%', margin: '8px' }} type="primary" htmlType="submit">
                        Добавить мероприятие
                    </Button>
                    <br/><br/><br/><br/>
                </Form.Item>
            </Form>
        </div>
    );

}

export default CalendarNewEvent;