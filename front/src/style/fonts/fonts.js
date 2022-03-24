import { createGlobalStyle } from "styled-components";
import Gothica1Medium from "./gothica1-medium-webfont.woff"

export const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: "Gothica1 Medium";
        src: local("Gothica1 Medium"),
        url(${Gothica1Medium}) format('woff');
        font-weight: 300;
        font-style: normal;
    }    
`;