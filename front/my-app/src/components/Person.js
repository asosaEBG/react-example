import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Tabs, Tab, Col } from "react-bootstrap";
const Person = (props) => {
  const [contador] = useState(0);
  const [cambios, setCambios] = useState(0);
  const [validated, setValidated] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [lock, setLock] = useState(true);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    setName(props.person.name);
    setLastName(props.person.lastname);
    setEmail(props.person.email);
    setId(props.person._id);
  }, [contador, props.person]);
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
      const info = {
        name: name,
        lastname: lastname,
        email: email,
        _id: id,
      };
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      };
      fetch(
        process.env.REACT_APP_DEFAULT_URL + "/api/update/person",
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
  const deleteSelf = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      process.env.REACT_APP_DEFAULT_URL + "/api/delete/person/" + id,
      requestOptions,
      { cache: "no-cache" }
    )
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        window.location.reload();
      });
  };
  return (
    <Container style={{ padding: "3%" }}>
      <Row style={{ padding: "2%", textAlign: "left" }}>
        <h3>Person id: {props.person._id}</h3>
      </Row>
      <Row style={{ padding: "2%" }}>
        <Col xs={12} md={6} lg={4}>
          <Container fluid>
            <Row>
              <Button
                variant="outline-primary"
                onClick={() => {
                  if (!lock) {
                    setName(props.person.name);
                    setLastName(props.person.lastname);
                    setEmail(props.person.email);
                  }
                  setLock(!lock);
                  setCambios(cambios + 1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {lock && <strong>Editar persona</strong>}
                {!lock && <strong>Cancelar edición</strong>}
              </Button>
            </Row>
          </Container>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Container fluid>
            <Row>
              <Button variant="outline-danger" onClick={deleteSelf}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;<strong>Eliminar persona</strong>
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
      <Form onSubmit={onSubmit} noValidate validated={validated}>
        <Row>
          <Form.Group className="mb-3" controlId="nombres">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              value={name}
              disabled={cargando || lock}
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
              disabled={cargando || lock}
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
              disabled={cargando || lock}
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
            variant="outline-success"
            type="submit"
            disabled={cargando || lock}
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
            &nbsp;&nbsp;&nbsp;&nbsp;Guardar cambios
          </Button>
        </Row>
      </Form>
    </Container>
  );
};
export default Person;
