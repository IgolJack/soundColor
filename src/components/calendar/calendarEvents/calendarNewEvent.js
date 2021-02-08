import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Radio,
  Space,
  Divider,
  InputNumber,
} from "antd";
import StagePlan from "./stagePlan";

const { TextArea } = Input;
const { Option } = Select;
const { Group } = Radio;
const OptionSel = Select.Option;
const radio = [
  { label: "Свободная", value: "Свободная" },
  { label: "Парадная", value: "Парадная" },
];
const CalendarNewEvent = () => {
  const [form] = Form.useForm();
  let title = "";
  let meetDate = "";
  let meetPlace = "";
  let description = "";
  let typeOfEvent = "";
  let eventDate = "";
  let eventPlace = "";
  let cast = [];
  let cloth = "Свободная";
  let children = [];
  let max = 5;

  for (let i = 10; i < 36; i++) {
    children.push(
      <OptionSel key={i.toString(36) + i}>{i.toString(36) + i}</OptionSel>
    );
  }

  const setCalendarEvent = async (event) => {
    let e = JSON.stringify(event);
    fetch(`/api/createEvent?event=${e}`)
      .then((response) => response.json())
      .then((jsondata) => console.log(jsondata));
  };

  const addNewEvent = (values) => {
    onFinish(values);
 
    let event = {
      title: form.getFieldValue("title"),
      meetDateAndTime: String(form.getFieldValue("meetDateAndTime")),
      meetPlace: form.getFieldValue("meetPlace"),
      description: form.getFieldValue("description"),
      typeOfEvent: form.getFieldValue("typeOfEvent"),
      cloth: form.getFieldValue("cloth"),
      eventDateAndTime: String(form.getFieldValue("eventDateAndTime")),
      eventPlace: form.getFieldValue("eventPlace"),
      cast: form.getFieldValue("cast"),
      max: form.getFieldValue("max"),
      createdDate: new Date(),
    };

    setCalendarEvent(event);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onChange4 = (e) => {
    cloth = e.target.value;
  };

  return (
    <div>
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Добавить мероприятие
      </h3>

      <Form
        form={form}
        layout="auto"
        name="basic"
        initialValues={{
          cloth: cloth,
          max: max,
        }}
        onFinish={addNewEvent}
      >
        <Form.Item
          name="title"
          value={title}
          rules={[{ required: true, message: "Введите значение!" }]}
        >
          <Input addonBefore="Название" name="title" />
        </Form.Item>
        <Divider>Дата и время сбора</Divider>

          <Form.Item
            type="text"
            name="meetDateAndTime"
            value={meetDate}
            placeholder="2020-08-01"
            rules={[{ required: true, message: "Введите значение!" }]}
          >
            <Input type="datetime-local" />
          </Form.Item>

        
        <Form.Item
          name="meetPlace"
          value={meetPlace}
          rules={[{ required: true, message: "Введите значение!" }]}
        >
          <Input name="meetPlace" placeholder="Место сбора" />
        </Form.Item>

        <Divider>Мероприятие</Divider>

        <Form.Item
          type="text"
          name="eventDateAndTime"
          placeholder="2020-08-01"
          value={eventDate}
          label="Дата проведения"
          rules={[{ required: true, message: "Введите значение!" }]}
        >
          <Input type="datetime-local" />
        </Form.Item>


        <Form.Item
          name="eventPlace"
          label="Место проведения"
          value={eventPlace}
          rules={[{ required: true, message: "Введите значение!" }]}
        >
          <Input name="eventPlace" />
        </Form.Item>

        <Form.Item
          type="text"
          name="typeOfEvent"
          label="Тип мероприятия"
          value={typeOfEvent}
          rules={[{ required: true, message: "Введите значение!" }]}
        >
          <Select name="typeOfEvent" value={typeOfEvent}>
            <Option value="Концерт">Концерт</Option>
            <Option value="Запись">Запись</Option>
            <Option value="Третий курс">Третий курс</Option>
            <Option value="Четвертый курс">Четвертый курс</Option>
            <Option value="Пятый курс">Пятый курс</Option>
          </Select>
        </Form.Item>

        <Space>
          <Form.Item label="Форма одежды" name="cloth" value={cloth}>
            <Group
              size="small"
              options={radio}
              onChange={onChange4}
              defaultValue={cloth}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item label="Участников" name="max" value={max}>
            <InputNumber type="number" />
          </Form.Item>
        </Space>

        <Form.Item label="Состав исполнителей" name="cast" value={cast}>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            name="cast"
          >
            <OptionSel key={"Рояль"}>Рояль</OptionSel>
            <OptionSel key={"Скрипка"}>Скрипка</OptionSel>
            <OptionSel key={"Гитара"}>Гитара</OptionSel>
          </Select>
        </Form.Item>

        <Form.Item
          type="text"
          label="Описание"
          name="description"
          value={description}
        >
          <TextArea name="description" rows={4} />
        </Form.Item>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "15px",
          }}
        >
          <StagePlan />
        </div>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Добавить мероприятие
          </Button>
        </Form.Item>
      </Form>
      <br/> <br/> 
    </div>
  );
};

export default CalendarNewEvent;
