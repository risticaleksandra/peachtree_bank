import React from "react";
import { Container, Navbar, Col, Row } from "react-bootstrap";
import TranferMoneyForm from "../components/transferForm/TransferMoneyForm";
import TranferTransactionsList from "../components/transferList/TransferTransactionsList";
import logo from "../public/assets/logo.jpg";
import background from "../public/assets/background.jpg";

const DefaultPage = () => {
  return (
    <Container className="wrapper" fluid style={{ height: "100vh" }}>
      <Navbar
        bg="light"
        expand="lg"
        className="header"
        style={{ padding: "1.5rem 5rem" }}
      >
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
      </Navbar>
      <Container
        fluid
        style={{ backgroundImage: `url(${background})` }}
        className="pageBody"
      >
        <Row className="homeBody">
          <Col className="homeClm-1" xl={3} md={5}>
            <TranferMoneyForm />
          </Col>
          <Col className="homeClm-2" xl={7} md={7}>
            <TranferTransactionsList />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default DefaultPage;
