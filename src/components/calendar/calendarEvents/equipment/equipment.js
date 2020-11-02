import React, { useState } from "react";
import { Collapse, Divider, Button } from "antd";
import AddEquipment from "./addEquipment";

const { Panel } = Collapse;

const Equipment = (props) => {
  const [edit, setEdit] = useState(false);

  const onChange = () => {
    setEdit(!edit);
    console.log(edit);
  };

  return (
    <div style={{ paddingBottom: "10px" }}>
      <Collapse expandIconPosition="right" style={{ borderRadius: "10px" }}>
        <Panel header="Оборудование" key="3" style={{ borderRadius: "10px" }}>
          {edit ? (
            <AddEquipment updateEdit={onChange} equipAdded={props.equipment} />
          ) : (
            <div>
              {props.equipGroup &&
                props.equipGroup.map((group) => {
                  return (
                    <div>
                      <Divider orientation="left">{group}</Divider>
                      {props.equipment &&
                        props.equipment.map((equip) => {
                          if (equip["group"] === group) {
                            return (
                              <p>
                                {equip["type"]}: {equip["quantity"]}
                              </p>
                            );
                          }
                        })}
                    </div>
                  );
                })}
              <div>
                <Button block shape="round" type="primary" onClick={onChange}>
                  Добавить оборудование
                </Button>
              </div>
            </div>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Equipment;
