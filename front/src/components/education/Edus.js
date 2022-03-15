import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Edu from "./Edu";
import EduAddForm from "./EduAddForm";

function Edus({ portfolioOwnerId, isEditable }) {
    //useState로 edus 상태를 생성함.
    const [edus, setEdus] = useState([]);
    //useState로 isAdding 상태를 생성함.
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // "educationlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
        Api.get("educationlist", portfolioOwnerId).then((res) => setEdus(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                {edus.map((edu) => (
                    <Edu
                        key={edu.id}
                        edu={edu}
                        setEdus={setEdus}
                        isEditable={isEditable}
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <Button onClick={() => setIsAdding(true)}>+</Button>
                        </Col>
                    </Row>
                )}
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
