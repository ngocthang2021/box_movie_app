import axios from 'axios';
import queryString from 'query-string';

import { TMDB_API_KEY, TMDB_BASE_URL } from '@constants/tmdb';

const axiosClient = axios.create({
	baseURL: TMDB_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: {
		serialize: (params) => queryString.stringify({ ...params, api_key: TMDB_API_KEY }),
	},
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) return response.data;
		return response;
	},
	(error) => {
		console.log(error);
	},
);

export default axiosClient;
