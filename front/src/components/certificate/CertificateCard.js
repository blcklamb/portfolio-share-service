import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const CertificateCard = ({ certificate, isEditable, setIsEditing }) => {

    return (
        <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{certificate.title}</span>
            <br />
            <span className="text-muted">{certificate.description}</span>
          </Col>
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
    )
}

export default CertificateCard