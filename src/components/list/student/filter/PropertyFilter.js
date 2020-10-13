import React, { Component } from 'react';

import { Collapse, Select, InputNumber, Row, Col } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;

const courses = [
    {
        label: "Все курсы",
        value:  "",
        name: "course",
    },
    {
        label: "Первый курс",
        value:  "Первый курс",
        name: "course",
    },
    {
        label: "Второй курс",
        value:  "Второй курс",
        name: "course",
    },
    {
        label: "Третий курс",
        value:  "Третий курс",
        name: "course",
    },
    {
        label: "Четвертый курс",
        value:  "Четвертый курс",
        name: "course",
    },
    {
        label: "Пятый курс",
        value:  "Пятый курс",
        name: "course",
    },
]

const levels = [
    {
        label: "Все уровни",
        value:  "",
        name: "lvl",
    },
    {
        label: "Первый уровень",
        value:  "1",
        name: "lvl",
    },
    {
        label: "Второй уровень",
        value:  "2",
        name: "lvl",
    },
    {
        label: "Третий уровень",
        value:  "3",
        name: "lvl",
    },
    {
        label: "Четвертый уровень",
        value:  "4",
        name: "lvl",
    },
    {
        label: "Пятый уровень",
        value:  "5",
        name: "lvl",
    },
]


class PropertyFilter extends Component {
    
    state = {
        course: "",
        lvl: "",
        missed: "",
    }

    onInputNumberChange = (value) => {
        console.log(value)
        let key = { value: value, name: 'missed' }
        this.setState({ missed: value }, this.onChange(value, key))
        console.log(this.state.missed)
    }

    onChange = (value, key) => {
        console.log(key)
        this.props.onInputChange(key)
    }

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
                                    key="course"
                                    id="demo-simple-select"
                                    defaultValue={this.props.course}
                                    options={courses}
                                    onChange={this.onChange}
                                >
                                    
                                </Select>
                            </Col>
                            <Col xs={{span: 7, offset: 1}} sm={{span: 6, offset: 3}} md={{span: 6, offset: 3}} lg={{span: 6, offset: 3}} xl={{span: 6, offset: 3}} xll={{span: 6, offset: 3}}>
                                <h6>Уровень</h6>
                                <Select
                                    style={{width:'100%'}}
                                    key="lvl"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={this.props.lvl}
                                    options={levels}
                                    onChange={this.onChange}
                                >
                                </Select>
                            </Col>
                            <Col xs={{span: 6, offset: 2}} sm={{span: 6, offset: 3}} md={{span: 6, offset: 3}} lg={{span: 6, offset: 3}} xl={{span: 6, offset: 3}} xll={{span: 6, offset: 3}}>
                                <h6>Пропуски</h6>
                                <InputNumber
                                    id="standard-full-width"
                                    label="Пропуски"
                                    type="number"
                                    style={{width:'100%'}}
                                    name="missed"
                                    defaultValue={this.props.missed}
                                    min={0}
                                    onChange={this.onInputNumberChange}
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