import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const CertificateAddForm = ({ portfolioOwnerId, setCertificates, onClose }) => {

    /* 
    상태 생성
    - title (자격증 제목) 
    - description (상세 내역)
    - when_date (취득일)
    */
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [when_date, setWhenDate] = useState(new Date())

    const handsubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const user_id = portfolioOwnerId
        
        // 생성 ("certificate/create" 엔드포인트로 post요청함.)
        await Api.post("certificate/create", {
            user_id: portfolioOwnerId,
            title,
            description,
            when_date
        })

        // (생성 후) 조회 ("certificatelist/유저id" 엔드포인트로 get요청함.)
        const res = await Api.get("certificatelist", user_id)
        setCertificates(res.data)
        onClose()
    }

    return (
        <div>
            <Form onSubmit={handsubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control 
                        type="text"
                        placeholder="자격증 제목"
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
                <Form.Group controlId="formBasicWhenDate" className="mt-3">
                    <span>취득일</span>
                    <DatePicker
                        selected={when_date}
                        onChange={(date) => {setWhenDate(date)}}
                    />
                </Form.Group>
                <Form.Group as={Row} className="mt-3 text-center">
                    <Col sm={{ span: 20 }}>
                        <Button variant="primary" type="submit" className="me-3">확인</Button>
                        <Button variant="secondary" onClick={() => onClose()}>취소</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CertificateAddForm