import { createGlobalStyle } from "styled-components";
import gothica1 from "./gothica1-medium-webfont.woff"
import gothica2 from "./gothica1-medium-webfont.woff2"

export const GlobalFonts = createGlobalStyle`
    @font-face {
    font-family: 'gothic_a1medium';
    src: url(${gothica2}) format('woff2'),
         url(${gothica1}) format('woff');
    font-weight: normal;
    font-style: normal;

}   
`;