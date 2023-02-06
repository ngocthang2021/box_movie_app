import axios from 'axios';
import queryString from 'query-string';

import {
	AWS_API_KEY,
	IGDB_BASE_URL,
	TWITCH_AUTH_URL,
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
} from '@constants/IGDB';

const getAccessToken = async () => {
	// Get Token from localStorage
	let token = JSON.parse(window.localStorage.getItem('accessToken'));

	// Check if token exists or token expired or not
	if (!token || new Date(token.expiry) <= new Date()) {
		// request for Access Token
		const response = await axios({
			method: 'post',
			url: TWITCH_AUTH_URL,
			params: {
				client_id: TWITCH_CLIENT_ID,
				client_secret: TWITCH_CLIENT_SECRET,
				grant_type: 'client_credentials',
			},
		});

		token = {
			...response.data,
			// Add Token Expiration Date
			expiry: new Date().getTime() + response.data.expires_in * 1000,
		};

		// Save Access Token to localStorage
		window.localStorage.setItem('accessToken', JSON.stringify(token));

		return token;
	}

	return token;
};

const axiosClient = axios.create({
	baseURL: `${IGDB_BASE_URL}/v4`,
	method: 'post',
	headers: {
		Accept: 'application/json',
		'Client-ID': TWITCH_CLIENT_ID,
		'x-api-key': AWS_API_KEY,
	},
	// paramsSerializer: { serialize: (params) => queryString.stringify({ ...params }) },
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await getAccessToken();

	// Add Token Authorization to headers
	if (token) {
		config.headers.Authorization = `Bearer ${token.access_token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(error);
		console.log(`${error.message} - ${error.code}`);
	},
);

export default axiosClient;
