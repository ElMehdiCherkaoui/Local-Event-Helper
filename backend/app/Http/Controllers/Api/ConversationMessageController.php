<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class ConversationMessageController extends Controller
{
    public function index(Request $request, Conversation $conversation)
    {

        $messages = Message::query()
            ->with('sender')
            ->where('conversation_id', $conversation->id)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'messages' => $messages,
            'count' => $messages->count(),
        ]);
    }

    public function store(Request $request, Conversation $conversation)
    {
        $userId = $request->user()->id;


        $validated = $request->validate([
            'content' => ['required', 'string'],
        ]);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $userId,
            'content' => $validated['content'],
            'sent_at' => now(),
        ]);

        $conversation->update([
            'last_message_at' => now(),
        ]);

        $message->load('sender');

        event(new MessageSent($message));

        return response()->json([
            'message' => 'Message sent successfully.',
            'data' => $message,
        ], 201);
    }
}