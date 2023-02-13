import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { TMDB_IMAGE_URL } from '@constants/tmdb';

import getScoreColor from '@utils/getScoreColor';

import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded';

const Card = styled.div`
	position: relative;

	max-width: 280px;
	height: 350px;
	margin: 0 auto;
	border-radius: 16px;

	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* transform-origin: bottom center; */

		opacity: 0;

		width: calc(100%);
		height: calc(100%);
		border: 2px solid ${({ theme }) => theme.colors.primaryColor};
		border-radius: 16px;

		background-color: transparent;

		transition: all 0.2s ease;
		z-index: 2;
	}

	&:hover&::after {
		opacity: 1;
	}
`;

const Img = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
	border-radius: inherit;

	overflow: hidden;

	/* Error Icon  */
	& .icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		font-size: 14px;
		font-weight: 500;
	}

	/* Image */
	& img {
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.8),
			rgba(0, 0, 0, 0.2),
			rgba(0, 0, 0, 0.05)
		);
		z-index: 2;
	}
`;

const Rating = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 48px;
	height: 48px;
	aspect-ratio: 1/1;
	padding: 8px;
	border-radius: 50%;

	font-size: 16px;
	font-weight: 700;
	line-height: 100%;

	color: ${({ theme }) => theme.colors.lightColor};
	background-color: rgba(34, 34, 34, 0.4);

	overflow: hidden;

	z-index: 10;

	${({ scoreColor, theme }) => {
		switch (scoreColor) {
			case 'green':
				return css`
					border: 2px solid ${theme.colors.successColor};
				`;
			case 'red':
				return css`
					border: 2px solid ${theme.colors.alertColor};
				`;
			case 'yellow':
				return css`
					border: 2px solid ${theme.colors.warnColor};
				`;
			default:
				return css`
					border: 2px solid ${theme.colors.borderLightColor};
				`;
		}
	}}
`;

const Content = styled.div`
	position: absolute;
	bottom: 12px;
	left: 12px;
	right: 12px;

	width: calc(100% -24px);
	height: 35%;
	padding: 16px;
	border-radius: 16px;

	background: rgba(255, 255, 255, 0.3);
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);

	z-index: 5;
`;

const Title = styled.h4`
	${({ theme }) => css`
		font-family: ${theme.secondaryFont};
		color: ${theme.colors.lightColor};
	`}

	font-size: 18px;
	font-weight: 600;
	line-height: 1.2;

	cursor: pointer;
`;

const Text = styled.p`
	margin: 8px 0;

	font-size: 14px;
	font-weight: 600;

	color: ${({ theme }) => theme.colors.lightColor};
`;

function MovieCard({ mediaType, item }) {
	const navigate = useNavigate();

	const imagePath = item.poster_path || item.backdrop_path;

	const scoreColor = getScoreColor(item.vote_average);

	return (
		<Card>
			<Img>
				{imagePath ? (
					<img
						src={`${TMDB_IMAGE_URL}/w500${imagePath}`}
						alt={item.name}
					/>
				) : (
					<div className='icon'>
						<ImageNotSupportedRoundedIcon fontSize='large' />
						<span>No Images</span>
					</div>
				)}
			</Img>
			<Rating scoreColor={scoreColor}>{item.vote_average.toFixed(1)}</Rating>
			<Content>
				<Title onClick={() => navigate(`/${mediaType}/${item.id}`)}>
					{item.title || item.original_title}
				</Title>
				<Text>{item.release_date.slice(0, 4)}</Text>
			</Content>
		</Card>
	);
}

export default MovieCard;
