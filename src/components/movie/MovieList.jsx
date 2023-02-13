import React from 'react';
import styled from 'styled-components';

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const ListWrapper = styled.div`
	position: relative;

	width: 100%;
	max-width: 1400px;
	height: 380px;
	margin: 0 auto;
`;

function MovieList({ children }) {
	return <ListWrapper>{children}</ListWrapper>;
}

export default MovieList;
