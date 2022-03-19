// Awards>Award>AwardCard, AwardEditForm
import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

import { Row, Col } from "react-bootstrap";

function Award({ award, setAwards, isEditable }) {
  // useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Row>
          <Col md={1} >
            <h3>🏆</h3>
          </Col>
          <Col>
            <AwardCard
              award={award}
              setAwards={setAwards}
              isEditable={isEditable}
              setIsEditing={setIsEditing}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Award;
