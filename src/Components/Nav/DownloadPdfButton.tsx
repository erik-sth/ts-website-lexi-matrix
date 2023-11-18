import Matrix from '../../Class/Matrix';
import PDFGenerator from '../../Class/Pdf';
import { number_map } from '../../Data/numberToChar';

interface Props {
	words: string[];
	height: number;
	width: number;
}
const DownloadPdfButton = ({ width, height, words }: Props) => {
	const saved: number[][][] = [];
	const wordSaved: string[] = [];

	function calc() {}
	words.forEach((word) => {
		wordSaved.push(word);
		const newMatrix = new Matrix(width, height);
		newMatrix.mapInputToMatrix(word);
		saved.push(newMatrix.getMatrix());
	});
	function createDoc() {
		const pdf = new PDFGenerator();
		calc();
		let counter = 0;
		for (let k = saved[0].length - 1; k + 1 > 0; k--) {
			for (let j = 0; j < saved[0][0].length; j++) {
				const position: string =
					'Position: ' + number_map[4 - k] + (j + 1);
				if ((j == 0 && k == saved[0].length) || counter < 6) {
					pdf.addTitel(position);
					counter++;
				} else {
					pdf.addPageWithTitle(position);
					counter = 0;
				}
				for (let i = 0; i < words.length; i++) {
					pdf.addContent(
						`${wordSaved[i]}: ${saved[i][k][j] ? 'X' : 'O'}`
					);
				}
			}
		}
		return pdf.generateAndDownload();
	}

	return (
		<button
			className='btn'
			onClick={() => {
				createDoc();
			}}
			disabled={words.length === 0}
		>
			DownloadPdfButton
		</button>
	);
};

export default DownloadPdfButton;
