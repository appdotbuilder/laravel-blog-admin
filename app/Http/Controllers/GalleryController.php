<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display the gallery index.
     */
    public function index()
    {
        $galleries = Gallery::with(['images' => function ($query) {
                $query->take(4);
            }])
            ->active()
            ->latest('event_date')
            ->paginate(12);

        return Inertia::render('blog/galleries', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Display a single gallery.
     */
    public function show(Gallery $gallery)
    {
        $gallery->load(['images', 'user']);

        return Inertia::render('blog/gallery', [
            'gallery' => $gallery,
        ]);
    }
}