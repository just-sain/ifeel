import type { FC, PropsWithChildren } from 'react'

import { ThemeProvider as NextThemeProvider } from 'next-themes'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<NextThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange={true}
			enableColorScheme={true}
			enableSystem={true}
			themes={['dark', 'light']}
		>
			{children}
		</NextThemeProvider>
	)
}
