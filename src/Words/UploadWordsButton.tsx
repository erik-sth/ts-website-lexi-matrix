import { ChangeEvent } from 'react';
interface Props {
	addWords: (words: string[]) => void;
}

const UploadWordsButton = ({ addWords }: Props) => {
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target;
		const file = fileInput.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const fileContent = (event.target as FileReader)
					.result as string;
				const words = fileContent.match(/\b\w+\b/g) || [];

				addWords(words);
			};

			reader.readAsText(file);
		}
	};
	return (
		<label htmlFor='file' className='wordUpload'>
			Import Words
			<input
				type='file'
				onChange={handleFileUpload}
				accept='.txt'
				id='file'
			/>
		</label>
	);
};

export default UploadWordsButton;
