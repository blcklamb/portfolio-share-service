import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  // useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  // useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  // useState로 imageBase64, image 상태를 생성함.
  const [imageBase64, setImageBase64] = useState([]);
  const [image, setImage] = useState(null)

  // useState로 이미지 편집 상태를 생성함.
  const [isImageEdit, setIsImageEdit] = useState(false)

  // 이미지 업로드를 위한 함수
  const handleImageUpload = (e) => {
    e.preventDefault();
    setImage(e.target.files);
    setImageBase64([])
    setIsImageEdit(true)
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            let base64Sub = base64.toString();
            setImageBase64(current => [...current, base64Sub])
          }
        }
      }
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userFormData = new FormData();
    if (!image) {userFormData.append("image", "")} 
    else { Object.values(image).forEach((file) => userFormData.append("image", file)); }

    userFormData.append("name", name);
    userFormData.append("description", description);

    // "user/current" 엔드포인트로 PUT 요청함.
    const res = await Api.imgPut(`user/current`, userFormData);
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="EditImage" className="mt-3">
            {!isImageEdit ? (
              <Card.Img
                style={{ width: "10rem", height: "8rem" }}
                className="mb-3"
                src={user?.image}
                alt="회원가입 시 업로드 (AWS 버킷 사용)"
              />
            ) : (
              <>
              {
                imageBase64.map((item) => {
                  return (
                    <img
                      className="my-3"
                      src={item}
                      value={image}
                      alt="First Slide"
                      style={{ width: "10rem", height: "8rem" }}
                    />
                  )
                })
              }
              </>
            )}


            <Form.Control className="mb-3"
              type="file"
              autoComplete="off"
              multiple="multiple"
              onChange={handleImageUpload}
              accept='image/*'
            />
          </Form.Group>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
