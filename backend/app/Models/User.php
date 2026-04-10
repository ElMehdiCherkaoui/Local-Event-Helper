<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'is_banned',
        'business_name',
        'phone',
        'date_of_birth',
        'bio',
        'street_address',
        'city',
        'country',
        'zip_code',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_banned' => 'boolean',
            'date_of_birth' => 'date',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function organizedEvents(): HasMany
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    public function providedServices(): HasMany
    {
        return $this->hasMany(Service::class, 'provider_id');
    }

    public function bookingsAsOrganizer(): HasMany
    {
        return $this->hasMany(Booking::class, 'organizer_id');
    }

    public function bookingsAsProvider(): HasMany
    {
        return $this->hasMany(Booking::class, 'provider_id');
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class, 'provider_id');
    }

    public function conversationsAsOrganizer(): HasMany
    {
        return $this->hasMany(Conversation::class, 'organizer_id');
    }

    public function conversationsAsProvider(): HasMany
    {
        return $this->hasMany(Conversation::class, 'provider_id');
    }

    public function reviewsAsOrganizer(): HasMany
    {
        return $this->hasMany(Review::class, 'organizer_id');
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}
