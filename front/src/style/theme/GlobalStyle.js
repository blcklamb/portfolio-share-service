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
        "Helvetica Neue",
        "Noto Sans CJK KR",
        sans-serif;
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
`;