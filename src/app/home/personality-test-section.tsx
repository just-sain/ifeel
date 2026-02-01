import Link from 'next/link'

export function PersonalityTestSection() {
	return (
		<section className='py-16 px-4 bg-white dark:bg-gray-800'>
			<div className='max-w-4xl mx-auto text-center'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Психологические тесты</h2>
				<p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
					Узнайте свой тип личности (MBTI) или оцените эмоциональное состояние (PHQ-8)
				</p>
				<div className='flex flex-col sm:flex-row justify-center gap-4'>
					<Link href='/test'>
						<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto'>
							Тест на личность (MBTI)
						</button>
					</Link>
					<Link href='/test/phq'>
						<button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto'>
							Оценка состояния (PHQ-8)
						</button>
					</Link>
				</div>
			</div>
		</section>
	)
}
