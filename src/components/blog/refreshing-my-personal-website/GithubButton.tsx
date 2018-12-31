import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../Common';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;

type BlogThemeSwitchProps = {};

const BlogThemeSwitch = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(previousTheme => (previousTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Wrapper>
            <Button to="https://github.com/robertcoopercode/personal-website">
                View the source code
            </Button>
        </Wrapper>
    );
};

export default BlogThemeSwitch;
