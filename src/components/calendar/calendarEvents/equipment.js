import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  Cascader,
  Collapse,
  InputNumber,
  Button,
  Form,
  Space,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

function useEquipment() {
  const [equip, setEquip] = useState([]);
  useEffect(() => {
    db.collection("equipment")
      .doc("equip")
      .get()
      .then((doc) => {
        const data = doc.data();
        setEquip(data);
        console.log(equip);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  return equip;
}

const Equipment = (props) => {
  const [form] = Form.useForm();

  let equipment = useEquipment();
  let equipGroup = [];
  let options = [];
  let equipData = [];
  let selected = [];
  let quantityMax = []
console.log(equipment)
  if (equipment !== null) {
    equipGroup = Object.getOwnPropertyNames(equipment);
    for (let index = 0; index < equipGroup.length; index++) {
      if (equipGroup[index] === "length") {
        equipGroup.splice(index, 1)
      }
    }
  }

  if (equipment !== null) {
    for (let index = 0; index < equipGroup.length; index++) {
      options[index] = {
        value: `${equipGroup[index]}`,
        label: `${equipGroup[index]}`,
        children: [],
      };
      for (let i = 0; i < equipment[equipGroup[index]].length; i++) {
        options[index]["children"][i] = {
          value: `${equipment[equipGroup[index]][i]['name']}`,
          label: `${equipment[equipGroup[index]][i]['name']}`,
          disabled: false,
        };
        
      }
    }
  }
  console.log(options);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    equipData = [];

    if (values.equipmentData !== undefined) {
      for (let index = 0; index < values.equipmentData.length; index++) {
        equipData[index] = {
          equipGroup: `${values.equipmentData[index]["equipment"][0]}`,
          equipType: `${values.equipmentData[index]["equipment"][1]}`,
          quantity: `${values.equipmentData[index]["quantity"]}`,
        };
      }
      message.success("Ваше оборудование сохранено!");
    }
    console.log(equipData);
  };

  const onChange = () => {
    //обнуление
    for (let index = 0; index < options.length; index++) {
      for (let i = 0; i < options[index]["children"].length; i++) {
        options[index]["children"][i]["disabled"] = false;
      }
    }
    quantityMax = []

    console.log(form.getFieldValue(["equipmentData", 0, 'equipment', 0]))
    selected = form.getFieldValue("equipmentData");
    console.log(selected)

    
    
    for (let index = 0; index < selected.length; index++) {
      for (let ind = 0; ind < options.length; ind++) {
        if (options[ind]["value"] === selected[index]["equipment"][0]) {
          for (let i = 0; i < options[ind]["children"].length; i++) {
            if (
              options[ind]["children"][i]["value"] ===
              selected[index]["equipment"][1]
            ) {
              options[ind]["children"][i]["disabled"] = true;
            }
          }
        }
      }
    }

    for (let a = 0; a < equipGroup.length; a++) {
      for (let b = 0; b < selected.length; b++) {
        if (selected[b]['equipment'][0] === equipGroup[a]) {
          for (let c = 0; c < equipment[equipGroup[a]].length; c++) {
            if (equipment[equipGroup[a]][c]['name'] === selected[b]['equipment'][1]) {
              quantityMax.push({
                group: `${selected[b]['equipment'][0]}`,
                type: `${selected[b]['equipment'][1]}`,
                quantity: `${equipment[equipGroup[a]][c]['quantity']}`
              })
            }
          }
        }
      }
    }
    console.log(quantityMax)


  };
  
  const max = (fieldName) => {
    let max
    for (let index = 0; index < quantityMax.length; index++) {
      if (
        quantityMax[index]["group"] ===
          form.getFieldValue([
            "equipmentData",
            fieldName,
            "equipment",
            0,
          ]) &&
        quantityMax[index]["type"] ===
          form.getFieldValue([
            "equipmentData",
            fieldName,
            "equipment",
            1,
          ])
      ) {
        max = quantityMax[index]["quantity"]
      }
    }
    console.log(max)
    return max
  }

console.log(equipGroup)
    console.log(options)

  return (
    <Collapse>
      <Panel header="Оборудование" key="1">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.List name="equipmentData">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "equipment"]}
                        fieldKey={[field.fieldKey, "equipment"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Cascader
                          style={{ width: "100%" }}
                          options={options}
                          onChange={onChange}
                          expandTrigger="hover"
                          placeholder="Выберите оборудование"
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "quantity"]}
                        fieldKey={[field.fieldKey, "quantity"]}
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <InputNumber
                          id="standard-full-width"
                          type="number"
                          name="Количество"
                          min={0}
                          max={max(field.name)}
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                          onChange();
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
};

export default Equipment;
