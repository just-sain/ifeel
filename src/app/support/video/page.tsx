'use client'

import { Activity, Brain, type LucideIcon } from 'lucide-react'

import { VideoCard } from './video-card'

const videoTechniques = [
	{
		id: 'panic-attack',
		title: 'Техника при панических атаках',
		description: 'Видео-инструкция по снятию симптомов панической атаки.',
		category: 'Дыхательные техники',
		url: '/video/panic-attacks.mp4', // пример
	},
	{
		id: 'stress-relief',
		title: 'Техника снятия стресса',
		description: 'Видео с дыхательными и телесными упражнениями для снижения стресса.',
		category: 'Телесные техники',
		url: '/video/stress.mp4',
	},
]

const categoryStyles: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
	'Дыхательные техники': { icon: Brain, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
	'Телесные техники': { icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
}

export default function VideoTechnicsPage() {
	return (
		<div>
			<div className='max-w-4xl mx-auto'>
				<header className='mb-10 text-center'>
					<h1 className='text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 mb-3'>
						Видео техники по психологии
					</h1>
					<p className='text-slate-600 dark:text-zinc-400 max-w-xl mx-auto'>
						Выберите видео, чтобы изучить технику и снизить стресс или панические симптомы.
					</p>
				</header>

				<div className='grid gap-6 grid-cols-1'>
					{videoTechniques.map((video) => {
						const style = categoryStyles[video.category] || categoryStyles['Телесные техники']
						const Icon = style.icon

						return (
							<div
								key={video.id}
								className='group relative bg-gray-50 dark:bg-gray-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300'
							>
								<div className='flex items-start gap-4 mb-4'>
									<div className={`p-3 rounded-xl ${style.bg} ${style.color} transition-colors`}>
										<Icon size={24} />
									</div>

									<div className='flex-1'>
										<h2 className='text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-primary transition-colors'>
											{video.title}
										</h2>
										<p className='mt-1 text-sm text-slate-500 dark:text-zinc-400 line-clamp-2'>
											{video.description}
										</p>

										<div className='mt-3 flex items-center gap-2'>
											<span
												className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.bg} ${style.color}`}
											>
												{video.category}
											</span>
										</div>
									</div>
								</div>

								<VideoCard Icon={Icon} title={video.title} url={video.url} />
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
