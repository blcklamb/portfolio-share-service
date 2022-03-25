import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import * as Api from "../../api";
import { DispatchContext } from "../../App";

function GithubLogin() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        const login = async () => {
            // try {
            const base = "https://github.com/login/oauth/access_token";
            const params = new URLSearchParams({
                client_id: process.env.REACT_APP_GITHUB_ID,
                client_secret: process.env.REACT_APP_GITHUB_SECRET,
                code: new URLSearchParams(location.search).get("code"),
            }).toString();
            const url = `${base}?${params}`;

            const access_token = await axios
                .post(url, {
                    headers: { Accept: "application/json" },
                })
                .then((res) => res.json())
                .then((data) => data.access_token);

            const user = await Api.get("login/github/callback", {
                body: { access_token },
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
            // } catch (error) {
            //     console.log(`❌ Error: ${error}`);
            // }

            // 기본 페이지로 이동함.
            navigate("/", { replace: true });
        };
        login();
    }, [location, navigate, dispatch]);

    return <div></div>;
}

export default GithubLogin;
