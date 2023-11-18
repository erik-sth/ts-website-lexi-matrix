import { FormEvent } from 'react';
import './Wordlist.css';
import UploadWordsButton from './UploadWordsButton';
import DownloadWordButton from './DownloadWordButton';
interface Props {
	allWords: string[];
	onClick: (currentString: string) => void;
	addWord: (word: string) => void;
	deleteWord: (index: number) => void;
}

const WordList = ({ allWords, onClick, addWord, deleteWord }: Props) => {
	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputElement = e.currentTarget.querySelector(
			'[name="textInput"]'
		) as HTMLInputElement;

		if (inputElement && inputElement.value !== '') {
			const inputValue = inputElement.value;

			addWord(inputElement.value);
			onClick(inputValue);
			inputElement.value = '';
		}
	};
	const addWords = (words: string[]) => {
		words.forEach((word) => addWord(word));
	};
	return (
		<div className='wordlist-container'>
			<div className='wordlist'>
				<form onSubmit={handleFormSubmit}>
					<input
						className='input'
						name='textInput'
						placeholder='Enter word'
					/>
					<button className='btn' type='submit'>
						Add
					</button>
				</form>
				<UploadWordsButton addWords={addWords} />
				<ul>
					<span>
						{allWords.map((word, index) => (
							<li key={index}>
								<button
									style={{ width: '100%' }}
									onClick={() => onClick(word)}
								>
									{word}
								</button>
								<button onClick={() => deleteWord(index)}>
									X
								</button>
							</li>
						))}
					</span>
				</ul>
			</div>
			<DownloadWordButton words={allWords} />
		</div>
	);
};

export default WordList;
