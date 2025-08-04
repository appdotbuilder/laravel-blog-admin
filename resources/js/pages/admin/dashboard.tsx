import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Post {
    id: number;
    title: string;
    status: string;
    user: {
        name: string;
    };
    category: {
        name: string;
    };
    created_at: string;
}

interface Stats {
    posts: {
        total: number;
        published: number;
        draft: number;
        recent: Post[];
    };
    categories: {
        total: number;
        active: number;
    };
    pages: {
        total: number;
        active: number;
    };
    galleries: {
        total: number;
        active: number;
    };
    users: {
        total: number;
        admins: number;
        active: number;
    };
}

interface Props {
    stats: Stats;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'archived':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
            default:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
        }
    };

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        🏠 Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Welcome to the Majlis Habibi Rosulullah admin panel
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Posts Stats */}
                    <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                                <span className="text-2xl">📝</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Posts</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.posts.total}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {stats.posts.published} published, {stats.posts.draft} drafts
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link 
                                href="/admin/posts"
                                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Manage Posts →
                            </Link>
                        </div>
                    </div>

                    {/* Categories Stats */}
                    <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                                <span className="text-2xl">📂</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Categories</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.categories.total}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {stats.categories.active} active
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link 
                                href="/admin/categories"
                                className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            >
                                Manage Categories →
                            </Link>
                        </div>
                    </div>

                    {/* Galleries Stats */}
                    <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                                <span className="text-2xl">📸</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Galleries</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.galleries.total}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {stats.galleries.active} active
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link 
                                href="/admin/galleries"
                                className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                            >
                                Manage Galleries →
                            </Link>
                        </div>
                    </div>

                    {/* Users Stats */}
                    <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users.total}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {stats.users.admins} admins
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {stats.users.active} active users
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Posts */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    📝 Recent Posts
                                </h3>
                            </div>
                            <div className="p-6">
                                {stats.posts.recent.length === 0 ? (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No posts yet
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {stats.posts.recent.map((post) => (
                                            <div key={post.id} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <Link
                                                        href={`/admin/posts/${post.id}`}
                                                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            by {post.user.name}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {post.category.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                                                        {post.status}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDate(post.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Link
                                        href="/admin/posts"
                                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        View all posts →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    ⚡ Quick Actions
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    <Link
                                        href="/admin/posts/create"
                                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 transition-colors"
                                    >
                                        <span className="text-xl">✍️</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Create New Post
                                        </span>
                                    </Link>
                                    
                                    <Link
                                        href="/admin/galleries/create"
                                        className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 transition-colors"
                                    >
                                        <span className="text-xl">📷</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Create Gallery
                                        </span>
                                    </Link>
                                    
                                    <Link
                                        href="/admin/pages/create"
                                        className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 transition-colors"
                                    >
                                        <span className="text-xl">📄</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Create Page
                                        </span>
                                    </Link>
                                    
                                    <Link
                                        href="/admin/categories/create"
                                        className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 transition-colors"
                                    >
                                        <span className="text-xl">🏷️</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Create Category
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-lg shadow-sm mt-6 dark:bg-gray-800">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    🔗 Quick Links
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-2">
                                    <Link
                                        href="/"
                                        className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        🏠 View Website
                                    </Link>
                                    <Link
                                        href="/galleries"
                                        className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        📸 Public Galleries
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}