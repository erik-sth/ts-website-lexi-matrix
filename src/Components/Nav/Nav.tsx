import DownloadPdfButton from './DownloadPdfButton';
import './Nav.css';

interface Props {
	width: number;
	allWords: string[];
}

export const Nav = ({ width, allWords }: Props) => {
	return (
		<div className='navbar'>
			<DownloadPdfButton width={width} height={5} words={allWords} />
		</div>
	);
};
