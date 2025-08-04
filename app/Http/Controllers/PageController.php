<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a static page.
     */
    public function show(Page $page)
    {
        // Only show active pages to non-admin users
        if (!$page->is_active && (!auth()->user() || !auth()->user()->isAdmin())) {
            abort(404);
        }

        $page->load('user');

        return Inertia::render('blog/page', [
            'page' => $page,
        ]);
    }
}