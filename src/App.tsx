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
					<h1 className='heading'>Pixelboard</h1>
					<Pixelboard height={5} width={19} word={currentWord} />
				</div>
			</div>
		</>
	);
}

export default App;
