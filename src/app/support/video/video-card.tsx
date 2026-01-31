import { useState } from 'react'

import { type LucideIcon, Play } from 'lucide-react'

interface IProps {
	title: string
	url: string
	Icon: LucideIcon
}

export function VideoCard({ title, url, Icon }: IProps) {
	const [playing, setPlaying] = useState(false)

	return (
		<div className='w-full aspect-video relative rounded-lg overflow-hidden bg-black'>
			{!playing ? (
				<button className='w-full h-full cursor-pointer relative' onClick={() => setPlaying(true)}>
					<div className='absolute inset-0 flex items-center justify-center'>
						<Play className='w-16 h-16 text-white opacity-80' />
					</div>
				</button>
			) : (
				<iframe
					allowFullScreen
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					className='w-full h-full'
					src={url}
					title={title}
				/>
			)}
		</div>
	)
}
