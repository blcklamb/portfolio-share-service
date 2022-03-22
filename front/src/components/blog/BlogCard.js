// Blog>BlogCard
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function BlogCard({ blog, setBlogs, isEditable, setIsEditing }) {

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const delete_content = blog.id

    alert("삭제 되었습니다.")
    await Api.delete(`blogs/${delete_content}`);

    // "educatonlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("bloglist", blog.user_id);

    setBlogs(res.data);

  };

  return (
      <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{blog.service}</span>
            <br />
            <span className="text-muted">{blog.url}</span>
          </Col>
          </Row>
          <Row className="mt-3 text-center">
          {/* 로그인 성공 시 isEditable은 true가 됩니다 */}
          {isEditable && (
            <>
            <Col sm={{ span: 20 }}>
                <Button
                  className="me-3"
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  편집
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDelete}
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

export default BlogCard;
