// EduEditForm>EduRadioForm
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import EduRadioForm from "./EduRadioForm";


function EduEditForm({ currentEdu, setEdus, setIsEditing }) {
    // useState로 school 상태를 생성함.
    const [school, setSchool] = useState(currentEdu.school);
    // useState로 major 상태를 생성함.
    const [major, setMajor] = useState(currentEdu.major);
    // useState로 position 상태를 생성함.
    const [position, setPosition] = useState(currentEdu.position);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // currentEdu의 user_id를 user_id 변수에 할당함.
        const user_id = currentEdu.user_id;
        // "educations/수상 id" 엔드포인트로 PUT 요청함.
        await Api.put(`educations/${currentEdu.id}`, {
            user_id,
            school,
            major,
            position,
        });

        // "educationlist/유저 id" 엔드포인트로 GET 요청함.
        const res = await Api.get("educationlist", user_id);
        // edus를 response의 data로 세팅함.
        setEdus(res.data);
        // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicSchool">
                <Form.Control
                    type="text"
                    placeholder="학교 이름"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicMajor" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="전공"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicRadio" >
                <EduRadioForm
                    position={position}
                    setPosition={setPosition}
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
}

export default EduEditForm;
