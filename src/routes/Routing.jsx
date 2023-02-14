import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import Category from '@pages/Category';
import Detail from '@pages/Detail';
import Search from '@pages/Search';

function Routing() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>

			<Route
				path='/category'
				element={<Category />}
			/>
			<Route
				path='/category/:query'
				element={<Category />}
			/>

			<Route
				path='/:mediaType/:id'
				element={<Detail />}
			/>
			<Route
				path='/search'
				element={<Search />}
			/>
			<Route
				path='/:mediaType/search/:searchQuery'
				element={<Search />}
			/>
		</Routes>
	);
}

export default Routing;
