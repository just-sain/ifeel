'use client'

import { useState } from 'react'

import { LikertScale } from './likert-scale'
import { mbtiTypes, statements } from './quiz-data'

export default function TestPage() {
	const [quizState, setQuizState] = useState<{
		step: number
		answers: Record<number, number>
		selectedOption: number | null
		showResult: boolean
	}>({
		step: 0,
		answers: {},
		selectedOption: null,
		showResult: false,
	})

	const handleAnswer = (answerIndex: number) => {
		setQuizState((prev) => ({ ...prev, selectedOption: answerIndex }))
	}

	const handleNext = () => {
		if (quizState.selectedOption !== null) {
			const newAnswers = { ...quizState.answers, [quizState.step]: quizState.selectedOption }
			const newStep = quizState.step < statements.length - 1 ? quizState.step + 1 : quizState.step
			const showResult = quizState.step === statements.length - 1

			setQuizState({
				step: newStep,
				answers: newAnswers,
				selectedOption: newAnswers[newStep] ?? null,
				showResult,
			})
		}
	}

	const handleBack = () => {
		if (quizState.step > 0) {
			const newStep = quizState.step - 1
			const selectedOption = quizState.answers[newStep] ?? null

			setQuizState((prev) => ({
				...prev,
				step: newStep,
				selectedOption,
			}))
		}
	}

	const calculateResult = () => {
		const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

		Object.entries(quizState.answers).forEach(([stepStr, answerIndex]) => {
			const index = parseInt(stepStr)
			const statement = statements[index]
			const score = answerIndex - 3 // Convert 0-6 scale to -3 to +3

			if (statement.dimension === 'I/E') {
				if (statement.reverse) {
					scores.I += score
					scores.E -= score
				} else {
					scores.E += score
					scores.I -= score
				}
			} else if (statement.dimension === 'S/N') {
				if (statement.reverse) {
					scores.N += score
					scores.S -= score
				} else {
					scores.S += score
					scores.N -= score
				}
			} else if (statement.dimension === 'N/S') {
				if (statement.reverse) {
					scores.N += score
					scores.S -= score
				} else {
					scores.S += score
					scores.N -= score
				}
			} else if (statement.dimension === 'T/F') {
				if (statement.reverse) {
					scores.F += score
					scores.T -= score
				} else {
					scores.T += score
					scores.F -= score
				}
			} else if (statement.dimension === 'J/P') {
				if (statement.reverse) {
					scores.P += score
					scores.J -= score
				} else {
					scores.J += score
					scores.P -= score
				}
			}
		})

		const type =
			(scores.E > scores.I ? 'E' : 'I') +
			(scores.S > scores.N ? 'S' : 'N') +
			(scores.T > scores.F ? 'T' : 'F') +
			(scores.J > scores.P ? 'J' : 'P')

		const personality = mbtiTypes[type as keyof typeof mbtiTypes]

		return { type, name: personality.name, description: personality.description }
	}

	if (quizState.showResult) {
		const result = calculateResult()

		return (
			<div className='pt-24 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>Ваш результат</h1>
					<div className='bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg'>
						<h2 className='text-3xl font-bold text-indigo-600 mb-4'>{result.type}</h2>

						<p className='text-3xl text-gray-900 dark:text-gray-100 mb-2 max-md:text-xl'>{result.name}</p>

						<p className='text-gray-700 dark:text-gray-300 mb-12'>{result.description}</p>

						<p className='text-sm text-gray-500 dark:text-gray-500'>
							Это базовый результат теста. Для более точного определения типа личности рекомендуется пройти
							полный тест MBTI.
						</p>
					</div>

					<button
						className='mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
						onClick={() => {
							setQuizState({
								step: 0,
								answers: [],
								selectedOption: null,
								showResult: false,
							})
						}}
					>
						Пройти тест заново
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-24 px-4'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-4xl font-bold text-center text-gray-900 dark:text-white mb-8'>Тест на личность</h1>
				<div className='bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg'>
					<div className='mb-6'>
						<div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
							<div
								className='bg-indigo-600 h-2.5 rounded-full transition-all duration-300'
								style={{ width: `${((quizState.step + 1) / statements.length) * 100}%` }}
							/>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
							Утверждение {quizState.step + 1} из {statements.length}
						</p>
					</div>
					<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center'>
						{statements[quizState.step].statement}
					</h2>
					<LikertScale selectedOption={quizState.selectedOption} step={quizState.step} onSelect={handleAnswer} />
					<div className='flex justify-center gap-4'>
						{quizState.step > 0 && (
							<button
								className='bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300'
								onClick={handleBack}
							>
								Назад
							</button>
						)}
						<button
							className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={quizState.selectedOption === null}
							onClick={handleNext}
						>
							{quizState.step === statements.length - 1 ? 'Завершить' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
