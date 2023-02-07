import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import Genres from '@pages/Genres';
import Category from '@pages/Category';
import Movie from '@pages/Movie';
import Media from '@pages/Media';
import Search from '@pages/Search';

function Routing() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/genres'
				element={<Genres />}
			/>
			<Route
				path='/genres/:genreID'
				element={<Genres />}
			/>
			<Route
				path='/category'
				element={<Category />}
			/>
			<Route
				path='/category/:mediaType'
				element={<Category />}
			/>
			<Route
				path='/movie'
				element={<Movie />}
			/>
			<Route
				path='/movie/:movieID'
				element={<Movie />}
			/>
			<Route
				path='/media'
				element={<Media />}
			/>
			<Route
				path='/media/:mediaType'
				element={<Media />}
			/>
			<Route
				path='/search'
				element={<Search />}
			/>
			<Route
				path='/search/:searchQuery'
				element={<Search />}
			/>
		</Routes>
	);
}

export default Routing;
