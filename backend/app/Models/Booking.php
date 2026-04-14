<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'service_id',
        'provider_id',
        'organizer_id',
        'requested_date',
        'event_date',
        'city',
        'guests_count',
        'budget_amount',
        'status',
        'event_details',
        'responded_at',
    ];

    protected $casts = [
        'requested_date' => 'date',
        'event_date' => 'date',
        'budget_amount' => 'decimal:2',
        'responded_at' => 'datetime',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function provider()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }
}
