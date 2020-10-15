
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Cascader, Collapse, InputNumber, Row, Col, Button, Form, Space, message } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Panel } = Collapse


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

function useStandartEquipment() {
  const [equipSt, setEquipSt] = useState([])
  useEffect(() => {
    db.collection('equipment').doc('standart')
      .get()
      .then(doc => {
        const data = doc.data()
        setEquipSt(data)
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [])

  return equipSt
}

const Equipment = (props) => {
  const [form] = Form.useForm()


  let equipment = useEquipment()
  let standartEquipment = useStandartEquipment()
  let standartOptions = []
  let equipGroup = []
  let options = []
  let equipData = []
  let repeat = false
  let see = 'visible'
  let selected = []

  let field = []

  if (equipment !== null) {
    equipGroup = Object.getOwnPropertyNames(equipment)
  }

  console.log(standartEquipment)

  if (equipment !== null) {
    for (let index = 0; index < equipGroup.length; index++) {
      options[index] = {
        value: `${equipGroup[index]}`,
        label: `${equipGroup[index]}`,
        children: []
      }
      for (let i = 0; i < equipment[equipGroup[index]].length; i++) {
        options[index]['children'][i] = {
          value: `${equipment[equipGroup[index]][i]}`,
          label: `${equipment[equipGroup[index]][i]}`,
          disabled: false,
        }
      }
    }
  }
  console.log(options)

const standart = () => {
  
}


  // if (standartEquipment !== null) {
  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];
      
  //   }
  // }

  const onFinish = values => {
    console.log('Received values of form:', values);
    equipData = []

    if (values.equipmentData !== undefined) {
      for (let index = 0; index < values.equipmentData.length; index++) {
        equipData[index] = {
          equipGroup: `${values.equipmentData[index]['equipment'][0]}`,
          equipType: `${values.equipmentData[index]['equipment'][1]}`,
          quantity: `${values.equipmentData[index]['quantity']}`,
        }
      }
      repeat = false
      for (let index = 0; index < equipData.length; index++) {
        let checking = equipData[index]
        console.log(checking)
        for (let i = 0; i < equipData.length; i++) {
          if (i !== index && equipData[i]['equipGroup'] === checking['equipGroup'] && equipData[i]['equipType'] === checking['equipType']) {
            repeat = true
          }
        }
      }
      if (repeat) {
        message.error('У вас есть повторяющееся оборудование! Исправьтесь!', 0)
      }
      else {
        message.destroy()
      }
      if (!repeat) {
        message.success('Ваше оборудование сохранено!')
        props.updateEquip(equipData)
      }
      else {
        message.destroy()
      }

      console.log(repeat)


    }

    console.log(equipData)



  };

  const onChange = value => {
    console.log(value)
    console.log(options)
    console.log( form.getFieldValue(['equipmentData', 0, "equipment"]) )

    
    // for (let index = 0; index < options.length; index++) {
    //   if(options[index]['value'] === value[0]){
    //     for (let i = 0; i < options[index]['children'].length; i++) {
    //       if (options[index]['children'][i]['value'] === value[1]) {
    //         options[index]['children'][i]['disabled'] = true
    //       }
          
    //     }
    //   }
      
    // }
    
  }

  return (
    <Collapse>
      <Panel header="Оборудование" key="1">
      <Button type="primary" onClick={standart}>Выбрать стандартное</Button>
        
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" form={form}>
          
          <Form.List name="equipmentData">
            {(fields, { add, remove }) => {              
              return (
                <div>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                      <Form.Item
                        {...field}
                        name={[field.name, 'equipment']}
                        fieldKey={[field.fieldKey, 'equipment']}
                        rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Cascader style={{ width: '100%' }} options={options} onChange={onChange} expandTrigger="hover" placeholder="Выберите оборудование" />

                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'quantity']}
                        fieldKey={[field.fieldKey, 'quantity']}
                        rules={[{ required: true, message: 'Missing last name' }]}
                      >
                        <InputNumber
                          id="standard-full-width"
                          type="number"
                          name="Количество"
                          min={0}
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Добавить поле
                </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить выбранное
        </Button>
          </Form.Item>
        </Form>
            
        
              

      </Panel>
    </Collapse>
  );
}

export default Equipment