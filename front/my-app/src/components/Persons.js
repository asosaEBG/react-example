import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Tabs, Tab } from "react-bootstrap";
import Person from "./Person";
const Persons = () => {
  const [contador] = useState(0);
  const [cambios, setCambios] = useState(0);
  const [validated, setValidated] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_DEFAULT_URL + "/api/read/person", {
      cache: "no-cache",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPeople(data.resultado);
      });
  }, [contador]);
  useEffect(() => {}, [cambios]);
  const onSubmit = (evt) => {
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      evt.preventDefault();
      setCargando(true);
      setCambios(cambios + 1);
      const info = { name: name, lastname: lastname, email: email };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      };
      fetch(
        process.env.REACT_APP_DEFAULT_URL + "/api/create/person",
        requestOptions,
        { cache: "no-cache" }
      )
        .then((res) => {
          return res.json();
        })
        .then((datos) => {
          window.location.reload();
        });
    }
    setValidated(true);
    setCambios(cambios + 1);
  };
  const onChange = (evt) => {
    if (evt.target.name == "name") {
      setName(evt.target.value);
    } else if (evt.target.name == "lastname") {
      setLastName(evt.target.value);
    } else if (evt.target.name == "email") {
      setEmail(evt.target.value);
    }
    setCambios(cambios + 1);
  };
  return (
    <Container fluid style={{ padding: "5%" }}>
      <Row>
        <h1>CRUD personas ejemplo REACT</h1>
      </Row>
      <Row>
        <Tabs defaultActiveKey="registro" className="mb-3">
          <Tab eventKey="registro" title="Registrar Persona">
            <Container style={{ padding: "3%" }}>
              <Row style={{ padding: "2%", textAlign: "left" }}>
                <h3>Registrar persona</h3>
              </Row>
              <Form onSubmit={onSubmit} noValidate validated={validated}>
                <Row>
                  <Form.Group className="mb-3" controlId="nombres">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      value={name}
                      disabled={cargando}
                      required
                      type="text"
                      style={{ resize: "none" }}
                      placeholder="Ingrese los nombres de la persona"
                      name="name"
                      onChange={onChange}
                    />
                    <Form.Control.Feedback>Ok</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Por favor, completa este campo
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="apellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      value={lastname}
                      disabled={cargando}
                      required
                      type="text"
                      style={{ resize: "none" }}
                      placeholder="Ingrese los apellidos de la persona"
                      name="lastname"
                      onChange={onChange}
                    />
                    <Form.Control.Feedback>Ok</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Por favor, completa este campo
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      value={email}
                      disabled={cargando}
                      required
                      type="text"
                      style={{ resize: "none" }}
                      placeholder="Ingrese el correo electrónico de la persona"
                      name="email"
                      onChange={onChange}
                    />
                    <Form.Control.Feedback>Ok</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Por favor, completa este campo
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    disabled={cargando}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-tags"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                      <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                    </svg>
                    &nbsp;&nbsp;&nbsp;&nbsp;Registrar persona
                  </Button>
                </Row>
              </Form>
            </Container>
          </Tab>
          <Tab eventKey="Personas registradas" title="Personas registradas">
            <Container style={{ padding: "3%" }}>
              <Row style={{ padding: "2%", textAlign: "left" }}>
                <h3>Personas registradas: {people.length}</h3>
              </Row>
              {people.map((actual, indice) => (
                <Row key={indice}>
                  <Person person={actual} />
                </Row>
              ))}
            </Container>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};
export default Persons;
