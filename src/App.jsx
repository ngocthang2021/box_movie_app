import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ThemeContext from '@context/themeContext';

import theme, { darkTheme, lightTheme } from '@styles/theme';
import Global from '@styles/global';

import MainLayout from '@layout/MainLayout';
import SmoothScroll from '@components/ui/SmoothScroll';

function App() {
	const [currentTheme, setCurrentTheme] = useState('dark');
	const pageTheme = currentTheme === 'dark' ? darkTheme : lightTheme;

	return (
		<Router>
			<SmoothScroll>
				<ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
					<ThemeProvider theme={{ ...theme, ...pageTheme }}>
						<Global />
						<MainLayout />
					</ThemeProvider>
				</ThemeContext.Provider>
			</SmoothScroll>
		</Router>
	);
}

export default App;
