import React from 'react';
import styled, { css } from 'styled-components';

const Btn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	max-width: 120px;
	max-height: 50px;
	padding: 12px 20px;
	border-radius: inherit;

	font-family: ${({ theme }) => theme.primaryFont};
	font-size: 16px;
	font-weight: 600;
	line-height: 1;
	letter-spacing: 0.05em;

	transition: all 0.25s ease;
	cursor: pointer;

	${({ btnType, theme }) => {
		switch (btnType) {
			case 'primary':
				return css`
					color: ${theme.colors.textColor};
					background-color: ${theme.colors.primaryColor};

					&:hover {
						color: ${theme.colors.primaryColor};
						background-color: transparent;
					}
				`;

			case 'secondary':
				return css`
					color: ${({ theme }) => theme.colors.textColor};
					background-color: transparent;

					cursor: pointer;
					transition: all 0.25s ease;

					&:hover {
						background-color: ${({ theme }) => theme.colors.primaryColor};
					}
				`;
		}
	}}
`;

function Button({ children, onClick, btnType }) {
	return (
		<Btn
			btnType={btnType}
			onClick={onClick ? () => onClick() : null}
		>
			{children}
		</Btn>
	);
}

export default Button;
