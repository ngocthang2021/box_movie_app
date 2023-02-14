import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/button/Button';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	max-width: 800px;
	width: 100%;
	margin: 0 auto;

	background-color: transparent;

	border-radius: 32px;
	border: 2px solid ${({ theme }) => theme.colors.borderColor};

	overflow: hidden;
`;

const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	padding: 0 16px;

	font-size: 18px;
	font-weight: 500;
	line-height: 100%;

	color: ${({ theme }) => theme.colors.textColor};
	background-color: transparent;

	&::placeholder {
		font: inherit;
		font-style: italic;

		color: ${({ theme }) => theme.colors.grayColor};
	}
`;

function SearchBar({ searchQuery, mediaType }) {
	const navigate = useNavigate();
	const [query, setQuery] = useState(searchQuery ? searchQuery : '');

	const searchNavigation = useCallback(() => {
		if (query.trim().length > 0) {
			navigate(`/${mediaType}/search/${query}`);
		}
	}, [query, mediaType, navigate]);

	const inputHandler = (e) => {
		setQuery(e.target.value.toLowerCase());
	};

	useEffect(() => {
		const enterEvent = (e) => {
			e.preventDefault();
			if (e.keycode === 13) {
				searchNavigation();
			}
		};

		document.addEventListener('keyup', enterEvent);

		return () => {
			document.removeEventListener('keup', enterEvent);
		};
	}, [searchNavigation, query]);

	return (
		<SearchWrapper>
			<SearchInput
				type='text'
				name='search'
				placeholder='Find your Movies...'
				value={query}
				onChange={inputHandler}
			/>
			<Button
				btnType='primary'
				onClick={searchNavigation}
			>
				<SearchRoundedIcon fontSize='large' />
			</Button>
		</SearchWrapper>
	);
}

export default SearchBar;
