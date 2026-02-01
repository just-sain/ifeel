'use client'

import { ExternalLink, Info, PlayCircle } from 'lucide-react'

const tedTalks = [
	{
		id: 'NDQ1Mi5I4rg',
		title: 'The gift and power of emotional courage',
		author: 'Susan David',
		description:
			'Почему важно не держать эмоции в себе. Психолог Сьюзан Дэвид делится тем, как принятие всех наших эмоций — даже самых трудных — помогает нам стать более устойчивыми.',
	},
	{
		id: 'V0d0HF2QpMw',
		title: 'Язык тела формирует вашу личность',
		author: 'Эми Кадди',
		description:
			'Язык тела влияет на то, как нас видят другие, но он также может изменить то, как мы видим самих себя. Эми Кадди показывает, как "позы силы" могут повысить уверенность.',
	},
	{
		id: '_Gqwi7Y96Sk',
		title: 'The unstoppable power of letting go',
		author: 'Jill Sherer Murray',
		description:
			'Джилл Шерер Мюррей рассказывает о том, как научиться отпускать — отношения, убеждения и страхи, которые удерживают нас на месте.',
	},
]

export default function Page() {
	return (
		<div className='max-w-6xl mx-auto'>
			<header className='mb-10 text-center'>
				<h1 className='text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 mb-3'>
					TED Talks - психология
				</h1>
				<div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-3 text-left max-w-2xl mx-auto'>
					<Info className='w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5' />
					<p className='text-sm text-blue-800 dark:text-blue-200'>
						Данный раздел подойдет не всем, так как большинство видео на английском, но на YouTube есть хорошая
						возможность субтитров и автоперевода.
					</p>
				</div>
			</header>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{tedTalks.map((talk) => (
					<div
						key={talk.id}
						className='flex flex-col bg-white dark:bg-gray-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group'
					>
						<div className='relative aspect-video bg-slate-100 dark:bg-zinc-800'>
							<img
								src={`https://img.youtube.com/vi/${talk.id}/mqdefault.jpg`}
								alt={talk.title}
								className='w-full h-full object-cover'
							/>
							<a
								href={`https://www.youtube.com/watch?v=${talk.id}`}
								target='_blank'
								rel='noopener noreferrer'
								className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors'
							>
								<PlayCircle className='w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all' />
							</a>
						</div>
						<div className='p-5 flex flex-col flex-1'>
							<h3 className='text-lg font-bold text-slate-900 dark:text-zinc-100 mb-1 line-clamp-2'>
								{talk.title}
							</h3>
							<p className='text-sm text-primary font-medium mb-3'>{talk.author}</p>
							<p className='text-sm text-slate-600 dark:text-zinc-400 line-clamp-4 mb-4 flex-1'>
								{talk.description}
							</p>
							<a
								href={`https://www.youtube.com/watch?v=${talk.id}`}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-zinc-100 hover:text-primary transition-colors'
							>
								Смотреть на YouTube
								<ExternalLink className='w-4 h-4' />
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
