<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Gallery;
use App\Models\GalleryImage;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@majelishabibirosulsaw.com',
            'role' => 'admin',
            'bio' => 'Administrator of Majlis Habibi Rosulullah community website.',
            'is_active' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        // Create some regular users
        $users = User::factory(5)->create();
        $allUsers = collect([$admin])->merge($users);

        // Create categories
        $categories = collect([
            ['name' => 'Islamic History', 'color' => '#8B5A3C', 'description' => 'Learn about our rich Islamic heritage'],
            ['name' => 'Quran & Hadith', 'color' => '#2E8B57', 'description' => 'Verses and sayings from our holy texts'],
            ['name' => 'Community Events', 'color' => '#4169E1', 'description' => 'Updates on community gatherings and activities'],
            ['name' => 'Prayer Guidelines', 'color' => '#9932CC', 'description' => 'Guidance on prayer practices and timings'],
            ['name' => 'Youth Programs', 'color' => '#FF6347', 'description' => 'Activities and programs for young Muslims'],
            ['name' => 'Women\'s Circle', 'color' => '#FF69B4', 'description' => 'Programs and discussions for Muslim women'],
            ['name' => 'Education', 'color' => '#32CD32', 'description' => 'Islamic education and learning resources'],
            ['name' => 'Charity & Zakat', 'color' => '#DAA520', 'description' => 'Information about charitable giving in Islam'],
        ])->map(function ($categoryData, $index) {
            return Category::create([
                'name' => $categoryData['name'],
                'slug' => \Illuminate\Support\Str::slug($categoryData['name']),
                'description' => $categoryData['description'],
                'color' => $categoryData['color'],
                'is_active' => true,
                'sort_order' => $index,
            ]);
        });

        // Create posts
        $posts = collect();
        
        // Create some featured posts
        $featuredPosts = Post::factory(6)
            ->published()
            ->featured()
            ->create([
                'user_id' => $allUsers->random()->id,
                'category_id' => $categories->random()->id,
            ]);
        $posts = $posts->merge($featuredPosts);

        // Create regular posts
        $regularPosts = Post::factory(25)
            ->published()
            ->create([
                'user_id' => $allUsers->random()->id,
                'category_id' => $categories->random()->id,
            ]);
        $posts = $posts->merge($regularPosts);

        // Create some draft posts
        $draftPosts = Post::factory(8)
            ->draft()
            ->create([
                'user_id' => $allUsers->random()->id,
                'category_id' => $categories->random()->id,
            ]);
        $posts = $posts->merge($draftPosts);

        // Create pages
        $pagesData = [
            ['title' => 'About Us', 'show_in_menu' => true, 'menu_order' => 1],
            ['title' => 'Our Mission', 'show_in_menu' => true, 'menu_order' => 2],
            ['title' => 'Contact', 'show_in_menu' => true, 'menu_order' => 3],
            ['title' => 'Community Guidelines', 'show_in_menu' => true, 'menu_order' => 4],
            ['title' => 'Privacy Policy', 'show_in_menu' => false, 'menu_order' => 0],
            ['title' => 'Terms of Service', 'show_in_menu' => false, 'menu_order' => 0],
        ];

        foreach ($pagesData as $pageData) {
            Page::create([
                'title' => $pageData['title'],
                'slug' => \Illuminate\Support\Str::slug($pageData['title']),
                'content' => $this->getPageContent($pageData['title']),
                'excerpt' => 'Learn more about ' . $pageData['title'],
                'template' => 'default',
                'is_active' => true,
                'show_in_menu' => $pageData['show_in_menu'],
                'menu_order' => $pageData['menu_order'],
                'meta_data' => [
                    'meta_title' => $pageData['title'] . ' - Majlis Habibi Rosulullah',
                    'meta_description' => 'Learn more about ' . $pageData['title'] . ' at Majlis Habibi Rosulullah',
                ],
                'user_id' => $admin->id,
            ]);
        }

        // Create galleries
        $galleries = Gallery::factory(8)
            ->create([
                'user_id' => $allUsers->random()->id,
            ]);

        // Make some galleries featured
        $galleries->random(3)->each(function ($gallery) {
            $gallery->update(['is_featured' => true]);
        });

        // Create gallery images
        foreach ($galleries as $gallery) {
            GalleryImage::factory(random_int(5, 15))
                ->create([
                    'gallery_id' => $gallery->id,
                ]);
        }

        // Update post view counts to make them more realistic
        $posts->each(function ($post) {
            $post->update([
                'views' => random_int(10, 500),
            ]);
        });

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin login: admin@majelishabibirosulsaw.com / password');
        $this->command->info('Created: ' . $posts->count() . ' posts, ' . $galleries->count() . ' galleries, ' . count($pagesData) . ' pages');
    }

    /**
     * Get sample content for pages.
     */
    protected function getPageContent(string $title): string
    {
        $content = [
            'About Us' => 'Welcome to Majlis Habibi Rosulullah, a vibrant Islamic community dedicated to fostering spiritual growth, education, and brotherhood among Muslims. Our community was founded with the vision of creating a space where Muslims can come together to learn, worship, and support one another in their faith journey.

Our mission is to provide authentic Islamic education, organize community events that strengthen bonds between members, and serve as a beacon of Islamic values in our society. We believe in the importance of following the teachings of the Quran and the Sunnah of Prophet Muhammad (peace be upon him).

At Majlis Habibi Rosulullah, we organize regular study circles, community prayers, educational workshops, and social events that bring our community together. We welcome Muslims from all backgrounds and encourage active participation in our various programs.

Join us in building a stronger, more connected Islamic community. Together, we can learn, grow, and serve Allah while supporting one another in our daily lives.',

            'Our Mission' => 'Our mission at Majlis Habibi Rosulullah is to create a thriving Islamic community that serves Allah and follows the teachings of Prophet Muhammad (peace be upon him). We are committed to:

**Education and Learning**
- Providing authentic Islamic education based on the Quran and Sunnah
- Organizing study circles and educational workshops
- Supporting Islamic scholarship and learning initiatives

**Community Building**
- Fostering strong bonds between community members
- Organizing regular social and religious events
- Creating a welcoming environment for all Muslims

**Spiritual Development**
- Encouraging regular worship and spiritual practices
- Providing guidance on Islamic lifestyle and values
- Supporting members in their personal spiritual journeys

**Service to Society**
- Engaging in charitable activities and community service
- Promoting positive Islamic values in the wider community
- Building bridges with other faith communities

**Youth Development**
- Providing programs and activities for young Muslims
- Mentoring the next generation of Islamic leaders
- Creating opportunities for youth engagement and development

We believe that by working together and staying true to our Islamic principles, we can build a community that not only benefits its members but also contributes positively to society as a whole.',

            'Contact' => 'Get in touch with Majlis Habibi Rosulullah. We welcome your questions, suggestions, and interest in joining our community.

**Contact Information**
- Email: info@majelishabibirosulsaw.com
- Phone: +62 xxx xxxx xxxx
- Address: [Community Center Address]

**Office Hours**
- Monday - Friday: 9:00 AM - 5:00 PM
- Saturday: 9:00 AM - 2:00 PM
- Sunday: Closed (except for special events)

**Prayer Times**
Join us for our daily prayers at our community center. Check our events calendar for special programs and gatherings.

**How to Join**
If you\'re interested in becoming a member of our community, please contact us or attend one of our open events. We welcome Muslims from all backgrounds and encourage active participation.

**Feedback and Suggestions**
We value your input and are always looking for ways to improve our community programs and services. Please don\'t hesitate to share your thoughts with us.',

            'Community Guidelines' => 'Welcome to the Majlis Habibi Rosulullah community. To ensure a respectful and beneficial environment for all members, please observe the following guidelines:

**Islamic Principles**
- All activities and discussions should align with Islamic teachings
- Respect for the Quran and Sunnah is paramount
- Maintain proper Islamic etiquette in all interactions

**Respectful Communication**
- Treat all community members with respect and kindness
- Avoid controversial topics that may cause division
- Listen actively and speak constructively
- Resolve conflicts through dialogue and understanding

**Participation Guidelines**
- Attend events punctually and prepared
- Participate actively in discussions and activities
- Volunteer for community service when possible
- Support fellow members in their spiritual journey

**Facility Rules**
- Maintain cleanliness of community spaces
- Follow proper mosque etiquette during prayers
- Respect shared resources and equipment
- Report any maintenance issues promptly

**Privacy and Confidentiality**
- Respect the privacy of fellow community members
- Keep personal discussions confidential
- Obtain permission before sharing photos or videos
- Protect sensitive community information

**Consequences**
Members who consistently violate these guidelines may be asked to leave the community. We prefer to address issues through counseling and guidance, but serious violations may require stronger action.

Together, we can maintain a positive and spiritually enriching environment for all.',

            'Privacy Policy' => 'At Majlis Habibi Rosulullah, we are committed to protecting your privacy and personal information. This privacy policy explains how we collect, use, and protect your data.

**Information We Collect**
- Contact information (name, email, phone number)
- Participation in community events and programs
- Voluntary feedback and suggestions
- Website usage data (if applicable)

**How We Use Your Information**
- To communicate about community events and programs
- To provide requested services and information
- To improve our community programs
- To maintain membership records

**Information Sharing**
We do not sell, trade, or share your personal information with third parties without your consent, except as required by law.

**Data Security**
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

**Your Rights**
You have the right to access, update, or delete your personal information at any time. Contact us to exercise these rights.

**Contact Us**
If you have questions about this privacy policy, please contact us at info@majelishabibirosulsaw.com',

            'Terms of Service' => 'By participating in Majlis Habibi Rosulullah community activities, you agree to the following terms and conditions:

**Membership**
- Membership is open to all Muslims who agree to follow our community guidelines
- Members are expected to participate respectfully and constructively
- Membership may be revoked for serious violations of community guidelines

**Events and Programs**
- Event schedules may change due to circumstances beyond our control
- Participants must follow safety guidelines and instructions
- Photography and recording may occur during events

**Intellectual Property**
- Educational materials and content remain the property of their respective authors
- Community-generated content may be shared within the community
- Respect copyright and intellectual property rights

**Liability**
- Participants engage in activities at their own risk
- The community is not liable for personal injuries or property damage
- Members are responsible for their own actions during events

**Dispute Resolution**
- Disputes should be resolved through dialogue and mediation
- Islamic principles guide our approach to conflict resolution
- Serious matters may be referred to community leadership

**Changes to Terms**
We reserve the right to update these terms as needed. Members will be notified of significant changes.

By continuing to participate in our community, you agree to these terms and conditions.',
        ];

        return $content[$title] ?? 'This page contains information about ' . $title . '. Content will be added soon, InshaAllah.';
    }
}