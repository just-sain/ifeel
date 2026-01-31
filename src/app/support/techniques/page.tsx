'use client'

import Link from 'next/link'

import {
	Activity,
	Brain,
	ChevronRight,
	Eye,
	Heart,
	type LucideIcon,
	Palette,
	Settings,
	Sparkles,
	Wind,
} from 'lucide-react'

import { mockTechniques } from './mock'

// Маппинг иконок и цветов для категорий
const categoryStyles: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
	'Когнитивные техники': { icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10' },
	'Дыхательные техники': { icon: Wind, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
	'Телесные техники': { icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
	'Эмоциональные техники': { icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
	'Техники заземления': { icon: Eye, color: 'text-green-500', bg: 'bg-green-500/10' },
	'Медитативные техники': { icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-500/10' },
	'Творческие техники': { icon: Palette, color: 'text-pink-500', bg: 'bg-pink-500/10' },
	'Поведенческие техники': { icon: Settings, color: 'text-slate-500', bg: 'bg-slate-500/10' },
}

export default function Page() {
	return (
		<div>
			<div className='max-w-4xl mx-auto'>
				<header className='mb-10 text-center'>
					<h1 className='text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 mb-3'>
						Психологическая поддержка
					</h1>
					<p className='text-slate-600 dark:text-zinc-400 max-w-xl mx-auto'>
						Выберите технику, которая лучше всего подходит под ваше текущее состояние.
					</p>
				</header>

				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
					{mockTechniques.map((tech) => {
						const style = categoryStyles[tech.category] || categoryStyles['Поведенческие техники']
						const Icon = style.icon

						return (
							<Link
								key={tech.id}
								className='group relative bg-gray-50 dark:bg-gray-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300'
								href={`/support/techniques/${tech.id}`}
							>
								<div className='flex items-start gap-4'>
									<div className={`p-3 rounded-xl ${style.bg} ${style.color} transition-colors`}>
										<Icon size={24} />
									</div>

									<div className='flex-1 pr-6'>
										<h2 className='text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-primary transition-colors italic-none'>
											{tech.title}
										</h2>

										<p className='mt-1 text-sm text-slate-500 dark:text-zinc-400 line-clamp-2'>
											{tech.description[0].type === 'text'
												? tech.description[0].content
												: (tech.description[0].content as string[])[0]}
										</p>

										<div className='mt-4 flex items-center gap-2'>
											<span
												className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.bg} ${style.color}`}
											>
												{tech.category}
											</span>
										</div>
									</div>

									<ChevronRight className='absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all' />
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}
