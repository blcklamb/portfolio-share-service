import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const ProjectAddForm = ({ portfolioOwnerId, setProjects, setIsAdding }) => {

    /* 
    상태 생성
    - title (프로젝트 제목) 
    - description (상세 내역)
    - from_date (시작일)
    - to_date (종료일)
    */
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [from_date, setFromDate] = useState(new Date())
    const [to_date, setToDate] = useState(new Date())

    const handsubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const user_id = portfolioOwnerId
        
        // 생성 ("project/create" 엔드포인트로 post요청함.)
        await Api.post("project/create", {
            user_id: portfolioOwnerId,
            title,
            description,
            from_date,
            to_date
        })

        // (생성 후) 조회 ("projectlist/유저id" 엔드포인트로 get요청함.)
        const res = await Api.get("projectlist", user_id)
        setProjects(res.data)
        setIsAdding(false)
    }

    return (
        <div>
            <Form onSubmit={handsubmit}>
                <Form.Group controlId="formBasicTitle" className="mt-3">
                    <Form.Control 
                        type="text"
                        placeholder="프로젝트 제목"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDescription" className="mt-3">
                    <Form.Control
                        type="text"
                        placeholder="상세 내역"
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}   
                        required               
                    />
                </Form.Group>
                <Form.Group controlId="formBasicFromDate" className="mt-3">
                    <span>시작일</span>
                    <DatePicker
                        selected={from_date}
                        onChange={(date) => {setFromDate(date)}}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicToDate" className="mt-3">
                    <span>종료일</span>
                    <DatePicker
                        selected={to_date}
                        onChange={(date) => {setToDate(date)}}
                    />
                </Form.Group>
                <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                        <Button variant="primary" type="submit" className="me-3">확인</Button>
                        <Button variant="secondary" onClick={() => setIsAdding(false)}>취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default ProjectAddForm