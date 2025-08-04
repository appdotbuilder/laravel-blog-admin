<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{


    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'posts' => [
                'total' => Post::count(),
                'published' => Post::published()->count(),
                'draft' => Post::where('status', 'draft')->count(),
                'recent' => Post::latest()->take(5)->with(['user', 'category'])->get(),
            ],
            'categories' => [
                'total' => Category::count(),
                'active' => Category::active()->count(),
            ],
            'pages' => [
                'total' => Page::count(),
                'active' => Page::active()->count(),
            ],
            'galleries' => [
                'total' => Gallery::count(),
                'active' => Gallery::active()->count(),
            ],
            'users' => [
                'total' => User::count(),
                'admins' => User::admins()->count(),
                'active' => User::active()->count(),
            ],
        ];

        $recentActivity = [
            'posts' => Post::with(['user', 'category'])
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($post) {
                    return [
                        'type' => 'post',
                        'title' => $post->title,
                        'user' => $post->user->name,
                        'date' => $post->created_at,
                        'status' => $post->status,
                        'url' => route('admin.posts.show', $post),
                    ];
                }),
            'galleries' => Gallery::with('user')
                ->latest()
                ->take(3)
                ->get()
                ->map(function ($gallery) {
                    return [
                        'type' => 'gallery',
                        'title' => $gallery->title,
                        'user' => $gallery->user->name,
                        'date' => $gallery->created_at,
                        'url' => route('admin.galleries.show', $gallery),
                    ];
                }),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
        ]);
    }
}