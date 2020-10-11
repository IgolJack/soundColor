import React from "react";
import {db} from "../../firebase/firebase";
import { Form, Input, Button, DatePicker, Row, Col, Select, TimePicker} from 'antd';
import TreeTransfer from "./treeTransfer";
import BackToHome from "../../UI/backToHome";

const CalendarNewEvent = (props) => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Option } = Select;
    const OptionSel = Select.Option;

    let title = '';
    let start = '';
    let description = '';
    let lastId;
    let typeOfEvent;

    const addNewEvent = () => {
        let id = Number(lastId) + 1
        let name = String(id)
        db.collection('eventsCalendar')
            .doc(name)
            .set({
                id: id,
                title: title,
                start: start,
                edescriptionnd: description,
            })
    };

    const children = [];
    for (let i = 10; i < 36; i++) {
     children.push(<OptionSel key={i.toString(36) + i}>{i.toString(36) + i}</OptionSel>);
}

    return (
        <div>
            
            <BackToHome/>
            <Form
                form={form}
                layout="auto"
                size="large"
                name="basic"
                onFinish={addNewEvent}
              
            >
             
                <Form.Item 
                    name="title"
                    value={title}
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    >

                <Input addonBefore="Название"  name="title" />
                </Form.Item>
               
                  
                        <Form.Item
                            type="text"
                            name="start"
                            placeholder="2020-08-01"
                            value={start}
                            label = "Дата проведения"
                        >
                         <DatePicker  name="start" style={{ width: '50%' }} />
                        </Form.Item>

                        <Form.Item
                            placeholder="Время проведения"
                        >
                            <TimePicker />    
                        </Form.Item>
                    
                        <Form.Item
                            type="text"
                            label = "Описание"
                            name="description"
                            value={description}
                        >
                        <TextArea name="description" rows={4} />
                        </Form.Item>
                   
                    
                    <Form.Item
                        type="text"
                        name="typeOfEvent"
                        value={typeOfEvent}
                        >
                        <Select
                            name="typeOfEvent"
                            value={typeOfEvent}
                            rules={[{ required: true, message: 'Please input your email!' }]}

                        >
                            <Option value="Концерт">Концерт</Option>
                            <Option value="Запись">Запись</Option>
                            <Option value="Третий курс">Третий курс</Option>
                            <Option value="Четвертый курс">Четвертый курс</Option>
                            <Option value="Пятый курс">Пятый курс</Option>

                        </Select>
                        </Form.Item>
                   
                        <Form.Item>
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Tags Mode"
                        >
                            <OptionSel key={1}>Рояль</OptionSel>
                            <OptionSel key={2}>Скрипка</OptionSel>
                            <OptionSel key={3}>Гитара</OptionSel>
                        </Select>
                        </Form.Item>

                        <TreeTransfer/>
                        <h1>TreeTransferWithSearchAndTagsHere</h1>

                <Form.Item>
                    <Button style={{ width: '100%', margin: '8px' }} type="primary" htmlType="submit">
                        Добавить мероприятие
                    </Button>
                </Form.Item>
                
            </Form>
        </div>
    );
}

export default CalendarNewEvent;