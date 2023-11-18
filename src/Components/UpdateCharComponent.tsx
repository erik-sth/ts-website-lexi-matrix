import { FormEvent, useState } from 'react';
import {
	getCharSetFromLocalStorage,
	removeCharsFromLocalStorage,
	setCharSetToLocalStorage,
} from '../utils/Coordinates';
import charToCoordinates from '../Data/CharSet';
import CharMatrix from './Matrix/CharMatrix';

export const Chars = () => {
	const chars = Object.keys(getCharSetFromLocalStorage());
	const [currentChar, setCurrentChar] = useState<string>('');

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const inputElement = e.currentTarget.elements.namedItem(
			'textInput'
		) as HTMLInputElement;

		if (inputElement) {
			const inputValue = inputElement.value;
			setCurrentChar(inputValue);
			inputElement.value = '';
		}
	};

	return (
		<div className='max-width container'>
			<div>
				<h4 className='reset'>Editing: {currentChar}</h4>
				<CharMatrix input={currentChar} />
			</div>
			<div>
				<div className='container'>
					<form onSubmit={handleFormSubmit}>
						<input
							name='textInput'
							className='input'
							placeholder='Enter text'
							maxLength={1}
						/>
						<button className='btn' type='submit'>
							Submit
						</button>
					</form>
					<button
						className='btn'
						onClick={() => {
							removeCharsFromLocalStorage();
							setCharSetToLocalStorage(charToCoordinates);
						}}
					>
						Reset
					</button>
				</div>
				<div>
					{chars.map((char, index) => (
						<button
							className='btn'
							onClick={() => setCurrentChar(char)}
							key={index}
						>
							{char}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Chars;
