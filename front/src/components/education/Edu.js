// Edus>Edu>EduCard, EduEditForm
import React, { useState } from "react";
import EduCard from "./EduCard";
import EduEditForm from "./EduEditForm";

import { Row, Col } from "react-bootstrap";

function Edu({ edu, setEdus, isEditable }) {
    // useState로 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = useState(false);
    return (
        <>
            {isEditing ? (
                <EduEditForm
                    currentEdu={edu}
                    setEdus={setEdus}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <Row>
                    <Col md={1} >
                        <h3>👨‍🎓</h3>
                    </Col>
                    <Col>
                        <EduCard
                            edu={edu}
                            setEdus={setEdus}
                            isEditable={isEditable}
                            setIsEditing={setIsEditing}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
}

export default Edu;
