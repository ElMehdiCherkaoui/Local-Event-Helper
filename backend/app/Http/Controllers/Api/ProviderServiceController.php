<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ProviderServiceController extends Controller
{
    public function index(Request $request)
    {
        $services = Service::query()
            ->where('provider_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price_min' => ['nullable', 'numeric', 'min:0'],
            'price_max' => ['nullable', 'numeric', 'min:0'],
            'price_unit' => ['nullable', 'string', 'max:255'],
            'min_guests' => ['nullable', 'integer', 'min:1'],
            'setup_time_minutes' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $service = Service::create([
            'provider_id' => $request->user()->id,
            'title' => $validated['title'],
            'category' => $validated['category'] ?? null,
            'description' => $validated['description'] ?? null,
            'price_min' => $validated['price_min'] ?? null,
            'price_max' => $validated['price_max'] ?? null,
            'price_unit' => $validated['price_unit'] ?? 'person',
            'min_guests' => $validated['min_guests'] ?? null,
            'setup_time_minutes' => $validated['setup_time_minutes'] ?? null,
            'status' => $validated['status'] ?? 'active',
        ]);

        return response()->json([
            'message' => 'Service created successfully.',
            'service' => $service,
        ], 201);
    }

    public function show(Request $request, Service $service)
    {

        return response()->json([
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {


        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['sometimes', 'nullable', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'price_min' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'price_max' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'price_unit' => ['sometimes', 'nullable', 'string', 'max:255'],
            'min_guests' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'setup_time_minutes' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'status' => ['sometimes', 'nullable', 'in:active,inactive'],
        ]);

        $service->update($validated);

        return response()->json([
            'message' => 'Service updated successfully.',
            'service' => $service->fresh(),
        ]);
    }

    public function destroy(Request $request, Service $service)
    {
        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully.',
        ]);
    }
}
