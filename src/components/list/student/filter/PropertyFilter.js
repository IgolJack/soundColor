import React, { Component } from "react";

import { Collapse, Select, InputNumber, Row, Col } from "antd";

const { Panel } = Collapse;

const courses = [
  {
    label: "Все курсы",
    value: "",
    name: "course",
  },
  {
    label: "Первый курс",
    value: "Первый курс",
    name: "course",
  },
  {
    label: "Второй курс",
    value: "Второй курс",
    name: "course",
  },
  {
    label: "Третий курс",
    value: "Третий курс",
    name: "course",
  },
  {
    label: "Четвертый курс",
    value: "Четвертый курс",
    name: "course",
  },
  {
    label: "Пятый курс",
    value: "Пятый курс",
    name: "course",
  },
];

const levels = [
  {
    label: "Все уровни",
    value: "",
    name: "lvl",
  },
  {
    label: "Первый уровень",
    value: "1",
    name: "lvl",
  },
  {
    label: "Второй уровень",
    value: "2",
    name: "lvl",
  },
  {
    label: "Третий уровень",
    value: "3",
    name: "lvl",
  },
  {
    label: "Четвертый уровень",
    value: "4",
    name: "lvl",
  },
  {
    label: "Пятый уровень",
    value: "5",
    name: "lvl",
  },
];

class PropertyFilter extends Component {
  state = {
    course: this.props.course,
    lvl: this.props.lvl,
    missed: this.props.missed,
    filterName: {},
  };

  onInputNumberChange = (value) => {
    console.log(value);
    let key = { value: value, name: "missed" };
    console.log(key);

    this.setState({ missed: value }, this.onChange(value, key));
    console.log(this.state.missed);
  };

  onChange = (value, key) => {
    console.log(key);
    console.log(key.name);
    console.log(key.value);

    this.props.updateData(key.name, key.value);

    if (key.value !== "") {
      this.setState(
        { filterName: { ...this.state.filterName, [key.name]: key.value } },
        () => this.props.updateData("filterName", this.state.filterName)
      );
    } else if (key.name in this.state.filterName && key.value === "") {
      //console.log("обнуление")
      const { filterName } = this.state;
      delete filterName[`${key.name}`];
      this.setState({ filterName: filterName }, () =>
        this.props.updateData("filterName", this.state.filterName)
      );
    }
    console.log(this.state.filterName);
  };

  render() {
    return (
      <div>
        <Collapse ghost>
          <Panel header="Фильтры" key="1">
            <Row style={{height: '20px'}} align='middle'>
              <Col xs={7} sm={6} md={6} lg={6} xl={6} xll={6}>
                <Select
                  style={{ width: "100%" }}
                  key="course"
                  placeholder="Курс"
                  id="demo-simple-select"
                  value={this.props.course}
                  options={courses}
                  onChange={this.onChange}
                ></Select>
              </Col>
              <Col
                xs={{ span: 7, offset: 1 }}
                sm={{ span: 6, offset: 3 }}
                md={{ span: 6, offset: 3 }}
                lg={{ span: 6, offset: 3 }}
                xl={{ span: 6, offset: 3 }}
                xll={{ span: 6, offset: 3 }}
              >
                <Select
                  style={{ width: "100%" }}
                  key="lvl"
                  placeholder="Уровень"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.props.lvl}
                  options={levels}
                  onChange={this.onChange}
                ></Select>
              </Col>
              <Col
                xs={{ span: 7, offset: 1 }}
                sm={{ span: 6, offset: 3 }}
                md={{ span: 6, offset: 3 }}
                lg={{ span: 6, offset: 3 }}
                xl={{ span: 6, offset: 3 }}
                xll={{ span: 6, offset: 3 }}
              >
                <InputNumber
                  id="standard-full-width"
                  placeholder="Пропуски"
                  type="number"
                  style={{ width: "100%" }}
                  name="missed"
                  value={this.props.missed}
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
