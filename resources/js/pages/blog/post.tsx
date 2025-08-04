import { Head, Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    avatar?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    status: string;
    views: number;
    published_at: string;
    user: User;
    category: Category;
}

interface Props {
    post: Post;
    relatedPosts: Post[];
    [key: string]: unknown;
}

export default function BlogPost({ post, relatedPosts }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title={post.title}>
                <meta name="description" content={post.excerpt || post.title} />
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <Link href="/" className="hover:text-green-600 dark:hover:text-green-400">
                                🏠 Home
                            </Link>
                            <span>/</span>
                            <Link 
                                href={`/categories/${post.category.slug}`}
                                className="hover:text-green-600 dark:hover:text-green-400"
                            >
                                {post.category.name}
                            </Link>
                            <span>/</span>
                            <span className="text-gray-900 dark:text-white">{post.title}</span>
                        </nav>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <article className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
                        {/* Featured Image */}
                        {post.featured_image && (
                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                                <img 
                                    src={post.featured_image} 
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-8">
                            {/* Meta Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <span 
                                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                    style={{ backgroundColor: post.category.color }}
                                >
                                    {post.category.name}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    📅 {formatDate(post.published_at)}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    👁️ {post.views} views
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {post.title}
                            </h1>

                            {/* Author */}
                            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                    {post.user.avatar ? (
                                        <img 
                                            src={post.user.avatar} 
                                            alt={post.user.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-semibold">
                                            {post.user.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {post.user.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Author
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div 
                                className="prose prose-lg max-w-none dark:prose-invert"
                                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                            />
                        </div>
                    </article>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                📚 Related Posts
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <article key={relatedPost.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
                                        {relatedPost.featured_image && (
                                            <Link href={`/posts/${relatedPost.slug}`}>
                                                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden dark:bg-gray-700">
                                                    <img 
                                                        src={relatedPost.featured_image} 
                                                        alt={relatedPost.title}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            </Link>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span 
                                                    className="px-2 py-1 rounded text-xs font-medium text-white"
                                                    style={{ backgroundColor: relatedPost.category.color }}
                                                >
                                                    {relatedPost.category.name}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDate(relatedPost.published_at)}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                <Link 
                                                    href={`/posts/${relatedPost.slug}`}
                                                    className="hover:text-green-600 dark:hover:text-green-400"
                                                >
                                                    {relatedPost.title}
                                                </Link>
                                            </h3>
                                            {relatedPost.excerpt && (
                                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Back to Home */}
                    <div className="mt-12 text-center">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}