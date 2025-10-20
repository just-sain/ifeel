interface ISpecialist {
	className?: string
	name: string
	image: string
	position: string
	age: number
	experience: number
	achievements: string[]
}

export const Specialist = ({ className, name, image, position, age, experience, achievements }: ISpecialist) => {
	return (
		<div className={`specialist-card ${className}`}>
			<div className='bg-white dark:bg-gray-800 rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-105 border border-gray-100 dark:border-gray-700'>
				<div className='md:flex'>
					<div className='md:w-1/3'>
						<img alt={name} className='w-full h-64 md:h-full object-cover' src={image} />
					</div>
					<div className='md:w-2/3 p-8'>
						<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>{name}</h3>
						<p className='text-blue-600 dark:text-blue-400 font-semibold mb-4'>{position}</p>
						<div className='space-y-3 mb-6'>
							<div className='flex items-center space-x-3'>
								<svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path
										d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
									/>
								</svg>
								<span className='text-gray-600 dark:text-gray-300'>Возраст: {age} лет</span>
							</div>
							<div className='flex items-center space-x-3'>
								<svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path
										d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
									/>
								</svg>
								<span className='text-gray-600 dark:text-gray-300'>Стаж: {experience} лет</span>
							</div>
						</div>
						<div className='border-t border-gray-200 dark:border-gray-700 pt-6'>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-3'>Достижения:</h4>
							<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
								{achievements.map((achievement, index) => (
									<li key={index}>• {achievement}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
