import { Specialist } from './specialist'

const mockSpecialists = [
	{
		name: 'Нұржауқызы Гүлден',
		image: '/psychs/gulden.jpeg',
		position: 'Психолог',
		age: 22,
		experience: 1,
		achievements: [
			'Специалист по работе с эмоциональным выгоранием',
			'Провела более 50 часов индивидуальных консультаций',
			'Практикует под регулярным наблюдением супервизора',
		],
	},
]

export const ServicesSection = () => {
	return (
		<section className='py-20 bg-gray-50 dark:bg-gray-900' id='services'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16 animate-fade-in-up'>
					<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>Наши специалисты</h2>
				</div>

				{/* Specialists Grid */}
				<div className='grid md:grid-cols-1 gap-8 max-w-6xl mx-auto'>
					{mockSpecialists.map((d) => (
						<Specialist key={d.name} {...d} />
					))}
				</div>
			</div>
		</section>
	)
}
