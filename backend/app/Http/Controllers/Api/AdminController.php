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
use Spatie\Activitylog\Models\Activity;

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

    public function events(Request $request)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        $events = Event::query()
            ->with('organizer')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'events' => $events,
            'count' => $events->count(),
        ]);
    }

    public function logs(Request $request)
    {
        if (!$this->isAdmin($request)) {
            return response()->json([
                'message' => 'Forbidden.',
            ], 403);
        }

        $logs = Activity::query()
            ->with(['causer', 'subject'])
            ->orderBy('id', 'desc')
            ->limit(50)
            ->get();

        return response()->json([
            'logs' => $logs,
            'count' => $logs->count(),
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

        activity()
            ->causedBy($request->user())
            ->performedOn($user)
            ->withProperties([
                'user_email' => $user->email,
                'action' => 'ban',
            ])
            ->log('User banned');

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

        activity()
            ->causedBy($request->user())
            ->performedOn($user)
            ->withProperties([
                'user_email' => $user->email,
                'action' => 'unban',
            ])
            ->log('User unbanned');

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

        activity()
            ->causedBy($request->user())
            ->performedOn($review)
            ->withProperties([
                'action' => 'delete_review',
            ])
            ->log('Review deleted');

        return response()->json([
            'message' => 'Review deleted successfully.',
        ]);
    }

    private function isAdmin(Request $request): bool
    {
        return $request->user() !== null && $request->user()->role?->name === 'admin';
    }
}