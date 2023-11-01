import { useEffect, useState } from 'react';
import './App.css';
import Pixelboard from './Matrix/Pixelboard';
import { setCharSetToLocalStorage } from './utils/Coordinates';
import charToCoordinates from './Data/CharSet';
import WordList from './Words/Wordlist';
import { Nav } from './Nav/Nav';

function App() {
	useEffect(() => {
		if (localStorage.getItem('savedChar') !== 'true') {
			setCharSetToLocalStorage(charToCoordinates);
		}
		localStorage.setItem('savedChar', 'true');
	}, []);
	const [words, setWords] = useState<string[]>([]);
	const [currentWord, setCurrentWord] = useState<string>('');
	const [width, setWidth] = useState<number>(19);
	const addWord = (word: string) => {
		setWords([...words, word]);
	};
	const deleteWord = (index: number) => {
		setWords(words.filter((_w, i) => index != i));
	};
	return (
		<>
			<Nav width={19} allWords={words} />
			<div className='wordlist'>
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
						<h1 className='heading'>Pixelboard</h1>
						<input
							type='range'
							value={width}
							min='4'
							max='24'
							onChange={(e) => setWidth(parseInt(e.target.value))}
						></input>
					</span>
					<Pixelboard height={5} width={width} word={currentWord} />
				</div>
			</div>
		</>
	);
}

export default App;
