import React, { useEffect } from "react";
import { db } from "../../firebase/firebase";
import EditDetails from "./studentChange/EditDetails";
import {
  Card,
  Timeline,
  Skeleton,
  Popover,
  Input,
  Select,
  message,
} from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { getAllByDisplayValue } from "@testing-library/react";

class InfoStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      loading: true,
      icon: true,
      newLvl: "",
      newName: "",
      newCourse: "",
      newLateness: "",
      newMissed: "",
      newDisgrace: "",
      newResponsible: "",
      newConcert: "",
      newEquipment: "",
      newDischarges: "",
      newCount: "",
      newExchange: "",
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.outputInfo = this.outputInfo.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { studentId } = params;
    this.setState({ id: studentId });
    var docRef = db.collection("students").doc(studentId);
    this.getInfo(docRef);

  }

  getInfo(docRef) {
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return docRef.get();
        }
      })
      .then((doc) => {
        const data = doc.data();
        this.setState({ student: data, loading: !this.state.loading });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

LvlChange = (visible) => {
    if (visible == false && this.state.newLvl) {
    db.collection("students").doc(this.state.student.id).update({
      lvl: this.state.newLvl, });
     this.state.student.lvl = this.state.newLvl;
     this.setState({ newLvl: this.state.student.lvl });
    }
  }  
  
NameChange = (visible) => {
    if (visible == false && this.state.newName) {
    db.collection("students").doc(this.state.student.id).update({
      name: this.state.newName, });
     this.state.student.name = this.state.newName;
     this.setState({ newName: this.state.student.name });
    }
  }
  
  CourseChange = (visible) => {
    if (visible == false && this.state.newCourse) {
    db.collection("students").doc(this.state.student.id).update({
      course: this.state.newCourse, });
     this.state.student.course = this.state.newCourse;
     this.setState({ newCourse: this.state.student.course });
    }
  }

  LatenessChange = (visible) => {
    if (visible == false && this.state.newLateness) {
    db.collection("students").doc(this.state.student.id).update({
      lateness: this.state.newLateness, });
     this.state.student.lateness = this.state.newLateness;
     this.setState({ newLateness: this.state.student.lateness });
    }
  }
  
  MissedChange = (visible) => {
    if (visible == false && this.state.newMissed) {
    db.collection("students").doc(this.state.student.id).update({
      missed: this.state.newMissed, });
     this.state.student.missed = this.state.newMissed;
     this.setState({ newMissed: this.state.student.missed });
    }
  }
  
  DisgraceChange = (visible) => {
    if (visible == false && this.state.newDisgrace) {
    db.collection("students").doc(this.state.student.id).update({
      disgrace: this.state.newDisgrace, });
     this.state.student.disgrace = this.state.newDisgrace;
     this.setState({ newDisgrace: this.state.student.disgrace });
    }
  }

  ResponsibleChange = (visible) => {
    if (visible == false && this.state.newResponsible) {
    db.collection("students").doc(this.state.student.id).update({
      responsible: this.state.newResponsible, });
     this.state.student.responsible = this.state.newResponsible;
     this.setState({ newResponsible: this.state.student.responsible });
    }
  }
  
  ConcertChange = (visible) => {
    if (visible == false && this.state.newConcert) {
    db.collection("students").doc(this.state.student.id).update({
      concert: this.state.newConcert, });
     this.state.student.concert = this.state.newConcert;
     this.setState({ newConcert: this.state.student.concert });
    }
  }

  EquipmentChange = (visible) => {
    if (visible == false && this.state.newEquipment) {
    db.collection("students").doc(this.state.student.id).update({
      equipment: this.state.newEquipment, });
     this.state.student.equipment = this.state.newEquipment;
     this.setState({ newEquipment: this.state.student.equipment });
    }
  }
  
  ExchangeChange = (visible) => {
    if (visible == false && this.state.newExchange) {
    db.collection("students").doc(this.state.student.id).update({
      exchange: this.state.newExchange, });
     this.state.student.exchange = this.state.newExchange;
     this.setState({ newExchange: this.state.student.exchange });
    }
  }

  DischargesChange = (visible) => {
    if (visible == false && this.state.newDischarges) {
    db.collection("students").doc(this.state.student.id).update({
      discharges: this.state.newDischarges, });
     this.state.student.discharges = this.state.newDischarges;
     this.setState({ newDischarges: this.state.student.discharges });
    }
  }
  
  CountChange = (visible) => {
    if (visible == false && this.state.newCount)
     { 
    db.collection("students").doc(this.state.student.id).update({
      count: this.state.newCount, });
    this.state.student.count = this.state.newCount;
     this.setState({ newCount: this.state.student.count });
    }
  }


  outputInfo() {
   
    const contentLvl = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={1}
          max={10}
          defaultValue={this.state.student.lvl}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newLvl: e.target.value });
            console.log(this.state.newLvl);
          }}
        />
      </div>
    );
    const contentName = (
      <div>
        <Input
          style={{ width: "100%" }}
          defaultValue={this.state.student.name}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newName: e.target.value });
            console.log(this.state.newName);
          }}
        />
      </div>
    );
    const contentCourse = (
      <div>
        <Select
          style={{ width: "100%" }}
          defaultValue={this.state.student.course}
          onChange={(e) => {
            console.log(e)
            this.setState({ newCourse: String(e)});
          }}
        >
          <Select.Option value='Первый курс'>Первый курс</Select.Option>
          <Select.Option value="Второй курс">Второй курс</Select.Option>
          <Select.Option value="Третий курс">Третий курс</Select.Option>
          <Select.Option value="Четвертый курс">Четвертый курс</Select.Option>
          <Select.Option value="Пятый курс">Пятый курс</Select.Option>
        </Select>
      </div>
    );
    const contentLateness = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.lateness}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newLateness: e.target.value });
            console.log(this.state.newLateness);
          }}
        />
      </div>
    );
    const contentMissed = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.missed}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newMissed: e.target.value });
            console.log(this.state.newMissed);
          }}
        />
      </div>
    );
    const contentDisgrace = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.disgrace}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newDisgrace: e.target.value });
            console.log(this.state.newDisgrace);
          }}
        />
      </div>
    );
    const contentResponsible = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.responsible}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newResponsible: e.target.value });
            console.log(this.state.newResponsible);
          }}
        />
      </div>
    );
    const contentConcert = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.concert}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newConcert: e.target.value });
            console.log(this.state.newConcert);
          }}
        />
      </div>
    );

    const contentEquipment = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.equipment}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newEquipment: e.target.value });
            console.log(this.state.newEquipment);
          }}
        />
      </div>
    );
    const contentDischarges = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.discharges}
          onChange={(e) => {
            console.log(e.target.value)
            this.setState({ newDischarges: e.target.value });
            console.log(this.state.newDischarges);
           
          }}
        />
      </div>
    );
    const contentСount = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.count}
          onChange={(e) => {
            this.setState({ newCount: e.target.value });
            console.log(this.state.newCount);
           
          }}
        />
      </div>
    );
    const contentExchange = (
      <div>
        <Input
          type="number"
          style={{ width: "100%" }}
          min={0}
          defaultValue={this.state.student.exchange}
          onChange={(e) => {
            this.setState({ newExchange: e.target.value });
            console.log(this.state.newExchange);
          }}
        />
      </div>
    );

    return (
      <div>
        <Skeleton
          active
          loading={this.state.loading}
          paragraph={{ rows: 25 }}
          title={false}
        >
          <Popover
            content={contentName}
            title="Задайте имя"
            trigger="click"
            onVisibleChange={this.NameChange}
          >
            <span style={{ fontSize: "calc(1em + 4vw)" }}>
              {this.state.student.name}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover content={contentLvl} title="Задайте уровень" trigger="click"
          onVisibleChange={this.LvlChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Уровень - {this.state.student.lvl}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover content={contentCourse} title="Задайте курс" trigger="click" onVisibleChange={this.CourseChange}>
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              {this.state.student.course}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover
            content={contentLateness}
            title="Задайте количество опазданий"
            trigger="click"
            onVisibleChange={this.LatenessChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Опазданий - {this.state.student.lateness}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover
            content={contentMissed}
            title="Задайте количество пропусков"
            trigger="click"
            onVisibleChange={this.MissedChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Пропусков - {this.state.student.missed}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover
            content={contentDisgrace}
            title="Задайте количество позора"
            trigger="click"
            onVisibleChange={this.DisgraceChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Опозорил - {this.state.student.disgrace}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover
            content={contentResponsible}
            title="Задайте количество ответсвтенности"
            trigger="click"
            onVisibleChange={this.ResponsibleChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Ответсвтенн - {this.state.student.responsible}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover
            content={contentConcert}
            title="Задайте кол-во песещённых мероприятий"
            trigger="click"
            onVisibleChange={this.ConcertChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Мероприятий - {this.state.student.concert}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover
            content={contentEquipment}
            title="Раз принесено свое оборудование"
            trigger="click"
            onVisibleChange={this.EquipmentChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Оборудование - {this.state.student.equipment}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover
            content={contentDischarges}
            title="Выписывания"
            trigger="click"
            onVisibleChange={this.DischargesChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Выписываний - {this.state.student.discharges}
            </span>
            <EditTwoTone />
          </Popover>
          <br />
          <Popover content={contentСount} title="Выписывания" trigger="click" onVisibleChange={this.CountChange}>
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Записей сдано - {this.state.student.count}
            </span>
            <EditTwoTone />
          </Popover>

          <br />
          <Popover
            content={contentExchange}
            title="Замен"
            trigger="click"
            onVisibleChange={this.ExchangeChange}
          >
            <span style={{ fontSize: "calc(1em + 3vw)" }}>
              Замен - {this.state.student.exchange}
            </span>
            <EditTwoTone />
          </Popover>

        </Skeleton>
      </div>
    );
  }

  render() {
    return (
      <div>
        <this.outputInfo />
      </div>
    );
  }
}

export default InfoStudent;
