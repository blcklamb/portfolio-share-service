import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import * as Api from "../../api";
// import Cookies from "universal-cookie";
import axios from "axios";

// const handleLogin = async (googleData) => {
//     try {
//         const user = await Api.post("login/google", {
//             token: googleData.tokenId,
//         }).then((res) => {
//             return res.data;
//         });
//         // JWT 토큰은 유저 정보의 token임.
//         const jwtToken = user.token;
//         // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
//         sessionStorage.setItem("userToken", jwtToken);
//         // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
//         dispatch({
//             type: "LOGIN_SUCCESS",
//             payload: user,
//         });

//         // 기본 페이지로 이동함.
//         navigate("/", { replace: true });
//     } catch (err) {
//         console.log("로그인에 실패하였습니다.\n", err);
//     }
// };

function GithubLogin() {
    const location = useLocation();
    useEffect(() => {
        const token = async () => {
            const base = "https://github.com/login/oauth/access_token";
            const params = new URLSearchParams({
                client_id: process.env.REACT_APP_GITHUB_ID,
                client_secret: process.env.REACT_APP_GITHUB_SECRET,
                code: new URLSearchParams(location.search).get("code"),
            }).toString();
            const url = `${base}?${params}`;
            const response = await axios.post(url, {
                headers: {
                    Accept: "application/json",
                },
            });
            console.log(response);
        };
        token();
    }, [location]);

    return <h6>1</h6>;
}

export default GithubLogin;
