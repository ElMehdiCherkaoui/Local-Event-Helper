<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function show(Request $request, Event $event)
    {
        $budget = $event->budget;

        return response()->json([
            'budget' => $budget,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            'total_amount' => ['required', 'numeric', 'min:0'],
            'spent_amount' => ['nullable', 'numeric', 'min:0'],
        ]);

        $spent = $validated['spent_amount'] ?? 0;
        $remaining = $validated['total_amount'] - $spent;

        $budget = $event->budget()->create([
            'total_amount' => $validated['total_amount'],
            'spent_amount' => $spent,
            'remaining_amount' => $remaining,
        ]);

        return response()->json([
            'message' => 'Budget created successfully.',
            'budget' => $budget,
        ], 201);
    }

    public function update(Request $request, Event $event)
    {
        $budget = $event->budget;

        $validated = $request->validate([
            'total_amount' => ['sometimes', 'required', 'numeric', 'min:0'],
            'spent_amount' => ['sometimes', 'required', 'numeric', 'min:0'],
        ]);

        if (isset($validated['total_amount'])) {
            $budget->total_amount = $validated['total_amount'];
        }

        if (isset($validated['spent_amount'])) {
            $budget->spent_amount = $validated['spent_amount'];
        }

        $budget->remaining_amount = $budget->total_amount - $budget->spent_amount;
        $budget->save();

        return response()->json([
            'message' => 'Budget updated successfully.',
            'budget' => $budget->fresh(),
        ]);
    }

    public function destroy(Request $request, Event $event)
    {
        $budget = $event->budget;

        $budget->delete();

        return response()->json([
            'message' => 'Budget deleted successfully.',
        ]);
    }
}
