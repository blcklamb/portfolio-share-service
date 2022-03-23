// Blogs>BlogAddForm
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function BlogAddForm({ portfolioOwnerId, setBlogs, onClose }) {
  // useState로 service 상태를 생성함.
  const [service, setService] = useState("");
  // useState로 url 상태를 생성함.
  const [url, setUrl] = useState("");

  // 추가하려는 정보가 입력됐는지 여부를 확인함.
  const isServiceValid = !!service;
  const isUrlValid = !!url;
  const isUrlHasHttps = url.startsWith('https://') || url.startsWith('http://');
  const isUrlCompleted = isUrlValid && isUrlHasHttps;
  const isFormValid = isServiceValid && isUrlValid;

  // const handleUrl = (e) => {
  //   let newUrl = e.target.value
  //   setUrl(() => {
  //     if(!isUrlHasHttps) {
  //       return "https://"+newUrl;
  //     } else {
  //       return newUrl
  //     }
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // setUrl 함수가 실행되지 않음...
    // setUrl((current) => {
    //   if(!isUrlHasHttps) {
    //     return "https://"+current;
    //   } else {
    //     return current
    //   }
    // })
    
    // "blog/create" 엔드포인트로 post요청함.
    await Api.post("blog/create", {
      user_id: portfolioOwnerId,
      service,
      url,
    });

    // "bloglist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("bloglist", user_id);
    // blogs를 response의 data로 세팅함.
    setBlogs(res.data);
    // blog를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicService">
        <Form.Select
          onChange={(e) => setService(e.target.value)}>
          <option>사이트 선택</option>
          <option value="Github">Github</option>
          <option value="Gitlab">Gitlab</option>
          <option value="Tistory">Tistory</option>
          <option value="Velog">Velog</option>
          <option value="Naver">Naver</option>
          <option value="Brunch">Brunch</option>
          <option value="private">개인 사이트</option>
        </Form.Select>
        {!isServiceValid && (
          <Form.Text className="text-success m-2">
            사이트 입력 필수
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="formBasicUrl" className="mt-3">
        <Form.Control
          type="text"
          placeholder="url"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
        />
        {!isUrlCompleted && (
          <Form.Text className="text-success m-2">
            url의 형식에 맞지 않습니다.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" disabled={!isFormValid}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => onClose()}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default BlogAddForm;
