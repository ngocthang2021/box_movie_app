import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import NavbarContext from '@context/navbarContext';

const LogoWrapper = styled.div`
	${({ theme }) => css`
		font-family: ${theme.secondaryFont};
		color: ${theme.colors.primaryColor};
	`}

	position: relative;

	padding: 0 4px;

	font-size: 24px;
	font-weight: 500;
	letter-spacing: 0.2em;
	text-align: center;

	transition: color 0.25s ease 0.25s;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		transform: scaleY(0);
		transform-origin: top center;

		width: 100%;
		height: 100%;
		border-radius: 2px;

		background-color: ${({ theme }) => theme.colors.primaryColor};

		z-index: -1;

		transition: transform 0.25s ease;
	}

	&:hover {
		color: ${({ theme }) => theme.colors.lightColor};
		&::before {
			transform: scaleY(1);
		}
	}
`;

function Logo() {
	const { setMenu } = useContext(NavbarContext);

	return (
		<LogoWrapper onClick={() => setMenu(false)}>
			<NavLink
				to='/'
				end
			>
				Box
			</NavLink>
		</LogoWrapper>
	);
}

export default Logo;
