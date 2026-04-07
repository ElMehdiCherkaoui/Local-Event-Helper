<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::query()
            ->where('organizer_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'events' => $events,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'event_date' => ['required', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'guests_count' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'in:planning,in_progress,completed,cancelled'],
        ]);

        $event = Event::create([
            'organizer_id' => $request->user()->id,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'event_date' => $validated['event_date'],
            'location' => $validated['location'] ?? null,
            'guests_count' => $validated['guests_count'] ?? null,
            'status' => $validated['status'] ?? 'planning',
        ]);

        return response()->json([
            'message' => 'Event created successfully.',
            'event' => $event,
        ], 201);
    }

    public function show(Request $request, Event $event)
    {

        return response()->json([
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event)
    {


        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'event_date' => ['sometimes', 'required', 'date'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'guests_count' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'status' => ['sometimes', 'nullable', 'in:planning,in_progress,completed,cancelled'],
        ]);

        $event->update($validated);

        return response()->json([
            'message' => 'Event updated successfully.',
            'event' => $event->fresh(),
        ]);
    }

    public function destroy(Request $request, Event $event)
    {


        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully.',
        ]);
    }
}
