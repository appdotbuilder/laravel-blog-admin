<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gallery>
 */
class GalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->randomElement([
            'Ramadan Iftar Community Gathering',
            'Youth Islamic Workshop',
            'Friday Prayer at Central Mosque',
            'Eid Celebration 2024',
            'Islamic Art Exhibition',
            'Quran Recitation Competition',
            'Community Service Day',
            'Women\'s Islamic Study Circle',
            'Children\'s Islamic Education',
            'Interfaith Dialogue Session'
        ]);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->optional()->paragraph(),
            'cover_image' => fake()->optional(0.7)->imageUrl(800, 600, 'community,mosque,event'),
            'is_active' => true,
            'is_featured' => fake()->boolean(30), // 30% chance of being featured
            'sort_order' => fake()->numberBetween(0, 10),
            'event_date' => fake()->dateTimeBetween('-1 year', '+3 months'),
            'user_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the gallery is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}