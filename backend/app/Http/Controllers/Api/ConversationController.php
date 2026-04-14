<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $conversations = Conversation::query()
            ->with(['organizer', 'provider', 'messages.sender'])
            ->where('organizer_id', $userId)
            ->orWhere('provider_id', $userId)
            ->orderBy('last_message_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'conversations' => $conversations,
            'count' => $conversations->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'organizer_id' => ['required', 'integer', 'exists:users,id'],
            'provider_id' => ['required', 'integer', 'exists:users,id'],
        ]);

        $conversation = Conversation::firstOrCreate([
            'organizer_id' => $validated['organizer_id'],
            'provider_id' => $validated['provider_id'],
        ]);

        return response()->json([
            'message' => 'Conversation ready.',
            'conversation' => $conversation,
        ], 201);
    }
}