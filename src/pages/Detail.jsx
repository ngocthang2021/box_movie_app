import React, { useEffect, useState, Fragment, useRef } from 'react';
import { NavLink, useLocation, useNavigationType, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Navigation, Grid } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { TMDB_IMAGE_URL } from '@constants/tmdb';
import { dateFormat } from '@utils/helpers';
import getScoreColor from '@utils/getScoreColor';
import TMDBApi from '@services/api/TMDBApi';

import breakpoints from '@styles/breakpoints';

import SmoothScroll from '@components/ui/SmoothScroll';
import Loader from '@components/ui/Loader';
import MovieList from '@components/movie/MovieList';
import MovieCard from '@components/movie/MovieCard';
import Videos from '@components/videos/Videos';

import DefaultImg from '@assets/images/blank_profile.png';

// Wrapper
const Section = styled.div`
	position: relative;

	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
`;

// Background Image || Banner
const Bg = styled.div`
	position: relative;

	width: 100%;
	height: 580px;

	${({ url }) => css`
		background-image: url(${url});
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	`}

	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;

		width: 100%;
		height: 20%;

		/* Fade Bottom */
		background-image: linear-gradient(to top, ${({ theme }) => theme.colors.linearBg});

		z-index: 2;
	}
`;

// Container Section
const Container = styled.div`
	position: relative;

	padding: 20px 24px;

	z-index: 10;

	@media screen and (max-width: ${breakpoints.sm}) {
		padding: 20px 8px;
	}
`;

// Header
const Header = styled.div`
	max-width: 800px;
`;

// Header Title
const Title = styled.h6`
	font-family: ${({ theme }) => theme.secondaryFont};
	font-size: 48px;
	font-weight: 500;
	line-height: 1.2;
`;

// Header Tagline
const Tagline = styled.p`
	margin: 16px 0 24px;

	font-size: 20px;
	font-weight: 400;
	line-height: 1.2;
`;

// Sub Header
const SubHead = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
`;

// Sub Header Tags
const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	gap: 8px;

	max-width: 500px;
`;

// Tag Link
const Link = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 6px 14px;
	border-radius: 10px;

	font-size: 16px;
	font-weight: 600;

	${({ theme }) => css`
		border: 2px solid ${theme.colors.borderColor};
		color: ${theme.colors.lightColor};
		background-color: ${theme.colors.primaryColor};
	`}
`;

// Main Content
const Body = styled.div`
	margin-top: 50px;
	padding: 16px 0;

	@media screen and (max-width: ${breakpoints.sm}) {
		width: 100%;
		margin: 50px auto 0;
	} ;
`;

// Info Sections || Boxes
const Info = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	gap: 24px;

	width: 100%;
	margin-bottom: 0 auto 48px;

	@media screen and (max-width: ${breakpoints.lg}) {
		justify-content: center;
	} ;
`;

// Box Component
const Box = styled.div`
	position: relative;

	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 240px;
	height: 160px;
	border-radius: 32px;

	background: ${({ primary, theme }) =>
		primary ? `${theme.colors.primaryColor}` : `rgba(255, 255, 255, 0.1)`};
	box-shadow: 0 4px 30px
		${({ primary, theme }) => (primary ? `${theme.colors.primaryColor}` : ` rgba(0, 0, 0, 0.1)`)};
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);

	font-size: 32px;
	font-weight: 600;
	line-height: 1;

	color: ${({ theme }) => theme.colors.textColor};

	${({ scoreColor, theme }) => {
		switch (scoreColor) {
			case 'green':
				return css`
					background-color: ${theme.colors.successColor};
					box-shadow: 0 4px 30px ${theme.colors.successColor};
				`;
			case 'red':
				return css`
					background-color: ${theme.colors.alertColor};
					box-shadow: 0 4px 30px ${theme.colors.alertColor};
				`;
			case 'yellow':
				return css`
					background-color: ${theme.colors.warnColor};
					box-shadow: 0 4px 30px ${theme.colors.warnColor};
				`;
		}
	}}

	cursor: ${({ primary }) => (primary ? 'pointer' : null)};

	& .icon {
		font-size: 54px;
		color: ${({ theme }) => theme.colors.lightColor};
	}

	& .title {
		position: absolute;
		top: 15px;
		left: 50%;
		transform: translateX(-50%);

		display: block;

		width: 100%;
		height: auto;

		font-size: 16px;
		font-weight: 600;
		line-height: 1.2;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 0.08em;

		color: ${({ theme }) => theme.colors.textColor};

		z-index: 2;
	}
`;

// Content Section
const Content = styled.div`
	max-width: ${({ isShort }) => (isShort ? '800px' : '100%')};
	margin: 48px 0;
`;

// Content Heading
const TextHeading = styled.h6`
	${({ theme }) => css`
		font-family: ${theme.secondaryFont};
		color: ${theme.colors.textColor};
	`}

	margin-bottom: 16px;

	font-size: 24px;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;

	opacity: 0.5;
`;

// Content Description || Overview
const Description = styled.p`
	font-size: 18px;
	font-weight: 400;
	line-height: 1.5;

	color: ${({ theme }) => theme.colors.textColor};
`;

// Casts Section
const Casts = styled.div`
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 20px 8px;

	margin: 16px auto;

	transition: 0.2s ease;
`;

const CastItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8px;

	width: 200px;
	margin: 0 auto;

	@media screen and (max-width: ${breakpoints.sm}) {
	}

	& .name,
	.character {
		display: block;

		font-size: 16px;
		font-weight: 400;
		line-height: 1.2;
		text-align: center;

		color: ${({ theme }) => theme.colors.textColor};
	}

	& .character {
		font-size: 14px;
	}
`;

const CastImg = styled.div`
	position: relative;

	width: 120px;
	height: 120px;
	padding: 4px;

	border: 2px solid ${({ theme }) => theme.colors.primaryColor};
	border-radius: 50%;

	& img {
		width: 100%;
		height: 100%;

		object-fit: cover;
		border-radius: inherit;
	}

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 1px solid ${({ theme }) => theme.colors.primaryColor};

		background-color: transparent;
	}
`;

const SwiperBtn = styled.button`
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
	z-index: 20;

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
// ------------------------------

function Movie() {
	const { mediaType, id } = useParams();
	const location = useLocation();
	const navType = useNavigationType();

	// console.log(location);
	// console.log(navType);

	const movieSwiperRef = useRef();
	const castSwiperRef = useRef();

	const [loading, setLoading] = useState(true);
	const [detail, setDetail] = useState([]);
	const [casts, setCasts] = useState([]);
	const [similar, setSimilar] = useState([]);
	const [showFullCasts, setShowFullCasts] = useState(false);

	useEffect(() => {
		const getDetail = async () => {
			const params = { language: 'en-US' };

			try {
				const detailsResponse = await TMDBApi.getDetails(mediaType, id, params);

				const credtisResponse = await TMDBApi.getCredtis(mediaType, id, params);

				const similarResponse = await TMDBApi.getSimilarMovies(mediaType, id, params);

				if (!detailsResponse || !credtisResponse) throw new Error();

				// console.log(detailsResponse);
				// console.log(credtisResponse);
				// console.log(similarResponse.results);

				setDetail(detailsResponse);
				setCasts(credtisResponse.cast);
				setSimilar(similarResponse.results.slice(0, 10));
				setLoading(false);

				return { detailsResponse, credtisResponse, similarResponse };
			} catch (error) {
				console.log(error);
			}
		};

		getDetail();
	}, [mediaType, id]);

	const title =
		mediaType === 'movie'
			? detail.title || detail.original_title
			: detail.name || detail.original_name;
	const overview = detail.overview;
	const tagline = detail.tagline;
	const bgImgPath = detail.backdrop_path;
	const genres = detail.genres;
	const homepage = detail.homepage;
	const language = detail.original_language;
	const releaseDate = detail.release_date;
	const runtime = detail.runtime;
	const ratingPoint = detail.vote_average;

	const scoreColor = getScoreColor(ratingPoint);

	return (
		<SmoothScroll>
			<Section>
				{loading ? <Loader /> : <Bg url={`${TMDB_IMAGE_URL}/original${bgImgPath}`} />}
				{loading ? (
					<Loader />
				) : (
					<Container>
						<Header>
							<Title>{title}</Title>
							<Tagline>{tagline}</Tagline>
							<SubHead>
								<Tags>
									{genres.map((genre) => (
										<Link
											key={genre.id}
											to={`/genres/${genre.id}`}
										>
											{genre.name}
										</Link>
									))}
								</Tags>
							</SubHead>
						</Header>
						<Body>
							<Info>
								<Box
									primary
									as={homepage ? 'a' : 'div'}
									href={homepage}
									target='_blank'
								>
									<PlayArrowRoundedIcon className='icon' />
								</Box>
								<Box scoreColor={scoreColor}>
									<p className='title'>Rating</p>
									<p>{ratingPoint}</p>
								</Box>
								<Box>
									<p className='title'>Language</p>
									<p>{language.toUpperCase()}</p>
								</Box>
								<Box>
									<p className='title'>Release</p>
									<p>{dateFormat(new Date(releaseDate))}</p>
								</Box>
								<Box>
									<p className='title'>Length</p>
									<p>{runtime} min</p>
								</Box>
							</Info>
							<Content isShort>
								<TextHeading>Description</TextHeading>
								<Description>{overview}</Description>
							</Content>
							<Content>
								<TextHeading>Casts</TextHeading>
								<Casts>
									<SwiperBtn
										type='button'
										btnType='prev'
										onClick={() => castSwiperRef.current?.slidePrev()}
									>
										<ArrowBackIosNewRoundedIcon />
									</SwiperBtn>
									<SwiperBtn
										type='button'
										btnType='next'
										onClick={() => castSwiperRef.current?.slideNext()}
									>
										<ArrowForwardIosRoundedIcon />
									</SwiperBtn>
									<Swiper
										spaceBetween={24}
										grid={{ rows: 2, fill: 'row' }}
										modules={[Grid, Navigation]}
										onBeforeInit={(swiper) => (castSwiperRef.current = swiper)}
										breakpoints={{
											1200: { slidesPerView: 5 },
											998: { slidesPerView: 4 },
											600: {
												spaceBetween: 16,
												slidesPerView: 3,
											},
											420: {
												slidesPerView: 2,
											},
										}}
										className='swiper-casts'
									>
										{casts.map((cast) => (
											<SwiperSlide key={cast.name}>
												<CastItem>
													<CastImg>
														<img
															src={
																cast.profile_path
																	? `${TMDB_IMAGE_URL}/w500${cast.profile_path}`
																	: DefaultImg
															}
															alt={cast.name}
														/>
													</CastImg>
													<Fragment>
														<p className='name'>{cast.name || cast.original_name}</p>
														<p className='character'>{cast.character}</p>
													</Fragment>
												</CastItem>
											</SwiperSlide>
										))}
									</Swiper>
								</Casts>
							</Content>
							<Content>
								<TextHeading>Videos</TextHeading>
								<>
									<Videos
										mediaType={mediaType}
										id={id}
									/>
								</>
							</Content>
							<Content>
								<TextHeading>Similar Movies</TextHeading>
								<MovieList>
									<SwiperBtn
										type='button'
										btnType='prev'
										onClick={() => movieSwiperRef.current?.slidePrev()}
									>
										<ArrowBackIosNewRoundedIcon />
									</SwiperBtn>
									<SwiperBtn
										type='button'
										btnType='next'
										onClick={() => movieSwiperRef.current?.slideNext()}
									>
										<ArrowForwardIosRoundedIcon />
									</SwiperBtn>
									<Swiper
										spaceBetween={16}
										slidesPerGroup={1}
										navigation={true}
										loop={true}
										module={[Navigation]}
										onBeforeInit={(swiper) => {
											movieSwiperRef.current = swiper;
										}}
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
												slidesPerView: 5,
											},
											1400: {
												slidesPerView: 6,
											},
										}}
									>
										{similar.map((item) => (
											<SwiperSlide key={item.name}>
												<MovieCard
													item={item}
													mediaType={mediaType}
												/>
											</SwiperSlide>
										))}
									</Swiper>
								</MovieList>
							</Content>
						</Body>
					</Container>
				)}
			</Section>
		</SmoothScroll>
	);
}

export default Movie;
