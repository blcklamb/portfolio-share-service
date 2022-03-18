// Edus>EduAddForm>EduRadioForm
import React, { useState } from "react";
import { Button, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import * as Api from "../../api";

import EduRadioForm from "./EduRadioForm";

function EduAddForm({ portfolioOwnerId, setEdus, setIsAdding }) {
  // useState로 school 상태를 생성함.
  const [school, setSchool] = useState("");
  // useState로 major 상태를 생성함.
  const [major, setMajor] = useState("");
  // useState로 position 상태를 생성함.
  const [position, setPosition] = useState();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;
    // "education/create" 엔드포인트로 post요청함.
    await Api.post("education/create", {
      user_id: portfolioOwnerId,
      school,
      major,
      position,
    });

    // "educatonlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educationlist", user_id);
    // edus를 response의 data로 세팅함.
    setEdus(res.data);
    // edu를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mt-3">
        <Col md>
          <Form.Group controlId="formBasicSchool">
            <FloatingLabel
              controlId="floatingInput"
              label="학교 이름"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="학교 이름"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group controlId="formBasicMajor" >
            <FloatingLabel
              controlId="floatingInput"
              label="전공"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="전공"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formBasicRadio">
        <EduRadioForm
          position={position}
          setPosition={setPosition}
        />
      </Form.Group>


      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EduAddForm;
