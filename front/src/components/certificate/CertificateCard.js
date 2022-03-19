import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

const CertificateCard = ({ certificate, setCertificates, isEditable, setIsEditing }) => {
  
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const delete_content = certificate.id

    await Api.delete(`certificates/${delete_content}`);

    // "certificatelist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("certificatelist", certificate.user_id);
    alert("삭제되었습니다.")

    setCertificates(res.data);
  }

  return (
    <Card.Text>
    <Row className="align-items-center">
      <Col>
        <span>{certificate.title}</span>
        <br />
        <span className="text-muted">{certificate.description}</span>
        <br />
        <span className="text-muted">{certificate.when_date.slice(0, 10)}</span>
      </Col>
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
              onClick={(e) => {if(window.confirm("해당 자격증을 삭제하시겠습니까?")){handleDelete(e)}}}
              className="mr-3"
            >
              삭제
            </Button>
          </Col>
      </>  
      )}
    </Row>
  </Card.Text>
  )
}

export default CertificateCard