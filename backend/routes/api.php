<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProviderServiceController;
use App\Http\Controllers\Api\ProviderAvailabilityController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BookingRequestController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\ConversationMessageController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\BudgetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/search/services', [ServiceController::class, 'index']);
Route::match(['get', 'post'], '/broadcasting/auth', function (Request $request) {
    return Broadcast::auth($request);
})->middleware(['auth:sanctum', 'not_banned']);

Route::middleware(['auth:sanctum', 'not_banned'])->group(function (): void {
    Route::get('/user', [AuthController::class, 'me']);
    Route::patch('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('admin/statistics', [AdminController::class, 'statistics']);
    Route::get('admin/users', [AdminController::class, 'users']);
    Route::get('admin/events', [AdminController::class, 'events']);
    Route::get('admin/logs', [AdminController::class, 'logs']);
    Route::patch('admin/users/{user}/ban', [AdminController::class, 'banUser']);
    Route::patch('admin/users/{user}/unban', [AdminController::class, 'unbanUser']);
    Route::get('admin/reviews', [AdminController::class, 'reviews']);
    Route::delete('admin/reviews/{review}', [AdminController::class, 'destroyReview']);

    Route::get('events', [EventController::class, 'index']);
    Route::post('events', [EventController::class, 'store']);
    Route::get('events/{event}', [EventController::class, 'show']);
    Route::patch('events/{event}', [EventController::class, 'update']);
    Route::delete('events/{event}', [EventController::class, 'destroy']);

    Route::get('provider/services', [ProviderServiceController::class, 'index']);
    Route::post('provider/services', [ProviderServiceController::class, 'store']);
    Route::get('provider/services/{service}', [ProviderServiceController::class, 'show']);
    Route::patch('provider/services/{service}', [ProviderServiceController::class, 'update']);
    Route::delete('provider/services/{service}', [ProviderServiceController::class, 'destroy']);

    Route::get('provider/availabilities', [ProviderAvailabilityController::class, 'index']);
    Route::post('provider/availabilities', [ProviderAvailabilityController::class, 'store']);
    Route::get('provider/availabilities/{availability}', [ProviderAvailabilityController::class, 'show']);
    Route::patch('provider/availabilities/{availability}', [ProviderAvailabilityController::class, 'update']);
    Route::delete('provider/availabilities/{availability}', [ProviderAvailabilityController::class, 'destroy']);

    Route::get('booking-requests', [BookingRequestController::class, 'index']);
    Route::post('booking-requests', [BookingRequestController::class, 'store']);
    Route::get('booking-requests/{booking}', [BookingRequestController::class, 'show']);
    Route::patch('booking-requests/{booking}', [BookingRequestController::class, 'update']);
    Route::delete('booking-requests/{booking}', [BookingRequestController::class, 'destroy']);

    Route::get('reviews', [ReviewController::class, 'index']);
    Route::post('reviews', [ReviewController::class, 'store']);
    Route::get('reviews/{review}', [ReviewController::class, 'show']);
    Route::patch('reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('reviews/{review}', [ReviewController::class, 'destroy']);

    Route::get('conversations', [ConversationController::class, 'index']);
    Route::post('conversations', [ConversationController::class, 'store']);
    Route::get('conversations/{conversation}/messages', [ConversationMessageController::class, 'index']);
    Route::post('conversations/{conversation}/messages', [ConversationMessageController::class, 'store']);

    Route::prefix('events/{event}')->group(function (): void {
        Route::get('tasks', [TaskController::class, 'index']);
        Route::post('tasks', [TaskController::class, 'store']);
        Route::get('tasks/{task}', [TaskController::class, 'show']);
        Route::patch('tasks/{task}', [TaskController::class, 'update']);
        Route::delete('tasks/{task}', [TaskController::class, 'destroy']);
        Route::post('budget', [BudgetController::class, 'store']);
        Route::get('budget', [BudgetController::class, 'show']);
        Route::patch('budget', [BudgetController::class, 'update']);
        Route::delete('budget', [BudgetController::class, 'destroy']);
    });
});
