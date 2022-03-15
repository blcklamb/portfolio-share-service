import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

function Awards({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [awards, setAwards] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
    //임시 데이터
    setAwards([{
      "user_id":'',
      "title":"지상 최대 바보 대회",
      "description":"나는 최고의 바보입니다."
  }])
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.id}
            award={award}
            setAwards={setAwards}
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
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
