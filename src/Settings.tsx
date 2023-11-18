import { Chars } from './Components/UpdateCharComponent';
interface Props {
	width: number;
	setWidth: (width: number) => void;
}

const Settings = ({ width, setWidth }: Props) => {
	return (
		<div>
			<h1>Settings</h1>
			<div>
				<label htmlFor='widthInput'>Width: {width}</label>
				<input
					id='widthInput'
					type='range'
					value={width}
					min='4'
					max='24'
					onChange={(e) => setWidth(parseInt(e.target.value))}
				></input>
			</div>
			<Chars />
			<button className='btn'>Reset Website</button>
		</div>
	);
};

export default Settings;
