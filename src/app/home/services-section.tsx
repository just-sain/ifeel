import { Specialist } from './specialist'

const mockSpecialists = [
	{
		name: 'Анна Иванова',
		image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
		position: 'Клинический психолог',
		age: 38,
		experience: 12,
		achievements: [
			'Кандидат психологических наук',
			'Автор 15 научных статей',
			'Сертификат EMDR терапии',
			'Опыт работы с 500+ клиентами',
		],
	},
	{
		name: 'Валерия Зайцева',
		image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80',
		position: 'Психотерапевт',
		age: 29,
		experience: 7,
		achievements: [
			'Доктор психологических наук',
			'Ведущий специалист по когнитивно-поведенческой терапии',
			'Международные сертификаты по психотерапии',
			'Автор 3 монографий по психологии',
		],
	},
	{
		name: 'Мария Петрова',
		image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
		position: 'Семейный психолог',
		age: 35,
		experience: 10,
		achievements: [
			'Специалист по семейной терапии',
			'Автор книги по семейным отношениям',
			'Сертификат по системной терапии',
			'Опыт работы с семьями 15+ лет',
		],
	},
	{
		name: 'Алексей Сидоров',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
		position: 'Психолог-консультант',
		age: 42,
		experience: 18,
		achievements: [
			'Доктор психологических наук',
			'Ведущий эксперт по кризисным ситуациям',
			'Международные публикации',
			'Консультации для крупных компаний',
		],
	},
]

export const ServicesSection = () => {
	return (
		<section className='py-20 bg-gray-50 dark:bg-gray-900' id='services'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16 animate-fade-in-up'>
					<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						У нас самые квалифицированные специалисты
					</h2>
					<p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
						Наша команда состоит из опытных психологов с многолетним стажем работы.
					</p>
				</div>

				{/* Specialists Grid */}
				<div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
					{mockSpecialists.map((d) => (
						<Specialist key={d.name} {...d} />
					))}
				</div>
			</div>
		</section>
	)
}
