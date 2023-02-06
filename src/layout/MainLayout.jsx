import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import ThemeContext from '@context/themeContext';

import Navbar from '@components/navbar/Navbar';
import Routing from '@routes/Routing';

const Wrapper = styled.div`
	position: relative;

	max-width: 1920px;
	height: 100%;
	margin: 0 auto;
`;

const Container = styled.div`
	max-width: 1440px;
	margin: 0 auto;
`;

const ThemeToggleButton = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 40px;
	height: 40px;
	padding: 8px;

	border-radius: 50%;

	${({ theme }) => css`
		border: 1px solid ${theme.colors.borderColor};

		color: ${theme.colors.textColor};
		background-color: ${theme.colors.bgColor};
	`}

	transition: all 0.2s ease;
	z-index: 9999;
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.bgColor};
		background-color: ${({ theme }) => theme.colors.textColor};
	}
`;

function MainLayout() {
	const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

	return (
		<Wrapper>
			<Container>
				<Navbar />
				<Routing />
			</Container>
			<ThemeToggleButton
				onClick={() => {
					setCurrentTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
				}}
			>
				{currentTheme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
			</ThemeToggleButton>
		</Wrapper>
	);
}

export default MainLayout;
