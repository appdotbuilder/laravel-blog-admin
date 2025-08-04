<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Page;
use App\Models\Post;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display the blog home page.
     */
    public function index()
    {
        $featuredPosts = Post::with(['user', 'category'])
            ->published()
            ->featured()
            ->latest('published_at')
            ->take(3)
            ->get();

        $recentPosts = Post::with(['user', 'category'])
            ->published()
            ->latest('published_at')
            ->take(6)
            ->get();

        $categories = Category::active()
            ->withCount(['posts' => function ($query) {
                $query->published();
            }])
            ->orderBy('sort_order')
            ->get();

        $featuredGalleries = Gallery::with(['images' => function ($query) {
                $query->take(4);
            }])
            ->active()
            ->featured()
            ->latest()
            ->take(3)
            ->get();

        $menuPages = Page::active()
            ->inMenu()
            ->get(['title', 'slug']);

        return Inertia::render('welcome', [
            'featuredPosts' => $featuredPosts,
            'recentPosts' => $recentPosts,
            'categories' => $categories,
            'featuredGalleries' => $featuredGalleries,
            'menuPages' => $menuPages,
        ]);
    }
}