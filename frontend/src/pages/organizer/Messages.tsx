import { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';

// Rookie-level data model: each conversation stores its own messages.
const chatList = [
	{
		id: 1,
		name: 'John Photography',
		role: 'Photographer',
		preview: "Hi! I'm interested in your wedding...",
		timeAgo: '2h',
		avatarColor: 'bg-blue-500',
		avatarLetter: 'J',
		rating: '★ 4.8',
		messages: [
			{
				id: 1,
				text: "Hi! I saw you're planning a wedding in Marrakech. I'm interested in being your photographer!",
				time: '10:30 AM',
				fromMe: false,
			},
			{
				id: 2,
				text: "Your work looks amazing! What's your availability for June 15th?",
				time: '10:45 AM',
				fromMe: true,
			},
			{
				id: 3,
				text: "I'm available! 8 hours coverage, edited photos, and a complimentary engagement session. $800.",
				time: '11:02 AM',
				fromMe: false,
			},
		],
	},
	{
		id: 2,
		name: 'Sarah Catering',
		role: 'Caterer',
		preview: "I've prepared a menu proposal...",
		timeAgo: '5h',
		avatarColor: 'bg-pink-500',
		avatarLetter: 'S',
		rating: '★ 4.9',
		messages: [
			{
				id: 1,
				text: 'I prepared a menu proposal for your event. Want me to share the details?',
				time: '09:15 AM',
				fromMe: false,
			},
		],
	},
	{
		id: 3,
		name: 'DJ Mike',
		role: 'DJ',
		preview: 'Thanks for booking! Looking forward... ',
		timeAgo: '1d',
		avatarColor: 'bg-violet-500',
		avatarLetter: 'M',
		rating: '★ 4.7',
		messages: [
			{
				id: 1,
				text: 'Thanks for booking. I can start preparing your custom playlist.',
				time: 'Yesterday',
				fromMe: false,
			},
		],
	},
	{
		id: 4,
		name: 'Elegant Decor',
		role: 'Decorator',
		preview: 'We can provide custom decorations...',
		timeAgo: '2d',
		avatarColor: 'bg-emerald-500',
		avatarLetter: 'E',
		rating: '★ 5.0',
		messages: [
			{
				id: 1,
				text: 'We can prepare custom decoration packages based on your budget.',
				time: '2d ago',
				fromMe: false,
			},
		],
	},
	{
		id: 5,
		name: 'Vision Films',
		role: 'Videographer',
		preview: "Here's our portfolio and pricing...",
		timeAgo: '3d',
		avatarColor: 'bg-orange-500',
		avatarLetter: 'V',
		rating: '★ 4.9',
		messages: [
			{
				id: 1,
				text: 'Here is our latest portfolio and simple package pricing.',
				time: '3d ago',
				fromMe: false,
			},
		],
	},
];

export default function Messages() {
	
	const [selectedChatId, setSelectedChatId] = useState(1);

	const [showThreadOnSmall, setShowThreadOnSmall] = useState(false);

	const selectedChat = chatList.find((chat) => chat.id === selectedChatId) || chatList[0];

	const openConversation = (chatId: number) => {
		setSelectedChatId(chatId);
		setShowThreadOnSmall(true);
	};

	const backToList = () => {
		setShowThreadOnSmall(false);
	};

	return (
		<OrganizerLayout title='Messages' subtitle='Chat with service providers'>
			<div className='grid grid-cols-1 gap-3 lg:grid-cols-[280px_1fr]'>
				<section className={`rounded-2xl border border-slate-200 bg-white ${showThreadOnSmall ? 'hidden lg:block' : 'block'}`}>
					{chatList.map((chat) => (
						<button
							key={chat.id}
							type='button'
							onClick={() => openConversation(chat.id)}
							className={`flex w-full items-start gap-3 border-b border-slate-100 px-3 py-3 text-left transition hover:bg-slate-50 ${selectedChatId === chat.id ? 'bg-blue-50/40' : ''}`}
						>
							<div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${chat.avatarColor}`}>
								{chat.avatarLetter}
							</div>
							<div className='min-w-0 flex-1'>
								<div className='flex items-center justify-between gap-2'>
									<p className='truncate text-sm font-semibold text-slate-800'>{chat.name}</p>
									<span className='text-xs text-slate-400'>{chat.timeAgo}</span>
								</div>
								<p className='mt-0.5 truncate text-xs text-slate-500'>{chat.preview}</p>
							</div>
						</button>
					))}
				</section>

				<section className={`rounded-2xl border border-slate-200 bg-white ${showThreadOnSmall ? 'block' : 'hidden lg:block'}`}>
					<div className='border-b border-slate-100 px-3 py-3'>
						<div className='flex items-center justify-between gap-2'>
							<div className='flex items-center gap-2'>
								<button
									type='button'
									onClick={backToList}
									className='rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 lg:hidden'
								>
									←
								</button>
								<div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${selectedChat.avatarColor}`}>
									{selectedChat.avatarLetter}
								</div>
								<div>
									<p className='text-sm font-semibold text-slate-800'>{selectedChat.name}</p>
									<p className='text-xs text-slate-500'>
										{selectedChat.role} • {selectedChat.rating}
									</p>
								</div>
							</div>
							<div className='hidden gap-2 sm:flex'>
								<button type='button' className='rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white'>
									Profile
								</button>
								<button type='button' className='rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700'>
									Details
								</button>
							</div>
						</div>
					</div>

					<div className='min-h-85 space-y-3 px-3 py-3 sm:min-h-105'>
						{selectedChat.messages.map((message) => (
							<div key={message.id} className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}>
								<div>
									<p
										className={`max-w-60 rounded-xl px-3 py-2 text-xs sm:max-w-80 sm:text-sm ${message.fromMe ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
									>
										{message.text}
									</p>
									<p className={`mt-1 text-[10px] text-slate-400 ${message.fromMe ? 'text-right' : 'text-left'}`}>
										{message.time}
									</p>
								</div>
							</div>
						))}
					</div>

					<div className='border-t border-slate-100 p-3'>
						<div className='grid grid-cols-[1fr_auto] gap-2'>
							<input
								type='text'
								placeholder='Type your message...'
								className='h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
							<button
								type='button'
								className='h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700'
							>
								Send
							</button>
						</div>
					</div>
				</section>
			</div>
		</OrganizerLayout>
	);
}
