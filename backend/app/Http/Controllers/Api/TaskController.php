<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request, Event $event)
    {
        $tasks = $event->tasks()->latest()->get();

        return response()->json([
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'status' => ['nullable', 'in:todo,in_progress,done'],
        ]);

        $task = $event->tasks()->create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'due_date' => $validated['due_date'] ?? null,
            'status' => $validated['status'] ?? 'todo',
        ]);

        return response()->json([
            'message' => 'Task created successfully.',
            'task' => $task,
        ], 201);
    }

    public function show(Request $request, Event $event, Task $task)
    {
        return response()->json([
            'task' => $task,
        ]);
    }

    public function update(Request $request, Event $event, Task $task)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'due_date' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', 'nullable', 'in:todo,in_progress,done'],
        ]);

        $task->update($validated);

        return response()->json([
            'message' => 'Task updated successfully.',
            'task' => $task->fresh(),
        ]);
    }

    public function destroy(Request $request, Event $event, Task $task)
    {
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully.',
        ]);
    }
}
