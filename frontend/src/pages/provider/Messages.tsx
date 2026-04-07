import { useState } from 'react';
import ProviderLayout from '../../layouts/ProviderLayout';

const chatList = [
	{
		id: 1,
		name: 'John Doe',
		role: 'Event Organizer',
		preview: 'Looking forward to the wedding event...',
		timeAgo: '2h',
		avatarColor: 'bg-blue-500',
		avatarLetter: 'J',
		messages: [
			{
				id: 1,
				text: "Hi! I saw you're planning a wedding in Marrakech. I'm interested in your catering services!",
				time: '10:30 AM',
				fromMe: false,
			},
			{
				id: 2,
				text: 'Hi John! Thanks for reaching out. Your event sounds amazing!',
				time: '10:45 AM',
				fromMe: true,
			},
			{
				id: 3,
				text: "Perfect! My package includes menu consultation, professional staff, and beautiful presentation. What's your budget?",
				time: '11:02 AM',
				fromMe: false,
			},
			{
				id: 4,
				text: "We're looking at around $25-30 per person. Can we schedule a call to discuss?",
				time: '11:15 AM',
				fromMe: true,
			},
		],
	},
	{
		id: 2,
		name: 'Alice Smith',
		role: 'Event Organizer',
		preview: 'Can we discuss the menu options for...',
		timeAgo: '5h',
		avatarColor: 'bg-pink-500',
		avatarLetter: 'A',
		messages: [
			{
				id: 1,
				text: 'Can we discuss menu options for a birthday event?',
				time: '9:30 AM',
				fromMe: false,
			},
		],
	},
	{
		id: 3,
		name: 'Emma Wilson',
		role: 'Event Organizer',
		preview: 'Thank you for confirming! See you on...',
		timeAgo: '1d',
		avatarColor: 'bg-violet-500',
		avatarLetter: 'E',
		messages: [
			{
				id: 1,
				text: 'Thank you for confirming. See you on event day!',
				time: 'Yesterday',
				fromMe: false,
			},
		],
	},
	{
		id: 4,
		name: 'Michael Brown',
		role: 'Event Organizer',
		preview: 'Everything looks perfect for the...',
		timeAgo: '2d',
		avatarColor: 'bg-emerald-500',
		avatarLetter: 'M',
		messages: [
			{
				id: 1,
				text: 'Everything looks perfect for the corporate event.',
				time: '2d ago',
				fromMe: false,
			},
		],
	},
	{
		id: 5,
		name: 'David Martinez',
		role: 'Event Organizer',
		preview: 'Quick question about dietary...',
		timeAgo: '3d',
		avatarColor: 'bg-orange-500',
		avatarLetter: 'D',
		messages: [
			{
				id: 1,
				text: 'Quick question about dietary requirements support.',
				time: '3d ago',
				fromMe: false,
			},
		],
	},
];

export default function ProviderMessages() {
	const [selectedChatId, setSelectedChatId] = useState(1);
	const [showThreadOnSmall, setShowThreadOnSmall] = useState(true);

	const selectedChat = chatList.find((chat) => chat.id === selectedChatId) || chatList[0];

	const openConversation = (chatId: number) => {
		setSelectedChatId(chatId);
		setShowThreadOnSmall(true);
	};

	const backToList = () => {
		setShowThreadOnSmall(false);
	};

	return (
		<ProviderLayout title='Messages' subtitle='Chat with event organizers'>
			<div className='grid grid-cols-1 gap-3 xl:grid-cols-[270px_1fr]'>
				<section
					className={`rounded-2xl border border-slate-200 bg-white ${showThreadOnSmall ? 'hidden xl:block' : 'block'}`}
				>
					{chatList.map((chat) => (
						<button
							key={chat.id}
							type='button'
							onClick={() => openConversation(chat.id)}
							className={`flex w-full items-start gap-3 border-b border-slate-100 px-3 py-3 text-left transition hover:bg-slate-50 ${selectedChatId === chat.id ? 'bg-violet-50/60' : ''}`}
						>
							<div
								className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${chat.avatarColor}`}
							>
								{chat.avatarLetter}
							</div>
							<div className='min-w-0 flex-1'>
								<div className='flex items-center justify-between gap-2'>
									<p className='truncate text-sm font-semibold text-slate-800'>{chat.name}</p>
									<span className='text-xs text-slate-400'>{chat.timeAgo}</span>
								</div>
								<p className='text-[11px] text-slate-500'>{chat.role}</p>
								<p className='mt-0.5 truncate text-xs text-slate-500'>{chat.preview}</p>
							</div>
						</button>
					))}
				</section>

				<section
					className={`rounded-2xl border border-slate-200 bg-white ${showThreadOnSmall ? 'block' : 'hidden xl:block'}`}
				>
					<div className='border-b border-slate-100 px-3 py-3 sm:px-4'>
						<div className='flex items-center justify-between gap-2'>
							<div className='flex items-center gap-2 sm:gap-3'>
								<button
									type='button'
									onClick={backToList}
									className='rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 xl:hidden'
								>
									←
								</button>
								<div
									className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${selectedChat.avatarColor}`}
								>
									{selectedChat.avatarLetter}
								</div>
								<div>
									<p className='text-sm font-semibold text-slate-800'>{selectedChat.name}</p>
									<p className='text-xs text-slate-500'>{selectedChat.role}</p>
								</div>
							</div>

							<div className='hidden gap-2 sm:flex'>
								<button
									type='button'
									className='rounded-md bg-[#8B5CF6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#7C3AED]'
								>
									View Event
								</button>
								<button
									type='button'
									className='rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200'
								>
									Send Quote
								</button>
							</div>
						</div>
					</div>

					<div className='min-h-[35em] space-y-4 px-3 py-4 sm:min-h-[40em] sm:px-4'>
						{selectedChat.messages.map((message) => (
							<div key={message.id} className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}>
								<div>
									<div className={`flex items-end gap-2 ${message.fromMe ? 'flex-row-reverse' : 'flex-row'}`}>
										<div
											className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold text-white ${message.fromMe ? 'bg-violet-500' : selectedChat.avatarColor}`}
										>
											{message.fromMe ? 'SC' : selectedChat.avatarLetter}
										</div>
										<p
											className={`max-w-[20em] rounded-xl px-3 py-2 text-xs sm:max-w-[45em] sm:text-sm ${
												message.fromMe ? 'bg-violet-500 text-white' : 'bg-slate-100 text-slate-700'
											}`}
										>
											{message.text}
										</p>
									</div>
									<p className={`mt-1 text-[10px] text-slate-400 ${message.fromMe ? 'text-right' : 'text-left'}`}>
										{message.time}
									</p>
								</div>
							</div>
						))}
					</div>

					<div className='border-t border-slate-100 p-3 sm:p-4'>
						<div className='grid grid-cols-[1fr_auto] gap-2'>
							<input
								type='text'
								placeholder='Type your message...'
								className='h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
							<button
								type='button'
								className='h-10 rounded-lg bg-[#8B5CF6] px-4 text-sm font-semibold text-white hover:bg-[#7C3AED]'
							>
								Send
							</button>
						</div>
					</div>
				</section>
			</div>
		</ProviderLayout>
	);
}
