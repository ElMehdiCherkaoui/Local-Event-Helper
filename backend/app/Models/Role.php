<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'guard_name',
    ];

    protected $attributes = [
        'guard_name' => 'web',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
