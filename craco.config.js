const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@pages': path.resolve(__dirname, './src/pages/'),
			'@components': path.resolve(__dirname, './src/components/'),
			'@constants': path.resolve(__dirname, './src/constants/'),
			'@helpers': path.resolve(__dirname, './src/helpers/'),
			'@services': path.resolve(__dirname, './src/services/'),
			'@context': path.resolve(__dirname, './src/context/'),
			'@utils': path.resolve(__dirname, './src/utils/'),
			'@routes': path.resolve(__dirname, './src/routes/'),
			'@assets': path.resolve(__dirname, './src/assets/'),
			'@layout': path.resolve(__dirname, './src/layout/'),
			'@styles': path.resolve(__dirname, './src/styles/'),
		},
	},
};
