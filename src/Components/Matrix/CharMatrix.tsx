import { useEffect, useState } from 'react';
import {
	getCharSetFromLocalStorage,
	saveCharCoordinatesToLocal,
} from '../../utils/Coordinates';
import { createEmptyMatrix } from '../../utils/Matrix';

interface Props {
	input: string;
}

const CharMatrix = ({ input }: Props) => {
	const initialMatrix: number[][] = getCharSetFromLocalStorage()[input];

	const [matrix, setMatrix] = useState<number[][]>(initialMatrix);
	const [width, setWidth] = useState<number>(5);

	function createNewMatrix() {
		setMatrix(createEmptyMatrix(width, 5));
	}

	const toggleCell = (row: number, col: number): void => {
		const newMatrix = [...matrix];
		newMatrix[row][col] = newMatrix[row][col] == 1 ? 0 : 1;
		setMatrix(newMatrix);
		saveCharCoordinatesToLocal(input, newMatrix);
	};
	useEffect(() => {
		if (initialMatrix) {
			setMatrix(getCharSetFromLocalStorage()[input]);
		} else {
			createNewMatrix();
		}
	}, [input]);

	useEffect(() => {
		createNewMatrix();
	}, [width]);

	if (!matrix) {
		return <div>Matrix not found</div>;
	}

	return (
		<div>
			{matrix.map((row, rowIndex) => (
				<div key={rowIndex}>
					{row.map((cell, colIndex) => (
						<span
							key={colIndex}
							onClick={() => toggleCell(rowIndex, colIndex)}
							className={cell ? 'pixel black' : 'pixel white'}
						/>
					))}
				</div>
			))}
			<div className='container'>
				<input
					type='range'
					min={1}
					max={6}
					value={width}
					onChange={(e) => setWidth(parseInt(e.target.value))}
				></input>
				<div className='white'>{width}</div>
			</div>
		</div>
	);
};

export default CharMatrix;
