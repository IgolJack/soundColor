import React, { useCallback, useContext, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { AuthContext } from "../login/Auth";
import { Form, Input, Button, message, Select } from "antd";
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
  let lvl = "1";
  let missed = "0";
  let disgrace = "0";
  let responsible = "0";
  let concert = "0";
  let equipment = "0";
  let discharges = "0";
  let count = "0";
  let exchange = "0";
  let course = "Первый курс";
  let uid = '';
  const [lastId, setLastId] = useState(localStorage.getItem("lastId"));
  

  const succes = () => {
    message.success("Студент успешно создан", 2);
    form.setFieldsValue({ email: "" });
    form.setFieldsValue({ name: "" });
    form.setFieldsValue({ lateness: "0" });
    form.setFieldsValue({ lvl: "0" });
    form.setFieldsValue({ missed: "0" });
    form.setFieldsValue({ disgrace: "0" });
    form.setFieldsValue({ responsible: "0" });
    form.setFieldsValue({ concert: "0" });
    form.setFieldsValue({ equipment: "0" });
    form.setFieldsValue({ count: "0" });
    form.setFieldsValue({ course: "" });
    form.setFieldsValue({ equipment: "0" });
    form.setFieldsValue({ discharges: "0" });
    form.setFieldsValue({ exchange: "0" });
    console.log(localStorage.getItem("lastId"));
  };
  const succesRed = () => {
    message.info("Регистрация прошла успешно");
  };
  const errorRed = (error) => {
    message.error(String(error));
  };
  const handleLogin = useCallback(async (values) => {
    try {
      await auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(function (result) {
          uid = result.user.uid
          console.log(uid);
          succesRed();
          return result.user.updateProfile({
            displayName: values.name,
          });
        });
      localStorage.setItem("lastId", Number(lastId) + 1);
      setLastId(localStorage.getItem("lastId"));
     
      console.log(localStorage.getItem("lastId"));
      db.collection("students")
        .doc(localStorage.getItem("lastId"))
        .set({
          email: form.getFieldValue("email"),
          password: form.getFieldValue("password"),
          name: form.getFieldValue("name"),
          lateness: form.getFieldValue("lateness"),
          lvl: form.getFieldValue("lvl"),
          missed: form.getFieldValue("missed"),
          disgrace: form.getFieldValue("disgrace"),
          responsible: form.getFieldValue("responsible"),
          concert: form.getFieldValue("concert"),
          equipment: form.getFieldValue("equipment"),
          count: form.getFieldValue("count"),
          course: form.getFieldValue("course"),
          discharges: form.getFieldValue("discharges"),
          exchange: form.getFieldValue("exchange"),
          uid: uid,
          id: localStorage.getItem("lastId"),
        })
        .then(function () {
          succes();
        });
    } catch (error) {
      errorRed(error);
    }
  });
  const onGenPass = () => {
    form.setFieldsValue({
      password: Password.generate(8),
    });
  };
  return (
    <div style={{ padding: "15px" }}>
      <br />
      <Form
        form={form}
        layout="auto"
        size="large"
        {...layout}
        name="basic"
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
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
          <Input
            addonBefore="Email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            name="email"
          />
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
          value={name}
          rules={[{ required: true, message: "Введите ФИО!" }]}
        >
          <Input addonBefore="ФИО" name="name" />
        </Form.Item>

        <Form.Item type="number" name="course" value={course}>
          <Select
            placeholder="Выберите курс"
            name="course"
            value={course}
            addonBefore="ФИО"
            rules={[{ required: true, message: "Выберете курс!" }]}
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
          <Form.Item name="lateness" style={{ margin: 5 }} value={lateness}>
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Опозданий"
              name="lateness"
              min={0}
              defaultValue={lateness}
            />
          </Form.Item>

          <Form.Item
            name="lvl"
            value={lvl}
            style={{ margin: 5 }}
            rules={[{ required: true, message: "Введите уровень!" }]}
          >
            <Input
              type="number"
              style={{ width: 150 }}
              addonBefore="Уровень"
              name="lvl"
              min={1}
              defaultValue={lvl}
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
    </div>
  );
};

export default SignUpPage;
