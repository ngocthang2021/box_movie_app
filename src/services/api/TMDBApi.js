import axiosClient from './axiosClient';

const TMDBApi = {
	getTrendings: (mediaType, time, params) => {
		const url = `/trending/${mediaType}/${time}`;
		return axiosClient.get(url, { params });
	},

	getDetails: (mediaType, id, params) => {
		const url = `/${mediaType}/${id}`;
		return axiosClient.get(url, { params });
	},

	getCredtis: (mediaType, id, params) => {
		const url = `/${mediaType}/${id}/credits`;
		return axiosClient.get(url, { params });
	},

	getSimilarMovies: (mediaType, id, params) => {
		const url = `${mediaType}/${id}/similar`;
		return axiosClient.get(url, { params });
	},

	getVideos: (mediaType, id, params) => {
		const url = `${mediaType}/${id}/videos`;
		return axiosClient.get(url, { params });
	},

	getLists: (mediaType, queryString, params) => {
		const url = `/${mediaType}/${queryString}`;
		return axiosClient.get(url, { params });
	},

	getSearch: (query, searchQuery) => {
		const url = `/search/${query}/${searchQuery}`;
		return axiosClient.get(url);
	},

	getCollections: (collectionId, params) => {
		const url = `/collection/${collectionId}`;
		return axiosClient.get(url, { params });
	},

	getGenres: (mediaType) => {
		const url = `/genre/${mediaType}/list`;
		return axiosClient.get(url);
	},

	getPerson: (personId, query = '') => {
		query || query !== ''
			? axiosClient.get(`person/${personId}/${query}`)
			: axiosClient.get(`/person/${personId}`);
	},
};

export default TMDBApi;
