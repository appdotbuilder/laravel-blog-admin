<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->randomElement([
            'About Us',
            'Contact',
            'Privacy Policy',
            'Terms of Service',
            'Our Mission',
            'Leadership Team',
            'Community Guidelines',
            'FAQ',
            'Donate',
            'Events Calendar'
        ]);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => fake()->paragraphs(random_int(8, 15), true),
            'excerpt' => fake()->optional()->paragraph(),
            'template' => 'default',
            'is_active' => true,
            'show_in_menu' => fake()->boolean(60), // 60% chance of showing in menu
            'menu_order' => fake()->numberBetween(0, 10),
            'meta_data' => [
                'meta_title' => $title,
                'meta_description' => fake()->sentence(),
                'keywords' => fake()->words(3, true),
            ],
            'user_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the page should show in menu.
     */
    public function inMenu(): static
    {
        return $this->state(fn (array $attributes) => [
            'show_in_menu' => true,
        ]);
    }
}