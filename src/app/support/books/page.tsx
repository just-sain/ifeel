'use client'

import Link from 'next/link'

import { AlertTriangle, Book, Download, Info } from 'lucide-react'

import { mockBooks } from './books'

export default function Page() {
	return (
		<div>
			<div className='max-w-4xl mx-auto'>
				<header className='mb-10 text-center'>
					<h1 className='text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 mb-3'>Книги</h1>
					<p className='text-slate-600 dark:text-zinc-400 max-w-xl mx-auto'>
						Подборка полезной литературы для самопомощи и развития.
					</p>

					<div className='mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3 text-left max-w-2xl mx-auto'>
						<AlertTriangle className='w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5' />
						<p className='text-sm text-amber-800 dark:text-amber-200 font-bold'>
							Обратите внимание: некоторые книги доступны лишь в ознакомительном формате из-за авторских прав.
						</p>
					</div>
				</header>

				<div className='bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl p-6 md:p-8 my-16'>
					<div className='flex items-center gap-3 mb-4'>
						<Info className='w-6 h-6 text-blue-600 dark:text-blue-400' />
						<h2 className='text-xl font-bold text-slate-900 dark:text-zinc-100'>Важно помнить</h2>
					</div>
					<div className='space-y-4 text-slate-700 dark:text-zinc-300 leading-relaxed text-sm md:text-base'>
						<p>
							Книги по психологии и саморазвитию могут стать полезной поддержкой: помочь лучше понять себя, свои
							чувства и переживания, найти слова для того, что сложно выразить. Однако важно понимать, что книги
							не заменяют живого общения со специалистом.
						</p>
						<p>
							Ни одна книга не может учитывать индивидуальные особенности человека, его личный опыт и текущее
							эмоциональное состояние. В сложных или затяжных ситуациях, при сильной тревоге, депрессии,
							эмоциональном выгорании или кризисах, поддержка профессионального психолога остаётся необходимой.
						</p>
						<p>
							Используйте книги как дополнительный ресурс и опору, но не как единственный способ справляться с
							трудностями. Обращение за профессиональной помощью — это проявление заботы о себе, а не слабости.
						</p>
					</div>
				</div>

				<div className='grid gap-4 mb-16'>
					{mockBooks.map((book) => (
						<Link
							key={book.id}
							className='group relative bg-gray-50 dark:bg-gray-900 even:bg-gray-200/50 dark:even:bg-gray-900/70 border border-slate-200 dark:border-gray-900 rounded-2xl p-5 hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300'
							href={book.path}
							target='_blank'
						>
							<div className='flex items-start gap-4'>
								{/* Иконка: синяя для нечетных, серая для четных */}
								<div className='p-3 rounded-xl bg-blue-500/10 text-blue-500 group-even:bg-slate-500/10 group-even:text-slate-900 group-even:dark:text-slate-200 transition-colors'>
									<Book size={24} />
								</div>

								<div className='flex-1 pr-8'>
									<h2 className='text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-primary transition-colors'>
										{book.title}
									</h2>

									<p className='mt-2 text-sm text-slate-500 dark:text-zinc-400 line-clamp-3'>
										{book.description}
									</p>
								</div>

								<Download className='absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-primary transition-all' />
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
