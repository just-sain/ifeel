'use client'

import Link from 'next/link'

import { whatsappNumber, whatsappText } from '@types'
import { ArrowRight, MessageCircle, MessageSquareDot, ShieldCheck } from 'lucide-react'

export default function Page() {
	return (
		<div className='max-w-2xl mx-auto mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			<div className='space-y-2 text-center md:text-left'>
				<h2 className='text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100'>
					Поговорите со специалистом или найдите поддержку
				</h2>
				<p className='text-muted-foreground'>
					Выберите удобный формат общения. Мы гарантируем конфиденциальность и поддержку на каждом этапе.
				</p>
			</div>

			<div className='grid gap-4'>
				{/* Анонимный чат с психологом */}
				<Link
					className='group relative block p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-primary dark:hover:border-primary/50 transition-all shadow-sm hover:shadow-md'
					href='/chat'
				>
					<div className='flex items-start gap-4'>
						<div className='p-3 rounded-xl bg-primary/10 text-primary'>
							<MessageSquareDot className='w-6 h-6' />
						</div>
						<div className='flex-1 space-y-1'>
							<h3 className='font-bold text-lg text-slate-900 dark:text-zinc-100'>Анонимный чат с психологом</h3>
							<p className='text-sm text-muted-foreground leading-relaxed'>
								Полная конфиденциальность. Ваше имя и данные не отображаются. Идеально для первого шага.
							</p>
						</div>
						<ArrowRight className='w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all' />
					</div>
					<div className='mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 w-fit px-2 py-1 rounded-md'>
						<ShieldCheck className='w-3 h-3' />
						100% Анонимно
					</div>
				</Link>

				{/* WhatsApp */}
				<a
					className='group relative block p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-green-500/50 transition-all shadow-sm hover:shadow-md'
					href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
					rel='noopener noreferrer'
					target='_blank'
				>
					<div className='flex items-start gap-4'>
						<div className='p-3 rounded-xl bg-green-500/10 text-green-600 dark:text-green-500'>
							<MessageCircle className='w-6 h-6' />
						</div>
						<div className='flex-1 space-y-1'>
							<h3 className='font-bold text-lg text-slate-900 dark:text-zinc-100'>WhatsApp</h3>
							<p className='text-sm text-muted-foreground leading-relaxed'>
								Прямая связь для записи на консультацию и уточнения расписания. Более личный формат.
							</p>
						</div>
						<ArrowRight className='w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-green-500 group-hover:translate-x-1 transition-all' />
					</div>
					<div className='mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-500/5 w-fit px-2 py-1 rounded-md'>
						<div className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
						Психолог на связи
					</div>
				</a>
			</div>

			{/* Инфо-блок */}
			<div className='rounded-xl bg-slate-100 dark:bg-zinc-800/50 p-4 border border-dashed border-slate-300 dark:border-zinc-700 text-center'>
				<p className='text-xs text-muted-foreground italic'>
					Если вы находитесь в критической ситуации, требующей немедленного вмешательства, пожалуйста, позвоните в
					экстренную психологическую службу.
				</p>
			</div>
		</div>
	)
}
