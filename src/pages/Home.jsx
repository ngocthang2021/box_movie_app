import React, { useState, useEffect } from 'react';

import axiosClient from '@services/api/axiosClient';

function Home() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axiosClient({
					url: '/games',
					data: 'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites',
				});

				if (!response) throw new Error('Unable to Fetch Data!');

				console.log(response);

				return response;
			} catch (error) {
				console.log(error);
			}
		};

		getData();
	}, []);

	return <div>Home</div>;
}

export default Home;
