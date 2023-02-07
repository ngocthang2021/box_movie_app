import React, { useState } from 'react';
import styled from 'styled-components';

import NavbarContext from '@context/navbarContext';

import Logo from './components/Logo';
import Menu from './components/Menu';

const Wrapper = styled.div`
	max-width: 1440px;
	width: 100%;
	height: 64px;
	margin: 0 auto;

	background-color: transparent;

	border-bottom: 1px solid ${({ theme }) => theme.colors.borderDarkColor};
`;

const NavContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;

	width: 100%;
	height: 100%;
	padding: 10px;
`;

function Navbar() {
	const [menu, setMenu] = useState(false);

	return (
		<NavbarContext.Provider value={{ menu, setMenu }}>
			<Wrapper>
				<NavContainer>
					<Logo />
					<Menu />
				</NavContainer>
			</Wrapper>
		</NavbarContext.Provider>
	);
}

export default Navbar;
