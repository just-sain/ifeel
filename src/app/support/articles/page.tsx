'use client'

import { Code, Hammer, Hourglass, Wrench } from 'lucide-react'

export default function Page() {
	return (
		<div className='from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center p-6 transition-colors duration-300'>
			<div className='max-w-xl mx-auto text-center bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-slate-200 dark:border-zinc-800 p-8 md:p-12 space-y-8 relative overflow-hidden'>
				{/* Декоративные иконки в фоне */}
				<Hammer className='absolute top-8 left-8 w-16 h-16 text-primary/10 dark:text-primary/5 rotate-12 -z-0 opacity-10' />
				<Wrench className='absolute bottom-8 right-8 w-16 h-16 text-primary/10 dark:text-primary/5 -rotate-12 -z-0 opacity-10' />

				<div className='relative z-10 space-y-6'>
					<div className='flex justify-center items-center gap-4 text-primary'>
						<Hammer className='w-12 h-12 md:w-16 md:h-16 animate-bounce-slow' />
						<span className='text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-zinc-100'>
							{/* Просто для визуального эффекта, можно убрать */}
						</span>
						<Wrench className='w-12 h-12 md:w-16 md:h-16 animate-pulse-slow' />
					</div>

					<h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 mt-6'>
						Раздел в разработке
					</h1>

					<p className='text-lg text-slate-700 dark:text-zinc-300 leading-relaxed max-w-md mx-auto'>
						Мы активно работаем над созданием полезного и функционального контента для этого раздела.
						Возвращайтесь немного позже!
					</p>

					<div className='flex justify-center items-center gap-4 text-slate-500 dark:text-zinc-400'>
						<div className='flex items-center gap-2'>
							<Code className='w-5 h-5' />
							<span className='text-sm font-medium'>Код пишется...</span>
						</div>
						<div className='flex items-center gap-2'>
							<Hourglass className='w-5 h-5 animate-spin-slow' />
							<span className='text-sm font-medium'>Ожидайте обновлений</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
