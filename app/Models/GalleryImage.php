<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GalleryImage
 *
 * @property int $id
 * @property int $gallery_id
 * @property string $image_path
 * @property string|null $alt_text
 * @property string|null $caption
 * @property int $sort_order
 * @property bool $is_featured
 * @property array|null $metadata
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Gallery $gallery
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereAltText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereCaption($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereGalleryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GalleryImage whereUpdatedAt($value)
 * @method static \Database\Factories\GalleryImageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GalleryImage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'gallery_id',
        'image_path',
        'alt_text',
        'caption',
        'sort_order',
        'is_featured',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort_order' => 'integer',
        'is_featured' => 'boolean',
        'metadata' => 'array',
    ];

    /**
     * Get the gallery that owns the image.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gallery(): BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }
}