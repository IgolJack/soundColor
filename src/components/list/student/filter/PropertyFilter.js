import React, { Component } from 'react';

import { Collapse } from 'antd';
import { Select } from 'antd';
import { InputNumber } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;

class PropertyFilter extends Component {
    
    render() {
        return (
            <div>
                <Collapse>
                    <Panel header="Фильтры" key="1">
                        <p>
                            <h6>Курс</h6>
                            <Select
                                fullWidth
                                name="course"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue=""
                                onChange={this.props.onInputChange}
                            >
                                <Option value="">Все курсы</Option>
                                <Option value="Первый курс">Первый курс</Option>
                                <Option value="Второй курс">Второй курс</Option>
                                <Option value="Третий курс">Третий курс</Option>
                                <Option value="Четвертый курс">Четвертый курс</Option>
                                <Option value="Пятый курс">Пятый курс</Option>
                            </Select>
                            </p>
                            <p>
                            <h6>Уровень</h6>
                            <Select
                                fullWidth
                                name="lvl"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue=""
                                onChange={this.props.onInputChange}
                            >
                                <Option value="">Все уровни</Option>
                                <Option value="1">Первый уровень</Option>
                                <Option value="2">Второй уровень</Option>
                                <Option value="3">Третий уровень</Option>
                                <Option value="4">Четвертый уровень</Option>
                                <Option value="5">Пятый уровень</Option>
                            </Select>
                            </p>
                            <p>
                                <h6>Пропуски</h6>
                            <InputNumber
                                id="standard-full-width"
                                label="Пропуски"
                                helperText="Значение и более"
                                type="number"
                                fullWidth
                                name="missed"
                                min={0}
                                onChange={this.props.onInputChange}
                            />
                        </p>
                    </Panel>
                </Collapse>                
            </div>
        );
    }
}

export default PropertyFilter;