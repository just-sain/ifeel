import { likertOptions } from './quiz-data'

interface LikertScaleProps {
	selectedOption: number | null
	onSelect: (index: number) => void
	step: number
}

export function LikertScale({ selectedOption, onSelect, step }: LikertScaleProps) {
	const sizes = ['w-12 h-12', 'w-10 h-10', 'w-8 h-8', 'w-6 h-6', 'w-8 h-8', 'w-10 h-10', 'w-12 h-12']
	const borderColors = [
		'border-green-600 hover:border-green-700',
		'border-green-500 hover:border-green-600',
		'border-green-400 hover:border-green-500',
		'border-red-400 hover:border-red-500',
		'border-purple-300 hover:border-purple-400',
		'border-purple-400 hover:border-purple-500',
		'border-purple-500 hover:border-purple-600',
	]

	const bgColors = [
		'bg-green-600',
		'bg-green-500',
		'bg-green-400',
		'bg-red-400',
		'bg-purple-300',
		'bg-purple-400',
		'bg-purple-500',
	]

	return (
		<div className='mb-8'>
			<div className='flex justify-center items-center gap-1'>
				{likertOptions.map((option, index) => (
					<label
						key={index}
						className={`relative cursor-pointer rounded-full border-2 shadow-lg transition-all duration-200 ${sizes[index]} ${borderColors[index]} ${
							selectedOption === index ? bgColors[index] : 'bg-transparent'
						} flex items-center justify-center`}
					>
						<input
							type='radio'
							name={`statement-${step}`}
							value={index}
							checked={selectedOption === index}
							onChange={() => onSelect(index)}
							className='sr-only'
						/>
						<div
							className={`w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity`}
						></div>
					</label>
				))}
			</div>
			<div className='max-w-lg w-full mx-auto flex justify-between text-base max-md:text-sm font-semibold mb-4'>
				<span className='text-green-500'>Согласен/согласна</span>
				<span className='text-purple-500'>Несогласен/несогласна</span>
			</div>
		</div>
	)
}
