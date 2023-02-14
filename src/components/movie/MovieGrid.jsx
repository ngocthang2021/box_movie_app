import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 24px 16px;

	width: 100%;
`;

function MovieGrid({ children }) {
	return <Grid>{children}</Grid>;
}

export default MovieGrid;
