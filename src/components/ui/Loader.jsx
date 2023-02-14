import React from 'react';
import styled, { keyframes } from 'styled-components';

const bouncing = keyframes`
	from {
		opacity: 1;
		transform: translateY(0) ;
	}

	to {
		opacity: 0.1;
	transform: translateY(-16px);
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: calc(100vh - 64px);

	background-color: transparent;
`;

const DotsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Dot = styled.div`
	width: 8px;
	height: 8px;
	margin: 6px;

	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.primaryColor};

	animation: ${bouncing} 0.5s linear infinite alternate;
	animation-delay: ${({ delayTiming }) => `${delayTiming}s`};
`;

function Loader() {
	return (
		<Wrapper>
			<DotsContainer>
				<Dot delayTiming={0} />
				<Dot delayTiming={0.2} />
				<Dot delayTiming={0.4} />
			</DotsContainer>
		</Wrapper>
	);
}

export default Loader;
