import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const ProjectEditForm = ({ currentProject, setProjects, setIsEditing }) => {

  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [from_date, setFromDate] = useState(new Date(currentProject.from_date))
  const [to_date, setToDate] = useState(new Date(currentProject.to_date))

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentProject의 user_id를 user_id 변수에 할당함.
    const user_id = currentProject.user_id;

    // "projects/프로젝트 id" 엔드포인트로 PUT 요청함.
    await Api.put(`awards/${currentProject.id}`, {
      user_id,
      title,
      description,
      from_date,
      to_date
    });

    // "projects/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("projectlist", user_id);
    setProjects(res.data);
    setIsEditing(false);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicTitle">
      <Form.Control
        type="text"
        placeholder="프로젝트 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Form.Group>
    <Form.Group controlId="formBasicDescription" className="mt-3">
      <Form.Control
        type="text"
        placeholder="상세 내역"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Form.Group>
    <Form.Group controlId="formBasicFromDate" className="mt-3">
        <DatePicker
            selected={from_date}
            onChange={(date) => {setFromDate(date)}}
        />
    </Form.Group>
    <Form.Group controlId="formBasicToDate" className="mt-3">
        <DatePicker
            selected={to_date}
            onChange={(date) => {setToDate(date)}}
        />
    </Form.Group>
    <Form.Group as={Row} className="mt-3 text-center mb-4">
      <Col sm={{ span: 20 }}>
        <Button variant="primary" type="submit" className="me-3">
          확인
        </Button>
        <Button variant="secondary" onClick={() => setIsEditing(false)}>
          취소
        </Button>
      </Col>
    </Form.Group>
  </Form>
  );
};

export default ProjectEditForm;
