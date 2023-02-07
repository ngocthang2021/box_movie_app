import React, { useContext, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavbarContext from '@context/navbarContext';

import breakpoint from '@styles/breakpoints';
import navRoutes from '@components/navbar/constants/navRoutes';

const Wrapper = styled.div`
	position: relative;
	padding: 4px;
`;

const Icon = styled.div`
	position: relative;

	display: none;

	width: 30px;
	height: 24px;

	cursor: pointer;

	& div {
		position: absolute;
		left: 0;

		width: 100%;
		height: 2px;

		background-color: ${({ theme }) => theme.colors.textColor};

		transition: all 0.25s ease;

		&:nth-child(1) {
			top: ${({ isActive }) => (isActive ? '50%' : 0)};
			transform: translateY(${({ isActive }) => (isActive ? '-50%' : 0)});
			opacity: ${({ isActive }) => (isActive ? 0 : 1)};
		}
		&:nth-child(2),
		&:nth-child(3) {
			top: 50%;
		}
		&:nth-child(2) {
			transform: translateY(-50%) rotate(${({ isActive }) => (isActive ? '-45deg' : 0)});
		}
		&:nth-child(3) {
			transform: translateY(-50%) rotate(${({ isActive }) => (isActive ? '45deg' : 0)});
		}
		&:nth-child(4) {
			bottom: ${({ isActive }) => (isActive ? '50%' : 0)};
			transform: translateY(${({ isActive }) => (isActive ? '50%' : 0)});
			opacity: ${({ isActive }) => (isActive ? 0 : 1)};
		}
	}

	@media screen and (max-width: ${breakpoint.md}) {
		display: block;
	}
`;

const MenuList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 24px;

	height: 100%;

	@media screen and (max-width: ${breakpoint.md}) {
		position: fixed;
		top: 64px;
		right: 0;
		transform: translateX(${({ isOpen }) => (isOpen ? 0 : '100%')});

		justify-content: flex-start;
		flex-direction: column;

		width: 40vw;
		height: 100vh;
		border-left: 1px solid ${({ theme }) => theme.colors.borderColor};

		background-color: ${({ theme }) => theme.colors.bgColor};
	}

	@media screen and (max-width: ${breakpoint.sm}) {
		width: 100vw;
		border: transparent;
	}

	transition: transform 0.25s linear;
	overflow: hidden;
	z-index: 99;
`;

const MenuItem = styled.li`
	position: relative;

	font-size: 18px;
	font-weight: 500;
	letter-spacing: 0.05em;
	text-align: right;

	color: ${({ theme, isActive }) =>
		isActive ? `${theme.colors.primaryColor}` : `${theme.colors.textColor}`};

	transition: all 0.25s linear;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);

		display: block;

		width: ${({ isActive }) => (isActive ? '4px' : 0)};
		height: 2px;

		background-color: ${({ theme }) => theme.colors.primaryColor};
		transition: width 0.2s linear;

		@media screen and (max-width: ${breakpoint.md}) {
			display: none;
		}
	}

	&:hover {
		color: ${({ theme }) => theme.colors.primaryColor};

		&::before {
			width: 100%;
		}
	}

	@media screen and (max-width: ${breakpoint.md}) {
		&:hover {
			background-color: rgba(255, 255, 255, 0.4);
		}

		width: 100%;

		font-size: 20px;
	}

	@media screen and (max-width: ${breakpoint.sm}) {
		text-align: center;
	}

	& a {
		@media screen and (max-width: ${breakpoint.md}) {
			display: block;
			width: 100%;
			height: 100%;
			padding: 12px 36px;
		}
	}
`;

function Menu() {
	const { menu, setMenu } = useContext(NavbarContext);
	const menuRef = useRef(null);
	const { pathname } = useLocation();

	const activePath = navRoutes.findIndex((item) => item.path === pathname);

	// Handle Close Menu when Clicking outside of the component
	useEffect(() => {
		const handleClickOutsideClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenu(false);
			}
		};

		window.addEventListener('click', handleClickOutsideClick);

		return () => {
			window.removeEventListener('click', handleClickOutsideClick);
		};
	}, [setMenu]);

	useEffect(() => {
		const handleMenuOnResize = () => {
			if (menu && window.innerWidth >= 900) {
				setMenu(false);
			}
		};

		window.addEventListener('resize', handleMenuOnResize);

		return () => {
			window.removeEventListener('resize', handleMenuOnResize);
		};
	}, [menu, setMenu]);

	return (
		<Wrapper ref={menuRef}>
			<Icon
				isActive={menu}
				onClick={() => setMenu(!menu)}
			>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</Icon>
			<MenuList isOpen={menu}>
				{navRoutes.map((item, index) => (
					<MenuItem
						key={index}
						delayTiming={index}
						isActive={index === activePath}
						onClick={() => setMenu(false)}
					>
						<NavLink to={item.path}>{item.title}</NavLink>
					</MenuItem>
				))}
			</MenuList>
		</Wrapper>
	);
}

export default Menu;
