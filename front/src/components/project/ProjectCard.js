import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const ProjectCard = ({ project, isEditable, setIsEditing }) => {

    return (
        <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{project.title}</span>
            <br />
            <span className="text-muted">{project.description}</span>
            <br />
            <span className="text-muted me-3">{project.from_date}</span>
            <span className="text-muted">{project.to_date}</span>
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

export default ProjectCard