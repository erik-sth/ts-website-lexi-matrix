import { useEffect, useState } from 'react';
import './App.css';
import Pixelboard from './Components/Matrix/Pixelboard';
import { setCharSetToLocalStorage } from './utils/Coordinates';
import charToCoordinates from './Data/CharSet';
import WordList from './Components/Words/Wordlist';
import { Nav } from './Components/Nav/Nav';
import SettingsButton from './Components/Utils/SettingsButton';
import Settings from './Settings';

function App() {
	useEffect(() => {
		if (localStorage.getItem('savedChar') !== 'true') {
			setCharSetToLocalStorage(charToCoordinates);
		}
		localStorage.setItem('savedChar', 'true');
	}, []);
	const [words, setWords] = useState<string[]>([]);
	const [currentWord, setCurrentWord] = useState<string>('');
	const [width, setWidth] = useState<number>(13);
	const [settingsVisible, setSettingsVisibilty] = useState<boolean>(false);
	const addWord = (word: string) => {
		setWords([...words, word]);
	};
	const deleteWord = (index: number) => {
		setWords(words.filter((_w, i) => index != i));
	};
	return (
		<>
			<Nav width={width} allWords={words} />
			<div>
				<WordList
					allWords={words}
					deleteWord={deleteWord}
					addWord={addWord}
					onClick={setCurrentWord}
				/>
			</div>
			<div className='center'>
				<div>
					<span className='container'>
						<h1 className='heading container'>
							Pixelboard{' '}
							<SettingsButton
								onClick={() =>
									setSettingsVisibilty(!settingsVisible)
								}
							/>
						</h1>
					</span>
					<Pixelboard height={5} width={width} word={currentWord} />
				</div>
			</div>
			{settingsVisible ? (
				<Settings setWidth={setWidth} width={width} />
			) : null}
		</>
	);
}

export default App;
