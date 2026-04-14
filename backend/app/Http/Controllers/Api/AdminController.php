<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Message;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use App\Models\Booking;
use App\Models\Conversation;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function statistics(Request $request)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        return response()->json([
            'users' => User::count(),
            'banned_users' => User::where('is_banned', true)->count(),
            'events' => Event::count(),
            'services' => Service::count(),
            'bookings' => Booking::count(),
            'reviews' => Review::count(),
            'conversations' => Conversation::count(),
            'messages' => Message::count(),
        ]);
    }

    public function users(Request $request)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        $users = User::query()
            ->with('role')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'users' => $users,
            'count' => $users->count(),
        ]);
    }

    public function banUser(Request $request, User $user)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        $user->update([
            'is_banned' => true,
        ]);

        return response()->json([
            'message' => 'User banned successfully.',
            'user' => $user->fresh('role'),
        ]);
    }

    public function unbanUser(Request $request, User $user)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        $user->update([
            'is_banned' => false,
        ]);

        return response()->json([
            'message' => 'User unbanned successfully.',
            'user' => $user->fresh('role'),
        ]);
    }

    public function reviews(Request $request)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        $reviews = Review::query()
            ->with(['service', 'organizer', 'booking'])
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'reviews' => $reviews,
            'count' => $reviews->count(),
        ]);
    }

    public function destroyReview(Request $request, Review $review)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully.',
        ]);
    }

    private function isAdmin(Request $request): bool
    {
        return $request->user() !== null && $request->user()->role?->name === 'admin';
    }
}