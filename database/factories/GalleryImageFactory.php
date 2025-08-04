<?php

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GalleryImage>
 */
class GalleryImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'gallery_id' => Gallery::factory(),
            'image_path' => fake()->imageUrl(800, 600, 'people,community,event'),
            'alt_text' => fake()->sentence(3),
            'caption' => fake()->optional(0.7)->sentence(),
            'sort_order' => fake()->numberBetween(0, 20),
            'is_featured' => fake()->boolean(10), // 10% chance of being featured
            'metadata' => [
                'file_size' => fake()->numberBetween(100000, 2000000),
                'dimensions' => [
                    'width' => 800,
                    'height' => 600,
                ],
                'format' => 'jpeg',
            ],
        ];
    }
}