import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import TMDBApi from '@services/api/TMDBApi';

import MovieCard from '@components/movie/MovieCard';

import breakpoints from '@styles/breakpoints';

const Wrapper = styled.div`
	position: relative;

	width: 100%;
	padding: 0 16px;
	margin-bottom: 32px;

	& .swiper {
		height: 100%;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;

	width: 100%;
	padding: 16px 0;
	margin-bottom: 16px;
`;

const Title = styled.h6`
	${({ theme }) => css`
		font-family: ${theme.secondaryFont};
		color: ${theme.colors.lightColor};
	`}

	font-size: 24px;
	font-weight: 500;
	line-height: 1.2;
`;

const BtnLink = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 8px 10px;

	border: 2px solid ${({ theme }) => theme.colors.borderColor};
	border-radius: 35px;

	font-size: 14px;
	font-weight: 600;

	color: ${({ theme }) => theme.colors.textColor};
	background-color: transparent;

	cursor: pointer;
	transition: all 0.25s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryColor};
	}
`;

const SlideWrapper = styled.div`
	position: relative;

	width: 100%;
	height: 350px;

	& .swiper {
		height: 100%;
	}
`;

const SlideBtn = styled.button`
	position: absolute;
	top: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 8px;

	border: 2px solid ${({ theme }) => theme.colors.borderColor};
	border-radius: 50%;

	font-size: 18px;
	font-weight: 500;

	color: ${({ theme }) => theme.colors.primaryColor};
	background-color: transparent;

	transition: all 0.2s ease;
	z-index: 10;

	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.textColor};
		background-color: ${({ theme }) => theme.colors.secondaryColor};
	}
	${({ btnType }) => {
		switch (btnType) {
			case 'prev':
				return css`
					left: 0;
					transform: translate(-50%, -50%);

					@media screen and (max-width: ${breakpoints.sm}) {
						transform: translate(-10%, -50%);
					}
				`;
			case 'next':
				return css`
					right: 0;
					transform: translate(50%, -50%);

					@media screen and (max-width: ${breakpoints.sm}) {
						transform: translate(10%, -50%);
					}
				`;
		}
	}}
`;

function Slider({ item }) {
	const [data, setData] = useState([]);
	const swiperRef = useRef();
	const navigate = useNavigate();

	const mediaType = item.mediaType;

	useEffect(() => {
		const getList = async () => {
			const params = {};
			try {
				const response = await TMDBApi.getLists(item.mediaType, item.query, params);

				if (!response) throw new Error();

				// console.log(response);
				setData(response.results);

				return response;
			} catch (error) {
				console.log(error);
			}
		};

		getList();
	}, [item]);

	// console.log(data);

	return (
		<Wrapper
			as={motion.div}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
			viewport={{ once: true, amount: 'all' }}
		>
			<Header>
				<Title>{item.title}</Title>
				<BtnLink onClick={() => navigate(`/${item.mediaType}/${item.query}`)}>See more</BtnLink>
			</Header>

			<SlideWrapper>
				<SlideBtn
					type='button'
					btnType='prev'
					onClick={() => swiperRef.current?.slidePrev()}
				>
					<KeyboardArrowLeftIcon />
				</SlideBtn>
				<SlideBtn
					type='button'
					btnType='next'
					onClick={() => swiperRef.current?.slideNext()}
				>
					<KeyboardArrowRightIcon />
				</SlideBtn>

				<Swiper
					spaceBetween={24}
					slidesPerView={6}
					slidesPerGroup={1}
					navigation={true}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper;
					}}
					module={[Navigation]}
					breakpoints={{
						320: {
							slidesPerView: 1,
						},
						480: {
							slidesPerView: 2,
						},
						765: {
							slidesPerView: 3,
						},
						998: {
							slidesPerView: 4,
						},
						1400: {
							slidesPerView: 5,
						},
					}}
				>
					{data.map((item) => (
						<SwiperSlide key={item.id}>
							<MovieCard
								item={item}
								mediaType={mediaType}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</SlideWrapper>
		</Wrapper>
	);
}

export default Slider;
