import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Radio,
} from "antd";
import StagePlan from "./stagePlan";
import { addEvent } from "../../abstract/universalFirebase";


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
  let meetTime = "";
  let meetPlace = "";
  let description = "";
  let lastId = localStorage.getItem("EventLastId");
  let typeOfEvent = "";
  let eventDate = "";
  let eventTime = "";
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

  const addNewEvent = (values) => {
    onFinish(values);
    localStorage.setItem("EventLastId", Number(lastId) + 1);
    let id = localStorage.getItem("EventLastId");
    let name = id;
    addEvent(
      name,
      form.getFieldValue("title"),
      String(form.getFieldValue("meetDate")),
      String(form.getFieldValue("meetTime")),
      form.getFieldValue("meetPlace"),
      form.getFieldValue("description"),
      form.getFieldValue("typeOfEvent"),
      form.getFieldValue("cloth"),
      String(form.getFieldValue("eventDate")),
      String(form.getFieldValue("eventTime")),
      form.getFieldValue("eventPlace"),
      form.getFieldValue("cast"),
      form.getFieldValue("max")
    );
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onChange4 = (e) => {
    cloth = e.target.value;
  };

  return (
    <div style={{ padding: "15px" }}>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Добавить мероприятие
      </h2>

      <Form
        form={form}
        layout="auto"
        size="large"
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

        <Row>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <div style={{ padding: "0px 5px" }}>
              <Form.Item
                type="text"
                name="meetDate"
                value={meetDate}
                placeholder="2020-08-01"
                rules={[{ required: true, message: "Введите значение!" }]}
                label="Дата сбора"
              >
                <Input type="date" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <div style={{ padding: "0px 5px" }}>
              <Form.Item
                label="Время сбора"
                placeholder="Время сбора"
                type="text"
                name="meetTime"
                value={meetTime}
                rules={[{ required: true, message: "Введите значение!" }]}
              >
                <Input type="time" />
              </Form.Item>
            </div>
          </Col>
          <Col flex={8}>
            <div style={{ padding: "0px 5px" }}>
              <Form.Item
                name="meetPlace"
                value={meetPlace}
                label="Место сбора"
                rules={[{ required: true, message: "Введите значение!" }]}
              >
                <Input name="meetPlace" />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row>
          <Col flex={9}>
            <div style={{ padding: "0px 5px" }}>
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
            </div>
          </Col>
          <Col flex={8}>
            <div style={{ padding: "0px 20px" }}>
              <Form.Item label="Форма одежды" name="cloth" value={cloth}>
                <Group
                  options={radio}
                  onChange={onChange4}
                  defaultValue={cloth}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </div>
          </Col>
          <Col flex={7}>
            <div style={{ padding: "0px 20px" }}>
              <Form.Item label="Количество участников" name="max" value={max}>
                <Input type="number" style={{width: '70px'}}/>
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <div style={{ padding: "0px 5px" }}>
              <Form.Item
                type="text"
                name="eventDate"
                placeholder="2020-08-01"
                value={eventDate}
                label="Дата проведения"
                rules={[{ required: true, message: "Введите значение!" }]}
              >
                <Input type="date" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <div style={{ padding: "0px 5px" }}>
              <Form.Item
                type="text"
                name="eventTime"
                value={eventTime}
                label="Время проведения"
                placeholder="Время проведения"
                rules={[{ required: true, message: "Введите значение!" }]}
              >
                <Input type="time" />
              </Form.Item>
            </div>
          </Col>
          <Col flex={8}>
            <div style={{ padding: "0px 5px" }}>
              <Form.Item
                name="eventPlace"
                label="Место проведения"
                value={eventPlace}
                rules={[{ required: true, message: "Введите значение!" }]}
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
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            name="cast"
          >
            <OptionSel key={"Рояль"}>Рояль</OptionSel>
            <OptionSel key={"Скрипка"}>Скрипка</OptionSel>
            <OptionSel key={"Гитара"}>Гитара</OptionSel>
          </Select>
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

    </div>
  );
};

export default CalendarNewEvent;
