import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

import TMDBApi from '@services/api/TMDBApi';

import breakpoints from '@styles/breakpoints';

const VideoWrapper = styled.div`
	max-width: 1024px;
	width: 100%;
	margin: 0 auto;
	padding: 0 16px;

	@media screen and (max-width: ${breakpoints.sm}) {
		padding: 0;
	}
`;

const VideoItem = styled.div`
	width: 100%;
	margin: 0 auto 32px;
`;

const VideoPlayer = styled.div`
	width: 100%;
	max-width: 640px;
	height: 480px;
	margin: 0 auto;

	@media screen and (max-width: ${breakpoints.sm}) {
		height: 360px;
	}

	@media screen and (max-width: ${breakpoints.md}) {
		height: 400px;
	}
`;

const VideoTitle = styled.h6`
	margin: 16px auto;

	font-size: 22px;
	font-weight: 400;
	line-height: 1.2;
	letter-spacing: 0.04em;
	text-align: center;
`;

function Videos({ mediaType, id }) {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const params = { language: 'en-US' };

		const getVideos = async () => {
			try {
				const response = await TMDBApi.getVideos(mediaType, id, params);

				if (!response) throw new Error();

				setVideos(response.results.slice(0, 5));

				return response.results;
			} catch (error) {
				console.log(error);
			}
		};

		getVideos();
	}, [id]);

	// console.log(videos);

	return (
		<VideoWrapper>
			{videos.map((item) => (
				<VideoItem key={item.id}>
					<VideoPlayer>
						<ReactPlayer
							className='video-frame'
							style={{ marginInline: 'auto' }}
							width={'100%'}
							height={'100%'}
							url={`https://www.youtube.com/watch?v=${item.key}`}
						></ReactPlayer>
					</VideoPlayer>
					<VideoTitle>{item.name}</VideoTitle>
				</VideoItem>
			))}
		</VideoWrapper>
	);
}

export default Videos;
