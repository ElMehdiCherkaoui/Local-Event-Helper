<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'organizer_id',
        'booking_id',
        'rating',
        'comment',
        'food_rating',
        'service_rating',
        'value_rating',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
        'food_rating' => 'decimal:1',
        'service_rating' => 'decimal:1',
        'value_rating' => 'decimal:1',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
