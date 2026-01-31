'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

import { Activity, Brain, ChevronLeft, Eye, Heart, Palette, Settings, Sparkles, Wind } from 'lucide-react'

import { mockTechniques } from '../mock'

// Вспомогательная функция для иконок в зависимости от категории
const getCategoryIcon = (category: string) => {
	const props = { className: 'w-6 h-6' }

	if (category.includes('Когнитивные')) return <Brain {...props} className='text-blue-500' />
	if (category.includes('Дыхательные')) return <Wind {...props} className='text-cyan-500' />
	if (category.includes('Телесные')) return <Activity {...props} className='text-orange-500' />
	if (category.includes('Эмоциональные')) return <Heart {...props} className='text-red-500' />
	if (category.includes('заземления')) return <Eye {...props} className='text-green-500' />
	if (category.includes('Медитативные')) return <Sparkles {...props} className='text-purple-500' />
	if (category.includes('Творческие')) return <Palette {...props} className='text-pink-500' />

	return <Settings {...props} className='text-slate-500' />
}

export default function TechniquePage() {
	const { id } = useParams()
	const technique = mockTechniques.find((t) => t.id === id)

	if (!technique) return notFound()

	return (
		<div className=''>
			<div className='max-w-2xl mx-auto'>
				{/* Навигация */}
				<Link
					className='group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8'
					href='/support/techniques'
				>
					<ChevronLeft className='w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform' />
					Назад к списку техник
				</Link>

				{/* Карточка контента */}
				<article className='bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden'>
					{/* Шапка техники */}
					<div className='p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-700'>
								{getCategoryIcon(technique.category)}
							</div>
							<span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
								{technique.category}
							</span>
						</div>
						<h1 className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100'>
							{technique.title}
						</h1>
					</div>

					{/* Тело техники */}
					<div className='p-6 md:p-8 space-y-6'>
						{technique.description.map((block, idx) => {
							if (block.type === 'text') {
								return (
									<p key={idx} className='text-lg leading-relaxed text-slate-700 dark:text-zinc-300'>
										{block.content}
									</p>
								)
							} else if (block.type === 'list') {
								return (
									<div
										key={idx}
										className='bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-5 border border-slate-100 dark:border-zinc-800'
									>
										<ul className='space-y-4'>
											{(block.content as string[]).map((item, i) => (
												<li key={i} className='flex items-start gap-3 text-slate-700 dark:text-zinc-300'>
													<span className='flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5'>
														{i + 1}
													</span>
													<span className='text-base'>{item}</span>
												</li>
											))}
										</ul>
									</div>
								)
							}
						})}
					</div>

					{/* Футер-подсказка */}
					<div className='px-8 py-4 bg-primary/5 dark:bg-primary/10 border-t border-primary/10 flex items-center gap-3'>
						<div className='w-2 h-2 rounded-full bg-primary animate-pulse' />
						<p className='text-sm text-primary/80 font-medium'>
							Практикуйте это упражнение медленно и осознанно.
						</p>
					</div>
				</article>
			</div>
		</div>
	)
}
