import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Cascader, Collapse, InputNumber, Row, Col, Button } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
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

const Equipment = (props) => {

  let equipment = useEquipment()
  let equipGroup = []
  let options = []
  let fields = []
  const [count, setCount] = useState(1)
  const [fieldsCount, setFieldsCount] = useState(1)
  const [equipOut, setEquipOut] = useState({})

  const onChangeNum = (value) => {
    if(value){
    setCount(value)
    console.log(count);
    setEquipOut({ ...equipOut, count: value })
    }
  }

  useEffect(() => {
    props.updateEquip(equipOut)
  }, [equipOut])

const onChange = (value) => {
  console.log(value);
  setEquipOut({...equipOut, equipGroup: value[0], equip: value[1] })
  console.log(equipOut);
}

  if (equipment !== null) {
    equipGroup = Object.getOwnPropertyNames(equipment)
  }

  
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
          label: `${equipment[equipGroup[index]][i]}`
        }
      }
    }
  }

  const addField = () => {
    setFieldsCount(fieldsCount + 1)
  }

  for (let index = 0; index < fieldsCount; index++) {
    fields.push(
      <div style={{ paddingTop: '15px' }}>
        <Row>
          <Col xs={{ span: 11, offset: 1 }} sm={{ span: 7, offset: 5 }} md={{ span: 7, offset: 5 }} lg={{ span: 7, offset: 5 }} xl={{ span: 7, offset: 5 }} xll={{ span: 7, offset: 5 }}>
            <Cascader style={{ width: '100%' }} options={options} expandTrigger="hover" onChange={onChange} placeholder="Выберите оборудование" />
          </Col>
          <Col xs={{ span: 9, offset: 3 }} sm={{ span: 9, offset: 3 }} md={{ span: 9, offset: 3 }} lg={{ span: 9, offset: 3 }} xl={{ span: 9, offset: 3 }} xll={{ span: 9, offset: 3 }}>
            <InputNumber
              id="standard-full-width"
              type="number"
              name="Количество"
              min={0}
              onChange={onChangeNum}
            />
          </Col>
        </Row>
      </div>
    )
  }



  return (
    <Collapse>
      <Panel header="Оборудование" key="1">
        {fields}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '15px' }}>
          <Button
            size="large"
            shape="circle"
            type="primary"
            icon={<PlusCircleTwoTone style={{ fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}
            onClick={addField} />
        </div>
      </Panel>
    </Collapse>
  );
}

export default Equipment