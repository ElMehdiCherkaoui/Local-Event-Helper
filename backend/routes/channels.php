<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
    return Conversation::query()
        ->where('id', $conversationId)
        ->where(function ($query) use ($user) {
            $query->where('organizer_id', $user->id)
                ->orWhere('provider_id', $user->id);
        })
        ->exists();
});
