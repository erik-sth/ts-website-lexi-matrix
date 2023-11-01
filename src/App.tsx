import { useEffect } from 'react';
import './App.css';
import Pixelboard from './Matrix/Pixelboard';
import { setCharSetToLocalStorage } from './utils/Coordinates';
import charToCoordinates from './Data/CharSet';

function App() {
	useEffect(() => {
		if (localStorage.getItem('savedChar') !== 'true') {
			setCharSetToLocalStorage(charToCoordinates);
		}
		localStorage.setItem('savedChar', 'true');
	}, []);

	return (
		<>
			<Pixelboard height={5} width={19} word='TEST' />
		</>
	);
}

export default App;
