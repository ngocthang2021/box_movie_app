import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { TMDB_IMAGE_URL } from '@constants/tmdb';

import getScoreColor from '@utils/getScoreColor';
import { checkTextLength, checkIsReleased } from '@utils/helpers';

import Button from '@components/button/Button';

import { heroContainer, heroItem } from '@styles/framer/heroFramer';
import breakpoints from '@styles/breakpoints';

const Container = styled.div`
	position: relative;

	width: 100%;
	height: 100%;
`;

const Bg = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(${({ imageUrl }) => (imageUrl ? `${imageUrl}` : '')});
	background-size: cover;
	background-position: top center;
	background-repeat: no-repeat;

	&::before {
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
	}
	z-index: -1;
`;

const Content = styled.div`
	position: absolute;
	top: 50%;

	max-width: 500px;
	max-height: 400px;
	margin: 0 16px;
	padding: 20px 24px;

	background-color: rgba(0, 0, 0, 0.4);

	overflow: hidden;

	@media screen and (max-width: ${breakpoints.lg}) {
		width: calc(500px * 0.8);
		height: calc(400px * 0.8);
	}

	@media screen and (max-width: ${breakpoints.md}) {
		max-width: calc(100% - 20%);
	}

	@media screen and (max-width: ${breakpoints.sm}) {
		display: none;
	}
`;

const MobileTitle = styled.h4`
	position: absolute;
	bottom: 20px;
	left: 20px;
	right: 20px;
	transform: translateY(-50%);

	display: none;

	padding: 12px;

	font-size: 24px;
	font-weight: 600;
	line-height: 1;

	${({ theme }) => css`
		font-family: ${theme.secondaryFont};

		color: ${theme.colors.lightColor};
		background-color: rgba(35, 35, 35, 0.5);
	`}

	@media screen and (max-width: ${breakpoints.sm}) {
		display: block;
	}
`;

const Title = styled.h4`
	${({ theme }) => css`
		font-family: ${theme.secondaryFont};
		color: ${theme.colors.lightColor};
	`}

	font-size: 28px;
	font-weight: 600;
	letter-spacing: 0.02em;
	line-height: 1.2;

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;

	@media screen and (max-width: ${breakpoints.md}) {
		font-size: 24 px;
		-webkit-line-clamp: 2;
	}
`;

const Rating = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;

	margin: 16px 0;

	color: ${({ theme }) => theme.colors.ligtColor};
`;

const Score = styled.div`
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

	display:flex;
	align-items: center;
	justify-content: center;

	padding: 10px;
	aspect-ratio: 1/1;

	border-radius: 50%;

	font-size: 16px;
	font-weight: 600;
	line-height: 100%;

	color: ${({ theme }) => theme.colors.lightColor};

	& p {
		font-size: 14px;
		font-weight: 500;
		line-height: 1;
		color: #${({ theme }) => theme.colors.lightColor};
	}
`;

const Text = styled.p`
	${({ theme }) => css`
		font-family: ${theme.primaryFont};
		color: ${theme.colors.lightColor};
	`}
	font-size: 18px;
	font-weight: 400;
	letter-spacing: 0.02em;

	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;

	@media screen and (max-width: ${breakpoints.md}) {
		font-size: 16px;
		-webkit-line-clamp: 2;
	}
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 24px;

	margin-top: 16px;
`;

function HeroItem({ item, mediaType, isActive }) {
	const navigate = useNavigate();

	const title = item.title || item.original_title || item.name || item.original_name;
	const overview = item.overview;
	const imagePath = item.backdrop_path || item.poster_path;
	const ratingPoint = item.vote_average.toFixed(1);
	// Return color for border
	const scoreColor = getScoreColor(ratingPoint);

	// Check if movie is released or not
	const isReleased = checkIsReleased(item.release_date);

	return (
		<Container>
			<Bg imageUrl={`${TMDB_IMAGE_URL}/original/${imagePath}`} />
			<MobileTitle>
				<NavLink to={`/${mediaType}/${item.id}`}>{title}</NavLink>
			</MobileTitle>
			<Content
				as={motion.div}
				variants={heroContainer}
				initial='initial'
				animate={isActive ? 'animate' : ''}
			>
				<Title
					as={motion.h4}
					variants={heroItem}
					style={{ originY: 0 }}
				>
					{title}
				</Title>
				<Rating
					as={motion.div}
					variants={heroItem}
					style={{ originY: 0 }}
				>
					<Score scoreColor={scoreColor}>{ratingPoint}</Score>
					{!isReleased && <p>Upcoming</p>}
				</Rating>
				<Text
					as={motion.p}
					variants={heroItem}
					style={{ originY: 0 }}
				>
					{overview}
				</Text>
				<Buttons
					as={motion.div}
					variants={heroItem}
					style={{ originY: 0 }}
				>
					<Button onClick={() => navigate(`/${mediaType}/${item.id}`)}>Watch</Button>
				</Buttons>
			</Content>
		</Container>
	);
}

export default HeroItem;
