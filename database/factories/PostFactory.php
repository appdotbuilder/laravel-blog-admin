<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(4, 8));
        $isPublished = fake()->boolean(80); // 80% chance of being published
        $publishedAt = $isPublished ? fake()->dateTimeBetween('-6 months', 'now') : null;
        $status = $isPublished ? 'published' : 'draft';
        
        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'content' => fake()->paragraphs(random_int(5, 12), true),
            'featured_image' => fake()->optional(0.6)->imageUrl(800, 600, 'nature,mosque,community'),
            'status' => $status,
            'is_featured' => fake()->boolean(20), // 20% chance of being featured
            'views' => fake()->numberBetween(0, 1000),
            'meta_data' => [
                'meta_title' => rtrim($title, '.'),
                'meta_description' => fake()->sentence(),
                'keywords' => fake()->words(5, true),
            ],
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'published_at' => $publishedAt,
        ];
    }

    /**
     * Indicate that the post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    /**
     * Indicate that the post is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}