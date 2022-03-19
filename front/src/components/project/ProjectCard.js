import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

const ProjectCard = ({ project, setProjects, isEditable, setIsEditing }) => {

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const delete_content = project.id

    await Api.delete(`projects/${delete_content}`);

    // "projectlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projectlist", project.user_id);
    alert("삭제되었습니다.")

    setProjects(res.data);
  }

    return (
      <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{project.title}</span>
            <br />
            <span className="text-muted">{project.description}</span>
            <br />
            <span className="text-muted me-1">{project.from_date.slice(0, 10)}</span>
            <span>~</span>
            <span className="text-muted ms-1">{project.to_date.slice(0, 10)}</span>
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
                  onClick={(e) => {if(window.confirm("해당 프로젝트를 삭제하시겠습니까?")){handleDelete(e)}}}
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

export default ProjectCard