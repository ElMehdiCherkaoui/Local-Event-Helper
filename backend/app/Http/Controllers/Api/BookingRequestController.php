<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;

class BookingRequestController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $bookings = Booking::query()
            ->with(['event', 'service', 'organizer', 'provider'])
            ->where('organizer_id', $userId)
            ->orWhere('provider_id', $userId)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'bookings' => $bookings,
            'count' => $bookings->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_id' => ['required', 'integer', 'exists:events,id'],
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'event_date' => ['nullable', 'date'],
            'city' => ['nullable', 'string', 'max:255'],
            'guests_count' => ['nullable', 'integer', 'min:1'],
            'budget_amount' => ['nullable', 'numeric', 'min:0'],
            'event_details' => ['nullable', 'string'],
        ]);

        $service = Service::find($validated['service_id']);

        $booking = Booking::create([
            'event_id' => $validated['event_id'],
            'service_id' => $validated['service_id'],
            'provider_id' => $service->provider_id,
            'organizer_id' => $request->user()->id,
            'requested_date' => now()->toDateString(),
            'event_date' => $validated['event_date'] ?? null,
            'city' => $validated['city'] ?? null,
            'guests_count' => $validated['guests_count'] ?? null,
            'budget_amount' => $validated['budget_amount'] ?? null,
            'status' => 'pending',
            'event_details' => $validated['event_details'] ?? null,
        ]);

        return response()->json([
            'message' => 'Booking request created successfully.',
            'booking' => $booking,
        ], 201);
    }

    public function show(Request $request, Booking $booking)
    {
        return response()->json([
            'booking' => $booking->load(['event', 'service', 'organizer', 'provider']),
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => ['sometimes', 'required', 'in:pending,confirmed,declined,cancelled'],
            'event_date' => ['sometimes', 'nullable', 'date'],
            'city' => ['sometimes', 'nullable', 'string', 'max:255'],
            'guests_count' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'budget_amount' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'event_details' => ['sometimes', 'nullable', 'string'],
        ]);

        $status = $validated['status'] ?? null;

        if ($status === 'confirmed' || $status === 'declined') {
            $validated['responded_at'] = now();
        }

        $booking->update($validated);

        return response()->json([
            'message' => 'Booking request updated successfully.',
            'booking' => $booking->fresh(),
        ]);
    }

    public function destroy(Request $request, Booking $booking)
    {

        $booking->delete();

        return response()->json([
            'message' => 'Booking request deleted successfully.',
        ]);
    }
}