import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import '@assets/globals.css'
import { Footer, Header } from '@layout'
import { AuthProvider, ThemeProvider } from '@providers'
import ChatBot from 'components/chat-bot'

// fonts
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

// metadata
export const metadata: Metadata = {
	title: 'Я чувствую?',
	description: 'Профессиональная психологическая помощь для вашего благополучия и гармонии',
}

// layout
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html data-scroll-behavior='smooth' lang='ru' suppressHydrationWarning={true}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-white dark:bg-gray-800 flex flex-col items-stretch justify-between`}
			>
				<AuthProvider>
					<ThemeProvider>
						<Header />
						<main className='flex-1 mt-16'>{children}</main>
						<ChatBot />
						<Footer />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
