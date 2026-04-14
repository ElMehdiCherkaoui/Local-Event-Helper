<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::query()
            ->with('provider')
            ->where('status', 'active')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'services' => $services,
            'count' => $services->count(),
        ]);
    }
}