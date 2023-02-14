import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Hero from '@components/hero/Hero';
import Slider from '@components/slider/Slider';
import categories from '@constants/categories';
import Loader from '@components/ui/Loader';

const Wrapper = styled.section`
	width: 100%;
`;

function Home() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<Wrapper>
			{loading ? (
				<Loader />
			) : (
				<>
					<Hero />
					<>
						{categories.map((item, index) => (
							<Slider
								key={index}
								item={item}
							/>
						))}
					</>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
