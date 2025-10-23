interface HeaderMobileMenuProps {
	isMenuOpen: boolean
	setIsMenuOpen: (isOpen: boolean) => void
}

export const HeaderMobileMenu = ({ isMenuOpen, setIsMenuOpen }: HeaderMobileMenuProps) => {
	return (
		<div className='md:hidden'>
			<button
				className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-gray-800'
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				<svg
					className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M4 6h16M4 12h16M4 18h16' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
				</svg>
				<svg
					className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M6 18L18 6M6 6l12 12' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
				</svg>
			</button>
		</div>
	)
}
