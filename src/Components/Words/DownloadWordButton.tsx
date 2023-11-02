interface Props {
	words: string[];
}

const DownloadWordButton = ({ words }: Props) => {
	const formatWordsAsCode = () => {
		const codeOutput = `[${words.map((word) => `'${word}'`).join(', ')}]`;

		const blob = new Blob([codeOutput], { type: 'text/plain' });

		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = 'words.txt';

		a.click();

		URL.revokeObjectURL(url);
	};
	return (
		<button className='btn download-words' onClick={formatWordsAsCode}>
			Download Words
		</button>
	);
};

export default DownloadWordButton;
