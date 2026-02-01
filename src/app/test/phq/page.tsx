'use client'

import { useState } from 'react'

const questions = [
	'Малый интерес или удовольствие от деятельности',
	'Подавленное настроение, раздражительность или чувство безысходности',
	'Проблемы со сном (плохо засыпали / часто просыпались / слишком много спали)',
	'Усталость или недостаток энергии',
	'Плохой аппетит или переедание',
	'Плохое отношение к себе, чувство неудачи или разочарование в себе',
	'Трудности с концентрацией внимания',
	'Замедленность или чрезмерная суетливость',
]

export default function PHQ8Page() {
	const [answers, setAnswers] = useState<Record<number, number>>({})
	const [result, setResult] = useState<{ score: number; text: string } | null>(null)

	const handleOptionChange = (questionIndex: number, value: number) => {
		setAnswers((prev) => ({ ...prev, [questionIndex]: value }))
	}

	const calculatePHQ = () => {
		if (Object.keys(answers).length < questions.length) {
			alert('Пожалуйста, ответьте на все вопросы')

			return
		}

		let total = 0

		for (let i = 0; i < questions.length; i++) {
			total += answers[i]
		}

		let text = ''

		if (total <= 4) text = 'Минимальные симптомы'
		else if (total <= 9) text = 'Лёгкие симптомы депрессии'
		else if (total <= 14) text = 'Умеренные симптомы депрессии'
		else if (total <= 19) text = 'Выраженные симптомы депрессии'
		else text = 'Тяжёлые симптомы депрессии'

		setResult({ score: total, text })
	}

	return (
		<div className='max-w-5xl mx-auto p-4 md:p-8'>
			<h2 className='text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-zinc-100'>
				Оценка эмоционального состояния (PHQ-8)
			</h2>

			<div className='mb-10 space-y-6 text-slate-700 dark:text-zinc-300 leading-relaxed bg-white dark:bg-gray-900/50 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm'>
				<div>
					<h3 className='text-xl font-bold mb-3 text-slate-900 dark:text-zinc-100'>Введение</h3>
					<p className='mb-3'>
						Забота о психологическом здоровье так же важна, как и забота о физическом состоянии. Учёба, экзамены,
						неопределённость будущего, высокая нагрузка и личные переживания могут накапливаться и незаметно
						влиять на эмоциональное состояние.
					</p>
					<p>
						Этот раздел создан для того, чтобы помочь вам лучше понять своё самочувствие и обратить внимание на
						сигналы, которые иногда сложно заметить в повседневной жизни.
					</p>
				</div>

				<div>
					<h3 className='text-xl font-bold mb-3 text-slate-900 dark:text-zinc-100'>О скрининговом тесте</h3>
					<p className='mb-3'>
						На этой странице представлен скрининговый тест PHQ-8 — краткий опросник, который используется во всём
						мире для предварительной оценки симптомов депрессивного состояния.
					</p>
					<p className='mb-2 font-medium'>Тест помогает:</p>
					<ul className='list-disc list-inside space-y-1 pl-2 mb-4'>
						<li>оценить уровень эмоционального напряжения за последние две недели;</li>
						<li>понять, насколько текущее состояние может влиять на настроение, энергию, сон и концентрацию;</li>
						<li>вовремя задуматься о необходимости поддержки.</li>
					</ul>
				</div>

				<div className='p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-sm'>
					<p className='mb-2'>
						<span className='font-bold text-blue-700 dark:text-blue-400'>Важно отметить</span>, что скрининг-тест
						не является медицинской диагностикой. Его результаты не ставят диагноз и не заменяют консультацию
						специалиста. Тест служит ориентиром и может стать первым шагом к более внимательному отношению к себе.
					</p>
					<p>
						Если по результатам теста вы получили средние или высокие показатели, рекомендуется обратиться к
						психологу или другому специалисту по ментальному здоровью. Обращение за помощью — это проявление
						заботы о себе, а не признак слабости.
					</p>
				</div>
			</div>

			<p className='mb-8 text-slate-600 dark:text-zinc-400 text-lg font-medium'>
				За последние 2 недели как часто вас беспокоили следующие проблемы?
			</p>

			{result && (
				<div className='my-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500'>
					<div className='text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-2'>
						Ваш результат: <span className='text-blue-600 dark:text-blue-400'>{result.score} баллов</span>
					</div>
					<div className='text-xl font-medium text-slate-800 dark:text-zinc-200 mb-4'>{result.text}</div>
					<p className='text-sm text-slate-500 dark:text-zinc-400 max-w-2xl'>
						Тест не является медицинской диагностикой. При высоких результатах рекомендуется обратиться к
						специалисту.
					</p>
				</div>
			)}

			<div className='overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm'>
				<table className='w-full border-collapse min-w-[700px] bg-white dark:bg-gray-900'>
					<thead>
						<tr className='bg-gray-50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-zinc-800'>
							<th className='p-4 text-left font-semibold text-slate-700 dark:text-zinc-300'>Вопрос</th>
							<th className='p-4 text-center font-semibold text-slate-700 dark:text-zinc-300 w-32'>
								Ни разу
								<br />
								<span className='text-xs font-normal text-slate-500'>(0)</span>
							</th>
							<th className='p-4 text-center font-semibold text-slate-700 dark:text-zinc-300 w-32'>
								Несколько дней
								<br />
								<span className='text-xs font-normal text-slate-500'>(1)</span>
							</th>
							<th className='p-4 text-center font-semibold text-slate-700 dark:text-zinc-300 w-32'>
								Более половины дней
								<br />
								<span className='text-xs font-normal text-slate-500'>(2)</span>
							</th>
							<th className='p-4 text-center font-semibold text-slate-700 dark:text-zinc-300 w-32'>
								Почти каждый день
								<br />
								<span className='text-xs font-normal text-slate-500'>(3)</span>
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-200 dark:divide-zinc-800'>
						{questions.map((q, idx) => (
							<tr key={idx} className='hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors'>
								<td className='p-4 text-slate-900 dark:text-zinc-200 font-medium'>
									{idx + 1}. {q}
								</td>
								{[0, 1, 2, 3].map((val) => (
									<td key={val} className='p-4 text-center'>
										<input
											checked={answers[idx] === val}
											className='w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
											disabled={!!result}
											name={`q${idx}`}
											type='radio'
											value={val}
											onChange={() => handleOptionChange(idx, val)}
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<button
				className='mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95'
				onClick={calculatePHQ}
			>
				Показать результат
			</button>
		</div>
	)
}
// new page for phq test
