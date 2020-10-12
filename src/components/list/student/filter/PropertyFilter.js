import React, { Component } from 'react';

import { Collapse, Select, InputNumber, Row, Col } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;

class PropertyFilter extends Component {
    
    render() {
        return (
            <div>
                <Collapse>
                    <Panel header="Фильтры" key="1">
                        <Row>
                            <Col xs={7} sm={6} md={6} lg={6} xl={6} xll={6}>
                                <h6>Курс</h6>
                                <Select
                                    style={{width:'100%'}}
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
                            </Col>
                            <Col xs={{span: 7, offset: 1}} sm={{span: 6, offset: 3}} md={{span: 6, offset: 3}} lg={{span: 6, offset: 3}} xl={{span: 6, offset: 3}} xll={{span: 6, offset: 3}}>
                                <h6>Уровень</h6>
                                <Select
                                    style={{width:'100%'}}
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
                            </Col>
                            <Col xs={{span: 6, offset: 2}} sm={{span: 6, offset: 3}} md={{span: 6, offset: 3}} lg={{span: 6, offset: 3}} xl={{span: 6, offset: 3}} xll={{span: 6, offset: 3}}>
                                <h6>Пропуски</h6>
                                <InputNumber
                                    id="standard-full-width"
                                    label="Пропуски"
                                    helperText="Значение и более"
                                    type="number"
                                    style={{width:'100%'}}
                                    name="missed"
                                    min={0}
                                    onChange={this.props.onInputChange}
                                />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default PropertyFilter;