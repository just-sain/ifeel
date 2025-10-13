import { AboutSection } from '@components/about-section'
import { HeroSection } from '@components/hero-section'
import { ServicesSection } from '@components/services-section'

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
			<HeroSection />
			<AboutSection />
			<ServicesSection />
		</div>
	)
}
