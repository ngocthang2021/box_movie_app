import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from '@components/search/SearchBar';
import MovieGrid from '@components/movie/MovieGrid';
import MovieCard from '@components/movie/MovieCard';

import TMDBApi from '@services/api/TMDBApi';
import Loader from '@components/ui/Loader';

const Wrapper = styled.div`
	width: 100%;
	padding: 24px 16px;
`;

const Header = styled.div`
	margin: 16px 0;
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

function Search() {
	const { searchQuery } = useParams();

	const [searchResults, setSearchResults] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		let params = {};
		const getSearch = async () => {
			if (!searchQuery) return;

			params = { page: page, query: searchQuery };
			const respponse = await TMDBApi.getSearch('movie', params);
			// console.log(respponse);
			setSearchResults(respponse.results);
			setTotalPages(respponse.total_pages);

			return respponse;
		};

		getSearch();
	}, [searchQuery]);

	const loadmore = async () => {
		let params = { page: page + 1, query: searchQuery };
		const response = await TMDBApi.getSearch('movie', params);

		setSearchResults([...searchResults, ...response.results]);
		setPage(page + 1);

		return response;
	};

	return (
		<Wrapper>
			<Header>
				<SearchBar
					searchQuery={searchQuery}
					mediaType='movie'
				/>
			</Header>
			<Main>
				<MovieGrid>
					{searchResults.map((item) => (
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
		</Wrapper>
	);
}

export default Search;
