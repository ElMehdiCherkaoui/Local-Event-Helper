import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import { getEcho } from '../../lib/echo';

type ApiUser = {
    id?: number | null;
    name?: string | null;
    business_name?: string | null;
};

type ApiMessage = {
    id: number;
    sender_id?: number | null;
    content?: string | null;
    sent_at?: string | null;
    sender?: ApiUser | null;
};

type ApiConversation = {
    id: number;
    organizer_id?: number | null;
    provider_id?: number | null;
    last_message_at?: string | null;
    organizer?: ApiUser | null;
    provider?: ApiUser | null;
    messages?: ApiMessage[];
};

type BroadcastMessage = ApiMessage & {
    conversation_id?: number | null;
};

const avatarColors = ['bg-blue-500', 'bg-pink-500', 'bg-violet-500', 'bg-emerald-500', 'bg-orange-500'];

function getConversationPartner(conversation: ApiConversation | null) {
    return conversation?.provider || null;
}

function getDisplayName(user: ApiUser | null) {
    return user?.name || 'Unknown User';
}

function getBusinessName(user: ApiUser | null) {
    return user?.business_name || '';
}

export default function ProviderMessages() {
    const [conversations, setConversations] = useState<ApiConversation[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [selectedMessages, setSelectedMessages] = useState<ApiMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showThreadOnSmall, setShowThreadOnSmall] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [error, setError] = useState('');
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    let currentUserId: number | null = null;
    try {
        const userText = localStorage.getItem('user');
        if (userText) {
            const user = JSON.parse(userText);
            const id = Number(user?.id);
            currentUserId = Number.isNaN(id) ? null : id;
        }
    } catch {
        currentUserId = null;
    }

    useEffect(() => {
        const loadConversations = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/conversations`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const list = (response.data?.conversations ?? []) as ApiConversation[];
                setConversations(list);


            } catch {
                setError('Failed to load conversations.');
            } finally {
                setLoading(false);
            }
        };

        loadConversations();
    }, []);

    useEffect(() => {
        const loadMessages = async () => {
            const token = localStorage.getItem('token');

            setLoadingMessages(true);

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/conversations/${selectedChatId}/messages`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const list = (response.data?.messages ?? []) as ApiMessage[];
                setSelectedMessages(list.slice().sort((a, b) => a.id - b.id));
            } catch {
                setSelectedMessages([]);
            
            } finally {
                setLoadingMessages(false);
            }
        };

        loadMessages();
    }, [selectedChatId]);

    useEffect(() => {

        let echo: ReturnType<typeof getEcho> | null = null;
        const channelName = `conversation.${selectedChatId}`;
        if (!selectedChatId) {
            return;
        }

        const onMessage = (message: BroadcastMessage) => {

            setSelectedMessages((current) => {
                if (current.some((item) => item.id === message.id)) {
                    return current;
                }
                return [...current, message];
            });

            setConversations((current) =>
                current.map((conversation) => {
                    if (conversation.id !== selectedChatId) {
                        return conversation;
                    }

                    const oldMessages = conversation.messages ?? [];
                    const hasMessage = oldMessages.some((item) => item.id === message.id);

                    return {
                        ...conversation,
                        last_message_at: message.sent_at || new Date().toISOString(),
                        messages: hasMessage ? oldMessages : [...oldMessages, message],
                    };
                }),
            );
        };

        try {
            echo = getEcho();
            echo.private(channelName).listen('.message.sent', onMessage);
        } catch {
            setError('Realtime connection failed. You can still send messages.');
        }

        return () => {
            if (!echo) {
                return;
            }

            echo.private(channelName).stopListening('.message.sent');
            echo.leave(channelName);
        };
    }, [selectedChatId]);

    useEffect(() => {
        if (!messagesContainerRef.current) {
            return;
        }

        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }, [selectedChatId, selectedMessages]);

    const selectedChat = conversations.find((item) => item.id === selectedChatId) || null;
    const selectedChatUser = getConversationPartner(selectedChat);
    const selectedChatName = getDisplayName(selectedChatUser);
    const selectedChatBusiness = getBusinessName(selectedChatUser);

    const sendMessage = async () => {
        const token = localStorage.getItem('token');
        const content = newMessage.trim();


        setSendingMessage(true);
        setError('');

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/conversations/${selectedChatId}/messages`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const createdMessage = response.data?.data as ApiMessage | undefined;
            if (createdMessage) {
                setSelectedMessages((current) => {
                    if (current.some((item) => item.id === createdMessage.id)) {
                        return current;
                    }
                    return [...current, createdMessage];
                });

                setConversations((current) =>
                    current.map((conversation) => {
                        if (conversation.id !== selectedChatId) {
                            return conversation;
                        }

                        const oldMessages = conversation.messages ?? [];
                        const hasMessage = oldMessages.some((item) => item.id === createdMessage.id);

                        return {
                            ...conversation,
                            last_message_at: createdMessage.sent_at || new Date().toISOString(),
                            messages: hasMessage ? oldMessages : [...oldMessages, createdMessage],
                        };
                    }),
                );
            }

            setNewMessage('');
        } catch {
            setError('Failed to send message.');
        } finally {
            setSendingMessage(false);
        }
    };
	return (
		<OrganizerLayout title='Messages' subtitle='Chat with service providers'>
			 <div className='space-y-3'>
                {loading ? <p className='text-sm text-slate-500'>Loading conversations...</p> : null}
                {error ? <p className='text-sm text-red-500'>{error}</p> : null}

                <div className='grid grid-cols-1 gap-3 lg:grid-cols-[300px_1fr]'>
                    <section className={`max-h-[75vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white ${showThreadOnSmall ? 'hidden lg:block' : 'block'}`}>
                        {conversations.map((chat, index) => {
                            const chatUser = getConversationPartner(chat);
                            const chatName = getDisplayName(chatUser);
                            const chatBusiness = getBusinessName(chatUser);
                            const avatarLetter = chatName.charAt(0).toUpperCase() || 'U';

                            return (
                                <button
                                    key={chat.id}
                                    type='button'
                                    onClick={() => {
                                        setSelectedChatId(chat.id);
                                        setShowThreadOnSmall(true);
                                    }}
                                    className={`flex w-full items-start gap-3 border-b border-slate-100 px-3 py-3 text-left hover:bg-slate-50 ${selectedChatId === chat.id ? 'bg-violet-50/30' : ''}`}
                                >
                                    <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${avatarColors[index % avatarColors.length]}`}>
                                        {avatarLetter}
                                    </div>
                                    <div className='min-w-0'>
                                        <p className='truncate text-sm font-semibold text-slate-800'>{chatName}</p>
                                        {chatBusiness ? <p className='truncate text-xs text-slate-500'>{chatBusiness}</p> : null}
                                    </div>
                                </button>
                            );
                        })}

                        {!loading && conversations.length === 0 ? (
                            <p className='px-3 py-4 text-sm text-slate-500'>No conversations yet.</p>
                        ) : null}
                    </section>

                    <section className={`max-h-[75vh] overflow-hidden rounded-2xl border border-slate-200 bg-white ${showThreadOnSmall ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}`}>
                        {selectedChat ? (
                            <>
                                <div className='border-b border-slate-100 px-3 py-3'>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-xs font-semibold text-white'>
                                                {selectedChatName.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <p className='text-sm font-semibold text-slate-800'>{selectedChatName}</p>
                                                {selectedChatBusiness ? <p className='text-xs text-slate-500'>{selectedChatBusiness}</p> : null}
                                            </div>
                                        </div>
                                        <button
                                            type='button'
                                            onClick={() => setShowThreadOnSmall(false)}
                                            className='rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 lg:hidden'
                                        >
                                            {'<-'}
                                        </button>
                                    </div>
                                </div>

                                <div ref={messagesContainerRef} className='min-h-85 flex-1 space-y-2 overflow-y-auto px-3 py-3 sm:min-h-105'>
                                    {loadingMessages ? <p className='text-sm text-slate-500'>Loading messages...</p> : null}

                                    {selectedMessages.map((message) => {
                                        const fromMe = currentUserId !== null && message.sender_id === currentUserId;

                                        return (
                                            <div key={message.id} className={`flex ${fromMe ? 'justify-end' : 'justify-start'}`}>
                                                <p className={`max-w-60 rounded-xl px-3 py-2 text-xs sm:max-w-80 sm:text-sm ${fromMe ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                                    {message.content || ''}
                                                </p>
                                            </div>
                                        );
                                    })}

                                    {!loadingMessages && selectedMessages.length === 0 ? (
                                        <p className='text-sm text-slate-500'>No messages in this conversation yet.</p>
                                    ) : null}
                                </div>

                                <div className='border-t border-slate-100 p-3'>
                                    <form
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            sendMessage();
                                        }}
                                        className='grid grid-cols-[1fr_auto] gap-2'
                                    >
                                        <input
                                            type='text'
                                            placeholder='type message'
                                            value={newMessage}
                                            onChange={(event) => setNewMessage(event.target.value)}
                                            disabled={sendingMessage || loadingMessages}
                                            className='h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-500'
                                        />
                                        <button
                                            type='submit'
                                            disabled={sendingMessage || loadingMessages || newMessage.trim().length === 0}
                                            className='h-10 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white disabled:opacity-60'
                                        >
                                            {sendingMessage ? 'Sending...' : 'Send'}
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className='px-3 py-4 text-sm text-slate-500'>Select a conversation to view messages.</div>
                        )}
                    </section>
                </div>
            </div>
		</OrganizerLayout>
	);
}
