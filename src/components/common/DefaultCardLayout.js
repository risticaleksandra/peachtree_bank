import React from "react";
import { Row, Card, Col } from "react-bootstrap";

const DefaultCardLayout = ({ label, icon, component: Component, ...rest }) => {
  return (
    <Card bsPrefix="card">
      <Card.Header bsPrefix="bankCardHeader">
        <Row style={{ width: "100%" }}>
          <Col className="bankHeaderColIcon" xl={2}>
            <img className="bankCardIcon" src={icon} alt="logo" />
          </Col>
          <Col className="bankHeaderCol" xl={10}>
            <Card.Title style={{ fontSize: "2rem" }} className="cardHeading">
              {label}
            </Card.Title>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body style={{ padding: "4%" }}>
        <Component />
      </Card.Body>
    </Card>
  );
};

export default DefaultCardLayout;
