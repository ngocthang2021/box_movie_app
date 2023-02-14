import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import TMDBApi from '@services/api/TMDBApi';

import MovieGrid from '@components/movie/MovieGrid';
import MovieCard from '@components/movie/MovieCard';
import Loader from '@components/ui/Loader';

const Wrapper = styled.div`
	width: 100%;
	padding: 24px 16px;
`;
const Header = styled.div`
	margin: 16px 0 32px;
`;

const Heading = styled.h6`
	font-family: ${({ theme }) => theme.secondaryFont};
	font-size: 36px;
	font-weight: 600;
	text-transform: uppercase;
	text-align: center;
`;

const Main = styled.div`
	width: 100%;
`;

const Btn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	width: fit-content;
	padding: 8px 10px;
	margin: 20px auto;

	border-radius: 20px;
	border: 2px solid ${({ theme }) => theme.colors.borderColor};

	font-size: 18px;
	font-weight: 500;

	color: ${({ theme }) => theme.colors.textColor};
	background-color: transparent;

	transition: all 0.2s ease;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryColor};
	}
`;

function Category() {
	const { query } = useParams();

	const [list, setList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const params = { page: page, language: 'en-US' };
		const getMovieList = async () => {
			try {
				const response = await TMDBApi.getLists('movie', query, params);

				if (!response) throw new Error();

				// console.log(response);
				setList(response.results);
				setTotalPages(response.total_pages);
				setLoading(false);

				return response;
			} catch {
				console.log(error);
			}
		};

		getMovieList();
	}, [query]);

	const loadmore = async () => {
		let params = { page: page + 1, language: 'en-US' };
		const response = await TMDBApi.getLists('movie', query, params);

		setList([...list, ...response.results]);
		setPage(page + 1);

		return response;
	};

	return (
		<Wrapper>
			<Header>
				<Heading>{query.split('_').join(' ')}</Heading>
			</Header>
			{loading ? (
				<Loader />
			) : (
				<Main>
					<MovieGrid>
						{list.map((item) => (
							<MovieCard
								key={item.id}
								mediaType='movie'
								item={item}
							/>
						))}
					</MovieGrid>
					{page >= totalPages ? null : (
						<Btn
							type='button'
							onClick={loadmore}
						>
							Load more
						</Btn>
					)}
				</Main>
			)}
		</Wrapper>
	);
}

export default Category;
