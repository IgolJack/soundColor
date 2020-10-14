import React, { useState } from "react";
import { Cascader, Collapse, InputNumber, Row, Col, Button } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
const {Panel} = Collapse

function onChange(value) {
  console.log(value);
}

const Equipment = (props) => {

  let equipment = props.equipment
  let equipGroup = props.equipGroup
  let options = []
  let fields = []
  const [count, setCount] = useState(1)
  const [fieldsCount, setFieldsCount] = useState(1)

  const onChangeNum = (value) => {
    setCount(value)
    console.log(value);
  }

  console.log(equipment)
  console.log(equipGroup)
if(equipment !== null){
  for (let index = 0; index < equipGroup.length; index++) {
    console.log('зашел в цикл')
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
  }}
  console.log(options)

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
              value={count}
              type="number"
              name="Количество"
              min={1}
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