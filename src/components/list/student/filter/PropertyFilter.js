import React, { Component } from 'react';

import { Collapse } from 'antd';
import { Select } from 'antd';
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
                                name="course"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                                onChange={this.props.onInputChange}
                            >
                                <option value="">Все курсы</option>
                                <option value="Первый курс">Первый курс</option>
                                <option value="Второй курс">Второй курс</option>
                                <option value="Третий курс">Третий курс</option>
                                <option value="Четвертый курс">Четвертый курс</option>
                                <option value="Пятый курс">Пятый курс</option>
                            </Select>
                            </p>
                            <p>
                            <h6>Уровень</h6>
                            <Select

                                name="lvl"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                                onChange={this.props.onInputChange}
                            >
                                <option value="">Все уровни</option>
                                <option value="1">Первый уровень</option>
                                <option value="2">Второй уровень</option>
                                <option value="3">Третий уровень</option>
                                <option value="4">Четвертый уровень</option>
                                <option value="5">Пятый уровень</option>
                            </Select>
                            </p>
                            <p>
                                <h6>Пропуски</h6>
                            <input
                                id="standard-full-width"
                                label="Пропуски"
                                helperText="Значение и более"
                                type="number"
                                fullWidth
                                name="missed"

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