<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's roles.
     */
    public function run(): void
    {
        Role::firstOrCreate([
            'name' => 'admin'
        ]);
        Role::firstOrCreate([
            'name' => 'organizer'
        ]);
        Role::firstOrCreate([
            'name' => 'provider'
        ]);
    }
}
