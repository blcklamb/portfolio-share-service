// Edu>EduCard
import { Card, Button, Row, Col } from "react-bootstrap";

function EduCard({ edu, isEditable, setIsEditing }) {
    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{edu.school}</span>
                    <br />
                    <span className="text-muted">{edu.major}</span>
                    <span className="text-muted"> ({edu.position})</span>
                </Col>
                {/* 로그인 성공 시 isEditable은 true가 됩니다 */}
                {isEditable && (
                    <Col xs lg="1">
                        <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => setIsEditing((prev) => !prev)}
                            className="mr-3"
                        >
                            편집
                        </Button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    );
}

export default EduCard;
