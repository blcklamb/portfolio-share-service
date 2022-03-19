// Award>AwardCard
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function AwardCard({ award, setAwards, isEditable, setIsEditing }) {

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const delete_content = award.id

    alert("삭제 되었습니다.")
    await Api.delete(`awards/${delete_content}`);

    // "educatonlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("awardlist", award.user_id);

    setAwards(res.data);

  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
        </Col>
        {/* 로그인 성공 시 isEditable은 true가 됩니다 */}
        {isEditable && (
          <>
            <Col md="auto">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDelete}
                className="mr-3"
              >
                삭제
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
