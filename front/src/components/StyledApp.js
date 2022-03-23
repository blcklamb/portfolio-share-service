import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import { FlexContainer } from '../style/styles';
import ThemeToggle from '../theme/ThemeToggle';


const StyledApp = ({children}) => {
    const [ThemeMode, toggleTheme] = useTheme();
    return (
        <>
        <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
            DarkMode
        </ThemeToggle>
        <FlexContainer>{children}</FlexContainer>
        </>
    )
}

export default StyledApp;

