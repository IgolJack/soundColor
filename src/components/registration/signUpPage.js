import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { auth } from '../firebase/firebase'
import {AuthContext} from '../login/Auth'
import { Form, Input, Button, Checkbox, InputNumber } from 'antd';
import AddStudent from '../list/student/studentChange/AddStudent'



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };




const SignUpPage = () => {
const [password, setPassword]  = useState('');
const [email, setEmail]  = useState('');
const [name, setName]  = useState('');
const [lateness, setLateness]  = useState('0');
const [lvl, setLvl]  = useState('1');
const [skips, setSkips]  = useState('0');
const [disgrace, setDisgrace]  = useState('0');
const [responsible, setResponsible]  = useState('0');
const [concert, setConcert]  = useState('0');
const [equipment, setEquipment]  = useState('0');
const [discharges, setDischarges]  = useState('0');
const [count, setCount]  = useState('0');

  const { currentUser } = useContext(AuthContext);
    const handleLogin = useCallback(
        async values => {
        try {
            await auth.createUserWithEmailAndPassword(values.email, values.password)
            
            .then(function(result)
            { return result.user.updateProfile({
              displayName: values.name
            })}
            )


        } catch (error) {
            console.log(error);
        }
        },

 
    );

    const updateData = (event) => {
      setEmail(event.target.value)

      console.log(email)
      
  }
    
      return (
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            label="Email"
            name="email"
            value={email}
            
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input name="email" onChange={updateData}/>
          </Form.Item>
    
          <Form.Item
            label="Пароль"
            name="password"
            value={password}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password name="password"/>
          </Form.Item>

          <Form.Item
            label="ФИО"
            name="name"
            value={name}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input name="name" />
          </Form.Item>

          <Form.Item
            label="Опазданий"
            name="lateness"
            value={lateness}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber  name="lateness" min={0} defaultValue={lateness} />
          </Form.Item>

          <Form.Item
            label="Уровень"
            name="lvl"
            value={lvl}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber  name="lvl" min={0} defaultValue={lvl} />
          </Form.Item>

          <Form.Item
            label="Пропусков"
            name="skips"
            value={skips}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber name="skips" defaultValue={skips} min={0} />
          </Form.Item>

          <Form.Item
            label="Опозорил раз"
            name="disgrace"
            value={disgrace}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber name="disgrace" defaultValue={disgrace} min={0} />
          </Form.Item>

          <Form.Item
            label="Отвественен раз"
            name="responsible"
            value={responsible}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber name="responsible" defaultValue={responsible} min={0} />
          </Form.Item>

          <Form.Item
            label="Мероприятий посетило"
            name="concert"
            value={concert}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber name="concert" defaultValue={concert} min={0} />
          </Form.Item>

          <Form.Item
            label="Оборудование брало"
            name="equipment"
            value={equipment}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber name="equipment" defaultValue={equipment} min={0} />
          </Form.Item>
          
          <Form.Item
            label="Выписываний"
            name="discharges"
            value={discharges}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber name="discharges" defaultValue={discharges} min={0} />
          </Form.Item>
          
          <Form.Item
            label="Сдано записей"
            name="count"
            value={count}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputNumber name="count" defaultValue={count} min={0} />
          </Form.Item>
          

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
           
             <AddStudent
              
              uid={currentUser.uid}
            />
          
          </Form.Item>
        </Form>
      );
}
 
export default SignUpPage;