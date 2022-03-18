// 최상위 컴포넌트입니다.
// Portfolio>Edus
// Edus>Edu, EduAddForm
// Edu>EduCard, EduEditForm

// 실행 전 임시 데이터 필요 여부를 확인한 뒤 제거 혹은 유지해주세요.

import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import Edu from "./Edu";
import EduAddForm from "./EduAddForm";

function Edus({ portfolioOwnerId, isEditable }) {
    // useState로 edus 상태를 생성함.
    const [edus, setEdus] = useState([]);
    // useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // "educationlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
        Api.get("educationlist", portfolioOwnerId).then((res) => setEdus(res.data));
        // 임시 데이터        
        // setEdus([{
        //     "user_id": '',
        //     "school":"좋은학교",
        //     "major":"좋은전공",
        //     "position":"재학 중"
        // }])
    }, [portfolioOwnerId]);


    return (
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                <hr />
                {edus.map((edu) => (
                    <Edu
                        key={edu.id}
                        edu={edu}
                        setEdus={setEdus}
                        isEditable={isEditable}
                    />
                ))}
                {/* 로그인 성공 시 isEditable은 true가 됩니다 */}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button onClick={() => setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
                {/* + 버튼 클릭 시 isAdding은 true가 됩니다 */}
                {isAdding && (
                    <EduAddForm
                        portfolioOwnerId={portfolioOwnerId}
                        setEdus={setEdus}
                        setIsAdding={setIsAdding}
                    />
                )}
            </Card.Body>
        </Card>
    );
}

export default Edus;
