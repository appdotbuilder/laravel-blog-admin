<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a single post.
     */
    public function show(Post $post)
    {
        // Only show published posts to non-admin users
        if ($post->status !== 'published' && (!auth()->user() || !auth()->user()->isAdmin())) {
            abort(404);
        }

        // Increment view count
        $post->increment('views');

        $post->load(['user', 'category']);

        $relatedPosts = Post::with(['user', 'category'])
            ->published()
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('blog/post', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}