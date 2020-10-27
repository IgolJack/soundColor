import React from 'react';


const infoEventContent = () => {
    return (
        <div style={{ padding: "15px" }}>
          <Skeleton
            active
            loading={this.state.loading}
            paragraph={{ rows: 25 }}
            title={false}
          >
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Card style={{ borderRadius: "10px" }}>
                <Meta
                  title={`${this.state.event.typeOfEvent}: ${this.state.event.title}`}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </div>
  
            <div style={{ paddingBottom: "10px" }}>
              <Row>
                <Col xs={9} sm={10} md={10} lg={10} xl={10} xxl={10}>
                  <Card style={{ borderRadius: "10px", textAlign: "center" }}>
                    Стейдж-план: опвопшвыщацушк
                  </Card>
                </Col>
                <Col
                  xs={{ span: 9, offset: 6 }}
                  sm={{ span: 10, offset: 4 }}
                  md={{ span: 10, offset: 4 }}
                  lg={{ span: 10, offset: 4 }}
                  xl={{ span: 10, offset: 4 }}
                  xll={{ span: 10, offset: 4 }}
                >
                  <Card style={{ borderRadius: "10px", textAlign: "center" }}>
                    Форма одежды: {this.state.event.cloth}
                  </Card>
                </Col>
              </Row>
            </div>
  
            <div style={{ paddingBottom: "10px" }}>
              <Collapse
                expandIconPosition="right"
                style={{ borderRadius: "10px" }}
              >
                <Panel
                  header="Состав исполнителей"
                  key="1"
                  style={{ borderRadius: "10px" }}
                >
                  {this.state.cast.map((cast) => (
                    <Tag color="magenta">{cast}</Tag>
                  ))}
                </Panel>
              </Collapse>
            </div>
  
            <div>
              <Equipment />
            </div>
  
            <div style={{ paddingBottom: "10px" }}>
              <Card style={{ borderRadius: "10px" }}>
                <Card style={{ borderRadius: "10px", marginBottom: "10px" }}>
                  <Row>
                    <Col xs={9} sm={10} md={10} lg={10} xl={10} xxl={10}>
                      <Card
                        title="Дата/время сбора"
                        style={{ borderRadius: "10px", marginBottom: "10px" }}
                      >
                        {this.state.event.meetDate}, {this.state.event.meetTime}
                      </Card>
                    </Col>
                    <Col
                      xs={{ span: 14, offset: 1 }}
                      sm={{ span: 12, offset: 2 }}
                      md={{ span: 12, offset: 2 }}
                      lg={{ span: 12, offset: 2 }}
                      xl={{ span: 12, offset: 2 }}
                      xxl={{ span: 12, offset: 2 }}
                    >
                      <Card
                        title="Место сбора"
                        style={{ borderRadius: "10px", marginBottom: "10px" }}
                      >
                        {this.state.event.meetPlace}
                      </Card>
                    </Col>
                  </Row>
                </Card>
                <Card style={{ borderRadius: "10px" }}>
                  <Row>
                    <Col xs={9} sm={10} md={10} lg={10} xl={10} xxl={10}>
                      <Card
                        title="Дата/время начала мероприятия"
                        style={{ borderRadius: "10px", marginBottom: "10px" }}
                      >
                        {this.state.event.eventDate}, {this.state.event.eventTime}
                      </Card>
                    </Col>
                    <Col
                      xs={{ span: 14, offset: 1 }}
                      sm={{ span: 12, offset: 2 }}
                      md={{ span: 12, offset: 2 }}
                      lg={{ span: 12, offset: 2 }}
                      xl={{ span: 12, offset: 2 }}
                      xxl={{ span: 12, offset: 2 }}
                    >
                      <Card
                        title="Место проведения мероприятия"
                        style={{ borderRadius: "10px", marginBottom: "10px" }}
                      >
                        {this.state.event.eventPlace}
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Card>
            </div>
  
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Card style={{ borderRadius: "10px" }}>
                Описание: {this.state.event.description}
              </Card>
            </div>
  
            <div style={{ paddingBottom: "10px" }}>
              <Collapse
                expandIconPosition="right"
                style={{ borderRadius: "10px" }}
              >
                <Button
                  block
                  shape="round"
                  type="primary"
                  onClick={this.addUserToEvent}
                >
                  Принять участие
                </Button>
                <Panel
                  header="Студенты"
                  key="2"
                  extra={"2/5"}
                  style={{ borderRadius: "10px" }}
                >
                  <this.TakeAPart />
                </Panel>
              </Collapse>
            </div>
  
            <div style={{ paddingBottom: "10px" }}>
              <Collapse
                expandIconPosition="right"
                style={{ borderRadius: "10px" }}
              >
                <Panel
                  header="Оборудование"
                  key="3"
                  style={{ borderRadius: "10px" }}
                >
                  {this.state.equipment &&
                    this.state.equipment.map((equip) => {
                      return (
                        <div>
                          <Divider orientation="left">{equip.equipGroup}</Divider>
                          {equip.groupChildren &&
                            equip.groupChildren.map((child) => (
                              <p>
                                {child.equipType}: {child.quantity}
                              </p>
                            ))}
                        </div>
                      );
                    })}
                </Panel>
              </Collapse>
            </div>
  
            <p>ID = {this.state.event.id}</p>
            <p>Название мероприятия = {this.state.event.title}</p>
            <p>Время начала = {this.state.event.start}</p>
            <p>Время конца = {this.state.event.end}</p>
          </Skeleton>
        </div>
      );
}

export default infoEventContent;