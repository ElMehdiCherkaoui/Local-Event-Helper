<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $organizerReviews = Review::with(['service', 'booking', 'organizer'])
            ->where('organizer_id', $userId)
            ->get();

        $providerReviews = Review::with(['service', 'booking', 'organizer'])
            ->whereHas('service', function ($query) use ($userId) {
                $query->where('provider_id', $userId);
            })
            ->get();

        $reviews = $organizerReviews
            ->merge($providerReviews)
            ->unique('id')
            ->sortByDesc('id')
            ->values();

        return response()->json([
            'reviews' => $reviews,
            'count' => $reviews->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'booking_id' => ['nullable', 'integer', 'exists:bookings,id'],
            'rating' => ['required', 'numeric', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string'],
            'food_rating' => ['nullable', 'numeric', 'min:1', 'max:5'],
            'service_rating' => ['nullable', 'numeric', 'min:1', 'max:5'],
            'value_rating' => ['nullable', 'numeric', 'min:1', 'max:5'],
        ]);

        $bookingId = $validated['booking_id'];

        $review = Review::create([
            'service_id' => $validated['service_id'],
            'organizer_id' => $request->user()->id,
            'booking_id' => $bookingId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'food_rating' => $validated['food_rating'],
            'service_rating' => $validated['service_rating'],
            'value_rating' => $validated['value_rating'],
        ]);

        return response()->json([
            'message' => 'Review created successfully.',
            'review' => $review,
        ], 201);
    }

    public function show(Request $request, Review $review)
    {
        $userId = $request->user()->id;

        $isOrganizer = $review->organizer_id === $userId;
        $isProvider = $review->service && $review->service->provider_id === $userId;

        if (!$isOrganizer && !$isProvider) {
            return response()->json([
                'message' => 'Review not found.',
            ], 404);
        }

        return response()->json([
            'review' => $review->load(['service', 'booking', 'organizer']),
        ]);
    }

    public function update(Request $request, Review $review)
    {

        $validated = $request->validate([
            'rating' => ['sometimes', 'required', 'numeric', 'min:1', 'max:5'],
            'comment' => ['sometimes', 'nullable', 'string'],
            'food_rating' => ['sometimes', 'nullable', 'numeric', 'min:1', 'max:5'],
            'service_rating' => ['sometimes', 'nullable', 'numeric', 'min:1', 'max:5'],
            'value_rating' => ['sometimes', 'nullable', 'numeric', 'min:1', 'max:5'],
        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Review updated successfully.',
            'review' => $review,
        ]);
    }

    public function destroy(Request $request, Review $review)
    {
        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully.',
        ]);
    }
}