import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	max-width: 120px;
	max-height: 50px;
	padding: 12px 20px;

	font-family: ${({ theme }) => theme.primaryFont};
	font-size: 16px;
	font-weight: 600;
	line-height: 1;
	letter-spacing: 0.05em;

	transition: all 0.25s ease;
	cursor: pointer;
`;

function Button({ children, onClick }) {
	return <Btn onClick={onClick ? () => onClick() : null}>{children}</Btn>;
}

export default Button;
