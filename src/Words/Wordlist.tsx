import { FormEvent } from 'react';
import './Wordlist.css';
interface Props {
	allWords: string[];
	onClick: (currentString: string) => void;
	addWord: (word: string) => void;
	deleteWord: (word: string) => void;
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
	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<input
					pattern={'^[a-zA-Z]+$'}
					className='input'
					name='textInput'
					placeholder='Enter text'
				/>
				<button className='btn' type='submit'>
					Add
				</button>
			</form>
			<ul>
				{allWords.map((word, index) => (
					<li key={index}>
						<button
							style={{ width: '100%' }}
							onClick={() => onClick(word)}
						>
							{word}
						</button>
						<button onClick={() => deleteWord(word)}>X</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WordList;
