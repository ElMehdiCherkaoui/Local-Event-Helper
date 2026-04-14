<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'title',
        'description',
        'event_date',
        'location',
        'guests_count',
        'status',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function budget()
    {
        return $this->hasOne(Budget::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
