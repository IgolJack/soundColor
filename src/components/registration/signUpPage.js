import React, { useCallback, useState } from "react";
import { Form, Input, Button, message, Select, AutoComplete } from "antd";
import { UserOutlined, LockOutlined, ToolTwoTone } from "@ant-design/icons";
const { Option } = Select;
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 0 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 0 },
};
const Password = {
  // eslint-disable-next-line
  _pattern: /[a-zA-Z0-9_\-\+\.]/,

  _getRandomByte: function () {
    if (window.crypto && window.crypto.getRandomValues) {
      var result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    } else if (window.msCrypto && window.msCrypto.getRandomValues) {
      // eslint-disable-next-line
      var result = new Uint8Array(1);
      window.msCrypto.getRandomValues(result);
      return result[0];
    } else {
      return Math.floor(Math.random() * 256);
    }
  },

  generate: function (length) {
    return Array.apply(null, { length: length })
      .map(function () {
        var result;
        while (true) {
          result = String.fromCharCode(this._getRandomByte());
          if (this._pattern.test(result)) {
            return result;
          }
        }
      }, this)
      .join("");
  },
};

const SignUpPage = (props) => {
  const [form] = Form.useForm();
  let password = "";
  let email = "";
  let name = "";
  let lateness = "0";
  let lvl = 1;
  let missed = "0";
  let disgrace = "0";
  let responsible = "0";
  let concert = "0";
  let equipment = "0";
  let discharges = "0";
  let count = "0";
  let exchange = "0";
  let course = "Первый курс";

  const [result, setResult] = useState([]);

  const onClipboardPass = (pass, email) => {
    navigator.clipboard
      .writeText("Email: " + email + " | Password: " + pass)
      .then(() => {
        message.success("Пароль был загружен в буфер обмена!", 5);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  const succes = () => {
    message.success("Студент успешно создан", 2);
    onClipboardPass(
      form.getFieldValue("password"),
      form.getFieldValue("email")
    );
    form.resetFields();
  };

  const errorRed = (error) => {
    message.error(String(error));
  };

  const onGenPass = () => {
    form.setFieldsValue({
      password: Password.generate(8),
    });
  };
  const handleSearch = (value) => {
    setResult(
      !value
        ? []
        : [
            {
              value: `${value}@gmail.com`,
            },
            {
              value: `${value}@mail.ru`,
            },
            {
              value: `${value}@yandex.ru`,
            },
          ]
    );
  };

  const handleLogin = () => {
    let student = {
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
      name: form.getFieldValue("name"),
      lateness: form.getFieldValue("lateness") || 0,
      lvl: form.getFieldValue("lvl") || 0,
      missed: form.getFieldValue("missed") || 0,
      disgrace: form.getFieldValue("disgrace") || 0,
      responsible: form.getFieldValue("responsible") || 0,
      concert: form.getFieldValue("concert") || 0,
      equipment: form.getFieldValue("equipment") || 0,
      count: form.getFieldValue("count") || 0,
      course: form.getFieldValue("course") || 0,
      discharges: form.getFieldValue("discharges") || 0,
      exchange: form.getFieldValue("exchange") || 0,
    };
    //console.log(student)
    let e = JSON.stringify(student);
    //console.log(e)
    fetch(`/api/createStudent?student=${e}`)
      .then((response) => response.json())
      .then((jsondata) => {
        if (jsondata == "success") {
          succes();
        } else {
          errorRed();
        }
      });
  };

  return (
    <div>
      <br />
      <Form
        form={form}
        layout="auto"
        size="large"
        {...layout}
        name="basic"
        initialValues={{
          course: course,
          lvl: lvl,
          lateness: lateness,
          missed: missed,
          disgrace: disgrace,
          responsible: responsible,
          concert: concert,
          equipment: equipment,
          discharges: discharges,
          count: count,
          exchange: exchange,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          hasFeedback
          value={email}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Введите E-mail!",
            },
          ]}
        >
          <AutoComplete onSearch={handleSearch} options={result}>
            <Input
              addonBefore="Email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              name="email"
            />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="password"
          value={password}
          type="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input
            addonBefore="Пароль"
            prefix={<LockOutlined className="site-form-item-icon" />}
            name="password"
            addonAfter={
              <ToolTwoTone
                style={{
                  fontSize: "25px",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
                onClick={onGenPass}
              />
            }
          />
        </Form.Item>

        <Form.Item
          name="name"
          hasFeedback
          value={name}
          rules={[
            { required: true, message: "Введите ФИО!" },
            () => ({
              validator(rule, value) {
                if (!value || value.split(" ").length === 3) {
                  return Promise.resolve();
                }
                return Promise.reject("Имя должно содержать 3 слова!");
              },
            }),
          ]}
        >
          <Input addonBefore="ФИО" name="name" />
        </Form.Item>

        <Form.Item
          hasFeedback
          type="number"
          name="course"
          value={course}
          rules={[{ required: true, message: "Выберете курс!" }]}
        >
          <Select
            placeholder="Выберите курс"
            name="course"
            value={course}
            addonBefore="ФИО"
          >
            <Option value="Первый курс">Первый курс</Option>
            <Option value="Второй курс">Второй курс</Option>
            <Option value="Третий курс">Третий курс</Option>
            <Option value="Четвертый курс">Четвертый курс</Option>
            <Option value="Пятый курс">Пятый курс</Option>
          </Select>
        </Form.Item>

        <Input.Group
          compact
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "stretch",
            margin: "auto",
            flex: "auto",
          }}
        >
          <Form.Item name="lvl" value={lvl} style={{ margin: 5 }}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Уровень"
              name="lvl"
              min={1}
              defaultValue={lvl}
            />
          </Form.Item>

          <Form.Item name="lateness" style={{ margin: 5 }} value={lateness}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Опазданий"
              name="lateness"
              min={0}
              defaultValue={lateness}
            />
          </Form.Item>

          <Form.Item name="missed" value={missed} style={{ margin: 5 }}>
            <Input
              name="missed"
              style={{ width: 150 }}
              type="number"
              addonBefore="Пропусков"
              defaultValue={missed}
              min={0}
            />
          </Form.Item>

          <Form.Item name="disgrace" style={{ margin: 5 }} value={disgrace}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Опозорил"
              name="disgrace"
              defaultValue={disgrace}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="responsible"
            style={{ margin: 5 }}
            value={responsible}
          >
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Отвеств."
              name="responsible"
              defaultValue={responsible}
              min={0}
            />
          </Form.Item>

          <Form.Item name="concert" style={{ margin: 5 }} value={concert}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Меропр."
              name="concert"
              defaultValue={concert}
              min={0}
            />
          </Form.Item>

          <Form.Item name="equipment" style={{ margin: 5 }} value={equipment}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Оборуд."
              name="equipment"
              defaultValue={equipment}
              min={0}
            />
          </Form.Item>

          <Form.Item name="discharges" style={{ margin: 5 }} value={discharges}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Выписыв."
              name="discharges"
              defaultValue={discharges}
              min={0}
            />
          </Form.Item>

          <Form.Item name="count" style={{ margin: 5 }} value={count}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Записей"
              name="count"
              defaultValue={count}
              min={0}
            />
          </Form.Item>

          <Form.Item name="exchange" style={{ margin: 5 }} value={exchange}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Замен"
              name="exchange"
              defaultValue={exchange}
              min={0}
            />
          </Form.Item>
        </Input.Group>
        <br />
        <Form.Item {...tailLayout}>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Зарегистрировать студента
          </Button>
        </Form.Item>
      </Form>
      <br />
    </div>
  );
};

export default SignUpPage;
