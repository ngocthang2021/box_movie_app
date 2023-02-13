import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import TMDBApi from '@services/api/TMDBApi';

import HeroItem from './HeroItem';

import breakpoints from '@styles/breakpoints';

const Wrapper = styled.div`
	width: 100%;
	height: 650px;

	@media screen and (max-width: ${breakpoints.lg}) {
		height: calc(650px * 0.8);
	}

	@media screen and (max-width: ${breakpoints.md}) {
		height: calc(650px * 0.65);
	}

	@media screen and (max-width: ${breakpoints.sm}) {
		height: calc(650px * 0.6);
	}

	& .swiper {
		height: 100%;
	}
`;

function Hero() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const params = {};

		const getData = async () => {
			try {
				const response = await TMDBApi.getTrendings('movie', 'week', params);

				if (!response) throw new Error('Unable to Fetch Data!');

				setData(response.results.slice(0, 10));

				return response;
			} catch (error) {
				console.log(`${error.message}`);
			}
		};

		getData();
	}, []);

	return (
		<Wrapper>
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				modules={[Autoplay]}
			>
				{data.map((item) => (
					<SwiperSlide key={item.id}>
						{({ isActive }) => (
							<HeroItem
								item={item}
								mediaType='movie'
								isActive={isActive}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</Wrapper>
	);
}

export default Hero;
