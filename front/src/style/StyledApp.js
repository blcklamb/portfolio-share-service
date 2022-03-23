import React from 'react';
import { useTheme } from '../context/themeProvider';
import { FlexContainer } from './styles';
import ThemeToggle from './theme/ThemeToggle';


const StyledApp = ({children}) => {
    const [ThemeMode, toggleTheme] = useTheme();
    return (
        <>
        <ThemeToggle toggle={toggleTheme} mode={ThemeMode}/>
        <FlexContainer>{children}</FlexContainer>
        </>
    )
}

export default StyledApp;

