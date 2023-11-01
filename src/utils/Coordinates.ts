import { CharCoordinates } from '../types';

const saveCharCoordinatesToLocal = (char: string, coordinates: number[][]) => {
	const existingData = localStorage.getItem('charCoordinates');

	const charCoordinates = existingData ? JSON.parse(existingData) : {};

	charCoordinates[char] = coordinates;

	localStorage.setItem('charCoordinates', JSON.stringify(charCoordinates));
};

const getCharSetFromLocalStorage = (): CharCoordinates => {
	const charCoordinates = localStorage.getItem('charCoordinates');
	return charCoordinates ? JSON.parse(charCoordinates) : {};
};

const setCharSetToLocalStorage = (charToCoordinates: CharCoordinates) => {
	Object.keys(charToCoordinates).forEach((key) => {
		saveCharCoordinatesToLocal(key, charToCoordinates[key]);
	});
};
const removeCharsFromLocalStorage = () => {
	localStorage.removeItem('charCoordinates');
};

export {
	getCharSetFromLocalStorage,
	saveCharCoordinatesToLocal,
	setCharSetToLocalStorage,
	removeCharsFromLocalStorage,
};
