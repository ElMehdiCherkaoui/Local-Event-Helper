<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Availability;
use Illuminate\Http\Request;

class ProviderAvailabilityController extends Controller
{
    public function index(Request $request)
    {
        $availabilities = Availability::query()
            ->where('provider_id', $request->user()->id)
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'availabilities' => $availabilities,
            'count' => $availabilities->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'status' => ['nullable'],
        ]);

        $availability = Availability::create([
            'provider_id' => $request->user()->id,
            'date' => $validated['date'],
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Availability created successfully.',
            'availability' => $availability,
        ], 201);
    }

    public function show(Request $request, Availability $availability)
    {

        return response()->json([
            'availability' => $availability,
        ]);
    }

    public function update(Request $request, Availability $availability)
    {

        $validated = $request->validate([
            'date' => ['sometimes', 'required', 'date'],
            'status' => ['sometimes', 'required', 'in:available,booked,blocked,past'],
        ]);

        $availability->update($validated);

        return response()->json([
            'message' => 'Availability updated successfully.',
            'availability' => $availability,
        ]);
    }

    public function destroy(Request $request, Availability $availability)
    {

        $availability->delete();

        return response()->json([
            'message' => 'Availability deleted successfully.',
        ]);
    }
}