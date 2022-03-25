import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body{
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 1.5;
        margin: 0 auto;
        font-family: 
        "Noto Sans KR";
        word-break: keep-all;
        word-wrap: break-word;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    .card{
        background: ${({ theme }) => theme.bgColor};
        border: ${({ theme }) => theme.borderColor};
    }
    .btn-primary{
        background: #B1D6FC;
        border: #B1D6FC;
        color: ${({ theme }) => theme.bgColor};
    }
    .btn-outline-info{
        border-color: ${({ theme }) => theme.infoBtnColor};
        color: ${({ theme }) => theme.infoBtnColor};
    }
    .btn-outline-info:hover{
        background: ${({ theme }) => theme.infoBtnColor};
        border-color: ${({ theme }) => theme.infoBtnColor};
        color: ${({ theme }) => theme.bgColor};
    }
    .custom-datePicker{
        height: 2rem;
        padding: 1rem;
        margin-top: 0.5rem;
        border: 1px solid #ced4da ;
        border-radius: 6px;
        color: #212529;
    }
    .react-confirm-alert {
        font-weight: bold;
    }
    .react-confirm-alert-overlay {
        background: rgba(0,0,0,0.5);
    }
    .user-card:hover{
        cursor: pointer;
        color: ${({ theme }) => theme.bgColor};
        background: ${({ theme }) => theme.cardBgColor};
        border: ${({ theme }) => theme.bgColor};
    }
    .user-card {
        margin: 20px;
        width: 280px;
        display: flex;
    }
    .network-user-card {
        padding: auto
    }
    .user-card-img {
        object-fit: cover;
    }
    .user-withdrawal-text {
        color: #DF535F;
        text-align: center;
        font-weight: 800;
    }
    .user-withdrawal-text:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.bgColor};
        background: #DF535F;
        text-align: center;
        font-weight: 800;
        border-radius: 3px;
        //width: 70px;
    }
    h1 {
        font-size: 50px;
        font-weight: 800;
    }
    h2 {
        font-size: 25px;
        font-weight: 500;
    }
    .h2-span-highlight:hover {
        background: #0DCAF0 ;
        color: ${({ theme }) => theme.bgColor};
    }
    .offcanvas-title {
        font-size: 27px;
        font-weight: 700;
        margin-left: 10px;
    }
    .offcanvas-body {
        font-size: 24px;
        font-weight: 600;
        margin: 25;
    }
    .offcanvas-end-show {
        background: ${({ theme }) => theme.bgColor};
        border: ${({ theme }) => theme.borderColor};
    }
    .like-badge {
        color: blue;
        border: ${({ theme }) => theme.borderColor};
    }
`;