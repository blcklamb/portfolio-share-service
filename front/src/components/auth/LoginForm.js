import React, { useEffect, useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useAlert } from "react-alert";

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import CreditForm from "../common/CreditForm"
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import axios from "axios";

function LoginForm() {
    // 로그아웃을 했을 때 로그인 화면으로 navaigate되기 때문에
    // 로그인 페이지 렌더링 시에 백엔드 서버로 보내 refresh token이 쿠키에 있을 경우 삭제하도록 함
    useEffect(() => {
        axios.get("http://" + window.location.hostname + ":" + process.env.REACT_APP_SERVER_PORT);
    }, []);

    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    // useState로 email 상태를 생성함.
    const [email, setEmail] = useState("");
    // useState로 password 상태를 생성함.
    const [password, setPassword] = useState("");
    // useAlert로 alert 함수 이용함.
    const alert = useAlert();

    // 이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = (email) => {
        return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    // 위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 4;
    // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
    const isFormValid = isEmailValid && isPasswordValid;

    // 이메일로 받은 링크로 접속 시 로그인 알림
    const alertLoginValidated = useCallback(async () => {
        let a = window.location.search.split("?");
        if (a.length === 1 && a[0] === "") return {};
        else if (a[1] === "validation=true") {
            alert.info("이메일 인증이 완료되었습니다.");
            alert.info("로그인 해주세요.");
        }
    }, [alert]);

    useEffect(() => {
        alertLoginValidated();
    }, [alertLoginValidated]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // "user/login" 엔드포인트로 post요청함.
            const res = await Api.post("user/login", {
                email,
                password,
            });
            // 유저 정보는 response의 data임.
            const user = res.data;
            // JWT 토큰은 유저 정보의 token임.
            const jwtToken = user.token;
            // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
            sessionStorage.setItem("userToken", jwtToken);

            // cookie로 보내진 refresh token을 가져와서 다시 쿠키에 저장
            const cookies = new Cookies();
            const refreshToken = cookies.get("refreshToken");
            cookies.set("refreshToken", refreshToken, { secure: true, httpOnly: true });

            // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

            alert.success("로그인 성공하였습니다.");
            // 기본 페이지로 이동함.
            navigate("/", { replace: true });
        } catch (err) {
            const errorMsg = err.response.data;
            let errorArr = errorMsg.substring(1, errorMsg.length - 1).split(". ");
            errorArr.forEach((err, index) => {
                const isLast = index === errorArr.length - 1;
                return isLast ? alert.error(err) : alert.error(err + ".");
            });
        }
    };

    const handleFailure = async (result) => {
        console.log(result);
    };

    const handleLogin = async (googleData) => {
        try {
            const user = await Api.post("login/google", {
                token: googleData.tokenId,
            }).then((res) => {
                return res.data;
            });
            // JWT 토큰은 유저 정보의 token임.
            const jwtToken = user.token;
            // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
            sessionStorage.setItem("userToken", jwtToken);
            // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

            // 기본 페이지로 이동함.
            navigate("/", { replace: true });
        } catch (err) {
            console.log("로그인에 실패하였습니다.\n", err);
        }
    };

    const githubLogin = () => {
        const base = "https://github.com/login/oauth/authorize";
        const params = new URLSearchParams({
            client_id: process.env.REACT_APP_GITHUB_ID,
            scope: "read:user",
        }).toString();
        const url = `${base}?${params}`;
        return (window.location.href = url);
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col lg={8}>
                    <Row>
                        <CreditForm />
                    </Row>
                    <Form onSubmit={handleSubmit} className="login-form">
                        <h4>소셜 로그인</h4>
                        <hr></hr>
                        <Row className="mb-5 text-center">
                            <Col>
                                <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} buttonText="구글로 로그인하기" onSuccess={handleLogin} onFailure={handleFailure} cookiePolicy={"single_host_origin"} />
                            </Col>
                            <Col>
                                <Button variant="secondary" style={{ fontSize: 14, height: 43, padding: 10 }} onClick={githubLogin}>
                                    😺&nbsp;&nbsp;&nbsp;&nbsp;GitHub로 로그인하기
                                </Button>
                            </Col>
                        </Row>
                        <h4>이메일 로그인</h4>
                        <hr></hr>
                        <Row>
                            <Form.Group controlId="loginEmail">
                                <Form.Label>이메일 주소</Form.Label>
                                <Form.Control type="email" autoComplete="on" value={email} onChange={(e) => setEmail(e.target.value)} />
                                {!isEmailValid && <Form.Text className="text-success">이메일 형식이 올바르지 않습니다.</Form.Text>}
                            </Form.Group>

                            <Form.Group controlId="loginPassword" className="mt-3">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
                                {!isPasswordValid && <Form.Text className="text-success">비밀번호는 4글자 이상입니다.</Form.Text>}
                            </Form.Group>

                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col sm={{ span: 20 }}>
                                    <Button variant="primary" type="submit" disabled={!isFormValid}>
                                        로그인
                                    </Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col sm={{ span: 20 }}>
                                    <Button variant="light" onClick={() => navigate("/register")}>
                                        회원가입하기
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;
