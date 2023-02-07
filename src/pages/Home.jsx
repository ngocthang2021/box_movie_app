import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Hero from '@components/hero/Hero';
import Slider from '@components/slider/Slider';
import categories from '@constants/categories';

const Wrapper = styled.section`
	width: 100%;
`;

function Home() {
	return (
		<Wrapper>
			<Hero />
			<>
				{categories.map((item, index) => (
					<Slider
						key={index}
						item={item}
					/>
				))}
			</>
		</Wrapper>
	);
}

export default Home;
