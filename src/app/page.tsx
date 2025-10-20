import { AboutSection } from './home/about-section'
import { HeroSection } from './home/hero-section'
import { PersonalityTestSection } from './home/personality-test-section'
import { ServicesSection } from './home/services-section'

function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
			<HeroSection />
			<AboutSection />
			<ServicesSection />
			<PersonalityTestSection />
		</div>
	)
}

export default Home
