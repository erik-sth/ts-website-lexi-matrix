import { useEffect, useState, useMemo } from 'react';
import Matrix from '../Class/Matrix';
import { createEmptyMatrix } from '../utils/Matrix';

interface Props {
	height: number;
	width: number;
	word: string;
}

const Pixelboard = ({ height, width, word }: Props) => {
	const matrix = useMemo(() => new Matrix(width, height), [width, height]);

	useEffect(() => {
		matrix.mapInputToMatrix(word);
		setMatrixV(matrix.getMatrix());
	}, [word, matrix]);

	const [matrixV, setMatrixV] = useState<number[][]>(
		createEmptyMatrix(width, height)
	);

	useEffect(() => {
		matrix.updateWidth(width);
		matrix.mapInputToMatrix(word);
		setMatrixV(matrix.getMatrix());
	}, [matrix, setMatrixV, width, word]);

	return (
		<div className='pixelboard'>
			{matrixV.map((row, rowIndex) => (
				<div style={{ height: '20px' }} key={rowIndex}>
					{row.map((cell, colIndex) => (
						<span
							key={colIndex}
							className={`pixel ${cell ? 'white' : 'black'}`}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default Pixelboard;
