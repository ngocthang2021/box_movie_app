import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { TMDB_IMAGE_URL } from '@constants/tmdb';
import getScoreColor from '@utils/getScoreColor';

import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

const Slide = styled.div`
	position: relative;

	width: 100%;
	height: 100%;
	border-radius: 20px;

	background-color: ${({ theme }) => theme.colors.grayColor};

	overflow: hidden;
`;

const Img = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	transform: scale(1);

	width: 100%;
	height: 100%;

	${({ imageUrl }) => css`
		background-image: url(${imageUrl});
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	`}

	transition: transform 0.2s ease-in-out;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.25),
			rgba(0, 0, 0, 0.2),
			rgba(0, 0, 0, 0.05)
		);
	}

	${Slide}:hover & {
		transform: scale(1.2);
	}
`;

const Icon = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: none;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	background-color: rgba(34, 34, 34, 0.5);
	opacity: 0;

	z-index: 2;
	transition: all 0.2s ease;

	& .icon {
		font-size: 48px;
		color: ${({ theme }) => theme.colors.lightColor};
		cursor: pointer;
	}

	${Slide}:hover & {
		display: flex;
		opacity: 1;
	}
`;

const Rating = styled.div`
	position: absolute;
	top: 8px;
	left: 12px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	aspect-ratio: 1/1;
	padding: 8px;

	border-radius: 50%;

	font-size: 16px;
	font-weight: 700;
	line-height: 100%;
	letter-spacing: 0.05em;
	text-transform: uppercase;

	color: ${({ theme }) => theme.colors.lightColor};
	background-color: rgba(34, 34, 34, 0.4);

	z-index: 2;

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
	bottom: 0;
	left: 0;
	transform: translateY(100%);

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;

	width: 100%;
	height: 120px;
	padding: 16px 14px;
	border-radius: 18px;

	background-color: rgba(34, 34, 34, 0.8);

	transition: all 0.2s ease;
	z-index: 2;

	${Slide}:hover & {
		transform: translateY(0);
	}
`;

const Title = styled.h6`
	${({ theme }) => css`
		font-family: ${theme.primaryFont};
		color: ${theme.colors.lightColor};
	`}

	font-size: 22px;
	font-weight: 600;
	line-height: 1.2;
	letter-spacing: 0.02em;

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;

	overflow: hidden;
`;

const Tag = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 6px;
	border: 2px solid ${({ theme }) => theme.colors.lightColor};

	font-size: 14px;
	font-weight: 500;
	line-height: 100%;
	text-transform: uppercase;

	color: ${({ theme }) => theme.colors.lightColor};
`;

function SliderItem({ item, mediaType }) {
	const navigate = useNavigate();

	const title = item.title || item.original_title || item.name || item.original_name;
	// const overview = item.overview;
	const imagePath = item.poster_path || item.backdrop_path;
	const imageUrl = `${TMDB_IMAGE_URL}/original${imagePath}`;
	const language = item.original_language;
	const ratingPoint = item.vote_average.toFixed(1);

	const scoreColor = getScoreColor(ratingPoint);

	return (
		<Slide>
			<Img imageUrl={imageUrl} />
			<Icon>
				<PlayCircleOutlineRoundedIcon
					className='icon'
					onClick={() => navigate(`/${mediaType}/${item.id}`)}
				/>
			</Icon>
			<Rating scoreColor={scoreColor}>{ratingPoint}</Rating>
			<Content>
				<Title>{title}</Title>
				<Tag>{language}</Tag>
			</Content>
		</Slide>
	);
}

export default SliderItem;
