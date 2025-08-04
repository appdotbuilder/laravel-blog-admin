import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    published_at: string;
    views: number;
    is_featured: boolean;
    user: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
        color: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    posts_count: number;
}

interface Gallery {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
    event_date: string | null;
    images: Array<{
        id: number;
        image_path: string;
        alt_text: string | null;
    }>;
}

interface Page {
    title: string;
    slug: string;
}

interface Props {
    featuredPosts: Post[];
    recentPosts: Post[];
    categories: Category[];
    featuredGalleries: Gallery[];
    menuPages: Page[];
    [key: string]: unknown;
}

export default function Welcome({ 
    featuredPosts, 
    recentPosts, 
    categories, 
    featuredGalleries, 
    menuPages 
}: Props) {
    const { auth } = usePage<SharedData>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="Majlis Habibi Rosulullah - Blog & Gallery">
                <meta name="description" content="Welcome to Majlis Habibi Rosulullah - Your source for Islamic content, events, and community activities" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 dark:bg-gray-900/90">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🕌</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Majlis Habibi Rosulullah
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Islamic Blog & Community</p>
                                </div>
                            </div>
                            
                            <nav className="hidden md:flex items-center space-x-6">
                                <Link href="/" className="text-green-600 font-medium hover:text-green-700">
                                    Home
                                </Link>
                                {menuPages.map((page) => (
                                    <Link 
                                        key={page.slug}
                                        href={`/pages/${page.slug}`} 
                                        className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                                    >
                                        {page.title}
                                    </Link>
                                ))}
                                <Link href="/galleries" className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400">
                                    Gallery
                                </Link>
                            </nav>

                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href="/admin/dashboard"
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Admin
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    {/* Hero Section */}
                    <section className="relative py-16 lg:py-24">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <div className="max-w-4xl mx-auto">
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                    🕌 Welcome to <br />
                                    <span className="text-green-600">Majlis Habibi Rosulullah</span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                    📖 Your source for Islamic content, community events, and spiritual guidance. 
                                    Join us in our journey of faith and learning.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link
                                        href="#featured-posts"
                                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                    >
                                        📚 Read Latest Posts
                                    </Link>
                                    <Link
                                        href="/galleries"
                                        className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-green-600 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                                    >
                                        📸 View Gallery
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Featured Posts */}
                    {featuredPosts.length > 0 && (
                        <section id="featured-posts" className="py-16 bg-white dark:bg-gray-900">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        ⭐ Featured Posts
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Discover our most important and inspiring content
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {featuredPosts.map((post) => (
                                        <article key={post.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
                                            {post.featured_image && (
                                                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                                                    <img 
                                                        src={post.featured_image} 
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span 
                                                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                                        style={{ backgroundColor: post.category.color }}
                                                    >
                                                        {post.category.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDate(post.published_at)}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                    <Link 
                                                        href={`/posts/${post.slug}`}
                                                        className="hover:text-green-600 dark:hover:text-green-400"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        By {post.user.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        👁️ {post.views} views
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Categories */}
                    {categories.length > 0 && (
                        <section className="py-16 bg-gray-50 dark:bg-gray-800">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        📂 Explore Categories
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Browse content by topics that interest you
                                    </p>
                                </div>
                                
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/categories/${category.slug}`}
                                            className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all hover:scale-105 dark:bg-gray-900"
                                        >
                                            <div 
                                                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                                                style={{ backgroundColor: category.color + '20' }}
                                            >
                                                <span className="text-2xl">📖</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {category.posts_count} posts
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Recent Posts */}
                    {recentPosts.length > 0 && (
                        <section className="py-16 bg-white dark:bg-gray-900">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        🆕 Recent Posts
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Stay updated with our latest content
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {recentPosts.slice(0, 6).map((post) => (
                                        <article key={post.id} className="group">
                                            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800">
                                                {post.featured_image && (
                                                    <Link href={`/posts/${post.slug}`}>
                                                        <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                                                            <img 
                                                                src={post.featured_image} 
                                                                alt={post.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>
                                                    </Link>
                                                )}
                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span 
                                                            className="px-2 py-1 rounded text-xs font-medium text-white"
                                                            style={{ backgroundColor: post.category.color }}
                                                        >
                                                            {post.category.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {formatDate(post.published_at)}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                        <Link 
                                                            href={`/posts/${post.slug}`}
                                                            className="hover:text-green-600 dark:hover:text-green-400"
                                                        >
                                                            {post.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            By {post.user.name}
                                                        </span>
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            👁️ {post.views}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Featured Galleries */}
                    {featuredGalleries.length > 0 && (
                        <section className="py-16 bg-gray-50 dark:bg-gray-800">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                        📸 Featured Galleries
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Explore our community events and activities
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {featuredGalleries.map((gallery) => (
                                        <Link
                                            key={gallery.id}
                                            href={`/galleries/${gallery.slug}`}
                                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all dark:bg-gray-900"
                                        >
                                            <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                                {gallery.cover_image ? (
                                                    <img 
                                                        src={gallery.cover_image} 
                                                        alt={gallery.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : gallery.images.length > 0 ? (
                                                    <img 
                                                        src={gallery.images[0].image_path} 
                                                        alt={gallery.images[0].alt_text || gallery.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-4xl">📷</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    {gallery.title}
                                                </h3>
                                                {gallery.description && (
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                                                        {gallery.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        {gallery.images.length} photos
                                                    </span>
                                                    {gallery.event_date && (
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            {formatDate(gallery.event_date)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Call to Action */}
                    <section className="py-16 bg-green-600 dark:bg-green-700">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                🤝 Join Our Community
                            </h2>
                            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                                Become part of our growing community. Share your faith journey, 
                                learn from others, and contribute to our mission.
                            </p>
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                                    >
                                        📝 Join Now
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="bg-transparent text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium border border-white"
                                    >
                                        🔑 Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">🕌</span>
                                    </div>
                                    <span className="font-bold text-lg">Majlis Habibi Rosulullah</span>
                                </div>
                                <p className="text-gray-400">
                                    Building a stronger Islamic community through knowledge, 
                                    faith, and brotherhood.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                                    <li><Link href="/galleries" className="text-gray-400 hover:text-white">Gallery</Link></li>
                                    {menuPages.map((page) => (
                                        <li key={page.slug}>
                                            <Link href={`/pages/${page.slug}`} className="text-gray-400 hover:text-white">
                                                {page.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Contact</h3>
                                <div className="text-gray-400 space-y-2">
                                    <p>📧 info@majelishabibirosulsaw.com</p>
                                    <p>📱 +62 xxx xxxx xxxx</p>
                                    <p>📍 Indonesia</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 Majlis Habibi Rosulullah. Built with ❤️ for the community.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}